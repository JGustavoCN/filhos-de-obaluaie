import { defineQuery } from 'next-sanity'

/**
 * Queries GROQ — Centro Cultural Filhos de Obaluaiê
 * ─────────────────────────────────────────────────────────────
 * Todos os _type values correspondem aos schemas em:
 *   studio/schemaTypes/documentos/
 *
 * Convenção de datas:
 *  - dataEvento   → rodaAniversariantes, rodaConsciencia, mostraCultural, eventoExterno
 *  - dataInicio   → encontroConscienciaNegra
 *  - dataPublicacao → documento, noticia
 *  Use formatDate() do src/lib/formatDate.ts para exibição.
 */

// ── Projeção de imagem reutilizável (com alt text) ──────────────────────────
// Nota: aplicar inline em cada query onde necessário

// ── 1. Hero Dinâmico ────────────────────────────────────────────────────────
// O maior evento disponível (Encontro CN > Mostra > Externo) para destaque.
export const HOME_HERO_QUERY = defineQuery(`
  *[_type in ["encontroConscienciaNegra", "mostraCultural", "eventoExterno"]] | order(
    select(
      _type == "encontroConscienciaNegra" => dataInicio,
      _type == "mostraCultural"           => dataEvento,
      _type == "eventoExterno"            => dataEvento,
      _createdAt
    ) desc
  )[0] {
    _id,
    _type,
    titulo,
    "slug": slug.current,
    resumo,
    local,
    // Datas polimórficas — o frontend usa dataInicio ou dataEvento conforme o _type
    dataInicio,
    dataEvento,
    "dataCard": coalesce(dataEvento, dataInicio, dataPublicacao),
    "imagemCapa": imagemCapa{ "url": asset->url, alt },
    "galeria": galeria[0...3]{ "url": asset->url, alt },
    // Campos específicos
    edicao,
    edicaoRomano,
    subtemaPrincipal,
    mestresConvidados,
    organizador,
    tipoParticipacao,
    escolasParticipantes,
    quantidadeAlunos,
    // Mídias externas
    videoUrl,
    driveUrl
  }
`)

// ── 2. Notícias Recentes ────────────────────────────────────────────────────
export const HOME_NOTICIAS_QUERY = defineQuery(`
  *[_type == "noticia"] | order(dataPublicacao desc)[0...3] {
    _id,
    _type,
    titulo,
    "slug": slug.current,
    resumo,
    dataPublicacao,
    "dataCard": coalesce(dataEvento, dataInicio, dataPublicacao),
    categoriaNoticia,
    "imagemCapa": imagemCapa{ "url": asset->url, alt }
  }
`)

// ── 3. Agenda e Eventos ─────────────────────────────────────────────────────
// Mistura todos os tipos de evento (exceto documento e noticia).
// O campo de data varia por tipo — o frontend lida com a polimorfismo.
export const HOME_AGENDA_QUERY = defineQuery(`
  *[
    _type in [
      "rodaAniversariantes",
      "rodaConsciencia",
      "mostraCultural",
      "eventoExterno",
      "encontroConscienciaNegra"
    ] && (!defined($heroId) || _id != $heroId)
  ] | order(
    select(
      _type == "encontroConscienciaNegra" => dataInicio,
      dataEvento
    ) desc
  )[0...4] {
    _id,
    _type,
    titulo,
    "slug": slug.current,
    resumo,
    local,
    // Datas por tipo
    dataEvento,
    dataInicio,
    dataFim,
    "dataCard": coalesce(dataEvento, dataInicio, dataPublicacao),
    // Imagens
    "imagemCapa": imagemCapa{ "url": asset->url, alt },
    "galeria": galeria[0...3]{ "url": asset->url, alt },
    // Campos específicos de cada tipo
    aniversariantes,
    mesReferencia,
    anoReferencia,
    mestreConvidado,
    "fotoMestre": fotoMestre{ "url": asset->url, alt },
    origemMestre,
    temaRoda,
    abertoAoPublico,
    edicao,
    edicaoRomano,
    subtemaPrincipal,
    mestresConvidados,
    escolasParticipantes,
    quantidadeAlunos,
    organizador,
    tipoParticipacao,
    // Mídias externas
    videoUrl,
    driveUrl
  }
`)

