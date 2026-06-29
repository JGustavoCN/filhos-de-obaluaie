import { defineQuery } from 'next-sanity';

// 1. Query para o Destaque Principal (Pega a última grande publicação de evento/mostra/consciencia-negra)
export const HOME_HERO_QUERY = defineQuery(`
  *[_type in ["conscienciaNegra", "mostraEscolar", "eventoExterno"]] | order(dataEvento desc)[0] {
    _id, 
    _type, 
    titulo, 
    "slug": slug.current, 
    resumo, 
    dataEvento, 
    "imagemCapa": imagemCapa.asset->url,
    "galeria": galeria[0...3].asset->url,
    local,
    mestreConvidado
  }
`);

// 2. Query para os cards de Notícias recentes (Limite 3)
export const HOME_NOTICIAS_QUERY = defineQuery(`
  *[_type == "noticia"] | order(_createdAt desc)[0...3] {
    _id, _type, titulo, "slug": slug.current, resumo, dataEvento, "imagemCapa": imagemCapa.asset->url
  }
`);

// 3. Query para os cards de Agenda (Limite 4 no Grid)
export const HOME_AGENDA_QUERY = defineQuery(`
  *[_type in ["aniversario", "rodaConsciencia", "mostraEscolar", "eventoExterno", "conscienciaNegra"] && (!defined($heroId) || _id != $heroId)] | order(dataEvento desc)[0...4] {
    _id, 
    _type, 
    titulo, 
    "slug": slug.current, 
    resumo, 
    dataEvento, 
    "imagemCapa": imagemCapa.asset->url,
    "galeria": galeria[0...3].asset->url,
    aniversariantes, 
    mestreConvidado,
    local,
    escolasParticipantes
  }
`);

// 2. Query para a Listagem de Categorias (ex: /tipo/oficina): Traz com paginação e suporte às fotos da Mostra Escolar
export const CONTEUDO_POR_TIPO_QUERY = defineQuery(`
  *[_type == $tipo] | order(dataEvento desc) {
    _id,
    _type,
    titulo,
    "slug": slug.current,
    resumo,
    dataEvento,
    local,
    "imagemCapa": imagemCapa.asset->url,
    "galeria": galeria[0...3].asset->url, // Busca as 3 primeiras fotos para o Card da Mostra Escolar
    aniversariantes, 
    edicao, 
    mestreConvidado, 
    escolasParticipantes, 
    oficineiro, 
    subtipoOficina, 
    faixaEtaria, 
    categoriaNoticia, 
    subtipoDocumento, 
    tamanhoArquivo
  }
`);

// 3. Query para Detalhe Individual (ex: /conteudo/sarau-tobias): Traz absolutamente todos os campos expandidos
export const CONTEUDO_POR_SLUG_QUERY = defineQuery(`
  *[slug.current == $slug][0] {
    ...,
    "slug": slug.current,
    "imagemCapa": imagemCapa.asset->url,
    "galeria": galeria[].asset->url,
    "arquivo": arquivo.asset->url
  }
`);

// 4. Query para Configurações do Site (Singleton)
export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
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
`);
