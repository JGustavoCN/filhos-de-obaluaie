import type { StructureResolver } from 'sanity/structure'
import { CalendarIcon, UsersIcon, ControlsIcon, EarthGlobeIcon, HomeIcon } from '@sanity/icons'

// Deixamos preparado para futuros singletons
const SINGLETONS = ['siteSettings', 'homePage']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Painel de Controle')
    .items([
      // 0. Home Page
      S.listItem()
        .title('Página Inicial (Home)')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Configurações da Home')
        ),
      S.divider(),

      // 1. Configurações Globais (Singleton)
      S.listItem()
        .title('Configurações Globais')
        .icon(ControlsIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Configurações de Rodapé e SEO')
        ),
      S.divider(),

      // 2. Projetos e Aulas
      S.listItem()
        .title('Projetos e Aulas')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('Projetos e Aulas')
            .items([
              S.documentTypeListItem('oficina').title('Oficinas e Turmas'),
            ])
        ),

      S.divider(),

      // 3. Agenda e Eventos
      S.listItem()
        .title('Agenda e Eventos Especiais')
        .icon(CalendarIcon)
        .child(
          S.list()
            .title('Eventos')
            .items([
              S.documentTypeListItem('rodaConsciencia').title('Rodas da Consciência'),
              S.documentTypeListItem('rodaAniversariantes').title('Rodas de Aniversariantes'),
              S.documentTypeListItem('encontroConscienciaNegra').title('Encontro da Consciência Negra'),
              S.documentTypeListItem('mostraCultural').title('Mostras Culturais'),
              S.documentTypeListItem('eventoExterno').title('Eventos Externos'),
            ])
        ),

      S.divider(),

      // 4. Institucional e Comunicação
      S.listItem()
        .title('Comunicação e Transparência')
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .title('Comunicação')
            .items([
              S.documentTypeListItem('noticia').title('Notícias e Mural'),
              S.documentTypeListItem('documento').title('Acervo Documental'),
            ])
        ),
    ])
