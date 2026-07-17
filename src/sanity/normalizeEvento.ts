import type {EventoProps} from '@/components/cards/types'
import type {CONTEUDO_POR_TIPO_QUERY_RESULT} from '@/sanity/sanity.types'

type GeneratedEvento = CONTEUDO_POR_TIPO_QUERY_RESULT[number]
type RequiredCardFields = Pick<GeneratedEvento, '_id' | '_type' | 'titulo'>

export type SanityCardProjection = RequiredCardFields &
  Partial<Omit<GeneratedEvento, keyof RequiredCardFields>>

type SanityImageProjection =
  | {
      url: string | null
      alt: string | null
    }
  | null
  | undefined

const optional = <Value>(value: Value | null | undefined): Value | undefined =>
  value ?? undefined

const imageUrl = (image: SanityImageProjection): string | undefined =>
  image?.url ?? undefined

export function normalizeSanityEvento(item: SanityCardProjection): EventoProps {
  return {
    _id: item._id,
    _type: item._type,
    titulo: item.titulo ?? '',
    slug: optional(item.slug),
    resumo: optional(item.resumo),
    local: optional(item.local),
    imagemCapa: imageUrl(item.imagemCapa),
    galeria: (item.galeria ?? [])
      .map(imageUrl)
      .filter((url): url is string => Boolean(url)),
    dataEvento: optional(item.dataEvento),
    dataInicio: optional(item.dataInicio),
    dataPublicacao: optional(item.dataPublicacao),
    dataCard: optional(item.dataCard),
    aniversariantes: optional(item.aniversariantes),
    mesReferencia: optional(item.mesReferencia),
    anoReferencia: optional(item.anoReferencia),
    mestreConvidado: optional(item.mestreConvidado),
    fotoMestre: imageUrl(item.fotoMestre),
    origemMestre: optional(item.origemMestre),
    temaRoda: optional(item.temaRoda),
    abertoAoPublico: optional(item.abertoAoPublico),
    edicao: optional(item.edicao),
    edicaoRomano: optional(item.edicaoRomano),
    subtemaPrincipal: optional(item.subtemaPrincipal),
    mestresConvidados: optional(item.mestresConvidados),
    escolasParticipantes: optional(item.escolasParticipantes),
    parceiros: optional(item.parceiros),
    gruposConvidados: optional(item.gruposConvidados),
    quantidadeAlunos: optional(item.quantidadeAlunos),
    organizador: optional(item.organizador),
    tipoParticipacao: optional(item.tipoParticipacao),
    subtipoOficina: optional(item.subtipoOficina),
    oficineiro: optional(item.oficineiro),
    horarios: optional(item.horarios),
    faixaEtaria: optional(item.faixaEtaria),
    vagas: optional(item.vagas),
    inscricoesAbertas: optional(item.inscricoesAbertas),
    subtipoDocumento: optional(item.subtipoDocumento),
    arquivo: optional(item.arquivo),
    tamanhoArquivo: optional(item.tamanhoArquivo),
    linkExterno: optional(item.linkExterno),
    categoriaNoticia: optional(item.categoriaNoticia),
    videoUrl: optional(item.videoUrl),
    driveUrl: optional(item.driveUrl),
  }
}
