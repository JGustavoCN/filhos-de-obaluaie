import { defineType, defineField } from 'sanity'
import { baseFields } from '../shared/baseFields'

export const conscienciaNegraType = defineType({
  name: 'conscienciaNegra',
  title: 'Encontro da Consciência Negra',
  type: 'document',
  fields: [
    ...baseFields,
    defineField({
      name: 'edicao',
      title: 'Número da Edição',
      type: 'number',
      description: 'Ex: 17 (Renderiza como 17ª Edição).',
      validation: (Rule) => Rule.min(1),
    }),
  ],
})
