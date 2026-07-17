#!/usr/bin/env node
/**
 * IMPORTADOR — Acervo → Sanity (rodaAniversariantes)
 * ─────────────────────────────────────────────────────────────
 * Lê os `dados.json` do acervo e cria/atualiza documentos no Sanity.
 *
 * REGRAS EDITORIAIS (decididas pelo responsável do acervo):
 *   1. dataEvento: nunca inventar datas. Se estiver vazio no JSON,
 *      é enviado como `null` para o Sanity.
 *   2. aniversariantes: nunca autopreencher. Mantém array vazio quando
 *      não há informação.
 *   3. Pastas sem `dados.json` válido NÃO geram documento (nada de docs vazios).
 *   4. Objetivo é preservar memória histórica — não são eventos futuros.
 *
 * SEGURANÇA:
 *   - Modo padrão é DRY-RUN (não grava nada). Só grava com `--commit`.
 *   - Não altera schemas.
 *
 * USO:
 *   node scripts/import-rodas.mjs                      # dry-run (produção? veja --dataset)
 *   node scripts/import-rodas.mjs --dataset=development
 *   node scripts/import-rodas.mjs --acervo="C:\\Users\\...\\acervo-filhos-de-obaluaie"
 *   node scripts/import-rodas.mjs --commit --dataset=development   # grava de verdade
 *
 * VARIÁVEIS DE AMBIENTE:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID  (lida de .env.local; fallback 1lha6jrn)
 *   NEXT_PUBLIC_SANITY_DATASET     (opcional; padrão development)
 *   SANITY_API_WRITE_TOKEN         (obrigatório APENAS para --commit)
 */

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import {fileURLToPath} from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_DIR = path.resolve(__dirname, '..')

// ───────────── configuração fixa ─────────────
const TYPE = 'rodaAniversariantes'
const CATEGORY_DIR = 'rodas-aniversariantes'
const MESES_VALIDOS = [
  'janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]
const IMG_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.tif', '.tiff'])
const API_VERSION = '2026-06-28'
// regex do schema (mediaExternaFields.videoUrl)
const YT = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/

// ───────────── args / env ─────────────
const args = process.argv.slice(2)
const hasFlag = (n) => args.includes(n)
const getOpt = (n, d) => {
  const p = args.find((a) => a.startsWith(n + '='))
  return p ? p.slice(n.length + 1) : d
}
const COMMIT = hasFlag('--commit')

function loadEnvFile(file) {
  try {
    for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  } catch { /* .env.local pode não existir */ }
}
loadEnvFile(path.join(PROJECT_DIR, '.env.local'))

const DEFAULT_ACERVO = 'C:\\Users\\rondley.santos_quero\\Desktop\\acervo-filhos-de-obaluaie'
const ACERVO = getOpt('--acervo', process.env.ACERVO_DIR || DEFAULT_ACERVO)
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1lha6jrn'
const DATASET = getOpt('--dataset', process.env.SANITY_IMPORT_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'development')
const TOKEN = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN

// ───────────── helpers ─────────────
const key = (n = 12) => crypto.randomBytes(8).toString('hex').slice(0, n)

function slugify(str) {
  return String(str)
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // remove acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
    .replace(/-+$/, '')
}

function toPortableText(texto) {
  const paras = String(texto).split(/\n{2,}|\r?\n/).map((s) => s.trim()).filter(Boolean)
  return paras.map((p) => ({
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: key(), text: p, marks: []}],
  }))
}

// Regra 1: nunca inventar. Vazio -> null. Data existente é apenas reformatada.
function parseDataEvento(v) {
  if (v == null) return {value: null}
  const s = String(v).trim()
  if (!s) return {value: null}
  if (/^\d{4}-\d{2}-\d{2}T/.test(s)) return {value: s}
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return {value: s + 'T00:00:00.000Z', warn: 'data sem hora (00:00 UTC)'}
  const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (m) return {value: `${m[3]}-${m[2]}-${m[1]}T00:00:00.000Z`, warn: 'convertido de DD/MM/YYYY (hora não informada)'}
  return {value: null, warn: `formato de data não reconhecido (${s}) → enviado como null`}
}