// ── 4. Listagem por Tipo ────────────────────────────────────────────────────
// Usado pela rota /tipo/[tipo]. O parâmetro $tipo é o _type do Sanity (camelCase).
export const CONTEUDO_POR_TIPO_QUERY = defineQuery(`
  *[_type == $tipo] | order(
    select(
      _type == "encontroConscienciaNegra" => dataInicio,
      _type in ["documento", "noticia"]   => dataPublicacao,
      dataEvento
    ) desc
  ) {
    _id,
    _type,
    titulo,
    "slug": slug.current,
    resumo,
    local,
    // Datas
    dataEvento,
    dataInicio,
    dataFim,
    dataPublicacao,
    dataVigencia,
    "dataCard": coalesce(dataEvento, dataInicio, dataPublicacao),
    // Imagens
    "imagemCapa": imagemCapa{ "url": asset->url, alt },
    "galeria": galeria[0...3]{ "url": asset->url, alt },
    // rodaAniversariantes
    aniversariantes,
    mesReferencia,
    anoReferencia,
    // encontroConscienciaNegra
    edicao,
    edicaoRomano,
    subtemaPrincipal,
    mestresConvidados,
    gruposConvidados,
    parceiros,
    // rodaConsciencia
    mestreConvidado,
    "fotoMestre": fotoMestre{ "url": asset->url, alt },
    origemMestre,
    temaRoda,
    abertoAoPublico,
    // mostraCultural
    escolasParticipantes,
    quantidadeAlunos,
    // oficina
    subtipoOficina,
    oficineiro,
    horarios,
    faixaEtaria,
    vagas,
    inscricoesAbertas,
    // eventoExterno
    organizador,
    tipoParticipacao,
    linkEvento,
    // documento
    subtipoDocumento,
    "arquivo": arquivo.asset->url,
    tamanhoArquivo,
    linkExterno,
    // noticia
    categoriaNoticia,
    // Mídias externas
    videoUrl,
    driveUrl
  }
`)

// ── 5. Detalhe por Slug ─────────────────────────────────────────────────────
// Página interna /conteudo/[slug] — todos os campos expandidos.
export const CONTEUDO_POR_SLUG_QUERY = defineQuery(`
  *[slug.current == $slug][0] {
    ...,
    "slug": slug.current,
    "imagemCapa": imagemCapa{ "url": asset->url, alt },
    "galeria": galeria[]{ "url": asset->url, alt },
    "fotoMestre": fotoMestre{ "url": asset->url, alt },
    "arquivo": arquivo.asset->url
  }
`)

// ── 6. Configurações do Site (Singleton) ────────────────────────────────────
export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    "imagemHeroDesktop": imagemHeroDesktop.asset->url,
    "imagemHeroMobile": imagemHeroMobile.asset->url,
    heroLabel,
    heroTitulo,
    heroSubtitulo,
    sobreTexto,
    sobreCitacao,
    pilares,
    instagram,
    facebook,
    telefone,
    email,
    endereco,
    menuLinks
  }
`)

// ── 7. Oficinas para ProjectsSection ────────────────────────────────────────
// Alias de CONTEUDO_POR_TIPO_QUERY para uso explícito na página Home.
export const OFICINAS_QUERY = defineQuery(`
  *[_type == "oficina"] | order(_createdAt asc) [0...4] {
    _id,
    _type,
    titulo,
    "slug": slug.current,
    resumo,
    subtipoOficina,
    oficineiro,
    horarios,
    faixaEtaria,
    vagas,
    inscricoesAbertas,
    "imagemCapa": imagemCapa{ "url": asset->url, alt },
    videoUrl,
    driveUrl
  }
`)

// ── 8. Documentos para ArchiveSection ────────────────────────────────────────
export const DOCUMENTOS_QUERY = defineQuery(`
  *[_type == "documento"] | order(dataPublicacao desc) [0...4] {
    _id,
    _type,
    titulo,
    "slug": slug.current,
    resumo,
    subtipoDocumento,
    dataPublicacao,
    dataVigencia,
    "dataCard": coalesce(dataEvento, dataInicio, dataPublicacao),
    tamanhoArquivo,
    "arquivo": arquivo.asset->url,
    linkExterno
  }
`)
