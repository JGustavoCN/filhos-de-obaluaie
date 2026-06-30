import { defineType, defineField, defineArrayMember } from 'sanity'
import { baseFields } from '../shared/baseFields'

export const mostraEscolarType = defineType({
  name: 'mostraEscolar',
  title: 'Mostra Cultural Escolar',
  type: 'document',
  fields: [
    ...baseFields,
    defineField({
      name: 'escolasParticipantes',
      title: 'Escolas Participantes',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Adicione o nome de cada escola participante.',
    }),
  ],
})
