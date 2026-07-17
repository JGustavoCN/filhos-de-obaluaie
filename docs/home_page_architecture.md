# 🗺️ Mapeamento de Dados da Home Page

Este documento define a estrutura oficial da Home Page do Centro Cultural Filhos de Obaluaiê, detalhando onde cada informação é preenchida no **Sanity CMS** e como ela é renderizada no **Frontend**.

---

## 1. Hero Institucional (A Primeira Dobra)
A seção principal do site (`HeroSection.tsx`). É estritamente institucional e imutável no seu layout.

- **Onde cadastrar no Sanity:** `Página Inicial (Home) > Aba: Hero Institucional`
- **Campos:**
  - `Título do Hero` (Ex: Filhos de Obaluaiê)
  - `Subtítulo do Hero` (Ex: Centro Cultural de Capoeira...)
  - `Imagem Hero (Desktop)`
  - `Imagem Hero (Mobile)`
- **Lógica de Botões:** 
  - O botão primário por padrão é **"Conheça Nossa História"** (âncora para `#sobre`).
  - Se houver um Evento em Destaque ativo, esse botão muda automaticamente para **"Veja o Evento em Destaque"** (âncora para `#destaque`).

---

## 2. Sobre Nós (A Força do Centro)
A segunda seção da página (`AboutSection.tsx`). Conta a história da instituição e exibe estatísticas.

- **Onde cadastrar no Sanity:** `Página Inicial (Home) > Aba: A Força do Centro`
- **Campos:**
  - `Título Institucional`
  - `Texto Institucional` (Rich Text)
  - `Imagem Institucional`
  - `Estatísticas` (Array de números e rótulos)
  - `Texto da Citação` & `Autor da Citação` (Aparece como um bloco flutuante sobre a imagem)

---

## 3. Evento em Destaque (Novo)
A terceira seção da página (`FeaturedEventSection.tsx`). Existe única e exclusivamente para destacar um evento importante de forma grandiosa.
*Nota: Esta seção só aparece se um evento for selecionado.*

- **Onde cadastrar no Sanity:** `Página Inicial (Home) > Aba: Evento em Destaque`
- **Campos:**
  - `Título da Seção de Destaque` (Ex: "Acontece neste final de semana!")
  - `Evento em Destaque` (Campo de Referência. Você clica e escolhe uma Notícia, Oficina, Roda de Capoeira, etc, já cadastrada no sistema).
- **Como funciona:** O Frontend puxa o Título, Capa, Data e Resumo automaticamente do evento que você referenciou e gera um grande Card com um botão para a página completa dele.

---

## 4. Feed do Terreiro (Atualizações Recentes)
Um carrossel dinâmico (`RecentUpdatesSection.tsx`) que mostra as **4 atualizações mais recentes** de todo o site, não importa o tipo.

- **Onde cadastrar no Sanity:** Em qualquer lugar. Basta criar uma Notícia, Evento, Oficina ou Documento.
- **Regras de Ordenação:** 
  1. Primeiro verifica se tem a prioridade `Prioridade na Agenda da Home` (quem tiver número maior, aparece antes).
  2. Depois, ordena pela `Data` (do mais recente para o mais antigo).

---

## 5. Mural da Comunidade (Notícias)
Grid com as **3 notícias mais recentes** (`Mural de Notícias`).

- **Onde cadastrar no Sanity:** `Conteúdo > Notícias e Comunicados`
- **Regras de Ordenação:**
  1. `Prioridade na Agenda da Home`
  2. `Data de Publicação` (descendente).

---

## 6. Projetos e Oficinas
Grid com até **4 oficinas ativas** (`ProjectsSection.tsx`).

- **Onde cadastrar no Sanity:** `Conteúdo > Projetos e Oficinas`
- **Regras de Ordenação:**
  1. `Ordem de Exibição` (Você digita um número lá na Oficina para forçar a ordem 1, 2, 3...).

---

## 7. Próximos Eventos (Agenda Completa)
Grid mostrando os **3 eventos futuros** (`Agenda`).

- **Onde cadastrar no Sanity:** `Eventos e Encontros` (Qualquer tipo: Roda de Capoeira, Aniversariantes, Externo, etc).
- **Regras de Ordenação:**
  1. O sistema filtra e exibe **apenas eventos cuja data seja no futuro** (Data do Evento >= Hoje).
  2. Ordenado da data mais próxima para a mais distante (crescente).
  3. Pode ser forçado usando a `Prioridade na Agenda da Home`.

---

## 8. Acervo e Biblioteca
A seção final antes do rodapé (`ArchiveSection.tsx`), exibindo os últimos **3 documentos/boletins** e as últimas **2 apresentações externas**.

- **Onde cadastrar no Sanity:** `Documentos` e `Eventos e Encontros > Apresentações Externas`.
- **Regras de Ordenação:** 
  1. `Prioridade na Agenda da Home`.
  2. Data de publicação (do mais novo para o mais antigo).

---

> [!TIP]
> **Resumo de Fluxo:** 
> - Para mudar textos institucionais ou o Destaque Principal = Use a configuração **Página Inicial (Home)**.
> - Para alimentar a Agenda, Feed e Mural = Apenas cadastre os eventos normalmente nos seus respectivos menus no Sanity. A Home buscará e organizará tudo sozinha baseada na data!
