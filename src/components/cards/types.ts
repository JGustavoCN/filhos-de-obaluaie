/**
 * Tipos do frontend para os Cards do Centro Cultural Filhos de Obaluaiê.
 *
 * Os _type values do Sanity agora são camelCase correspondendo exatamente
 * aos nomes dos document types definidos em studio/schemaTypes/documentos/.
 *
 * Mapeamento _type → Card Component:
 *  rodaAniversariantes     → CardAniversario
 *  encontroConscienciaNegra → CardConscienciaNegra
 *  rodaConsciencia         → CardRodaConsciencia
 *  mostraCultural          → CardMostraEscolar
 *  oficina                 → CardOficina
 *  eventoExterno           → CardEventoExterno
 *  documento               → CardDocumento
 *  noticia                 → CardNoticia
 */

/** Union dos _type values do Sanity. Usado no dispatcher EventCard. */
export type SanityDocumentType =
  | 'rodaAniversariantes'
  | 'encontroConscienciaNegra'
  | 'rodaConsciencia'
  | 'mostraCultural'
  | 'oficina'
  | 'eventoExterno'
  | 'documento'
  | 'noticia'

/** Props compartilhadas por todos os cards */
export interface EventoProps {
  // ── Campos de sistema ─────────────────────────────────────────
  _id?: string
  id?: string
  _type?: SanityDocumentType | string
  /** Mantido para compatibilidade com mocks do frontend */
  tipo?: string

  // ── Campos base (presentes em todos os schemas) ───────────────
  titulo: string
  slug?: string | { current: string } | null
  resumo?: string | null
  imagemCapa?: string | null
  galeria?: (string | null)[] | null
  body?: unknown

  // ── Datas (ISO 8601 string — usar formatDate() para exibição) ─
  dataEvento?: string | null    // rodaAniversariantes, rodaConsciencia, mostraCultural, eventoExterno
  dataInicio?: string | null    // encontroConscienciaNegra
  dataFim?: string | null       // encontroConscienciaNegra
  dataPublicacao?: string | null // documento, noticia
  dataVigencia?: string | null  // documento
  dataCard?: string | null      // Campo normalizado via coalesce(dataEvento, dataInicio, dataPublicacao) no GROQ

  // ── Local ─────────────────────────────────────────────────────
  local?: string | null

  // ── rodaAniversariantes ───────────────────────────────────────
  mesReferencia?: string | null
  anoReferencia?: number | null
  aniversariantes?: string[] | null

  // ── encontroConscienciaNegra ──────────────────────────────────
  edicao?: number | null
  edicaoRomano?: string | null
  subtemaPrincipal?: string | null
  mestresConvidados?: string[] | null
  gruposConvidados?: string[] | null
  parceiros?: string[] | null

  // ── rodaConsciencia ───────────────────────────────────────────
  mestreConvidado?: string | null
  fotoMestre?: string | null
  origemMestre?: string | null
  temaRoda?: string | null
  abertoAoPublico?: boolean | null

  // ── mostraCultural ────────────────────────────────────────────
  escolasParticipantes?: string[] | null
  quantidadeAlunos?: number | null

  // ── oficina ───────────────────────────────────────────────────
  subtipoOficina?: 'capoeira' | 'percussao' | 'danca-teatro' | null
  oficineiro?: string | null
  horarios?: string | null
  faixaEtaria?: string | null
  vagas?: number | null
  inscricoesAbertas?: boolean | null

  // ── eventoExterno ─────────────────────────────────────────────
  organizador?: string | null
  tipoParticipacao?: 'apresentacao' | 'palestra' | 'exposicao' | 'parceria' | 'oficina-externa' | null
  linkEvento?: string | null

  // ── documento ─────────────────────────────────────────────────
  subtipoDocumento?: 'edital' | 'relatorio' | 'estatuto' | 'ata' | 'convenio' | 'plano-trabalho' | 'prestacao-contas' | null
  arquivo?: string | null
  tamanhoArquivo?: string | null
  linkExterno?: string | null

  // ── noticia ───────────────────────────────────────────────────
  categoriaNoticia?: 'comunicado' | 'convite' | 'registro' | 'novidade' | 'edital-inscricao' | null

  // ── Mídias externas (compartilhadas por eventos, oficinas, mostras) ──
  videoUrl?: string | null
  driveUrl?: string | null
}
