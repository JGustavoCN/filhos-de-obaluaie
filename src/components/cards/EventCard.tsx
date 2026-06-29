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
  switch (data.tipo) {
    case "aniversario": return <CardAniversario data={data} />;
    case "consciencia-negra": return <CardConscienciaNegra data={data} />;
    case "roda-consciencia": return <CardRodaConsciencia data={data} />;
    case "mostra-escolar": return <CardMostraEscolar data={data} />;
    case "oficina": return <CardOficina data={data} />;
    case "evento-externo": return <CardEventoExterno data={data} />;
    case "documento": return <CardDocumento data={data} />;
    case "noticia":
    default:
      return <CardNoticia data={data} />;
  }
}
