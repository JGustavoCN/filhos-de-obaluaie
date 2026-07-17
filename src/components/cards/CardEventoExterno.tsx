import React from 'react';
import { EventoProps } from './types';
import { NetworkIcon, CalendarIcon, LocationIcon } from './icons';
import { formatDateShort } from '@/lib/formatDate';

export default function CardEventoExterno({ data }: { data: EventoProps }) {
  return (
    <div className="glass-card p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start group transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-lg relative overflow-hidden bg-surface">
      
      {/* Image or Icon Area */}
      <div className="shrink-0 w-full sm:w-24 sm:h-24">
        {data.imagemCapa ? (
          <div className="w-full h-40 sm:h-full rounded-xl overflow-hidden shadow-sm border border-[var(--color-surface-container-high)]">
            <img 
              src={data.imagemCapa} 
              alt={data.titulo} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
          </div>
        ) : (
          <div className="w-16 h-16 sm:w-full sm:h-full bg-gradient-to-br from-[var(--color-surface-container)] to-[var(--color-surface-container-high)] border border-[var(--color-outline-variant)]/50 text-[var(--color-primary)] rounded-full sm:rounded-xl flex items-center justify-center group-hover:bg-[var(--color-primary-container)] transition-all duration-500 shadow-sm group-hover:scale-105">
            <NetworkIcon className="w-8 h-8 sm:w-10 sm:h-10 opacity-80" />
          </div>
        )}
      </div>
      
      {/* Content Area */}
      <div className="flex-1 min-w-0 flex flex-col h-full w-full">
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          <span className="bg-[var(--color-primary)] text-on-primary text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
             {data.tipoParticipacao
               ? data.tipoParticipacao.replace('-', ' ')
               : 'Externa'}
          </span>
          {data.organizador && (
            <span className="text-[10px] font-bold text-[var(--color-primary)] tracking-wide bg-[var(--color-primary-container)]/30 px-2 py-0.5 rounded truncate max-w-[120px]">
              {data.organizador}
            </span>
          )}
        </div>
        
        <h3 className="text-lg sm:text-xl font-headline font-bold text-[var(--color-on-surface)] leading-tight mb-2 group-hover:text-[var(--color-primary-hover)] transition-colors">
          {data.titulo || 'Evento Externo'}
        </h3>

        {/* Resumo */}
        {data.resumo && (
          <p className="text-[var(--color-on-surface-light)] text-sm leading-snug line-clamp-2 mb-3">
            {data.resumo}
          </p>
        )}
        
        {/* Metadata Area alinhada ao fundo do conteúdo */}
        <div className="mt-auto pt-3 flex flex-col gap-1.5 border-t border-[var(--color-outline-variant)]/50 w-full">
          {(data.dataCard ?? data.dataEvento) && (
            <span className="flex items-center gap-1.5 text-xs text-[var(--color-on-surface-variant)] font-medium">
              <CalendarIcon /> {formatDateShort(data.dataCard ?? data.dataEvento ?? '')}
            </span>
          )}
          
          {data.local && (
            <span className="flex items-center gap-1.5 text-xs text-[var(--color-on-surface-light)]">
              <LocationIcon className="text-[var(--color-primary)] shrink-0 w-3.5 h-3.5" /> 
              <span className="line-clamp-1">{data.local}</span>
            </span>
          )}
        </div>
      </div>
      
    </div>
  );
}
