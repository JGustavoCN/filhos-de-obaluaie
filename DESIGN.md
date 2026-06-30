---
version: alpha
name: Filhos de Obaluaiê
colors:
  primary: "#9E1B1B"
  secondary: "#F5F1E8"
  tertiary: "#23201D"
  neutral: "#DCD6CC"
  surface: "#FCFAF7"
  on-surface: "#1A1715"
  error: "#C62828"
typography:
  headline-lg:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label-md:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1
rounded:
  sm: 4px
  md: 12px
  full: 9999px
spacing:
  base: 16px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  gutter: 24px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.full}"
    padding: 16px
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 16px
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
---

# Design System

## Overview

A interface da Plataforma Web para o Centro Cultural "Filhos de Obaluaiê" transpira ancestralidade, acolhimento e força. Fundamentada nos princípios da **"Matriz Africana do Design Gráfico"** (Délcio Caiaia) e nas explorações de **"Capoeira: Traduzindo a Musicalidade em Estampas"** (Victor Gabriel Mendonça Sousa), a interface se afasta do minimalismo frio eurocêntrico e abraça tons terrosos, texturas orgânicas e simbolismo profundo (Sankofa). O foco principal é atuar como portfólio institucional, onde o design traduz a "Mandinga", a "Ginga" e o "Axé" da Capoeira em elementos visuais, criando um ritmo de leitura compassado.

## Colors (Mapa de Uso Seguro - WCAG)

A paleta foi otimizada para atingir conformidade rigorosa com as diretrizes de acessibilidade WCAG 2.1 (níveis AA e AAA), garantindo contraste, temperatura e hierarquia visual adequados.

### Regras Invioláveis de Acessibilidade (WCAG AA/AAA)

- **Superfícies:** Superfícies claras (Light Mode) SEMPRE usam texto escuro (`--color-on-surface`). Superfícies escuras (Dark Mode) SEMPRE usam texto claro (`--color-on-surface`).
- **Primary:** A cor Primary é EXCLUSIVA para ação/fundo de botão e NUNCA deve ser usada como cor de texto. O hover (`--color-primary-hover`) representa iluminação da ação, não uma cor base.
- **Glassmorphism:** Componentes Glass necessitam de controle rigoroso (uso do `blur(12px)` e opacidade `0.85` no dark mode) para evitar falha de contraste do texto sobre fundos variados.
- **Outline:** Cores de borda (`--color-outline`) têm contraste intencionalmente baixo (~2.8:1 no dark) e SÃO APENAS PARA DECORAÇÃO. Nunca use para informações críticas ou textos.
- **Zero Cores Novas:** Não introduza nenhuma cor fora da paleta definida neste documento.
- **Uso Semântico:** Priorize o uso semântico em todos os componentes (ex: `var(--color-surface)`), evitando a inserção de valores hexadecimais diretos no código.

### Paleta Claro (Light Mode)

- **Primary:** `#8C1616` (Vermelho terra - representa a argila, sangue, vitalidade, Obaluaê/Xangô/Ogum)
  - On-Primary: `#FFFFFF`
- **Secondary:** `#F5F1E8` (Bege claro - areia, juta, palha de costa)
  - On-Secondary: `#2B2520`
- **Tertiary:** `#23201D` (Carvão/Preto - cinzas, o luto e o renascimento, ancestralidade profunda)
  - On-Tertiary: `#F5F1E8`

**1.2 Neutras (Tons de fundo e texto)**
- **Surface (Background):** `#FCFAF7` (Palha muito clara, quase branco-sujo)
- **Surface Container:** `#F5EFE6` (Variação de palha)
- **Surface Container High:** `#F0E8DC`
- **On-Surface (Texto Principal):** `#1A1715` (Preto quase marrom)
- **On-Surface Light (Texto Secundário):** `#524B49` (Ajustado para WCAG AA)
- **Outline:** `#6E5B58` (Ajustado para WCAG AA)
- **Outline Variant:** `#C6B8B2`

## Typography

- **Headlines**: Syne, negrito (bold). Fonte com variações de peso marcantes, evocando a arte africana contemporânea, fluidez rítmica e geometria forte.
- **Body**: DM Sans, regular, 16px. Limpa, moderna e altamente legível para garantir a leitura de longos relatórios institucionais.
- **Labels**: DM Sans, médio (medium), 12px. Utilizada para categorias, tags, metadados e cabeçalhos de pequenas seções.

## Layout

O layout utiliza um espaçamento generoso baseado em uma escala estrita de 8px (base 16px). A diagramação se inspira no **"Grid Africano"** (conforme explorado por Victor Gabriel), utilizando espaços bem definidos e delimitados por diferenças sutis de cores de fundo ou bordas leves, garantindo ritmo. Espaços amplos (Whitespace) e o uso da cor Bege Cru (Surface) devem ser priorizados entre os elementos do acervo para transmitir respeito, respiro e cura (fundamentos do Orixá Obaluaiê), evitando qualquer sobrecarga visual de informações.

