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
  slug?: string | { current: string }
  resumo?: string
  imagemCapa?: string
  galeria?: string[]
  body?: unknown

  // ── Datas (ISO 8601 string — usar formatDate() para exibição) ─
  dataEvento?: string    // rodaAniversariantes, rodaConsciencia, mostraCultural, eventoExterno
  dataInicio?: string    // encontroConscienciaNegra
  dataFim?: string       // encontroConscienciaNegra
  dataPublicacao?: string // documento, noticia
  dataVigencia?: string  // documento
  dataCard?: string      // Campo normalizado via coalesce(dataEvento, dataInicio, dataPublicacao) no GROQ

  // ── Local ─────────────────────────────────────────────────────
  local?: string

  // ── rodaAniversariantes ───────────────────────────────────────
  mesReferencia?: string
  anoReferencia?: number
  aniversariantes?: string[]

  // ── encontroConscienciaNegra ──────────────────────────────────
  edicao?: number
  edicaoRomano?: string
  subtemaPrincipal?: string
  mestresConvidados?: string[]
  gruposConvidados?: string[]
  parceiros?: string[]

  // ── rodaConsciencia ───────────────────────────────────────────
  mestreConvidado?: string
  fotoMestre?: string
  origemMestre?: string
  temaRoda?: string
  abertoAoPublico?: boolean

  // ── mostraCultural ────────────────────────────────────────────
  escolasParticipantes?: string[]
  quantidadeAlunos?: number

  // ── oficina ───────────────────────────────────────────────────
  subtipoOficina?: 'capoeira' | 'percussao' | 'danca-teatro'
  oficineiro?: string
  horarios?: string
  faixaEtaria?: string
  vagas?: number
  inscricoesAbertas?: boolean

  // ── eventoExterno ─────────────────────────────────────────────
  organizador?: string
  tipoParticipacao?: 'apresentacao' | 'palestra' | 'exposicao' | 'parceria' | 'oficina-externa'
  linkEvento?: string

  // ── documento ─────────────────────────────────────────────────
  subtipoDocumento?: 'edital' | 'relatorio' | 'estatuto' | 'ata' | 'convenio' | 'plano-trabalho' | 'prestacao-contas'
  arquivo?: string
  tamanhoArquivo?: string
  linkExterno?: string

  // ── noticia ───────────────────────────────────────────────────
  categoriaNoticia?: 'comunicado' | 'convite' | 'registro' | 'novidade' | 'edital-inscricao'

  // ── Mídias externas (compartilhadas por eventos, oficinas, mostras) ──
  videoUrl?: string
  driveUrl?: string
}
