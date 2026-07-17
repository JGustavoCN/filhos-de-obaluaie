import { defineType, defineField, defineArrayMember } from 'sanity'
import { CalendarIcon } from '@sanity/icons'
import { baseFields, mediaExternaFields } from '../shared/baseFields'

/**
 * ENCONTRO INTERNACIONAL DA CONSCIÊNCIA NEGRA
 * ─────────────────────────────────────────────────────────────
 * Maior evento do Centro Cultural. Em 2024 chegou à sua XVII edição.
 * Realizado anualmente em novembro, mês da Consciência Negra.
 * Reúne mestres, lideranças, grupos de capoeira e comunidade.
 *
 * Ref. planejamento-cards-tipados.md §2.2
 * Card Variant: "consciencia-negra" — hero image 16:9, edição em destaque.
 * Inspiração: Portais de Grupos de Capoeira (Senzala / Cordão de Ouro).
 */
export const encontroConscienciaNegra = defineType({
  name: 'encontroConscienciaNegra',
  title: 'Encontro da Consciência Negra',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    ...baseFields,
    defineField({
      name: 'destaqueNaHome',
      title: 'Destacar na Home',
      type: 'boolean',
      description: 'Se marcado, este evento será exibido no topo da página inicial (Hero).',
      initialValue: false,
    }),
    defineField({
      name: 'prioridadeHome',
      title: 'Prioridade na Agenda da Home',
      type: 'number',
      description: 'Eventos com números maiores aparecem primeiro (0 é o padrão).',
      initialValue: 0,
    }),

    // ── Edição e Identificação ──────────────────────────────────
    defineField({
      name: 'edicao',
      title: 'Número da Edição (Arábico)',
      type: 'number',
      description:
        'Número da edição em algarismo arábico (ex: 17). O frontend renderiza como "XVII Edição".',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .integer()
          .error('O número da edição deve ser um inteiro positivo.'),
    }),
    defineField({
      name: 'edicaoRomano',
      title: 'Edição em Algarismo Romano (opcional)',
      type: 'string',
      description:
        'Preencha se quiser sobrescrever a exibição automática. Ex: "XVII". Deixe em branco para geração automática.',
    }),
    defineField({
      name: 'subtemaPrincipal',
      title: 'Tema / Lema do Encontro',
      type: 'string',
      description:
        'Lema da edição. Ex: "Resistência, Memória e Identidade Negra".',
    }),

    // ── Datas ───────────────────────────────────────────────────
    defineField({
      name: 'dataInicio',
      title: 'Data de Início',
      type: 'datetime',
      description: 'Data e horário de abertura do encontro.',
      options: { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm', timeStep: 30 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dataFim',
      title: 'Data de Encerramento',
      type: 'datetime',
      description: 'Data e horário de encerramento. Deixe em branco se for um dia único.',
      options: { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm', timeStep: 30 },
      validation: (Rule) =>
        Rule.custom((dataFim, context) => {
          const dataInicio = (context.document as { dataInicio?: string })?.dataInicio
          if (dataInicio && dataFim && new Date(dataFim as string) < new Date(dataInicio)) {
            return 'A data de encerramento deve ser posterior à data de início.'
          }
          return true
        }),
    }),
    defineField({
      name: 'local',
      title: 'Local Principal',
      type: 'string',
      description: 'Ex: Centro Cultural Filhos de Obaluaiê, Tobias Barreto – SE.',
      initialValue: 'Centro Cultural Filhos de Obaluaiê, Tobias Barreto – SE',
      validation: (Rule) => Rule.required(),
    }),

    // ── Protagonistas e Parceiros ────────────────────────────────
    defineField({
      name: 'mestresConvidados',
      title: 'Mestres e Lideranças Convidados',
      type: 'array',
      description:
        'Nomes dos mestres de capoeira e lideranças presentes. Ex: "Mestre Zezinho (SP)", "Mestra Janja (BA)".',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'gruposConvidados',
      title: 'Grupos e Coletivos Participantes',
      type: 'array',
      description: 'Nome dos grupos de capoeira e coletivos culturais participantes.',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'parceiros',
      title: 'Organizações Parceiras / Apoiadores',
      type: 'array',
      description:
        'Instituições parceiras (prefeitura, escolas, Federação Sergipana de Capoeira, etc.).',
      of: [defineArrayMember({ type: 'string' })],
    }),

    // ── Mídias Externas ─────────────────────────────────────────
    ...mediaExternaFields,
  ],

  preview: {
    select: {
      titulo: 'titulo',
      edicao: 'edicao',
      edicaoRomano: 'edicaoRomano',
      media: 'imagemCapa',
    },
    prepare({ titulo, edicao, edicaoRomano, media }) {
      const label = edicaoRomano ? `${edicaoRomano} Edição` : edicao ? `${edicao}ª Edição` : ''
      return {
        title: titulo || 'Encontro da Consciência Negra',
        subtitle: label,
        media,
      }
    },
  },
})
