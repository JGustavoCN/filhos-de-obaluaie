import { defineType, defineField, defineArrayMember } from 'sanity'
import { StarIcon } from '@sanity/icons'
import { baseFields, mediaExternaFields } from '../shared/baseFields'

/**
 * RODA DE ANIVERSARIANTES
 * ─────────────────────────────────────────────────────────────
 * Evento mensal realizado na última aula da semana.
 * Inclui roda de capoeira, brincadeiras, apresentações cênicas,
 * presença das famílias e oferta de bolo e quitutes.
 *
 * Ref. planejamento-cards-tipados.md §2.1
 * Card Variant: "aniversario" — cor dourada, borda pontilhada, avatar circular.
 */
export const rodaAniversariantes = defineType({
  name: 'rodaAniversariantes',
  title: 'Roda de Aniversariantes',
  type: 'document',
  icon: StarIcon,
  fields: [
    ...baseFields,

    // ── Identificação do Mês ────────────────────────────────────
    defineField({
      name: 'mesReferencia',
      title: 'Mês de Referência',
      type: 'string',
      description: 'Mês da Roda de Aniversariantes.',
      options: {
        list: [
          { title: 'Janeiro', value: 'janeiro' },
          { title: 'Fevereiro', value: 'fevereiro' },
          { title: 'Março', value: 'marco' },
          { title: 'Abril', value: 'abril' },
          { title: 'Maio', value: 'maio' },
          { title: 'Junho', value: 'junho' },
          { title: 'Julho', value: 'julho' },
          { title: 'Agosto', value: 'agosto' },
          { title: 'Setembro', value: 'setembro' },
          { title: 'Outubro', value: 'outubro' },
          { title: 'Novembro', value: 'novembro' },
          { title: 'Dezembro', value: 'dezembro' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'anoReferencia',
      title: 'Ano de Referência',
      type: 'number',
      description: 'Ano da roda (ex: 2026).',
      validation: (Rule) =>
        Rule.required()
          .min(2005)
          .max(new Date().getFullYear() + 1),
    }),

    // ── Data e Local ────────────────────────────────────────────
    defineField({
      name: 'dataEvento',
      title: 'Data e Hora da Roda',
      type: 'datetime',
      description: 'Data e horário de início da Roda de Aniversariantes.',
      options: { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm', timeStep: 15 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'local',
      title: 'Local',
      type: 'string',
      description: 'Onde a roda acontecerá. Ex: Centro Cultural Filhos de Obaluaiê — Salão Principal.',
      initialValue: 'Centro Cultural Filhos de Obaluaiê, Bairro Santa Rita, Tobias Barreto – SE',
    }),

    // ── Lista de Homenageados ────────────────────────────────────
    defineField({
      name: 'aniversariantes',
      title: 'Aniversariantes do Mês',
      type: 'array',
      description:
        'Adicione o nome de cada homenageado do mês. Eles aparecem listados no card com scroll.',
      of: [defineArrayMember({ type: 'string' })],
      validation: (Rule) =>
        Rule.min(1).warning('Adicione ao menos um aniversariante para o card ter sentido.'),
    }),

    // ── Mídias Externas ─────────────────────────────────────────
    ...mediaExternaFields,
  ],

  preview: {
    select: {
      title: 'titulo',
      mes: 'mesReferencia',
      ano: 'anoReferencia',
      media: 'imagemCapa',
    },
    prepare({ title, mes, ano, media }) {
      const subtitleParts = [mes, ano].filter(Boolean)
      return {
        title: title || 'Roda de Aniversariantes',
        subtitle: subtitleParts.length ? subtitleParts.join(' / ') : 'Sem data definida',
        media,
      }
    },
  },
})
