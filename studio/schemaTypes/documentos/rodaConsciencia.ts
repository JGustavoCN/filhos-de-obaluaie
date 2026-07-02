import { defineType, defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons'
import { baseFields, mediaExternaFields } from '../shared/baseFields'

/**
 * RODA DA CONSCIÊNCIA
 * ─────────────────────────────────────────────────────────────
 * Oficinas/intercâmbio com mestres de capoeira convidados.
 * Abertas ao público durante o mês da Consciência Negra.
 * O mestre convidado é o protagonista visual e narrativo.
 *
 * Ref. planejamento-cards-tipados.md §2.3
 * Card Variant: "roda-consciencia" — avatar grande do mestre, borda lateral.
 * Inspiração: Portais de grupos de capoeira (Senzala / Cordão de Ouro).
 */
export const rodaConsciencia = defineType({
  name: 'rodaConsciencia',
  title: 'Roda da Consciência',
  type: 'document',
  icon: UsersIcon,
  fields: [
    ...baseFields,

    // ── Mestre Convidado ────────────────────────────────────────
    defineField({
      name: 'mestreConvidado',
      title: 'Nome do Mestre Convidado',
      type: 'string',
      description:
        'Nome completo e apelido do mestre. Ex: "Mestre Zezinho — José Alípio Pureza (SP)".',
    }),
    defineField({
      name: 'fotoMestre',
      title: 'Foto do Mestre (Avatar)',
      type: 'image',
      description:
        'Foto do mestre convidado. Será exibida como avatar arredondado à esquerda do card.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto Alternativo',
          type: 'string',
          description: 'Ex: "Mestre Zezinho em posição de ginga"',
        }),
      ],
    }),
    defineField({
      name: 'origemMestre',
      title: 'Origem do Mestre (Cidade / Grupo)',
      type: 'string',
      description: 'Ex: "Guaianazes, São Paulo – SP / Grupo Berimbau de Ouro".',
    }),
    defineField({
      name: 'temaRoda',
      title: 'Tema da Roda',
      type: 'string',
      description:
        'Assunto central da roda. Ex: "A ancestralidade no jogo de Angola" ou "Capoeira e memória quilombola".',
    }),

    // ── Data e Local ────────────────────────────────────────────
    defineField({
      name: 'dataEvento',
      title: 'Data e Hora da Roda',
      type: 'datetime',
      description: 'Data e horário de início. Rodas da Consciência ocorrem em novembro.',
      options: { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm', timeStep: 15 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'local',
      title: 'Local',
      type: 'string',
      description: 'Onde ocorrerá a Roda da Consciência.',
      initialValue: 'Centro Cultural Filhos de Obaluaiê, Tobias Barreto – SE',
    }),
    defineField({
      name: 'abertoAoPublico',
      title: 'Aberto ao Público?',
      type: 'boolean',
      description:
        'Se marcado, exibe a tag "Entrada livre" no card. Rodas da Consciência são abertas.',
      initialValue: true,
    }),

    // ── Mídias Externas ─────────────────────────────────────────
    ...mediaExternaFields,
  ],

  preview: {
    select: {
      titulo: 'titulo',
      mestre: 'mestreConvidado',
      tema: 'temaRoda',
      media: 'fotoMestre',
      mediaFallback: 'imagemCapa',
    },
    prepare({ titulo, mestre, tema, media, mediaFallback }) {
      return {
        title: titulo || 'Roda da Consciência',
        subtitle: mestre ? `Mestre: ${mestre}${tema ? ` — ${tema}` : ''}` : tema || '',
        media: media || mediaFallback,
      }
    },
  },
})
