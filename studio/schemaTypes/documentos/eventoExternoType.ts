import { defineType } from 'sanity'
import { baseFields } from '../shared/baseFields'

export const eventoExternoType = defineType({
  name: 'eventoExterno',
  title: 'Participação em Eventos Externos',
  type: 'document',
  fields: [
    ...baseFields,
  ],
})
