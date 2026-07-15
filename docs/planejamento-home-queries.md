# Planejamento da Home e Queries (Sanity → Frontend)

> **Projeto:** Centro Cultural Filhos de Obaluaiê  
> **Data:** 14/07/2026

Este documento define **como** as informações cadastradas no Sanity Studio serão exibidas na página principal do site (Home), a ordem dos elementos e os limites técnicos das requisições (queries GROQ).

---

## 1. Estrutura da Home (Jornada do Usuário)

Atualmente a Home (`src/app/page.tsx`) tem muitas responsabilidades. Precisamos definir a ordem ideal para não sobrecarregar o visitante e garantir que o que for cadastrado no Sanity tenha o destaque correto.

### 1.1 Proposta de Ordem de Exibição

1. **Navbar (Menu Superior):**
   - **Composição:** "Sobre", "Acervo", "Notícias", "Contato".
   - *Reflexão:* Devemos adicionar um item "Agenda" direto no menu que leve para uma página de listagem `/tipo/eventos` para que o usuário não dependa de rolar toda a Home para achar a programação?

2. **Destaque Principal (Hero Card):**
   - **Comportamento atual:** Busca o maior evento disponível (Encontro > Mostra > Externo) e joga na cara do usuário.
   - **Comportamento proposto (Reflexão):** Em vez de tentar "adivinhar" qual o mais importante, não seria melhor ter uma flag no Sanity chamada `destaqueNaHome` (booleano)? Assim o administrador escolhe **exatamente 1 evento** para ficar gigante no topo. Se nenhum estiver marcado, o Hero some graciosamente ou mostra um card institucional fixo.

3. **Mural da Comunidade (Notícias e Comunicados):**
   - Puxa os 3 documentos mais recentes do tipo `noticia`.
   - Inclui botão "Ler todas as notícias" que redireciona para `/tipo/noticia`.
   - Foco: Mostrar que a instituição está viva e se comunicando hoje.

4. **Oficinas Permanentes (Projetos):**
   - Puxa todas as oficinas (Capoeira, Percussão, etc).
   - Como são fixas, o Sanity não precisa buscar as "mais recentes". A query pode buscar todas e ordená-las manualmente por um campo numérico de `ordem`, garantindo que a Capoeira (carro-chefe) sempre seja a primeira.

5. **Agenda Cultural (Listagem Mista):**
   - Grid de cards agrupando os próximos eventos (Roda de Aniversariantes, Mostra, Evento Externo).
   - *Reflexão sobre quantidade:* Mostrar no máximo 4 eventos na Home. Para o restante, o usuário clica em "Ver programação completa". O que acha dessa limitação para melhorar o carregamento?

---

## 2. Orquestração das Queries (GROQ)

Hoje fazemos 7 requisições paralelas no Next.js (no `Promise.all` da Home). Precisamos otimizar isso e refletir o novo modelo de dados.

### A. Query do Destaque (Hero)
Se adotarmos a flag `destaqueNaHome`:
```groq
// Pega o único evento marcado como destaque, independentemente do tipo
*[destaqueNaHome == true][0] {
  _id,
  _type,
  titulo,
  "slug": slug.current,
  resumo,
  "imagemCapa": imagemCapa{ "url": asset->url, alt },
  dataEvento,
  dataInicio,
  // ... resto dos campos
}
```
*Vantagem:* Controle total para a gestão do Centro.

### B. Query do Mural de Notícias
```groq
// Apenas as 3 mais recentes
*[_type == "noticia"] | order(dataPublicacao desc)[0...3] {
  _id,
  titulo,
  "slug": slug.current,
  resumo,
  dataPublicacao,
  categoriaNoticia,
  "imagemCapa": imagemCapa{ "url": asset->url, alt }
}
```

### C. Query das Oficinas Fixas
```groq
*[_type == "oficina"] | order(ordemExibicao asc) {
  _id,
  titulo,
  "slug": slug.current,
  subtipoOficina,
  oficineiro,
  horarios,
  faixaEtaria,
  inscricoesAbertas,
  "imagemCapa": imagemCapa{ "url": asset->url, alt }
}
```

### D. Query da Agenda (Próximos Eventos)
A agenda vai unir vários tipos, mas excluir o que já está em destaque e o que já passou (usando a data atual).
```groq
*[
  _type in ["rodaAniversariantes", "rodaConsciencia", "mostraCultural", "eventoExterno", "encontroConscienciaNegra"] 
  && destaqueNaHome != true 
  && coalesce(dataEvento, dataInicio) >= now()
] | order(coalesce(dataEvento, dataInicio) asc)[0...4] {
  // Retorna os próximos 4 eventos a acontecer
  // ...
}
```

---

## 3. Fluxo de Trabalho (O que o Administrador fará no Sanity)

Quando essas regras forem consolidadas, o passo-a-passo no Sanity será o seguinte (isso guiará como faremos o banco de teste):

1. **Acessar o Studio:** O menu estará dividido em Categorias Limpas (Eventos, Institucional, Configurações).
2. **Criar Oficina:** O admin cria "Capoeira", preenche oficineiro, marca "Inscrições Abertas" e define Ordem = 1.
3. **Criar Evento:** O admin cria um Encontro da Consciência Negra. Como quer dar ênfase máxima, ele liga a chave `Destacar na Home`. Imediatamente, esse evento vira o Hero Card da página inicial.
4. **Cadastrar Notícia:** Admin tira uma foto rápida, cria uma "Notícia" do tipo "Registro", e ela aparece no mural automaticamente empurrando a mais velha para a página de arquivos.

## 4. Decisões para você tomar

Antes de reescrevermos os arquivos `.ts` do frontend e os `.ts` do Sanity:

1. **Sobre o Destaque (Hero):** Adotamos a abordagem de ter o "checkbox de destaque" (controle manual) ou mantemos automático pelo maior evento?
2. **Sobre a Agenda:** Filtrar os eventos para mostrar apenas os que **ainda vão acontecer** (`>= now()`), fazendo sentido que a Home sirva como "Próximos Passos", deixando o passado apenas nas páginas de arquivo?
3. **Menu de Navegação:** Adicionamos "Agenda Completa" no menu superior?
4. **Oficinas:** Adotamos o campo "Ordem Numérica" para você posicionar manualmente a Capoeira acima da Percussão, por exemplo?
