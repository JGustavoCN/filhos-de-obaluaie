import React from "react";
import { EventoProps } from './types';

import CardAniversario from './CardAniversario';
import CardConscienciaNegra from './CardConscienciaNegra';
import CardRodaConsciencia from './CardRodaConsciencia';
import CardMostraEscolar from './CardMostraEscolar';
import CardOficina from './CardOficina';
import CardEventoExterno from './CardEventoExterno';
import CardNoticia from './CardNoticia';
import CardDocumento from './CardDocumento';

export default function EventCard({ data }: { data: EventoProps }) {
  // Suporte duplo: API do Sanity usa _type (ex: 'conscienciaNegra'), mocks usam tipo
  const tipoSanity = (data as any)._type || data.tipo;
  
  // Normalização
  const normalizado = tipoSanity.replace(/-([a-z])/g, (g: string) => g[1].toUpperCase());

  switch (normalizado) {
    case "aniversario": return <CardAniversario data={data} />;
    case "conscienciaNegra": return <CardConscienciaNegra data={data} />;
    case "rodaConsciencia": return <CardRodaConsciencia data={data} />;
    case "mostraEscolar": return <CardMostraEscolar data={data} />;
    case "oficina": return <CardOficina data={data} />;
    case "eventoExterno": return <CardEventoExterno data={data} />;
    case "documento": return <CardDocumento data={data} />;
    case "noticia":
    default:
      return <CardNoticia data={data} />;
  }
}
