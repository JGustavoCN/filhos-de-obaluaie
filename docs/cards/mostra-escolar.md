# Mostra Cultural para Escolas

> **Schema (Sanity):** `studio/schemaTypes/documentos/mostraCultural.ts`  
> **Componente (Frontend):** `src/components/cards/CardMostraEscolar.tsx`  
> **Conceito Visual:** Energia coletiva e multiplicidade. Utiliza um mosaico de fotos tipo "Polaroids" giradas para representar as várias turmas/escolas e cores alternadas.

---

## 1. Implementação Atual

### Schema Sanity
O schema foi desenhado para coletar informações educacionais e quantitativas da mostra:
- **Título, Resumo e Imagem de Capa** (herdado de `baseFields`).
- **Escolas Participantes:** Um array de strings listando os nomes das escolas.
- **Quantidade de Alunos:** Campo numérico (ex: 120 alunos participantes).
- **Galeria:** O array de imagens de cobertura.
- **Data e Local:** (Padrão).

### Frontend (`CardMostraEscolar.tsx`)
- **Estética Étnica:** Usa a classe `bogolan-pattern` de fundo, uma referência aos padrões geométricos africanos, remetendo ao valor pedagógico.
- **Estrutura "Polaroid":** O card pega as 3 primeiras fotos do campo `galeria` e as renderiza rotacionadas (-6°, 2°, -3°) sob a foto de capa, dando um aspecto dinâmico. No hover (ao passar o mouse), essas polaroids ampliam.
- **Pills de Escolas Coloridos:** Pega o array de `escolasParticipantes` e exibe como pequenas pílulas. O código intercala a cor delas (`isPrimary ? bg-primary : bg-secondary`) para passar a ideia de diversidade e volume de escolas.
- **Quantidade de Alunos:** Aparece no rodapé como destaque (ex: "120 alunos").

---

## 2. Perguntas e Reflexões para Definição de Fluxo

A estrutura visual deste card é uma das mais complexas (depende de múltiplas imagens). Precisamos definir:

1. **Dependência de Fotos (O Mosaico):** O design atual pede **3 fotos na galeria** para montar as "polaroids". Se o administrador cadastrar a mostra *antes* de acontecer (sem fotos das crianças ainda) e não colocar nada na galeria, o card ficará vazio no meio. Qual é a regra ideal de salvamento?
   - a) Exigir no mínimo 3 fotos para salvar.
   - b) Permitir zero fotos na galeria e ter um layout alternativo sem o mosaico.
2. **Uso de Imagens de Menores:** Como é um evento com crianças de escolas municipais, há algum problema com direitos de imagem para usar o rosto das crianças nas Polaroids da capa? Precisamos colocar um aviso no Sanity para o redator ter atenção a isso?
3. **Escolas Participantes:** A lista de escolas (`escolasParticipantes`) é um campo aberto de strings. Se tivermos 10 escolas no mesmo evento, teremos 10 pílulas coloridas tomando todo o espaço do card. Devemos limitar a visualização para no máximo 4 escolas e acrescentar "+6 escolas" no botão?
4. **Público Alvo Educacional:** Esta mostra é restrita aos alunos e professores, ou o público geral da cidade pode ir assistir? Precisamos de um aviso claro de "Evento Fechado / Apenas Convidados"?
5. **Integração com Aulas Anuais:** A Mostra Cultural costuma ser a finalização do que é ensinado nas `Oficinas`. O banco de dados deve referenciar de qual oficina foi a Mostra (ex: Mostra de Encerramento da Percussão) ou as mostras englobam todas as modalidades ao mesmo tempo?
6. **Quantidade Real de Alunos:** O campo `quantidadeAlunos` precisa ser um número exato cadastrado à mão? Isso não seria melhor substituído por um texto abrangente, ex: "Mais de 100 crianças da rede municipal", visto que pode ser difícil calcular o número exato no final do evento?
7. **Arquivamento e Peso na Home:** Por ser um evento altamente fotográfico, no acervo ele deve levar a uma página focada inteiramente em rolar as fotos? No card, a foto de Capa tem pouco destaque em favor das Polaroids menores.
