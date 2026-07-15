# Oficinas e Aulas Permanentes

> **Schema (Sanity):** `studio/schemaTypes/documentos/oficina.ts`  
> **Componente (Frontend):** `src/components/cards/CardOficina.tsx`  
> **Conceito Visual:** Formação, ritmo e disciplina. O card tem uma moldura visível (9-slice) que muda de cor dependendo da modalidade.

---

## 1. Implementação Atual

### Schema Sanity
- **Título, Resumo e Imagem de Capa** (Padrão).
- **Subtipo:** Dropdown para selecionar a modalidade: `capoeira`, `percussao`, `danca-teatro`.
- **Informações Práticas:** Campos de string abertos para `oficineiro` (quem dá a aula), `horarios` e `faixaEtaria`.
- **Gestão de Vagas:** Campo numérico de `vagas` e um booleano `inscricoesAbertas`.

### Frontend (`CardOficina.tsx`)
- **Variação por Subtipo:** A cor da moldura e o ícone redondo flutuante dependem do `subtipoOficina`. Se for Capoeira (ícone de Berimbau, moldura primária), Percussão (ícone de Atabaque, moldura secundária), etc.
- **Hierarquia Visual:** A foto fica de fundo por trás da moldura. 
- **Tags Descritivas:** O rodapé é bem denso, mostrando oficineiro, horários, idade, vagas e um badge chamativo de "Inscrições Abertas" se o booleano estiver ativo.

---

## 2. Perguntas e Reflexões para Definição de Fluxo

As Oficinas são o coração do projeto no dia a dia. Precisamos definir:

1. **Gestão de Inscrições Reais:** O Sanity só tem um botão (liga/desliga) para "Inscrições Abertas". Como é feito o fluxo real de matrícula? A pessoa clica no card e vai para um formulário do Google Forms/Sympla? Se sim, precisamos adicionar um campo de "Link de Inscrição" no Sanity e um botão de Ação no card.
2. **Atualização Constante vs Fixa:** Diferente de um evento que passa e vai para o arquivo, as oficinas duram o ano todo. No entanto, o `oficineiro` e os `horarios` podem mudar no meio do ano. Se mudarem o texto no Sanity, a alteração entra na hora no site. Existe a necessidade de guardar o "Histórico" (ex: Turma 2025 vs Turma 2026), ou a oficina é uma página única que é sempre sobreescrita?
3. **Fotos das Turmas:** A imagem de capa ilustra a oficina. Como a oficina dura o ano todo, o administrador vai querer colocar fotos novas. O card atual suporta apenas uma `imagemCapa`. Devemos incluir uma `galeria` para oficinas para que o público possa ver fotos recentes das aulas?
4. **Múltiplos Oficineiros:** O campo `oficineiro` é texto livre. E se a capoeira for dada por 3 mestres diferentes dependendo do dia? O layout do card consegue acomodar um texto longo ali, ou devemos limitar a quantidade de caracteres permitidos no Sanity?
5. **Ordem de Exibição na Home:** Atualmente as oficinas são listadas por data de criação (`_createdAt`). Como são projetos fixos, seria melhor criar um campo `Ordem (1, 2, 3)` para vocês decidirem qual aparece primeiro no site (ex: colocar a Capoeira sempre na frente)?
6. **Integração com Eventos:** Seria útil que a oficina tivesse um vínculo direto com as "Rodas de Aniversariantes" ou "Mostras" que acontecem nela?
