import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configurações Globais',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'telefone',
      title: 'Telefone Principal / WhatsApp',
      type: 'string',
      description: 'Aparecerá no rodapé e nos botões de contato. (Ex: +55 11 99999-9999)',
    }),
    defineField({
      name: 'instagram',
      title: 'Link do Instagram',
      type: 'url',
      description: 'Link completo para o perfil do Instagram (ex: https://instagram.com/filhosdeobaluaie)',
    }),
    defineField({
      name: 'endereco',
      title: 'Endereço Físico',
      type: 'text',
      rows: 2,
      description: 'Endereço da sede para exibição no rodapé.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Descrição Global (SEO)',
      type: 'text',
      rows: 3,
      description: 'O texto que aparece no Google quando alguém pesquisa o nome do Centro.',
    }),
    defineField({
      name: 'seoImage',
      title: 'Imagem Padrão de Compartilhamento (SEO)',
      type: 'image',
      description: 'Aquela imagem que aparece no WhatsApp/Facebook quando você envia o link do site.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Configurações Globais (Rodapé e SEO)',
      }
    },
  },
})
