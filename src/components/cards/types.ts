export type EventoType = "aniversario" | "consciencia-negra" | "roda-consciencia" | "mostra-escolar" | "oficina" | "evento-externo" | "documento" | "noticia";

export interface EventoProps {
  id: string;
  tipo: EventoType;
  titulo: string;
  resumo?: string;
  dataEvento?: string;
  local?: string;
  imagemCapa?: string;
  escolasParticipantes?: string[];
  mestreConvidado?: string;
  edicao?: number;
  subtipoOficina?: "capoeira" | "percussao" | "danca-teatro";
  tamanhoArquivo?: string;
  linkArquivo?: string;
  // Campos previstos no planejamento para integração futura com Sanity
  oficineiro?: string;
  faixaEtaria?: string;
  aniversariantes?: string[];
  subtipoDocumento?: string;
  categoriaNoticia?: string;
  galeria?: string[];
  body?: any;
  slug?: { current: string };
}
