# Configuração do Sanity MCP e Agent Skills

Este documento explica como o ambiente de Inteligência Artificial (como o Antigravity) está conectado ao projeto Sanity, permitindo que a IA construa e gerencie ativamente a estrutura e o conteúdo do site.

## O que é o Servidor MCP?

O **Model Context Protocol (MCP)** atua como uma ponte oficial entre o banco de dados/painel do Sanity e a IA. Em vez da IA ficar apenas sugerindo códigos, o servidor MCP dá "mãos" a ela, permitindo realizar ações diretamente no seu projeto, tais como:
- Criar e atualizar documentos e postagens (tanto rascunhos quanto publicados).
- Fazer buscas reais usando a linguagem do Sanity (GROQ).
- Fazer deploy (enviar para a nuvem) das configurações e Schemas do Studio.
- Ler toda a estrutura atual do banco de dados automaticamente.

**Como foi configurado?**
Nós usamos o comando `npx sanity mcp configure` (CLI do Sanity) que detectou o Antigravity e injetou um token de segurança de acesso no arquivo de sistema `mcp_config.json`. Graças a isso, a IA conversa de forma segura com o `mcp.sanity.io`.

## O que são as Agent Skills?

Enquanto o MCP são as "mãos", as **Agent Skills** são o "cérebro" treinado. Elas são diretrizes e melhores práticas mantidas pelos engenheiros da própria Sanity, e ensinam a IA:
- Como modelar as tabelas/Schemas de forma otimizada.
- Como conectar o Sanity da melhor forma ao seu app Next.js (utilizando a biblioteca oficial `next-sanity`, `client.ts` e arquivos `.env`).
- Como escrever as consultas no banco de dados com alta performance.

**Como foi configurado?**
Você instalou usando `npx sanity skills install`. Esses padrões ficaram salvos e rastreados através da pasta `.agents/skills` e do arquivo `skills-lock.json`. O Antigravity lê esses padrões ocultos sempre que precisa trabalhar com o Sanity.

## Como Iremos Usar na Prática

No desenvolvimento do **filhos-de-obaluaie** (que é focado em Mídia e Publicação), a IA utilizará essas duas tecnologias simultaneamente da seguinte forma:

1. **Modelagem do Studio:** A IA usará o conhecimento das *Skills* para escrever rapidamente os arquivos `.ts` na pasta `/studio` contendo a estrutura dos dados (Posts, Categorias, Autores).
2. **Injeção de Conteúdo:** Para não precisarmos criar dezenas de textos na mão, a IA usará a ferramenta *MCP* `create_documents` para gerar e jogar conteúdo real e bem estruturado (como matérias e textos de exemplo) direto no seu painel.
3. **Construção do Site Next.js:** Como a IA tem acesso ao *MCP* para ler os dados, ela será capaz de programar as telas do front-end (`/src/app`) escrevendo consultas em GROQ para puxar esses mesmos textos de exemplo de forma dinâmica para a interface do site.

## Recursos Avançados Implementados no Sanity
Além da integração MCP, este painel foi configurado de forma premium com os seguintes recursos nativos do ecossistema Sanity:

- **Dashboard Inicial (`@sanity/dashboard`)**: Uma tela de boas-vindas para evitar que gestores se percam numa tela em branco.
- **Singletons (Configurações Globais)**: Um schema travado chamado `siteSettings`, garantindo que informações como "Telefone de Contato" e "Links de Rodapé" tenham uma fonte única e indestrutível.
- **Validações Inteligentes**: Proteção ativa contra dados sujos (como exigir que a URL de vídeo seja explicitamente do YouTube, evitando a quebra da tela do site).
- **Presentation Tool (Live Preview)**: Acesso em tela dividida, onde os editores de conteúdo do Terreiro digitam na esquerda e a tela do Next.js do lado direito carrega, em tempo real, as alterações que os usuários da web verão. (Requer modo rascunho configurado no frontend).
