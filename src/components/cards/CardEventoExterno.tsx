import React from 'react';
import { EventoProps } from './types';
import { NetworkIcon, CalendarIcon, LocationIcon } from './icons';
import { formatDateShort } from '@/lib/formatDate';

export default function CardEventoExterno({ data }: { data: EventoProps }) {
  return (
    <div className="glass-card h-full p-5 sm:p-6 flex flex-col sm:flex-row gap-5 sm:gap-6 items-start group transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-lg relative overflow-hidden">
      
      {/* Image or Icon Area */}
      <div className="shrink-0 w-full sm:w-28 sm:h-28 md:w-32 md:h-32">
        {data.imagemCapa ? (
          <div className="w-full h-48 sm:h-full rounded-2xl overflow-hidden shadow-sm border-2 border-[var(--color-surface-container-high)]">
            <img 
              src={data.imagemCapa} 
              alt={data.titulo} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
          </div>
        ) : (
          <div className="w-16 h-16 sm:w-full sm:h-full bg-gradient-to-br from-[var(--color-surface-container)] to-[var(--color-surface-container-high)] border-2 border-[var(--color-outline-variant)]/50 text-[var(--color-primary)] rounded-full sm:rounded-2xl flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] group-hover:text-white transition-all duration-500 shadow-sm group-hover:scale-105 group-hover:rotate-6">
            <NetworkIcon className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
        )}
      </div>
      
      {/* Content Area */}
      <div className="flex-1 min-w-0 flex flex-col h-full w-full">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="bg-[var(--color-primary)] text-on-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
             {data.tipoParticipacao
               ? data.tipoParticipacao.replace('-', ' ')
               : 'Participação Externa'}
          </span>
          {data.organizador && (
            <span className="text-xs font-bold text-[var(--color-primary)] tracking-wide bg-[var(--color-primary-container)]/30 px-2.5 py-1 rounded-md">
              {data.organizador}
            </span>
          )}
        </div>
        
        <h3 className="text-xl sm:text-2xl font-headline font-bold text-[var(--color-on-surface)] leading-snug mb-2">
          {data.titulo || 'Evento Externo'}
        </h3>

        {/* Resumo */}
        {data.resumo && (
          <p className="text-[var(--color-on-surface-light)] text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4">
            {data.resumo}
          </p>
        )}
        
        {/* Metadata Area alinhada ao fundo do conteúdo */}
        <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-y-3 gap-x-4 border-t border-[var(--color-outline-variant)]/60 w-full">
          {(data.dataCard ?? data.dataEvento) && (
            <span className="flex items-center gap-2 text-sm text-[var(--color-on-surface-variant)] font-medium">
              <CalendarIcon /> {formatDateShort(data.dataCard ?? data.dataEvento ?? '')}
            </span>
          )}
          
          {data.local && (
            <span className="flex items-center gap-1.5 text-sm text-[var(--color-on-surface-light)]">
              <LocationIcon className="text-[var(--color-primary)] shrink-0 w-4 h-4" /> 
              <span className="line-clamp-1">{data.local}</span>
            </span>
          )}
        </div>
      </div>
      
    </div>
  );
}
