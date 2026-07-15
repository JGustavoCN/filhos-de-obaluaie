# Encontro Internacional da Consciência Negra

> **Schema (Sanity):** `studio/schemaTypes/documentos/encontroConscienciaNegra.ts`  
> **Componente (Frontend):** `src/components/cards/CardConscienciaNegra.tsx`  
> **Conceito Visual:** Monumentalidade, ancestralidade, poder. É o maior evento do grupo e utiliza um card estilo "Hero" (imagem em destaque).

---

## 1. Implementação Atual

### Schema Sanity
Atualmente, o schema solicita as seguintes informações:
- **Título, Resumo e Imagem de Capa** (herdado de `baseFields`).
- **Data:** `dataInicio` e `dataFim` (para indicar que pode ser um evento de vários dias).
- **Local:** Onde ocorre o evento.
- **Edição:** Um campo numérico (ex: 17). O frontend é responsável por converter esse número para Algarismos Romanos (ex: XVII).
- **Participantes:** Arrays de strings para `mestresConvidados`, `gruposConvidados` e `parceiros`.
- **Tema/Subtema:** Um campo `subtemaPrincipal`.
- **Galeria e Mídias:** Array de imagens (`galeria`), Links para Drive/Vídeo.

### Frontend (`CardConscienciaNegra.tsx`)
- **Imagens (Hero Card):** O card exibe a `imagemCapa` em grande destaque ocupando toda a largura no topo (aspect-ratio 16:9). Sobreposta a essa imagem, há um gradiente escuro na base para dar leitura às etiquetas.
- **Badges:** Sobre a foto, aparecem duas "pills" (etiquetas): uma dizendo "Encontro" e outra com a edição calculada automaticamente (ex: "XVII Edição").
- **Layout Geral:** Diferente de outros cards "glassmorphism", este usa um fundo mais sólido (`bg-surface`) para dar mais peso institucional. Ele não exibe a lista completa de mestres ou parceiros; foca apenas no Título, Resumo curto, Data e Local.

---

## 2. Perguntas e Reflexões para Definição de Fluxo

Sendo este o evento de maior peso do ano, precisamos de respostas precisas para ajustar como o sistema lidará com os dados:

1. **Obrigatoriedade da Imagem Hero:** O design atual deste card é estruturado em torno da foto no topo (16:9). Se o campo `imagemCapa` vier vazio, o card perde totalmente o peso. Podemos tornar a `imagemCapa` obrigatória no Sanity apenas para este tipo de evento?
2. **Edição Numérica vs Texto Livre:** Hoje o Sanity pede um número (ex: 17) e o código converte para romano (XVII). Isso é rígido. E se o centro quiser divulgar uma edição comemorativa não-numérica, como "Edição Especial Zumbi dos Palmares"? Devemos mudar esse campo numérico para um campo de texto livre e parar de forçar a conversão para romano?
3. **Profundidade de Informações (Arrays):** O Sanity coleta listas de `mestresConvidados`, `gruposConvidados` e `parceiros`. No entanto, **nenhuma** dessas informações aparece no Card (pois deixaria ele superlotado). O objetivo de cadastrar isso no Sanity é para ter uma "Página de Detalhes do Encontro" no futuro?
4. **Comportamento na Home:** Este evento costuma ser o grande `Hero` da tela inicial. Devemos criar um checkbox no Sanity chamado "Destacar na Home" para garantir que este seja o primeiro card exibido gigante no site, ou ele deve assumir esse posto apenas pela data de proximidade?
5. **Duração do Evento:** Temos `dataInicio` e `dataFim`. O card atual mostra apenas uma data (usando a função `formatDateShort`). Como deve ficar visualmente quando for um festival de 3 dias? Mostrar "15 a 17 de Nov"?
6. **Mídias Pós-Evento:** O que acontece na tela depois que o evento acaba? O card continua igual na lista de "Acervo", ou ele ganha um botão "Ver Galeria de Fotos" e "Assistir aos Vídeos"?
7. **Organizador:** A organização principal é do próprio grupo, mas o campo `parceiros` é um array genérico de strings. Para exibir as marcas dos patrocinadores ou da prefeitura (se houver), precisaremos de um tipo que suporte Imagem (Logotipo) + Nome no Sanity em vez de apenas strings?
