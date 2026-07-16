import React from 'react';
import { client } from '@/sanity/client';
import { CONTEUDO_POR_TIPO_QUERY } from '@/sanity/queries';
import EventCard from '@/components/cards/EventCard';
import Navbar from '@/components/Navbar';
import type { EventoProps, SanityDocumentType } from '@/components/cards/types';

/**
 * Mapeamento de slug de URL para _type do Sanity.
 *
 * O usuário acessa a URL com kebab-case:
 *   /tipo/roda-aniversariantes
 *   /tipo/encontro-consciencia-negra
 *   /tipo/roda-consciencia
 *   /tipo/mostra-cultural
 *   /tipo/oficina
 *   /tipo/evento-externo
 *   /tipo/documento
 *   /tipo/noticia
 *
 * O Sanity usa camelCase nos _type:
 *   rodaAniversariantes, encontroConscienciaNegra, etc.
 */
const URL_SLUG_TO_SANITY_TYPE: Record<string, SanityDocumentType> = {
  'roda-aniversariantes':       'rodaAniversariantes',
  'encontro-consciencia-negra': 'encontroConscienciaNegra',
  'roda-consciencia':           'rodaConsciencia',
  'mostra-cultural':            'mostraCultural',
  'oficina':                    'oficina',
  'evento-externo':             'eventoExterno',
  'documento':                  'documento',
  'noticia':                    'noticia',
}

const TITULO_POR_TIPO: Record<SanityDocumentType, string> = {
  rodaAniversariantes:      'Rodas de Aniversariantes',
  encontroConscienciaNegra: 'Encontro da Consciência Negra',
  rodaConsciencia:          'Rodas da Consciência',
  mostraCultural:           'Mostra Cultural para Escolas',
  oficina:                  'Aulas e Oficinas',
  eventoExterno:            'Participações em Eventos Externos',
  documento:                'Documentos Institucionais',
  noticia:                  'Notícias e Comunicados',
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ tipo: string }>
}) {
  const resolvedParams = await params;
  const slugTipo = resolvedParams.tipo;

  // Tenta mapear pelo dicionário; fallback: toCamelCase genérico
  const tipoSanity: string =
    URL_SLUG_TO_SANITY_TYPE[slugTipo] ??
    slugTipo.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase());

  const conteudos = await client.fetch(CONTEUDO_POR_TIPO_QUERY, { tipo: tipoSanity });

  // Normaliza imagemCapa de objeto para string
  const normalizados: EventoProps[] = (conteudos ?? []).map((item: Record<string, unknown>) => ({
    ...item as unknown as EventoProps,
    imagemCapa: typeof item?.imagemCapa === 'object' && item?.imagemCapa !== null ? (item.imagemCapa as { url?: string }).url ?? undefined : item?.imagemCapa as string ?? undefined,
    galeria: Array.isArray(item?.galeria) ? item.galeria.map((g) => typeof g === 'object' && g !== null ? (g as { url?: string }).url ?? '' : g as string) : [],
    fotoMestre: typeof item?.fotoMestre === 'object' && item?.fotoMestre !== null ? (item.fotoMestre as { url?: string }).url ?? undefined : item?.fotoMestre as string ?? undefined,
  }));

  const tituloPagina =
    TITULO_POR_TIPO[tipoSanity as SanityDocumentType] ??
    slugTipo.replace(/-/g, ' ')

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-neutral-900 p-8 pt-24 text-white">
        <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-neutral-800 pb-8">
          <h1 className="text-4xl font-bold mb-4 capitalize">
            {tituloPagina}
          </h1>
          <p className="text-neutral-400">
            Explorando o acervo do Centro Cultural Filhos de Obaluaiê.
          </p>
        </header>

        {normalizados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
            {normalizados.map((item: EventoProps) => (
              <EventCard key={item._id} data={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-neutral-800 rounded-2xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-2">Nenhum registro encontrado</h2>
            <p className="text-neutral-400">
              Ainda não há publicações cadastradas nesta categoria.
            </p>
          </div>
        )}
      </div>
      </main>
    </>
  );
}
