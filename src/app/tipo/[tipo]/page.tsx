import React from 'react';
import { client } from '@/sanity/client';
import { CONTEUDO_POR_TIPO_QUERY } from '@/sanity/queries';
import EventCard from '@/components/cards/EventCard';
import { notFound } from 'next/navigation';

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ tipo: string }>
}) {
  const resolvedParams = await params;
  
  // Como o usuário digitará a URL com hifens (ex: /tipo/consciencia-negra)
  // precisamos converter para o formato do schema do Sanity (camelCase)
  const tipoSanity = resolvedParams.tipo.replace(/-([a-z])/g, (g: string) => g[1].toUpperCase());
  
  // Buscar os dados
  const conteudos = await client.fetch(CONTEUDO_POR_TIPO_QUERY, { tipo: tipoSanity });
  
  if (!conteudos || conteudos.length === 0) {
    // Se não houver nada, exibe mensagem genérica mas não retorna 404 (para não quebrar a página)
  }

  return (
    <main className="min-h-screen bg-neutral-900 p-8 pt-24 text-white">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-neutral-800 pb-8">
          <h1 className="text-4xl font-bold mb-4 capitalize">
            {resolvedParams.tipo.replace(/-/g, ' ')}
          </h1>
          <p className="text-neutral-400">
            Explorando o acervo do Centro Cultural.
          </p>
        </header>

        {conteudos && conteudos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
            {conteudos.map((item: any) => (
              <EventCard key={item._id} data={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-neutral-800 rounded-2xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-2">Nenhum registro encontrado</h2>
            <p className="text-neutral-400">Ainda não há publicações cadastradas nesta categoria.</p>
          </div>
        )}
      </div>
    </main>
  );
}
