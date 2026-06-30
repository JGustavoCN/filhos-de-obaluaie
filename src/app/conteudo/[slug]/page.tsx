import React from 'react';
import { client } from '@/sanity/client';
import { CONTEUDO_POR_SLUG_QUERY } from '@/sanity/queries';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';

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
    <main className="min-h-screen bg-surface text-on-surface">
      {/* CABEÇALHO HERO - COM A IMAGEM DE CAPA DE FUNDO */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-end">
        {conteudo.imagemCapa && (
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${conteudo.imagemCapa})` }}
          />
        )}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-surface via-surface/90 to-transparent" />
        
        <div className="relative z-20 max-w-4xl mx-auto w-full px-6 pb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider border border-primary/20">
              {conteudo._type}
            </span>
            {conteudo.dataEvento && (
              <span className="px-3 py-1 bg-on-surface/10 rounded-full text-xs font-semibold text-on-surface">
                {conteudo.dataEvento}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-[var(--font-headline)] font-bold mb-4 leading-tight text-on-surface">
            {conteudo.titulo}
          </h1>
          {conteudo.resumo && (
            <p className="text-xl text-on-surface/80 max-w-2xl">
              {conteudo.resumo}
            </p>
          )}
        </div>
      </section>

      {/* INFORMAÇÕES ESPECÍFICAS DEPENDENDO DO TIPO */}
      <section className="max-w-4xl mx-auto w-full px-6 py-10 border-b border-outline-variant/30">
        <div className="bg-surface-container p-6 md:p-8 rounded-[12px] border border-outline-variant/50 shadow-sm">
          <h3 className="text-primary text-sm font-bold tracking-widest uppercase mb-8 flex items-center gap-3">
            <span className="w-8 h-px bg-primary/50"></span>
            Ficha de Detalhes
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6">
            
            {conteudo.local && (
              <div className="flex flex-col gap-1.5">
                <span className="text-on-surface/60 text-xs font-bold uppercase tracking-wider">Local</span>
                <span className="text-lg font-medium text-on-surface">{conteudo.local}</span>
              </div>
            )}

            {conteudo.mestreConvidado && (
              <div className="flex flex-col gap-1.5">
                <span className="text-on-surface/60 text-xs font-bold uppercase tracking-wider">Mestre Convidado</span>
                <span className="text-lg font-bold text-primary">{conteudo.mestreConvidado}</span>
              </div>
            )}

            {conteudo.oficineiro && (
              <div className="flex flex-col gap-1.5">
                <span className="text-on-surface/60 text-xs font-bold uppercase tracking-wider">Instrutor / Oficineiro</span>
                <span className="text-lg font-medium text-on-surface">{conteudo.oficineiro}</span>
              </div>
            )}

            {conteudo.faixaEtaria && (
              <div className="flex flex-col gap-1.5">
                <span className="text-on-surface/60 text-xs font-bold uppercase tracking-wider">Público-Alvo</span>
                <span className="text-lg font-medium text-on-surface">{conteudo.faixaEtaria}</span>
              </div>
            )}

            {conteudo.edicao && (
              <div className="flex flex-col gap-1.5">
                <span className="text-on-surface/60 text-xs font-bold uppercase tracking-wider">Edição</span>
                <span className="text-lg font-medium text-on-surface">{conteudo.edicao}ª Edição</span>
              </div>
            )}

            {conteudo.tamanhoArquivo && (
              <div className="flex flex-col gap-1.5">
                <span className="text-on-surface/60 text-xs font-bold uppercase tracking-wider">Tamanho do Arquivo</span>
                <span className="text-lg font-medium text-on-surface">{conteudo.tamanhoArquivo}</span>
              </div>
            )}
            
            {conteudo.escolasParticipantes && conteudo.escolasParticipantes.length > 0 && (
              <div className="flex flex-col gap-3 md:col-span-2 lg:col-span-3 mt-2">
                <span className="text-on-surface/60 text-xs font-bold uppercase tracking-wider">Escolas Participantes</span>
                <div className="flex flex-wrap gap-2">
                  {conteudo.escolasParticipantes.map((escola: string) => (
                    <span key={escola} className="px-4 py-2 bg-surface-container-high text-on-surface text-sm font-medium rounded-pill border border-outline-variant/50">
                      {escola}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {conteudo.aniversariantes && conteudo.aniversariantes.length > 0 && (
              <div className="flex flex-col gap-3 md:col-span-2 lg:col-span-3 mt-2">
                <span className="text-on-surface/60 text-xs font-bold uppercase tracking-wider">Aniversariantes Homenageados</span>
                <div className="flex flex-wrap gap-2">
                  {conteudo.aniversariantes.map((nome: string) => (
                    <span key={nome} className="px-4 py-2 bg-primary/5 text-primary text-sm font-bold rounded-pill border border-primary/20">
                      {nome}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {conteudo.arquivo && (
             <div className="mt-8 pt-8 border-t border-outline-variant/30 flex justify-start">
               <a 
                 href={`${conteudo.arquivo}?dl=`} 
                 className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-surface font-bold rounded-pill hover:bg-primary-hover hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
               >
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                 BAIXAR ARQUIVO COMPLETO
               </a>
             </div>
          )}
        </div>
      </section>

      {/* CORPO DO TEXTO */}
      <article className="max-w-3xl mx-auto w-full px-6 py-12 prose max-w-none text-on-surface [&_p]:text-on-surface/80 [&_h1]:text-primary [&_h2]:text-primary [&_h3]:text-primary [&_strong]:text-primary">
        {conteudo.body ? (
          <PortableText value={conteudo.body} />
        ) : (
          <p className="text-on-surface/50 italic">Nenhum detalhe adicional fornecido para este evento.</p>
        )}
      </article>

      {/* GALERIA DE FOTOS COMPLETAS (MEMÓRIA) */}
      {conteudo.galeria && conteudo.galeria.length > 0 && (
        <section className="max-w-7xl mx-auto w-full px-6 py-16 border-t border-outline-variant/30">
          <header className="mb-10 text-center">
            <h2 className="text-3xl font-[var(--font-headline)] font-bold mb-3 text-on-surface">Galeria e Memória</h2>
            <p className="text-on-surface/70">Registros fotográficos e documentais</p>
          </header>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {conteudo.galeria.map((fotoUrl: string, idx: number) => (
              <div 
                key={idx} 
                className="aspect-square bg-surface-container rounded-[12px] overflow-hidden group cursor-pointer border border-outline/10 hover:border-primary transition-colors shadow-sm"
              >
                <img 
                  src={fotoUrl} 
                  alt={`Registro ${idx + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
