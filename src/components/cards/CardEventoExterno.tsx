import React from 'react';
import { EventoProps } from './types';
import { NetworkIcon, CalendarIcon, LocationIcon } from './icons';
import { formatDateShort } from '@/lib/formatDate';

export default function CardEventoExterno({ data }: { data: EventoProps }) {
  return (
    <div className="glass-card p-6 md:p-8 flex flex-col sm:flex-row gap-6 md:gap-8 items-start sm:items-center group transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-lg">
      
      {/* Icon Area - Maior e com mais destaque */}
      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[var(--color-surface-container)] to-[var(--color-surface-container-high)] border-2 border-[var(--color-outline-variant)]/50 text-[var(--color-primary)] rounded-full flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] group-hover:text-white transition-all duration-500 shadow-sm group-hover:scale-105 group-hover:rotate-12">
        <NetworkIcon className="w-8 h-8 md:w-10 md:h-10" />
      </div>
      
      {/* Content Area - Respiro entre tags e título */}
      <div className="flex-1 min-w-0 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="badge-tipo badge-evento">
             {data.tipoParticipacao
               ? data.tipoParticipacao.charAt(0).toUpperCase() + data.tipoParticipacao.slice(1).replace('-', ' ')
               : 'Participação Externa'}
          </span>
          {data.organizador && (
            <span className="text-sm font-bold text-[var(--color-primary)] tracking-wide bg-[var(--color-primary-container)]/30 dark:bg-black/20 px-3 py-1 rounded-md">
              {data.organizador}
            </span>
          )}
        </div>
        
        <h3 className="text-xl md:text-2xl font-headline font-bold text-[var(--color-on-surface)] leading-snug">
          {data.titulo || 'Evento Externo'}
        </h3>
      </div>
      
      {/* Metadata Area - Separação mais clara e estilizada */}
      <div className="meta-row shrink-0 flex-col sm:items-end border-t sm:border-t-0 sm:border-l border-[var(--color-outline-variant)]/60 pt-5 sm:pt-0 sm:pl-6 md:pl-8 mt-2 sm:mt-0 w-full sm:w-auto">
        
        <span className="meta-date">
          <CalendarIcon /> {formatDateShort(data.dataCard ?? data.dataEvento ?? '')}
        </span>
        
        {data.local && (
          <span className="meta-value sm:justify-end px-2">
            <LocationIcon className="text-[var(--color-primary)]" /> {data.local}
          </span>
        )}
      </div>
    </div>
  );
}
