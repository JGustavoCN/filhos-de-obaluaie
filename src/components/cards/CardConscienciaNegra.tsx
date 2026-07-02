import React from 'react';
import { EventoProps } from './types';
import { CalendarIcon, LocationIcon } from './icons';
import { formatDateShort, toRoman } from '@/lib/formatDate';

export default function CardConscienciaNegra({ data }: { data: EventoProps }) {
  const imgCapa = data.imagemCapa || "https://images.unsplash.com/photo-1531123897727-8f129e1bfd8c?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="bg-[var(--color-surface)] rounded-2xl overflow-hidden flex flex-col group spring-transition hover:-translate-y-2 hover:shadow-xl border border-[var(--color-outline)]/20">
      <div className="relative w-full aspect-video overflow-hidden">
        <img src={imgCapa} alt={data.titulo} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        
        {/* Overlay gradient apenas sutil embaixo para sustentar a badge, sem sujar a foto toda */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
        
        <div className="absolute bottom-4 left-5 z-10 flex flex-wrap items-center gap-2">
          <span className="badge-tipo badge-evento">
            Encontro
          </span>
          {data.edicao && (
            <span className="badge-tipo badge-memoria">
              {data.edicaoRomano || toRoman(data.edicao)} Edição
            </span>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 relative">
        <h3 className="text-2xl font-headline font-bold text-[var(--color-on-surface)] mb-3 group-hover:text-[var(--color-primary)] transition-colors leading-tight">
          {data.titulo}
        </h3>
        
        {data.resumo && <p className="text-[var(--color-on-surface-light)] text-sm mb-6 flex-1 line-clamp-3 leading-relaxed opacity-90">{data.resumo}</p>}
        
        <div className="meta-row justify-between mt-auto border-t border-[var(--color-outline)]/20 pt-4">
          {(data.dataCard ?? data.dataInicio ?? data.dataEvento) && (
            <span className="meta-date">
              <CalendarIcon /> {formatDateShort(data.dataCard ?? data.dataInicio ?? data.dataEvento)}
            </span>
          )}
          {data.local && (
            <span className="meta-value">
              <LocationIcon className="text-[var(--color-primary)]" /> {data.local}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
