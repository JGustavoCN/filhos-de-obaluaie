import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  fields: [
    defineField({
      name: 'imagemHeroDesktop',
      title: 'Imagem Principal do Header (Desktop)',
      type: 'image',
      description: 'Imagem principal exibida na primeira tela do site para computadores.',
      options: { hotspot: true }
    }),
    defineField({
      name: 'imagemHeroMobile',
      title: 'Imagem Principal do Header (Celular)',
      type: 'image',
      description: 'Imagem principal exibida na primeira tela do site para celulares. (Opcional - usa a de desktop se vazio)',
      options: { hotspot: true }
    }),
    defineField({
      name: 'heroLabel',
      title: 'Label do Hero',
      type: 'string',
      description: 'Pequeno texto acima do título (ex: Desde 2005 · Tobias Barreto/SE)',
    }),
    defineField({
      name: 'heroTitulo',
      title: 'Título Principal do Hero',
      type: 'string',
      description: 'Título principal da primeira dobra (ex: Filhos de Obaluaiê)',
    }),
    defineField({
      name: 'heroSubtitulo',
      title: 'Subtítulo do Hero',
      type: 'text',
      description: 'Texto descritivo abaixo do título',
    }),
    defineField({
      name: 'sobreTexto',
      title: 'Texto Sobre o Centro (Nossa Raiz)',
      type: 'text',
      description: 'Texto principal da seção Sobre Nós',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sobreCitacao',
      title: 'Citação do Centro',
      type: 'string',
      description: 'Frase de impacto (Ex: O corpo fala, a alma canta...)',
    }),
    defineField({
      name: 'pilares',
      title: 'Nossos Pilares',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Lista de pilares (Ex: Ancestralidade como guia, Transformação social)',
    }),
    defineField({
      name: 'instagram',
      title: 'Link do Instagram',
      type: 'url',
    }),
    defineField({
      name: 'facebook',
      title: 'Link do Facebook',
      type: 'url',
    }),
    defineField({
      name: 'telefone',
      title: 'Telefone de Contato',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-mail de Contato',
      type: 'string',
    }),
    defineField({
      name: 'endereco',
      title: 'Endereço Físico',
      type: 'text',
    }),
    defineField({
      name: 'menuLinks',
      title: 'Links do Menu Principal (Navegação)',
      type: 'array',
      description: 'Links que aparecem no cabeçalho do site',
      of: [
        defineField({
          name: 'link',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Título', type: 'string' }),
            defineField({ name: 'href', title: 'URL ou Âncora (ex: #sobre)', type: 'string' }),
            defineField({ name: 'external', title: 'É link externo?', type: 'boolean', initialValue: false })
          ]
        })
      ]
    })
  ]
});
