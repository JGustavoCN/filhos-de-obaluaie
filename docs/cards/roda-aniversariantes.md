# Roda de Aniversariantes

> **Schema (Sanity):** `studio/schemaTypes/documentos/rodaAniversariantes.ts`  
> **Componente (Frontend):** `src/components/cards/CardAniversario.tsx`  
> **Conceito Visual:** Celebração, calor humano, festa em família. Borda pontilhada dourada, avatar circular centralizado.

---

## 1. Implementação Atual

### Schema Sanity
Atualmente, o Sanity está configurado para pedir os seguintes dados:
- **Título, Resumo e Imagem de Capa** (herdado de `baseFields`).
- **Mês e Ano de Referência:** Dropdown com os 12 meses do ano e um campo numérico para o ano (mínimo 2005).
- **Data e Local:** Data e hora exata (`dataEvento`) e Local com fallback para o endereço padrão do Centro.
- **Aniversariantes:** Um *array de strings* (`aniversariantes`), exigindo no mínimo 1 nome.
- **Mídias Externas:** Links para Drive/Vídeo.

### Frontend (`CardAniversario.tsx`)
- **Imagens:** O card exibe a `imagemCapa` de forma circular, bem centralizada no topo (`w-24 h-24 rounded-full`). Se o Sanity não enviar foto, ele usa um fallback do Unsplash.
- **Listagem de Nomes:** Os nomes dos aniversariantes são exibidos em pequenos blocos ("pills") dentro de uma caixa semi-transparente. Esta caixa possui rolagem vertical (`overflow-y-auto max-h-[110px] custom-scrollbar`) para comportar dezenas de nomes sem "quebrar" o tamanho do card.
- **Background Animado:** Usa a classe global `.animate-gradient-festivo` (um gradiente que se move sutilmente) e um ícone de Bolo Gigante como marca d'água de fundo rotacionando.

---

## 2. Perguntas e Reflexões para Definição de Fluxo

Para que o evento funcione de forma perfeita no dia a dia do Centro Cultural, precisamos definir as seguintes questões (Por favor, responda a cada uma delas):

1. **Fallback de Imagem:** Atualmente, se vocês não subirem uma foto da festa, o card mostra uma imagem genérica da internet (Unsplash). Devemos criar uma arte digital fixa com a logo do "Filhos de Obaluaiê" para aniversários e usar como imagem padrão?
2. **Tempo do Cadastro (Antes vs. Depois):** Vocês cadastram a roda *antes* de acontecer (para convidar as pessoas) ou *depois* (como um registro com as fotos do que rolou)? Se for antes, a imagem de capa nunca será a foto da festa real. Como procedemos?
3. **Quantidade de Aniversariantes:** O card suporta rolar a lista de nomes, mas colocar 40 nomes ali seria exaustivo para ler. Existe uma média de aniversariantes por mês? Precisamos limitar a exibição para "Mostrar apenas os primeiros 10 e um botão 'Ver todos'"?
4. **Obrigatoriedade de Nomes:** O Sanity atualmente obriga (`validation: Rule.min(1)`) ter pelo menos 1 aniversariante cadastrado para salvar o documento. Devemos manter isso obrigatório ou permitir criar um evento de aniversário sem listar os nomes?
5. **Integração com Oficinas:** A roda de aniversário ocorre na "última aula da semana". Devemos criar um vínculo no banco de dados para indicar a qual turma/oficina aqueles alunos pertencem ou manter genérico para todo o Centro?
6. **Galerias Fotográficas:** Além da capa, o card atual não tem botão para "Ver álbum de fotos completo". O evento costuma gerar muitas fotos que precisam ser exibidas num carrossel? Se sim, precisamos adicionar esse recurso no Frontend.
7. **Organização da Home:** As rodas de aniversariantes passadas devem continuar aparecendo na aba "Agenda" ou, no dia seguinte à festa, elas devem sumir da Home e ficar apenas visíveis na aba "Acervo"?
