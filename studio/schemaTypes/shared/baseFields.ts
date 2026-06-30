import { defineField, defineArrayMember } from 'sanity'

export const baseFields = [
  defineField({
    name: 'titulo',
    title: 'Título',
    type: 'string',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: {
      source: 'titulo',
      maxLength: 96,
    },
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'resumo',
    title: 'Resumo / Linha de Apoio',
    type: 'text',
    rows: 3,
    description: 'Texto curto para exibir nos Cards (Vitrine). Máximo de 200 caracteres.',
    validation: (Rule) => Rule.max(200),
  }),
  defineField({
    name: 'dataEvento',
    title: 'Data do Evento',
    type: 'string',
    description: 'Data de forma amigável (ex: 20/11/2026, Segundas e Quartas).',
  }),
  defineField({
    name: 'local',
    title: 'Local',
    type: 'string',
  }),
  defineField({
    name: 'imagemCapa',
    title: 'Imagem de Capa',
    type: 'image',
    options: {
      hotspot: true,
    },
  }),
  defineField({
    name: 'galeria',
    title: 'Galeria de Imagens',
    type: 'array',
    of: [
      defineArrayMember({
        type: 'image',
        options: {
          hotspot: true,
        },
      })
    ],
    description: 'Carrossel de fotos (opcional). Na Mostra Escolar, usa as 3 primeiras.',
  }),
  defineField({
    name: 'body',
    title: 'Conteúdo Detalhado',
    type: 'array',
    of: [
      defineArrayMember({ type: 'block' }),
      defineArrayMember({ type: 'image', options: { hotspot: true } })
    ],
    description: 'Este texto longo só será exibido na página detalhada interna.',
  }),
]
