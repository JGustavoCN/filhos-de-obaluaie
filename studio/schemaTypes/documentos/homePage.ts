  import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const homePage = defineType({
  name: 'homePage',
  title: 'Página Inicial (Home)',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero Institucional' },
    { name: 'institucional', title: 'A Força do Centro' },
    { name: 'cta', title: 'CTA Final' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ── Hero ──
    defineField({
      name: 'heroTitulo',
      title: 'Título do Hero',
      type: 'string',
      group: 'hero',
      description: 'Usado quando não há evento em destaque',
    }),
    defineField({
      name: 'heroSubtitulo',
      title: 'Subtítulo do Hero',
      type: 'text',
      group: 'hero',
    }),
    defineField({
      name: 'imagemHeroDesktop',
      title: 'Imagem Hero (Desktop)',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imagemHeroMobile',
      title: 'Imagem Hero (Mobile)',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
    }),

    // ── Institucional ──
    defineField({
      name: 'institucionalTitulo',
      title: 'Título Institucional',
      type: 'string',
      group: 'institucional',
      initialValue: 'A Força do Centro',
    }),
    defineField({
      name: 'institucionalTexto',
      title: 'Texto Institucional',
      type: 'text',
      group: 'institucional',
    }),
    defineField({
      name: 'institucionalImagem',
      title: 'Imagem Institucional',
      type: 'image',
      group: 'institucional',
      options: { hotspot: true },
    }),
    defineField({
      name: 'estatisticas',
      title: 'Estatísticas',
      type: 'array',
      group: 'institucional',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'valor', title: 'Valor (ex: 20+)', type: 'string' },
            { name: 'rotulo', title: 'Rótulo (ex: anos de atuação)', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'citacaoTexto',
      title: 'Texto da Citação',
      type: 'text',
      group: 'institucional',
      description: 'Texto de destaque (quote) que aparece na lateral.',
    }),
    defineField({
      name: 'citacaoAutor',
      title: 'Autor da Citação',
      type: 'string',
      group: 'institucional',
      description: 'Nome do autor. Ex: Mestre Bahia.',
    }),

    // ── CTA ──
    defineField({
      name: 'ctaTitulo',
      title: 'Título do CTA',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaTexto',
      title: 'Texto do CTA',
      type: 'text',
      group: 'cta',
    }),
    defineField({
      name: 'ctaBotaoTexto',
      title: 'Texto do Botão CTA',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaBotaoLink',
      title: 'Link do Botão CTA',
      type: 'string',
      group: 'cta',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Configurações da Home',
      }
    },
  },
})