## Elevation & Depth

A profundidade é alcançada principalmente por meio de contrastes tonais e bordas finas em vez de sombras pesadas (drop shadows).
**Separação de Camadas:** Uso progressivo de superfícies (`surface` até `surface-container-high`) para criar profundidade real sem fundos chapados. Elementos flutuantes ou em hover podem receber uma leve elevação (-4px no eixo Y) e destaque na cor da borda, mas o design geral permanece visualmente "firme" no chão.

## Shapes

A estética africana mistura fluidez orgânica com geometria precisa (como nos tecidos Bogolan).

- Elementos interativos (botões) recebem arredondamento total (Pill / 9999px) para um toque "solto" e tátil, lembrando as rodas de capoeira.
- Estruturas de conteúdo (cards e modais) utilizam cantos médios (12px), parecendo documentos culturais tangíveis e mantendo a estabilidade.

## Components

- **Buttons**: Totalmente arredondados (9999px), botões primários usam preenchimento Terra Cota (Primary), botões secundários usam Amarelo Palha (Secondary).
- **Cards**: Fundo Bege Cru (Surface) ou `glass-card`, cantos arredondados em 12px, organizados dentro do "Grid Africano" com bordas sutis.
- **Inputs**: Fundo ligeiramente contrastante com a superfície, mantendo bordas simples e legibilidade extrema.

## Do's and Don'ts

- **Fazer:** Incorporar padrões geométricos sutis em áreas de fundo escuro, atuando como "elementos soltos" e divisores de seção.
- **Fazer:** Manter contraste de 4.5:1 (ou superior) para todo o texto, priorizando a acessibilidade WCAG AA.
- **Não fazer:** Misturar elementos com cantos muito afiados (0px) com elementos totalmente arredondados (9999px) na mesma visualização.
- **Não fazer:** Usar branco puro (#FFFFFF) ou preto puro (#000000) em grandes superfícies, pois isso quebra a harmonia orgânica.

## Modo Ancestral (Dark Mode)

O "Modo Ancestral" evoca uma atmosfera noturna — o "Terreiro à noite" — onde o ar é denso de história e ritual. Ativado pela classe `.dark` (e persistido no ThemeToggle).

### Paleta Escura & Diretrizes

1. **Temperatura e Coesão:** O Modo Ancestral utiliza uma abordagem forte e contrastante, mantendo acessibilidade e força.
2. **Base:** Superfície base `#121212`, garantindo conforto na leitura.
3. **Texto (AAA):** Uso de `On-surface` (#F5F5F5) para leitura limpa e sofisticada. A cor `On-primary` permanece branca ou com alto contraste.
4. **Primary (Peso Visual):** A cor Primary (`#D64545`) atua como botão e destaque visual no escuro.
5. **Secondary & Tertiary:** O Secondary atua com `#2A2A2A` e Tertiary com `#FFFFFF` para composições auxiliares.

### Glow vs Sombras no Glassmorphism

No escuro, o Glassmorphism depende puramente do **Inner Glow** (luz de vela em palha dourada a 18%-28% de opacidade) para separação física de camadas, abandonando sombras genéricas:
`--inner-glow: rgba(232, 197, 140, 0.18)` e `--inner-glow-hover: rgba(232, 197, 140, 0.28)`.
Background ajustado para `0.85` de opacidade e blur em `12px` para garantir a legibilidade do texto não importando a textura que passe por trás do card.

### Shapes (Mantidas)

> **Decisão de Design:** A proposta original do Modo Ancestral sugeria cantos em 0px (Sharp/Brutalist). Essa regra foi **deliberadamente rejeitada** para este projeto. Os border-radius originais (12px para cards, 9999px para botões) são mantidos em ambos os modos — claro e escuro — para preservar a metáfora da "Roda de Capoeira" e a fluidez orgânica dos tecidos Bogolan.

## Modo de Visualização de Evidências (Foco em Editais)

Como a plataforma funciona como um repositório de evidências para editais públicos (ex: Lei Paulo Gustavo), a funcionalidade "Dossiê" exige regras estritas:

- **Alto Contraste:** Garantir proporção de contraste elevada (nível AAA) entre textos da cor Café Torrado (On-surface) e fundos Bege Cru (Surface) ou branco em telas de relatórios.
- **Layout Institucional (Dossiê):** Componentes que exibem dados históricos, como cronogramas de eventos, tabelas e planilhas de impacto, devem ter um visual "clean" e de fundo limpo. O design precisa ser otimizado para leitura técnica e possível exportação/impressão em PDF para avaliadores de editais.
- **Micro-interações Rítmicas:** As animações de transição e _hover_ (CSS transitions) devem ter um ritmo fluido e orgânico (ex: curva `ease-in-out` suave), evitando movimentos mecânicos ou saltos lineares. Essa polirritmia visual reflete o movimento e a musicalidade da matriz africana.
