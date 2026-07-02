import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'
import { baseFields } from '../shared/baseFields'

/**
 * PARTICIPAÇÃO EM EVENTOS EXTERNOS
 * ─────────────────────────────────────────────────────────────
 * Registro das participações do Centro Cultural em eventos
 * promovidos por terceiros: Sarau "Tobias, sou Eu!", Semana Cultural
 * de Tobias Barreto, Semana da Criança, Encontro da Mensagem de Silo, etc.
 *
 * Ref. planejamento-cards-tipados.md §2.6
 * Card Variant: "evento-externo" — layout horizontal, ícone de localização.
 * Inspiração: Fundação Palmares (difusão/representação institucional).
 */
export const eventoExterno = defineType({
  name: 'eventoExterno',
  title: 'Participação em Eventos Externos',
  type: 'document',
  icon: LinkIcon,
  fields: [
    ...baseFields,

    // ── Organizador ──────────────────────────────────────────────
    defineField({
      name: 'organizador',
      title: 'Organizador / Promotor do Evento',
      type: 'string',
      description:
        'Quem promoveu o evento. Ex: "Coletivo Cultural Tobias, sou Eu!" ou "Prefeitura Municipal de Tobias Barreto".',
      validation: (Rule) => Rule.required(),
    }),

    // ── Tipo de Participação ─────────────────────────────────────
    defineField({
      name: 'tipoParticipacao',
      title: 'Tipo de Participação',
      type: 'string',
      description: 'Como o Centro Cultural participou?',
      options: {
        list: [
          { title: 'Apresentação Cultural', value: 'apresentacao' },
          { title: 'Palestra / Mesa Redonda', value: 'palestra' },
          { title: 'Exposição', value: 'exposicao' },
          { title: 'Parceria / Apoio', value: 'parceria' },
          { title: 'Oficina', value: 'oficina-externa' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Data e Local ────────────────────────────────────────────
    defineField({
      name: 'dataEvento',
      title: 'Data e Hora do Evento',
      type: 'datetime',
      description: 'Data e horário em que ocorreu ou ocorrerá a participação.',
      options: { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm', timeStep: 15 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'local',
      title: 'Local do Evento',
      type: 'string',
      description: 'Ex: "Praça Governador Valadares, Centro, Tobias Barreto – SE".',
      validation: (Rule) => Rule.required(),
    }),

    // ── Links externos ─────────────────────────────────────────
    defineField({
      name: 'linkEvento',
      title: 'Link Externo do Evento',
      type: 'url',
      description:
        'URL com mais informações sobre o evento (site oficial, Facebook, Instagram, etc.).',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Vídeo da Participação (YouTube)',
      type: 'url',
      description: 'Link do YouTube com registro audiovisual da participação.',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'driveUrl',
      title: 'Álbum de Fotos (Google Drive)',
      type: 'url',
      description: 'Link compartilhado do Google Drive com as fotos do evento externo.',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],

  preview: {
    select: {
      titulo: 'titulo',
      organizador: 'organizador',
      tipo: 'tipoParticipacao',
      media: 'imagemCapa',
    },
    prepare({ titulo, organizador, tipo, media }) {
      const tipoLabel: Record<string, string> = {
        apresentacao: 'Apresentação',
        palestra: 'Palestra',
        exposicao: 'Exposição',
        parceria: 'Parceria',
        'oficina-externa': 'Oficina Externa',
      }
      return {
        title: titulo || 'Evento Externo',
        subtitle: [tipoLabel[tipo] || tipo, organizador].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
