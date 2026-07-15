# Rodas da Consciência

> **Schema (Sanity):** `studio/schemaTypes/documentos/rodaConsciencia.ts`  
> **Componente (Frontend):** `src/components/cards/CardRodaConsciencia.tsx`  
> **Conceito Visual:** Intercâmbio e sabedoria. O avatar do mestre convidado fica gigante no canto esquerdo, criando uma hierarquia focada no convidado.

---

## 1. Implementação Atual

### Schema Sanity
O schema foca no evento como um momento de troca de saberes, exigindo:
- **Título, Resumo e Imagem de Capa** (herdado de `baseFields`).
- **Data e Local:** Campo de data e hora exata.
- **Mestre Convidado:** Nome do mestre (`mestreConvidado`), origem (`origemMestre` - ex: "Angola", "Salvador") e, crucialmente, uma foto (`fotoMestre`).
- **Tema da Roda:** Qual assunto será abordado (`temaRoda`).
- **Acesso:** Um checkbox booleano `abertoAoPublico`.

### Frontend (`CardRodaConsciencia.tsx`)
- **Layout Assimétrico:** Usa uma borda lateral grossa para dar destaque de "Citação/Foco".
- **Foto do Mestre:** A `fotoMestre` (que curiosamente o código mapeia para `imagemCapa` nas props, mas a intenção era a foto do mestre) é exibida do lado esquerdo de forma bem arredondada (`rounded-3xl`).
- **Identidade Cultural:** Possui uma marca d'água gigante de um Berimbau no fundo (`BerimbauIcon`).
- **Design de "Citação":** O resumo da roda ganha uma aspa gigante estilizada (`&ldquo;`), fazendo com que o resumo da roda pareça uma fala ou um ensinamento do mestre convidado.
- **Rodapé:** Exibe a data e a etiqueta de acesso ("Entrada livre" ou "Restrito", baseado no booleano `abertoAoPublico`).

---

## 2. Perguntas e Reflexões para Definição de Fluxo

A Roda da Consciência é muito focada no indivíduo (o Mestre Convidado). Precisamos fechar as seguintes questões:

1. **Ambiguidade de Imagens:** O Sanity tem `imagemCapa` (herdado) e também `fotoMestre`. Se o administrador preencher a `imagemCapa` com um banner da prefeitura e a `fotoMestre` com o rosto dele, como o card deve se comportar? Atualmente, o frontend está priorizando apenas uma imagem e colocando no avatar arredondado. A `imagemCapa` é realmente necessária neste schema?
2. **Citação vs. Resumo:** O texto do resumo fica estilizado como uma fala/citação. O administrador deve escrever ali realmente uma aspa/ensinamento do mestre, ou é apenas a descrição logística do evento? Se for logística, as aspas na interface podem confundir. Devemos separar isso no Sanity (campo "Ensinamento" x campo "Descrição")?
3. **Ausência de Foto:** O que devemos mostrar caso o Mestre Convidado não possua uma foto em boa qualidade ou se recuse a mandar? Inserimos um logo vetorial de um Berimbau ou Capoeirista no lugar do rosto dele no Card?
4. **Acesso Público vs Pago:** O checkbox `abertoAoPublico` hoje divide entre "Entrada Livre" e "Restrito". Existe alguma roda que seja "Paga"? Precisamos de um campo de valor de inscrição ou link para Sympla/Ingressos?
5. **Múltiplos Mestres:** E se a roda não trouxer apenas UM mestre, mas sim um painel com TRÊS mestres convidados (ex: Roda dos Grandes Mestres de Sergipe)? O schema atual só comporta 1 nome e 1 foto. Como o sistema deve agir? 
6. **Integração com Encontro de Novembro:** As Rodas da Consciência costumam acontecer isoladas ou elas fazem parte do Encontro Internacional de Novembro? Se fizerem parte, devemos criar um vínculo ("Pertence a: XVIII Encontro") no Sanity para organizá-las hierarquicamente?
7. **Origem do Mestre:** O Sanity pede a `origemMestre`, mas o card visual (`CardRodaConsciencia.tsx`) não exibe esse dado em lugar nenhum no momento. Devemos exibir debaixo do nome dele? (ex: "Mestre Zezinho - Salvador/BA").
