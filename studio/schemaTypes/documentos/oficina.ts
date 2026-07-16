import { defineType, defineField } from 'sanity'
import { BookIcon } from '@sanity/icons'
import { baseFields, mediaExternaFields } from '../shared/baseFields'

/**
 * AULAS E OFICINAS PERMANENTES
 * ─────────────────────────────────────────────────────────────
 * Atividades formativas semanais do Centro Cultural:
 * — Capoeira Contemporânea
 * — Musicalidade e Percussão (berimbau, atabaque, pandeiro…)
 * — Expressões Cênicas (dança afro, maculelê, samba de coco…)
 *
 * Ref. planejamento-cards-tipados.md §2.5
 * Card Variant: "oficina" — frame 9-slice, ícone por modalidade.
 * Inspiração: Instituto Brincante (Cursos/Oficinas — Foco em Formação).
 */
export const oficina = defineType({
  name: 'oficina',
  title: 'Aulas e Oficinas',
  type: 'document',
  icon: BookIcon,
  fields: [
    ...baseFields,

    // ── Configurações da Home ──────────────────────────────────
    defineField({
      name: 'ordemExibicao',
      title: 'Ordem de Exibição na Home',
      type: 'number',
      description: 'Menor número aparece primeiro. Use para posicionar oficinas (ex: 1 para Capoeira).',
      initialValue: 999,
    }),

    // ── Modalidade ───────────────────────────────────────────────
    defineField({
      name: 'subtipoOficina',
      title: 'Modalidade',
      type: 'string',
      description:
        'Determina o frame visual do card: Capoeira (primary), Percussão (secondary), Dança/Teatro (primary).',
      options: {
        list: [
          { title: 'Capoeira Contemporânea', value: 'capoeira' },
          { title: 'Musicalidade e Percussão', value: 'percussao' },
          { title: 'Expressões Cênicas (Dança e Teatro)', value: 'danca-teatro' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Responsável ──────────────────────────────────────────────
    defineField({
      name: 'oficineiro',
      title: 'Oficineiro Responsável',
      type: 'string',
      description:
        'Nome do facilitador. Ex: "Josafá Alves dos Santos (Mestre Bahia)" ou "Rafael Araújo Santos".',
      validation: (Rule) => Rule.required(),
    }),

    // ── Logística ────────────────────────────────────────────────
    defineField({
      name: 'horarios',
      title: 'Horários das Aulas',
      type: 'string',
      description:
        'Dias da semana e horários. Ex: "Terças e Quintas, 14h às 16h" ou "Segundas, Quartas e Sextas, 08h às 10h".',
    }),
    defineField({
      name: 'faixaEtaria',
      title: 'Faixa Etária / Público',
      type: 'string',
      description: 'Ex: "Crianças de 6 a 14 anos" ou "Jovens e adultos a partir de 15 anos".',
    }),
    defineField({
      name: 'vagas',
      title: 'Número de Vagas',
      type: 'number',
      description: 'Capacidade máxima da turma.',
      validation: (Rule) => Rule.min(1).integer(),
    }),
    defineField({
      name: 'inscricoesAbertas',
      title: 'Inscrições Abertas?',
      type: 'boolean',
      description: 'Se ativado, exibe "Inscrições Abertas" no card.',
      initialValue: false,
    }),

    // ── Mídias Externas ─────────────────────────────────────────
    ...mediaExternaFields,
  ],

  preview: {
    select: {
      titulo: 'titulo',
      subtipo: 'subtipoOficina',
      oficineiro: 'oficineiro',
      media: 'imagemCapa',
    },
    prepare({ titulo, subtipo, oficineiro, media }) {
      const subtipoLabel: Record<string, string> = {
        capoeira: 'Capoeira',
        percussao: 'Percussão',
        'danca-teatro': 'Dança/Teatro',
      }
      return {
        title: titulo || 'Oficina',
        subtitle: [subtipoLabel[subtipo] || subtipo, oficineiro].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
