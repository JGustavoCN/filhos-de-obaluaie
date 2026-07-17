import { defineQuery } from "next-sanity";

// ── Super Query Unificada da Home Page ──────────────────────────────────────
export const HOME_PAGE_QUERY = defineQuery(`
  {
    "institucional": *[_type == "homePage"][0] {
      heroTitulo, heroSubtitulo, tituloSessaoDestaque,
      "imagemHeroDesktop": imagemHeroDesktop.asset->url,
      "imagemHeroMobile": imagemHeroMobile.asset->url,
      institucionalTitulo, institucionalTexto,
      "institucionalImagem": institucionalImagem.asset->url,
      citacaoTexto, citacaoAutor, estatisticas, ctaTitulo, ctaTexto, ctaBotaoTexto, ctaBotaoLink,
      "heroEvento": eventoDestaque->{
        _id, _type, titulo, "slug": slug.current, resumo, local,
        dataEvento, dataInicio, dataPublicacao, "dataCard": coalesce(dataEvento, dataInicio, dataPublicacao),
        "imagemCapa": imagemCapa{ "url": asset->url, alt },
        edicao, edicaoRomano, subtemaPrincipal, abertoAoPublico
      }
    },
    
    "noticias": *[_type == "noticia"] | order(prioridadeHome desc, dataPublicacao desc)[0...3] {
      _id, _type, titulo, "slug": slug.current, resumo, dataPublicacao, categoriaNoticia, "imagemCapa": imagemCapa{ "url": asset->url, alt }
    },
    
    "oficinas": *[_type == "oficina"] | order(ordemExibicao asc)[0...4] {
      _id, _type, titulo, "slug": slug.current, resumo, subtipoOficina, oficineiro, horarios, faixaEtaria, vagas, inscricoesAbertas, "imagemCapa": imagemCapa{ "url": asset->url, alt }
    },

    "agenda": *[_type in ["encontroConscienciaNegra", "rodaAniversariantes", "rodaConsciencia", "mostraCultural", "eventoExterno"] && coalesce(dataEvento, dataInicio) >= now()] | order(coalesce(dataEvento, dataInicio) asc, prioridadeHome desc)[0...4] {
      _id, _type, titulo, "slug": slug.current, resumo, local,
      dataEvento, dataInicio, "dataCard": coalesce(dataEvento, dataInicio),
      "imagemCapa": imagemCapa{ "url": asset->url, alt },
      mestreConvidado, temaRoda, abertoAoPublico, edicao, edicaoRomano, subtemaPrincipal, quantidadeAlunos, organizador, tipoParticipacao
    },

    "recentUpdates": *[_type in [
      "noticia", "oficina", "rodaAniversariantes", "rodaConsciencia", 
      "mostraCultural", "eventoExterno", "encontroConscienciaNegra", "documento"
    ]] | order(prioridadeHome desc, coalesce(dataEvento, dataInicio, dataPublicacao, _createdAt) desc)[0...4] {
      _id, _type, titulo, "slug": slug.current, resumo, local,
      dataEvento, dataInicio, dataPublicacao, "dataCard": coalesce(dataEvento, dataInicio, dataPublicacao),
      "imagemCapa": imagemCapa{ "url": asset->url, alt },
      aniversariantes, mesReferencia, anoReferencia, mestreConvidado, "fotoMestre": fotoMestre{ "url": asset->url, alt },
      origemMestre, temaRoda, abertoAoPublico, edicao, edicaoRomano, subtemaPrincipal, mestresConvidados, escolasParticipantes,
      quantidadeAlunos, organizador, tipoParticipacao, subtipoOficina, oficineiro, horarios, faixaEtaria, vagas, inscricoesAbertas,
      subtipoDocumento, "arquivo": arquivo.asset->url, tamanhoArquivo, linkExterno, categoriaNoticia, videoUrl, driveUrl
    },

    "documentos": *[_type == "documento"] | order(prioridadeHome desc, dataPublicacao desc)[0...3] {
      _id, _type, titulo, "slug": slug.current, resumo, dataPublicacao, categoriaDocumento, subtipoDocumento, linkExterno, tamanhoArquivo, "arquivo": arquivo.asset->url, "imagemCapa": imagemCapa{ "url": asset->url, alt }
    },
    
    "externos": *[_type == "eventoExterno"] | order(prioridadeHome desc, dataEvento desc)[0...2] {
      _id, _type, titulo, "slug": slug.current, resumo, dataEvento, local, organizador, tipoParticipacao, "imagemCapa": imagemCapa{ "url": asset->url, alt }
    }
  }
`);

