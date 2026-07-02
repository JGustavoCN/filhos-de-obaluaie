import { defineType, defineField } from 'sanity'
import { EditIcon } from '@sanity/icons'
import { baseFields } from '../shared/baseFields'

/**
 * NOTÍCIAS E COMUNICADOS
 * ─────────────────────────────────────────────────────────────
 * Feed informativo do Centro Cultural: comunicados de inscrição,
 * convites, registros de eventos realizados e novidades gerais.
 * Estrutura limpa e funcional — o "feed" do centro.
 *
 * Ref. planejamento-cards-tipados.md §2.8
 * Card Variant: "noticia" — imagem 4:3 no topo, badge de categoria.
 */
export const noticia = defineType({
  name: 'noticia',
  title: 'Notícias e Comunicados',
  type: 'document',
  icon: EditIcon,
  fields: [
    ...baseFields,

    // ── Classificação ────────────────────────────────────────────
    defineField({
      name: 'categoriaNoticia',
      title: 'Categoria',
      type: 'string',
      description: 'Determina o badge exibido no card.',
      options: {
        list: [
          { title: 'Comunicado', value: 'comunicado' },
          { title: 'Convite', value: 'convite' },
          { title: 'Registro / Cobertura', value: 'registro' },
          { title: 'Novidade', value: 'novidade' },
          { title: 'Edital / Inscrições', value: 'edital-inscricao' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Data ────────────────────────────────────────────────────
    defineField({
      name: 'dataPublicacao',
      title: 'Data de Publicação',
      type: 'datetime',
      description: 'Quando esta notícia ou comunicado deve ser exibido (data de publicação).',
      options: { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm', timeStep: 30 },
      validation: (Rule) => Rule.required(),
    }),

    // ── Imagem obrigatória para feed visual ──────────────────────
    // (imagemCapa já está nos baseFields com hotspot — é obrigatória aqui na validação)
    // Validada via UI design: o componente de card usa imagem como bloco principal.

    // ── Links e Mídias ─────────────────────────────────────────
    defineField({
      name: 'linkExterno',
      title: 'Link Externo (opcional)',
      type: 'url',
      description: 'Se esta notícia tem uma fonte externa, coloque o link aqui.',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],

  preview: {
    select: {
      titulo: 'titulo',
      categoria: 'categoriaNoticia',
      data: 'dataPublicacao',
      media: 'imagemCapa',
    },
    prepare({ titulo, categoria, data, media }) {
      const categoriaLabel: Record<string, string> = {
        comunicado: 'Comunicado',
        convite: 'Convite',
        registro: 'Registro',
        novidade: 'Novidade',
        'edital-inscricao': 'Edital/Inscrições',
      }
      const dataFormatada = data
        ? new Date(data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
        : ''
      return {
        title: titulo || 'Notícia',
        subtitle: [categoriaLabel[categoria] || categoria, dataFormatada].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
