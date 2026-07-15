# Notícias e Comunicados Gerais

> **Schema (Sanity):** `studio/schemaTypes/documentos/noticia.ts`  
> **Componente (Frontend):** `src/components/cards/CardNoticia.tsx`  
> **Conceito Visual:** Informativo e leve. O "feed" das redes sociais transcrito para o site.

---

## 1. Implementação Atual

### Schema Sanity
- **Título, Resumo, Body Inteiro e Imagem de Capa** (herdado).
- **Data de Publicação:** `dataPublicacao` (importante para ordenar no Mural da Comunidade).
- **Categoria:** Dropdown com `comunicado`, `convite`, `registro`, `novidade`, `edital-inscricao`.

### Frontend (`CardNoticia.tsx` - assumindo estrutura padrão de Mural)
- **Layout Vertical:** É o formato clássico de blog. Imagem de capa na parte de cima (`aspect-ratio 4:3`), seguido do título, texto e data na base.
- **Pills de Categoria:** A `categoriaNoticia` vira uma etiqueta no topo do card.
- **Função:** Este card é um "teaser". O usuário clica nele e é levado para a página detalhada (`/conteudo/[slug]`) onde consegue ler todo o corpo de texto (Portable Text) escrito pelo redator.

---

## 2. Perguntas e Reflexões para Definição de Fluxo

A Notícia é o coringa do site. Pode ser usada para comunicar o que não se encaixa nos outros eventos.

1. **Duplicação de Esforços (Redes Sociais):** Se o administrador postar um comunicado no Instagram, ele também vai precisar escrever manualmente uma "Notícia" no Sanity. Isso é sustentável a longo prazo?
2. **Sobreposição com Eventos:** O redator pode acidentalmente cadastrar um convite de "Roda da Consciência" usando o modelo de "Notícia" (porque tem a tag `convite` nela). Como garantimos que o redator escolha o "Tipo" correto? Talvez renomear este schema no Sanity de "Notícias" para "Blog Institucional"?
3. **Galeria de Fotos Interna:** Notícias podem ser grandes registros de algo que passou. O schema não herda `galeria` por padrão. A notícia pode conter múltiplas imagens no meio do texto? (O Portable Text suporta blocos de imagem, mas requer validação).
4. **Link Rápido vs Página Longa:** Um "Comunicado" curto ("Feriado: Não haverá aula de capoeira amanhã") precisa obrigar o usuário a carregar uma página inteira `/conteudo/slug` só para ler essa mesma frase? Talvez algumas notícias decessem agir apenas como cards sem links?
5. **Autoria:** Notícias costumam ter o nome do autor (ex: Por Mestre Zezinho). Precisamos adicionar um campo `autor` ou o autor será sempre "Comunicação Filhos de Obaluaiê"?
6. **Mural da Home (Limites):** O mural atual busca as 3 últimas notícias. Se não houver publicação por 6 meses, o site parecerá abandonado (pois o bloco é muito visível na Home). Devemos colocar uma inteligência de só renderizar a "Seção de Notícias" na Home se houver pelo menos 1 postagem recente (ex: últimos 30 dias)?
