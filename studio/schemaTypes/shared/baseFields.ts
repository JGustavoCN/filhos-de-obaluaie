import { defineField, defineArrayMember } from 'sanity'

/**
 * Campos base compartilhados por todos os document types do Centro Cultural Filhos de Obaluaiê.
 * Inclui: título, slug, resumo (para cards), imagem de capa, galeria e corpo em Portable Text.
 *
 * NOTA: dataEvento NÃO está aqui porque cada tipo tem sua semântica própria de data.
 * Cada schema define seus próprios campos de data (dataInicio, dataEvento, dataPublicacao).
 */
export const baseFields = [
  defineField({
    name: 'titulo',
    title: 'Título',
    type: 'string',
    description: 'Título principal exibido no card e na página de detalhe.',
    validation: (Rule) => Rule.required().min(5).max(120),
  }),
  defineField({
    name: 'slug',
    title: 'Slug (URL amigável)',
    type: 'slug',
    description: 'Gerado automaticamente a partir do título. Usado na URL da página.',
    options: {
      source: 'titulo',
      maxLength: 96,
    },
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'resumo',
    title: 'Resumo para Card',
    type: 'text',
    rows: 3,
    description:
      'Texto curto exibido nos Cards da Vitrine e na listagem. Máximo de 200 caracteres.',
    validation: (Rule) =>
      Rule.max(200).warning('Mantenha abaixo de 200 caracteres para melhor exibição nos cards.'),
  }),
  defineField({
    name: 'imagemCapa',
    title: 'Imagem de Capa',
    type: 'image',
    description: 'Imagem principal do card. Use fotos horizontais (16:9) para melhor resultado.',
    options: {
      hotspot: true,
    },
    fields: [
      defineField({
        name: 'alt',
        title: 'Texto Alternativo (Acessibilidade)',
        type: 'string',
        description: 'Descreva a imagem para leitores de tela. Ex: "Mestre Bahia ensinando capoeira"',
        validation: (Rule) => Rule.required().warning('O texto alternativo é essencial para acessibilidade.'),
      }),
    ],
  }),
  defineField({
    name: 'galeria',
    title: 'Galeria de Imagens',
    type: 'array',
    description:
      'Fotos adicionais do evento. Na Mostra Cultural, as 3 primeiras formam o mosaico do card.',
    of: [
      defineArrayMember({
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({
            name: 'alt',
            title: 'Texto Alternativo',
            type: 'string',
          }),
        ],
      }),
    ],
  }),
  defineField({
    name: 'body',
    title: 'Conteúdo Detalhado',
    type: 'array',
    description:
      'Texto rico exibido apenas na página interna de detalhe. Suporta títulos, listas, imagens e links.',
    of: [
      defineArrayMember({ type: 'block' }),
      defineArrayMember({
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({ name: 'alt', type: 'string', title: 'Texto Alternativo' }),
          defineField({ name: 'caption', type: 'string', title: 'Legenda' }),
        ],
      }),
    ],
  }),
]

/**
 * Campos de mídia externa compartilhados (YouTube, Google Drive, etc.)
 * Incluídos seletivamente nos tipos que preveem uso de mídias pesadas.
 */
export const mediaExternaFields = [
  defineField({
    name: 'videoUrl',
    title: 'Vídeo (YouTube)',
    type: 'url',
    description:
      'Cole o link do YouTube (ex: https://www.youtube.com/watch?v=...). Será incorporado na página de detalhe.',
    validation: (Rule) =>
      Rule.uri({ scheme: ['http', 'https'] }).custom((url) => {
        if (!url) return true // Pode ser vazio se não for obrigatório
        const isYouTube = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(url)
        return isYouTube ? true : 'A URL fornecida não parece ser do YouTube. Verifique o link.'
      }),
  }),
  defineField({
    name: 'driveUrl',
    title: 'Álbum no Google Drive / Pasta de Fotos',
    type: 'url',
    description:
      'Link compartilhado do Google Drive com as fotos do evento. Aparece como botão "Ver álbum completo".',
    validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
  }),
]
