import { defineType, defineField } from 'sanity'
import { baseFields } from '../shared/baseFields'

export const oficinaType = defineType({
  name: 'oficina',
  title: 'Aulas e Oficinas',
  type: 'document',
  fields: [
    ...baseFields,
    defineField({
      name: 'oficineiro',
      title: 'Oficineiro Responsável',
      type: 'string',
    }),
    defineField({
      name: 'subtipoOficina',
      title: 'Modalidade',
      type: 'string',
      options: {
        list: [
          { title: 'Capoeira', value: 'capoeira' },
          { title: 'Percussão', value: 'percussao' },
          { title: 'Dança / Teatro', value: 'danca-teatro' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'faixaEtaria',
      title: 'Faixa Etária / Público',
      type: 'string',
      description: 'Ex: Crianças de 6 a 12 anos',
    }),
  ],
})
