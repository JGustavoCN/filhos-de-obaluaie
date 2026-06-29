import { defineType, defineField, defineArrayMember } from 'sanity'
import { baseFields } from '../shared/baseFields'

export const aniversarioType = defineType({
  name: 'aniversario',
  title: 'Roda de Aniversariantes',
  type: 'document',
  fields: [
    ...baseFields,
    defineField({
      name: 'aniversariantes',
      title: 'Aniversariantes do Mês',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Adicione os nomes dos homenageados da roda.',
    }),
  ],
})
