import { defineType, defineField } from 'sanity'
import { baseFields } from '../shared/baseFields'

export const rodaConscienciaType = defineType({
  name: 'rodaConsciencia',
  title: 'Roda da Consciência',
  type: 'document',
  fields: [
    ...baseFields,
    defineField({
      name: 'mestreConvidado',
      title: 'Mestre Convidado',
      type: 'string',
      description: 'Nome do Mestre Convidado para a Roda.',
    }),
  ],
})
