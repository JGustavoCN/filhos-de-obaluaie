import React from 'react';
import { EventoProps } from './types';
import { BerimbauIcon, CalendarIcon } from './icons';
import { formatDateShort } from '@/lib/formatDate';

export default function CardRodaConsciencia({ data }: { data: EventoProps }) {
  // Prioriza a foto do mestre, senão usa a capa, senão uma imagem de capoeira genérica
  const imgFinal = data.fotoMestre || data.imagemCapa || "https://images.unsplash.com/photo-1506869640319-fea1a2ab8e9c?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="bg-[var(--color-surface)] flex flex-col md:flex-row h-full relative overflow-hidden group border border-[var(--color-outline)]/20 rounded-2xl transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
      
      {/* Lado Esquerdo / Topo: Foto Principal */}
      <div className="relative w-full md:w-2/5 md:min-w-[40%] h-64 md:h-auto overflow-hidden shrink-0">
        <img 
          src={imgFinal} 
          alt={data.mestreConvidado || data.titulo} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
        />
        {/* Gradiente escuro para garantir leitura caso haja textos sobrepostos futuramente e dar profundidade */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 md:from-black/40 via-transparent to-transparent opacity-80 md:opacity-100"></div>
        
        {/* Badge posicionada em cima da imagem */}
        <div className="absolute top-5 left-5 z-10">
          <span className="flex items-center gap-2 bg-[var(--color-primary)] text-on-primary text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
            <BerimbauIcon className="w-4 h-4" /> Roda da Consciência
          </span>
        </div>
      </div>

      {/* Lado Direito / Base: Conteúdo */}
      <div className="p-6 md:p-8 flex flex-col flex-1 relative z-10 bg-[var(--color-surface-container-lowest)]">
        
        {/* Marca d'água sutil do Berimbau */}
        <div className="absolute -right-8 -bottom-8 text-[var(--color-primary)] opacity-5 z-0 rotate-12 transition-all duration-1000 group-hover:rotate-0 group-hover:scale-110">
          <BerimbauIcon className="w-56 h-56 drop-shadow-sm" />
        </div>

        {/* Informação do Mestre */}
        <div className="relative z-10 mb-2">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)] block mb-1">
            Mestre Convidado
          </span>
          <h4 className="font-headline font-extrabold text-2xl md:text-3xl lg:text-4xl text-[var(--color-on-surface)] leading-tight drop-shadow-sm">
            {data.mestreConvidado || "Mestre Convidado"}
          </h4>
        </div>

        {/* Título do Evento */}
        <h3 className="text-lg md:text-xl font-headline font-bold text-[var(--color-on-surface-variant)] leading-tight mb-5 relative z-10">
          {data.titulo || 'Roda da Consciência'}
        </h3>

        {/* Quote / Resumo Estilizado */}
        {data.resumo && (
          <div className="relative mb-8 flex-1 z-10 border-l-4 border-[var(--color-primary)]/40 pl-5 py-1">
            <p className="text-[var(--color-on-surface-light)] text-sm md:text-base italic leading-relaxed">
              &ldquo;{data.resumo}&rdquo;
            </p>
          </div>
        )}

        {/* Meta Row / Rodapé do Card */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-auto border-t border-[var(--color-outline)]/10 pt-5 relative z-10">
          {(data.dataCard ?? data.dataEvento) && (
            <span className="flex items-center gap-2 text-[var(--color-on-surface-variant)] font-medium text-sm">
              <CalendarIcon />
              {formatDateShort(data.dataCard ?? data.dataEvento ?? '')}
            </span>
          )}
          <span className="bg-[var(--color-surface-container-highest)] text-[var(--color-on-surface)] text-xs font-bold px-4 py-1.5 rounded-full border border-[var(--color-outline)]/10 shadow-sm">
            {data.abertoAoPublico !== false ? 'ENTRADA LIVRE' : 'RESTRITO'}
          </span>
        </div>

      </div>
    </div>
  );
}
