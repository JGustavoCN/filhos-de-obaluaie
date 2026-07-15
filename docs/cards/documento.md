# Documentos Institucionais

> **Schema (Sanity):** `studio/schemaTypes/documentos/documento.ts`  
> **Componente (Frontend):** `src/components/cards/CardDocumento.tsx`  
> **Conceito Visual:** Transparência, seriedade. Lista ultra-compacta, ideal para baixar PDFs.

---

## 1. Implementação Atual

### Schema Sanity
- **Título** (Padrão). Sem necessidade de um texto longo de "resumo".
- **Tipo de Arquivo:** Dropdown com opções: `edital`, `relatorio`, `estatuto`, `ata`, `convenio`, `prestacao-contas`.
- **Upload do Arquivo:** Campo do tipo `file` para anexar PDFs (ou outros formatos) + campo para descrever o peso do arquivo (`tamanhoArquivo`).
- **Link Alternativo:** Campo `linkExterno` (ex: link pro diário oficial do município).
- **Datas:** `dataPublicacao` e `dataVigencia` (para editais com prazo).

### Frontend (`CardDocumento.tsx`)
- **Card-Botão:** O componente inteiro funciona como um hiperlink `<a>` que redireciona diretamente para o arquivo (Sanity CDN) ou para o link externo. Não há "página de detalhes".
- **Ícone Simples:** Mostra um ícone de documento no lado esquerdo, o título e as metadados.
- **Botão Escondido:** No lado direito, um botão "Baixar ↓" aparece ou acende quando o mouse passa por cima (hover).

---

## 2. Perguntas e Reflexões para Definição de Fluxo

Documentos legais e de transparência são críticos, especialmente se o Centro receber verbas públicas.

1. **Restrição de Formato:** O campo de upload do Sanity aceita qualquer coisa hoje (vídeo, zip, docx). Devemos configurar o schema para aceitar *estritamente* `.pdf` por questões de segurança e padronização?
2. **Cálculo de Tamanho:** Atualmente o `tamanhoArquivo` é digitado manualmente pelo redator (ex: "2.4 MB"). É comum as pessoas esquecerem de preencher isso. O frontend deveria tentar ler os metadados do arquivo em vez de depender da digitação manual?
3. **Data de Vigência vs Remoção:** Um edital com data de encerramento (`dataVigencia`) deve sumir automaticamente do site quando a data passar, ou deve continuar aparecendo com um aviso vermelho de "ENCERRADO"?
4. **Agrupamento de Documentos:** Se houver 1 edital, e ele tiver 4 anexos de erratas, cada errata será um card novo? Isso poluirá a listagem. Devemos alterar o schema para permitir que um único "Documento Principal" contenha vários arquivos (um array de PDFs)?
5. **Público vs Privado:** Existem documentos que os gestores querem guardar na nuvem do Sanity mas que não devem aparecer abertos para download do público geral? Precisamos de um checkbox `documentoPublico`?
6. **Prioridade na Home:** Documentos costumam ficar escondidos no "Acervo" no final da Home. E se for um edital com prazo de inscrição aberto? Ele não deveria aparecer na lista da Agenda ou ter um banner de alerta?