export const CONTEUDO_POR_TIPO_QUERY = defineQuery(`
  *[_type == $tipo] | order(coalesce(dataEvento, dataInicio, dataPublicacao, _createdAt) desc) {
      _id, _type, titulo, "slug": slug.current, resumo, local,
      dataEvento, dataInicio, dataPublicacao, "dataCard": coalesce(dataEvento, dataInicio, dataPublicacao),
      "imagemCapa": imagemCapa{ "url": asset->url, alt },
      "galeria": galeria[0...3]{ "url": asset->url, alt },
      aniversariantes, mesReferencia, anoReferencia, mestreConvidado, "fotoMestre": fotoMestre{ "url": asset->url, alt },
      origemMestre, temaRoda, abertoAoPublico, edicao, edicaoRomano, subtemaPrincipal, mestresConvidados, escolasParticipantes, parceiros, gruposConvidados,
      quantidadeAlunos, organizador, tipoParticipacao, subtipoOficina, oficineiro, horarios, faixaEtaria, vagas, inscricoesAbertas,
      subtipoDocumento, "arquivo": arquivo.asset->url, tamanhoArquivo, linkExterno, categoriaNoticia, videoUrl, driveUrl
  }
`);

export const CONTEUDO_POR_SLUG_QUERY = defineQuery(`
  *[_type in ["noticia", "oficina", "rodaAniversariantes", "rodaConsciencia", "mostraCultural", "eventoExterno", "encontroConscienciaNegra", "documento"] && slug.current == $slug][0] {
      _id, _type, titulo, "slug": slug.current, resumo, local,
      dataEvento, dataInicio, dataFim, dataPublicacao, "dataCard": coalesce(dataEvento, dataInicio, dataPublicacao),
      "imagemCapa": imagemCapa{ "url": asset->url, alt },
      body, "galeria": galeria[]{ "url": asset->url, alt },
      aniversariantes, mesReferencia, anoReferencia, mestreConvidado, "fotoMestre": fotoMestre{ "url": asset->url, alt },
      origemMestre, temaRoda, abertoAoPublico, edicao, edicaoRomano, subtemaPrincipal, mestresConvidados, escolasParticipantes, parceiros, gruposConvidados,
      quantidadeAlunos, organizador, tipoParticipacao, subtipoOficina, oficineiro, horarios, faixaEtaria, vagas, inscricoesAbertas,
      subtipoDocumento, "arquivo": arquivo.asset->url, tamanhoArquivo, dataVigencia, linkExterno,
      linkEvento, categoriaNoticia, videoUrl, driveUrl
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    telefone,
    instagram,
    endereco,
    seoDescription,
    "seoImage": seoImage.asset->url
  }
`);

export const SITEMAP_QUERY = defineQuery(`
  *[
    _type in [
      "noticia",
      "documento",
      "rodaAniversariantes",
      "encontroConscienciaNegra",
      "rodaConsciencia",
      "mostraCultural",
      "oficina",
      "eventoExterno"
    ] && defined(slug.current) && slug.current != ""
  ] {
    _type,
    "slug": slug.current,
    "lastModified": select(
      _type == "encontroConscienciaNegra" => coalesce(dataInicio, _updatedAt),
      _type in ["documento", "noticia"] => coalesce(dataPublicacao, _updatedAt),
      _type == "oficina" => _updatedAt,
      coalesce(dataEvento, _updatedAt)
    )
  }
`);
