import { defineType, defineField } from 'sanity'
import { baseFields } from '../shared/baseFields'

export const documentoType = defineType({
  name: 'documento',
  title: 'Documentos e Editais',
  type: 'document',
  fields: [
    ...baseFields,
    defineField({
      name: 'subtipoDocumento',
      title: 'Tipo de Documento',
      type: 'string',
      options: {
        list: [
          { title: 'Edital', value: 'edital' },
          { title: 'Relatório', value: 'relatorio' },
          { title: 'Estatuto', value: 'estatuto' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'arquivo',
      title: 'Arquivo para Download (PDF, DOC)',
      type: 'file',
    }),
    defineField({
      name: 'tamanhoArquivo',
      title: 'Tamanho (Opcional - Ex: 2.4 MB)',
      type: 'string',
    }),
  ],
})