const human = (b) =>
  b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : b >= 1024 ? (b / 1024).toFixed(0) + ' KB' : b + ' B'

// ───────────── montagem do plano (sem rede) ─────────────
function buildPlan() {
  const base = path.join(ACERVO, CATEGORY_DIR)
  if (!fs.existsSync(base)) throw new Error(`Pasta do acervo não encontrada: ${base}`)

  const folders = fs.readdirSync(base)
    .filter((f) => fs.statSync(path.join(base, f)).isDirectory())
    .sort()

  const docs = []
  const skipped = []
  const incompat = []

  for (const folder of folders) {
    const dir = path.join(base, folder)
    const jsonPath = path.join(dir, 'dados.json')

    // Regra 3: sem dados.json => não importa
    if (!fs.existsSync(jsonPath)) {
      skipped.push({folder, reason: 'sem dados.json (pasta vazia) — não será importada'})
      continue
    }
    let d
    try {
      d = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    } catch (e) {
      skipped.push({folder, reason: `dados.json inválido: ${e.message}`})
      continue
    }

    // validação mínima de campos obrigatórios do schema
    const problems = []
    if (!d.titulo || String(d.titulo).trim().length < 5) problems.push('titulo ausente/curto')
    if (!MESES_VALIDOS.includes(d.mesReferencia)) problems.push(`mesReferencia inválido: ${JSON.stringify(d.mesReferencia)}`)
    if (typeof d.anoReferencia !== 'number') problems.push('anoReferencia ausente')
    if (problems.length) {
      skipped.push({folder, reason: 'documento inválido: ' + problems.join('; ')})
      continue
    }

    const emptyFields = []
    const warnings = []
    const imagesToUpload = []

    // imagemCapa
    let capa = null
    const capaRel = d.imagemCapa?.arquivo?.trim()
    if (capaRel) {
      const abs = path.join(dir, capaRel)
      if (fs.existsSync(abs)) {
        capa = {abs, rel: capaRel, alt: d.imagemCapa.alt || ''}
        imagesToUpload.push({campo: 'imagemCapa', rel: capaRel, abs, size: fs.statSync(abs).size})
        if (!d.imagemCapa.alt) warnings.push('imagemCapa sem alt')
      } else {
        incompat.push({folder, tipo: 'imagem-inexistente', detalhe: capaRel})
      }
    } else {
      emptyFields.push('imagemCapa')
    }

    // galeria
    const galeria = []
    for (const g of Array.isArray(d.galeria) ? d.galeria : []) {
      const rel = g?.arquivo?.trim()
      if (!rel) continue
      const abs = path.join(dir, rel)
      if (fs.existsSync(abs)) {
        galeria.push({abs, rel, alt: g.alt || ''})
        imagesToUpload.push({campo: 'galeria', rel, abs, size: fs.statSync(abs).size})
        const bn = path.basename(rel)
        if (/\s/.test(bn) || /[^\x00-\x7F]/.test(bn)) warnings.push(`nome de arquivo problemático (espaços/acentos): ${bn}`)
      } else {
        incompat.push({folder, tipo: 'imagem-inexistente', detalhe: rel})
      }
    }
    if (galeria.length === 0) emptyFields.push('galeria')

    // dataEvento (regra 1)
    const de = parseDataEvento(d.dataEvento)
    if (de.value === null) emptyFields.push('dataEvento (será null)')
    if (de.warn) warnings.push('dataEvento: ' + de.warn)

    // aniversariantes (regra 2 — nunca autopreencher)
    const aniversariantes = Array.isArray(d.aniversariantes) ? d.aniversariantes.filter((x) => String(x).trim()) : []
    if (aniversariantes.length === 0) emptyFields.push('aniversariantes (mantido vazio)')

    // body / textoCompleto
    const texto = (d.textoCompleto || '').trim()
    if (!texto) emptyFields.push('body (textoCompleto vazio)')

    // videoUrl
    let videoUrl = (d.videoUrl || '').trim()
    if (videoUrl && !YT.test(videoUrl)) {
      warnings.push(`videoUrl não parece do YouTube — será omitido: ${videoUrl}`)
      videoUrl = ''
    }
    if (!videoUrl) emptyFields.push('videoUrl')

    // driveUrl
    const driveUrl = (d.driveUrl || '').trim()
    if (driveUrl && /[?&]role=writer/.test(driveUrl)) warnings.push('driveUrl é link de edição (role=writer) — prefira link de leitura')
    if (!driveUrl) emptyFields.push('driveUrl')

    docs.push({
      folder,
      _id: `roda-aniversariantes-${folder}`,
      titulo: d.titulo,
      slug: slugify(d.titulo),
      mes: d.mesReferencia,
      ano: d.anoReferencia,
      raw: d,
      capa,
      galeria,
      dataEvento: de.value,
      aniversariantes,
      texto,
      videoUrl,
      driveUrl,
      imagesToUpload,
      emptyFields,
      warnings,
    })
  }

  return {base, docs, skipped, incompat}
}

