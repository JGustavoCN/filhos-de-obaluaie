# Importador do Acervo → Sanity (Rodas de Aniversariantes)

Script: [`import-rodas.mjs`](./import-rodas.mjs)

Importa os `dados.json` do acervo para o Sanity, criando documentos do tipo
`rodaAniversariantes`. **Não altera schemas.**

## Regras editoriais aplicadas

1. **`dataEvento`** — nunca inventa datas. Se estiver vazio no JSON, é enviado como `null`.
   Se houver uma data real (`DD/MM/YYYY` ou ISO), ela é apenas reformatada para ISO 8601.
2. **`aniversariantes`** — nunca preenche automaticamente. Mantém o array vazio quando não há nomes.
3. **Pastas sem `dados.json` válido não geram documento** — nada de documentos vazios.
4. Os registros são tratados como **memória histórica**, não como eventos futuros.

## Transformações automáticas (staging → Sanity)

| Campo no JSON | Vira no Sanity |
|---|---|
| `titulo` | `titulo` + `slug` gerado (sem acentos, hifenizado, ≤96) |
| `textoCompleto` | `body` (Portable Text, 1 bloco por parágrafo) |
| `imagemCapa.arquivo` | upload do arquivo → `imagemCapa` (`asset._ref` + `alt`) |
| `galeria[].arquivo` | upload → `galeria[]` (`asset._ref` + `alt` + `_key`) |
| `mesReferencia`, `anoReferencia`, `local`, `resumo`, `destaqueNaHome`, `prioridadeHome` | iguais |
| `videoUrl` | incluído só se for URL do YouTube; senão omitido |
| `driveUrl` | incluído se http/https |

Cada documento recebe um `_id` determinístico (`roda-aniversariantes-AAAA-MM`), então
rodar de novo **atualiza** o mesmo documento (idempotente) em vez de duplicar.

## Pré-requisitos

- Node 18+ (testado no 22).
- `@sanity/client` já está instalado na raiz do projeto.
- `.env.local` com `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET` (já existem).
- Para **gravar** (`--commit`): um token de escrita do Sanity em `SANITY_API_WRITE_TOKEN`.
  Crie em https://www.sanity.io/manage → projeto `1lha6jrn` → API → Tokens (permissão *Editor*).

## Uso

Dry-run (padrão — **não grava nada**, só relata):

```bash
node scripts/import-rodas.mjs --dataset=development
```

Apontando para o acervo (se não estiver no caminho padrão do Desktop):

```bash
node scripts/import-rodas.mjs --acervo="C:\Users\rondley.santos_quero\Desktop\acervo-filhos-de-obaluaie" --dataset=development
```

Importar de verdade (grava no Sanity):

```bash
# PowerShell
$env:SANITY_API_WRITE_TOKEN="seu-token-aqui"
node scripts/import-rodas.mjs --dataset=development --commit
```

Recomenda-se importar primeiro no dataset **`development`**, conferir no Studio, e só
então rodar com `--dataset=production`.

## Saída

- Relatório legível no terminal: documentos encontrados, campos vazios, imagens a enviar,
  pastas ignoradas e incompatibilidades.
- Manifesto em `scripts/import-report.json` (registro do que seria/foi importado).

## Flags

| Flag | Efeito |
|---|---|
| _(nenhuma)_ | dry-run |
| `--commit` | grava no Sanity (exige `SANITY_API_WRITE_TOKEN`) |
| `--dataset=NOME` | escolhe o dataset (`development` / `production`) |
| `--acervo=CAMINHO` | caminho da pasta do acervo |
