import React from "react";
import Link from 'next/link';
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

  if (normalizado === "documento") {
    return <CardDocumento data={data} />;
  }

  const href = data.slug ? `/conteudo/${data.slug}` : "#";
  let CardComponent;

  switch (normalizado) {
    case "aniversario": CardComponent = <CardAniversario data={data} />; break;
    case "conscienciaNegra": CardComponent = <CardConscienciaNegra data={data} />; break;
    case "rodaConsciencia": CardComponent = <CardRodaConsciencia data={data} />; break;
    case "mostraEscolar": CardComponent = <CardMostraEscolar data={data} />; break;
    case "oficina": CardComponent = <CardOficina data={data} />; break;
    case "eventoExterno": CardComponent = <CardEventoExterno data={data} />; break;
    case "noticia":
    default:
      CardComponent = <CardNoticia data={data} />; break;
  }

  return (
    <Link href={href} className="block h-full cursor-pointer transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[var(--radius-card)]">
      {CardComponent}
    </Link>
  );
}
