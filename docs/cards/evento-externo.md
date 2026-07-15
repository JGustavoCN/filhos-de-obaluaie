# Evento Externo (Participações)

> **Schema (Sanity):** `studio/schemaTypes/documentos/eventoExterno.ts`  
> **Componente (Frontend):** `src/components/cards/CardEventoExterno.tsx`  
> **Conceito Visual:** Sóbrio e horizontal. Foca em demonstrar o "networking" e as saídas do grupo pela cidade.

---

## 1. Implementação Atual

### Schema Sanity
- **Título e Resumo** (Padrão).
- **Dados do Externo:** Campos de texto para `organizador` (quem convidou), `local` (onde é) e um dropdown `tipoParticipacao` (`apresentacao`, `palestra`, `parceria`, etc).
- **Data:** `dataEvento` para o dia exato.
- **Link Externo:** Campo `linkEvento` para apontar para o site/instagram oficial do evento parceiro.

### Frontend (`CardEventoExterno.tsx`)
- **Sem Imagem de Capa:** Notavelmente, este card **não carrega foto** no seu layout base. Ele usa um grande ícone de "Rede/Conexão" no canto esquerdo.
- **Layout Horizontal:** Diferente da maioria, ele é horizontal (`flex-row`), ocupando bem a tela sem precisar de alturas gigantescas.
- **Clareza de Parceria:** Exibe explicitamente o `organizador` em uma tag e o `tipoParticipacao` em outra, deixando claro que não é um evento interno.

---

## 2. Perguntas e Reflexões para Definição de Fluxo

Participações externas variam muito (de tocar numa feira a fazer palestra numa escola). Precisamos definir:

1. **Uso de Imagens no Futuro:** O card atual ignora fotos. E se o fotógrafo do Centro fizer fotos belíssimas da apresentação externa? O card deveria ter uma versão com foto (ou abrir um modal com as fotos) ou manter esse layout ultra-limpo (institucional) para sempre?
2. **Registro Histórico vs Divulgação (Timing):** Vocês cadastram o evento externo *antes* de ir (para a comunidade saber onde vocês estarão) ou *depois* (como registro do que fizeram)? 
3. **Links Externos:** O link de evento (`linkEvento`) deve levar o usuário para fora do site do Centro. Onde esse link deve ser clicável no layout atual? Todo o card deve ser um link gigante que direciona para fora?
4. **Organizador (Logo):** Em parcerias com a prefeitura, eles podem exigir o logotipo deles na divulgação. O Sanity atualmente pede apenas o *nome* do organizador em texto. Devemos pedir o upload da *logo* do parceiro?
5. **Integração com Tipos:** Se o evento externo for literalmente "Uma Roda de Capoeira numa praça feita por nós mesmos", ele é um Evento Externo ou uma Roda da Consciência? A definição da linha que separa os tipos precisa ficar clara para os redatores.
6. **Redirecionamento:** Há necessidade de haver uma página interna longa detalhando o evento externo, ou o layout do card contendo resumo + data + local já resolve 100% da necessidade de comunicação?
