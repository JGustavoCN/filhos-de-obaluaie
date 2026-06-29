import React from 'react';
import { client } from '@/sanity/client';
import { CONTEUDO_POR_SLUG_QUERY } from '@/sanity/queries';
import { notFound } from 'next/navigation';
// Se utilizarem portabletext, será necessário o pacote '@portabletext/react'
// import { PortableText } from '@portabletext/react';

export default async function DetalhePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const conteudo = await client.fetch(CONTEUDO_POR_SLUG_QUERY, { slug: resolvedParams.slug });
  
  if (!conteudo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-neutral-900 text-neutral-100">
      {/* CABEÇALHO HERO - COM A IMAGEM DE CAPA DE FUNDO */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-end">
        {conteudo.imagemCapa && (
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${conteudo.imagemCapa})` }}
          />
        )}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent" />
        
        <div className="relative z-20 max-w-4xl mx-auto w-full px-6 pb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/30">
              {conteudo._type}
            </span>
            {conteudo.dataEvento && (
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold">
                {conteudo.dataEvento}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            {conteudo.titulo}
          </h1>
          {conteudo.resumo && (
            <p className="text-xl text-neutral-300 max-w-2xl">
              {conteudo.resumo}
            </p>
          )}
        </div>
      </section>

      {/* INFORMAÇÕES ESPECÍFICAS DEPENDENDO DO TIPO */}
      <section className="max-w-4xl mx-auto w-full px-6 py-8 border-b border-neutral-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          {conteudo.local && (
            <div>
              <p className="text-neutral-500 mb-1">Local</p>
              <p className="font-semibold">{conteudo.local}</p>
            </div>
          )}
          {conteudo.mestreConvidado && (
            <div>
              <p className="text-neutral-500 mb-1">Mestre Convidado</p>
              <p className="font-semibold text-amber-500">{conteudo.mestreConvidado}</p>
            </div>
          )}
          {conteudo.oficineiro && (
            <div>
              <p className="text-neutral-500 mb-1">Oficineiro</p>
              <p className="font-semibold">{conteudo.oficineiro}</p>
            </div>
          )}
          {conteudo.edicao && (
            <div>
              <p className="text-neutral-500 mb-1">Edição</p>
              <p className="font-semibold">{conteudo.edicao}ª Edição</p>
            </div>
          )}
        </div>
      </section>

      {/* CORPO DO TEXTO */}
      <article className="max-w-3xl mx-auto w-full px-6 py-12 prose prose-invert prose-amber lg:prose-lg">
        {/* Futuramente usar <PortableText value={conteudo.body} /> */}
        {conteudo.body ? (
          <div className="bg-neutral-800 p-8 rounded-xl border border-neutral-700 italic text-center">
            [O texto formatado do evento será renderizado aqui utilizando o PortableText do Sanity]
          </div>
        ) : (
          <p className="text-neutral-400 italic">Nenhum detalhe adicional fornecido para este evento.</p>
        )}
      </article>

      {/* GALERIA DE FOTOS COMPLETAS (MEMÓRIA) */}
      {conteudo.galeria && conteudo.galeria.length > 0 && (
        <section className="max-w-7xl mx-auto w-full px-6 py-16 border-t border-neutral-800">
          <header className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-3">Galeria e Memória</h2>
            <p className="text-neutral-400">Registros fotográficos do evento</p>
          </header>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {conteudo.galeria.map((fotoUrl: string, idx: number) => (
              <div 
                key={idx} 
                className="aspect-square bg-neutral-800 rounded-xl overflow-hidden group cursor-pointer border border-neutral-700 hover:border-amber-500 transition-colors"
              >
                <img 
                  src={fotoUrl} 
                  alt={`Registro ${idx + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
