import React from 'react'
import Link from 'next/link'
import { EventoProps, SanityDocumentType } from './types'

import CardAniversario from './CardAniversario'
import CardConscienciaNegra from './CardConscienciaNegra'
import CardRodaConsciencia from './CardRodaConsciencia'
import CardMostraEscolar from './CardMostraEscolar'
import CardOficina from './CardOficina'
import CardEventoExterno from './CardEventoExterno'
import CardNoticia from './CardNoticia'
import CardDocumento from './CardDocumento'

/**
 * EventCard — Dispatcher de Cards do Centro Cultural Filhos de Obaluaiê
 *
 * Recebe dados brutos do Sanity (via GROQ) e delega para o card visual correto.
 *
 * Mapeamento _type → Card:
 *  rodaAniversariantes      → CardAniversario
 *  encontroConscienciaNegra → CardConscienciaNegra
 *  rodaConsciencia          → CardRodaConsciencia
 *  mostraCultural           → CardMostraEscolar
 *  oficina                  → CardOficina
 *  eventoExterno            → CardEventoExterno
 *  documento                → CardDocumento  (sem wrapper Link — link interno no card)
 *  noticia                  → CardNoticia   (padrão)
 */
export default function EventCard({ data }: { data: EventoProps }) {
  // Identifica o tipo do documento (preferindo o formato do CMS, com fallback pro mock)
  const sanityType: string = data._type ?? data.tipo ?? 'noticia'

  // CardDocumento não usa Link wrapper — tem botão de download interno
  if (sanityType === 'documento') {
    return <CardDocumento data={data} />
  }

  // Slug pode vir como string ou objeto { current: string }
  const slugValue = typeof data.slug === 'string'
    ? data.slug
    : data.slug?.current ?? null
  const href = slugValue ? `/conteudo/${slugValue}` : '#'

  const cardMap: Record<SanityDocumentType, React.ReactElement> = {
    rodaAniversariantes:      <CardAniversario data={data} />,
    encontroConscienciaNegra: <CardConscienciaNegra data={data} />,
    rodaConsciencia:          <CardRodaConsciencia data={data} />,
    mostraCultural:           <CardMostraEscolar data={data} />,
    oficina:                  <CardOficina data={data} />,
    eventoExterno:            <CardEventoExterno data={data} />,
    documento:                <CardDocumento data={data} />,
    noticia:                  <CardNoticia data={data} />,
  }

  const CardComponent = cardMap[sanityType as SanityDocumentType] ?? <CardNoticia data={data} />

  return (
    <Link
      href={href}
      className="block h-full cursor-pointer transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-[var(--radius-card)]"
      aria-label={`Ver detalhes: ${data.titulo}`}
    >
      {CardComponent}
    </Link>
  )
}
