import { defineType, defineField, defineArrayMember } from 'sanity'
import { ImagesIcon } from '@sanity/icons'
import { baseFields, mediaExternaFields } from '../shared/baseFields'

/**
 * MOSTRA CULTURAL PARA ESCOLAS
 * ─────────────────────────────────────────────────────────────
 * Culminância anual que reúne turmas do Centro Cultural e das
 * escolas municipais parceiras (Iraildes, Telma, Nicodemos Falcão,
 * Santa Terezinha) em apresentações integradas.
 *
 * Ref. planejamento-cards-tipados.md §2.4
 * Card Variant: "mostra-escolar" — mosaico de 3 fotos, pills de escolas.
 * Inspiração: Instituto Brincante (Mostras/Encontros — Foco em Espetáculo).
 */
export const mostraCultural = defineType({
  name: 'mostraCultural',
  title: 'Mostra Cultural para Escolas',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    ...baseFields,

    // ── Configurações da Home ──────────────────────────────────
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

    // ── Data e Local ────────────────────────────────────────────
    defineField({
      name: 'dataEvento',
      title: 'Data e Hora da Mostra',
      type: 'datetime',
      description: 'Data da apresentação. Costuma ser realizada no final do ano letivo.',
      options: { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm', timeStep: 15 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'local',
      title: 'Local da Mostra',
      type: 'string',
      description: 'Ex: Ginásio da Escola Municipal Iraildes ou Centro Cultural Filhos de Obaluaiê.',
      validation: (Rule) => Rule.required(),
    }),

    // ── Participantes ────────────────────────────────────────────
    defineField({
      name: 'escolasParticipantes',
      title: 'Escolas Participantes',
      type: 'array',
      description:
        'Nome das escolas presentes. Ex: "E.M. Professora Iraildes", "E.M. Telma".',
      of: [defineArrayMember({ type: 'string' })],
      validation: (Rule) =>
        Rule.min(1).warning('Adicione ao menos uma escola participante.'),
    }),
    defineField({
      name: 'quantidadeAlunos',
      title: 'Quantidade de Alunos Participantes',
      type: 'number',
      description: 'Total de alunos que se apresentam na mostra.',
      validation: (Rule) => Rule.min(1).integer(),
    }),

    // ── Mídias Externas ─────────────────────────────────────────
    ...mediaExternaFields,
  ],

  preview: {
    select: {
      titulo: 'titulo',
      escolas: 'escolasParticipantes',
      alunos: 'quantidadeAlunos',
      media: 'imagemCapa',
    },
    prepare({ titulo, escolas, alunos, media }) {
      const escolasLabel = Array.isArray(escolas) && escolas.length > 0
        ? `${escolas.length} escola(s) participante(s)`
        : ''
      const alunosLabel = alunos ? `${alunos} alunos` : ''
      const subtitleParts = [escolasLabel, alunosLabel].filter(Boolean)
      return {
        title: titulo || 'Mostra Cultural',
        subtitle: subtitleParts.join(' · ') || 'Sem escolas cadastradas',
        media,
      }
    },
  },
})