// ───────────── relatório (dry-run) ─────────────
function printReport(plan) {
  const modo = COMMIT ? 'COMMIT (vai gravar)' : 'DRY-RUN (não grava)'
  console.log('══════════════════════════════════════════════════════════════')
  console.log(`  IMPORTADOR — Rodas de Aniversariantes — ${modo}`)
  console.log('══════════════════════════════════════════════════════════════')
  console.log(`Acervo:    ${plan.base}`)
  console.log(`Sanity:    projectId=${PROJECT_ID}  dataset=${DATASET}  apiVersion=${API_VERSION}`)
  console.log(`Token:     ${TOKEN ? 'presente' : 'AUSENTE (necessário apenas para --commit)'}`)
  console.log('')
  console.log(`▓ DOCUMENTOS ENCONTRADOS: ${plan.docs.length}`)

  for (const doc of plan.docs) {
    const bytes = doc.imagesToUpload.reduce((a, x) => a + x.size, 0)
    console.log('')
    console.log(`  ▶ ${doc.folder}  →  _id: ${doc._id}`)
    console.log(`     título : ${doc.titulo}`)
    console.log(`     slug   : ${doc.slug}`)
    console.log(`     mês/ano: ${doc.mes}/${doc.ano}`)
    console.log(`     dataEvento: ${doc.dataEvento === null ? 'null' : doc.dataEvento}`)
    console.log(`     aniversariantes: ${doc.aniversariantes.length ? doc.aniversariantes.join(', ') : '(vazio)'}`)
    console.log(`     imagemCapa: ${doc.capa ? path.basename(doc.capa.abs) : '—'}`)
    console.log(`     IMAGENS A ENVIAR: ${doc.imagesToUpload.length} (${human(bytes)})`)
    for (const im of doc.imagesToUpload) console.log(`        · ${im.campo}: ${im.rel} (${human(im.size)})`)
    if (doc.emptyFields.length) console.log(`     CAMPOS VAZIOS: ${doc.emptyFields.join(', ')}`)
    for (const w of doc.warnings) console.log(`     ⚠ ${w}`)
  }

  console.log('')
  console.log(`▓ PASTAS IGNORADAS (não importadas): ${plan.skipped.length}`)
  for (const s of plan.skipped) console.log(`   - ${s.folder}: ${s.reason}`)

  console.log('')
  console.log(`▓ INCOMPATIBILIDADES: ${plan.incompat.length}`)
  for (const i of plan.incompat) console.log(`   - ${i.folder}: ${i.tipo} → ${i.detalhe}`)

  const totalImgs = plan.docs.reduce((a, d) => a + d.imagesToUpload.length, 0)
  const totalBytes = plan.docs.reduce((a, d) => a + d.imagesToUpload.reduce((x, y) => x + y.size, 0), 0)
  console.log('')
  console.log('──────────────────────────────────────────────────────────────')
  console.log(`RESUMO: ${plan.docs.length} documentos · ${totalImgs} imagens (${human(totalBytes)}) · ` +
    `${plan.skipped.length} pastas ignoradas · ${plan.incompat.length} incompatibilidades`)
  console.log('──────────────────────────────────────────────────────────────')
}

