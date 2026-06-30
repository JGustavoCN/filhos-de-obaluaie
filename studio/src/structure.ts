import type { StructureResolver } from 'sanity/structure'

const SINGLETONS = ['siteSettings']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      // 1. Singletons
      S.listItem()
        .title('Configurações do Site')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Configurações Globais')
        ),
      
      S.divider(),

      // 2. Outros Documentos
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETONS.includes(listItem.getId() as string)
      )
    ])
