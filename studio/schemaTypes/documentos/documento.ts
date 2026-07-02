import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import { baseFields } from '../shared/baseFields'

/**
 * DOCUMENTOS INSTITUCIONAIS
 * ─────────────────────────────────────────────────────────────
 * Acervo documental do Centro Cultural: editais, relatórios, estatuto,
 * atas e convênios. Trata o documento como patrimônio imaterial —
 * transparência e confiança são a emoção central.
 *
 * Ref. planejamento-cards-tipados.md §2.7
 * Card Variant: "documento" — lista horizontal, badge colorido por subtipo.
 * Inspiração: Fundação Palmares / Acervo IPHAN (patrimônio imaterial).
 */
export const documento = defineType({
  name: 'documento',
  title: 'Documentos Institucionais',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    ...baseFields,

    // ── Classificação ────────────────────────────────────────────
    defineField({
      name: 'subtipoDocumento',
      title: 'Tipo de Documento',
      type: 'string',
      description:
        'Determina a cor do badge no card: Edital (vermelho), Relatório (barro), Estatuto (carvão).',
      options: {
        list: [
          { title: 'Edital', value: 'edital' },
          { title: 'Relatório de Atividades', value: 'relatorio' },
          { title: 'Estatuto Social', value: 'estatuto' },
          { title: 'Ata de Reunião', value: 'ata' },
          { title: 'Convênio / Contrato', value: 'convenio' },
          { title: 'Plano de Trabalho', value: 'plano-trabalho' },
          { title: 'Prestação de Contas', value: 'prestacao-contas' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Datas ───────────────────────────────────────────────────
    defineField({
      name: 'dataPublicacao',
      title: 'Data de Publicação',
      type: 'datetime',
      description: 'Quando o documento foi publicado ou emitido.',
      options: { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm', timeStep: 60 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dataVigencia',
      title: 'Data de Vigência / Prazo',
      type: 'datetime',
      description: 'Data de validade ou prazo de inscrição (para editais). Deixe em branco se não houver prazo.',
      options: { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm', timeStep: 60 },
    }),

    // ── Arquivo e Acesso ─────────────────────────────────────────
    defineField({
      name: 'arquivo',
      title: 'Arquivo para Download (PDF ou DOC)',
      type: 'file',
      description: 'Faça upload do arquivo diretamente. Será disponibilizado para download.',
      options: {
        accept: '.pdf,.doc,.docx',
      },
    }),
    defineField({
      name: 'tamanhoArquivo',
      title: 'Tamanho do Arquivo (Informativo)',
      type: 'string',
      description:
        'Preencha manualmente para exibir no card. Ex: "2.4 MB" ou "840 KB".',
    }),
    defineField({
      name: 'linkExterno',
      title: 'Link Alternativo (Google Drive / Gov.br)',
      type: 'url',
      description:
        'URL do documento em plataforma externa. Usado como fallback ou complemento ao upload.',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],

  preview: {
    select: {
      titulo: 'titulo',
      subtipo: 'subtipoDocumento',
      tamanho: 'tamanhoArquivo',
      media: 'imagemCapa',
    },
    prepare({ titulo, subtipo, tamanho, media }) {
      const subtipoLabel: Record<string, string> = {
        edital: 'Edital',
        relatorio: 'Relatório',
        estatuto: 'Estatuto',
        ata: 'Ata',
        convenio: 'Convênio',
        'plano-trabalho': 'Plano de Trabalho',
        'prestacao-contas': 'Prestação de Contas',
      }
      return {
        title: titulo || 'Documento',
        subtitle: [subtipoLabel[subtipo] || subtipo, tamanho].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
