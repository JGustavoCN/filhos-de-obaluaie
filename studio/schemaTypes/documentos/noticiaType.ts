import { defineType, defineField } from 'sanity'
import { baseFields } from '../shared/baseFields'

export const noticiaType = defineType({
  name: 'noticia',
  title: 'Notícias e Comunicados',
  type: 'document',
  fields: [
    ...baseFields,
    defineField({
      name: 'categoriaNoticia',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Comunicado', value: 'comunicado' },
          { title: 'Convite', value: 'convite' },
          { title: 'Registro', value: 'registro' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