// ───────────── manifesto (arquivo) ─────────────
function writeManifest(plan) {
  const manifest = {
    geradoEm: new Date().toISOString(),
    modo: COMMIT ? 'commit' : 'dry-run',
    sanity: {projectId: PROJECT_ID, dataset: DATASET, apiVersion: API_VERSION},
    acervo: plan.base,
    regras: {
      dataEventoVazio: 'null',
      aniversariantes: 'nunca autopreencher',
      pastasSemDados: 'ignoradas',
      natureza: 'memória histórica',
    },
    documentos: plan.docs.map((d) => ({
      folder: d.folder,
      _id: d._id,
      _type: TYPE,
      titulo: d.titulo,
      slug: d.slug,
      mesReferencia: d.mes,
      anoReferencia: d.ano,
      dataEvento: d.dataEvento,
      aniversariantes: d.aniversariantes,
      imagemCapa: d.capa ? d.capa.rel : null,
      galeria: d.galeria.map((g) => g.rel),
      camposVazios: d.emptyFields,
      avisos: d.warnings,
      imagens: d.imagesToUpload.map((i) => ({campo: i.campo, arquivo: i.rel, bytes: i.size})),
    })),
    pastasIgnoradas: plan.skipped,
    incompatibilidades: plan.incompat,
  }
  const out = path.join(__dirname, 'import-report.json')
  fs.writeFileSync(out, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`\nManifesto salvo em: ${out}`)
}

// ───────────── commit (grava no Sanity) ─────────────
async function commit(plan) {
  if (!TOKEN) {
    console.error('\n✖ ERRO: defina SANITY_API_WRITE_TOKEN (token com permissão de escrita) para usar --commit.')
    process.exit(1)
  }
  const {createClient} = await import('@sanity/client')
  const client = createClient({projectId: PROJECT_ID, dataset: DATASET, apiVersion: API_VERSION, token: TOKEN, useCdn: false})

  const assetCache = new Map()
  async function uploadImage({abs, alt}) {
    let assetId = assetCache.get(abs)
    if (!assetId) {
      const asset = await client.assets.upload('image', fs.createReadStream(abs), {filename: path.basename(abs)})
      assetId = asset._id
      assetCache.set(abs, assetId)
    }
    const img = {_type: 'image', asset: {_type: 'reference', _ref: assetId}}
    if (alt) img.alt = alt
    return img
  }

  console.log(`\n== MODO COMMIT — gravando ${plan.docs.length} documentos em "${DATASET}" ==\n`)
  for (const doc of plan.docs) {
    const out = {
      _id: doc._id,
      _type: TYPE,
      titulo: doc.titulo,
      slug: {_type: 'slug', current: doc.slug},
      destaqueNaHome: !!doc.raw.destaqueNaHome,
      prioridadeHome: typeof doc.raw.prioridadeHome === 'number' ? doc.raw.prioridadeHome : 0,
      mesReferencia: doc.mes,
      anoReferencia: doc.ano,
      dataEvento: doc.dataEvento, // regra 1: null quando vazio
      aniversariantes: doc.aniversariantes, // regra 2: [] quando vazio
    }
    if (doc.raw.resumo) out.resumo = doc.raw.resumo
    if (doc.raw.local) out.local = doc.raw.local
    if (doc.texto) out.body = toPortableText(doc.texto)
    if (doc.capa) out.imagemCapa = await uploadImage(doc.capa)
    if (doc.galeria.length) {
      out.galeria = []
      for (const g of doc.galeria) out.galeria.push({...(await uploadImage(g)), _key: key()})
    }
    if (doc.videoUrl) out.videoUrl = doc.videoUrl
    if (doc.driveUrl) out.driveUrl = doc.driveUrl

    await client.createOrReplace(out)
    console.log(`   ✔ ${doc._id}  (${doc.imagesToUpload.length} imagens)`)
  }
  console.log('\n✔ Importação concluída.')
}

// ───────────── main ─────────────
async function main() {
  const plan = buildPlan()
  printReport(plan)
  writeManifest(plan)
  if (COMMIT) {
    await commit(plan)
  } else {
    console.log('\n(dry-run — nada foi gravado no Sanity. Revise acima e use --commit para importar.)')
  }
}

main().catch((e) => {
  console.error('\n✖ Falha:', e.message)
  process.exit(1)
})
