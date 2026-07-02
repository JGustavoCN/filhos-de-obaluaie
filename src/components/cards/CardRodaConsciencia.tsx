import React from 'react';
import { EventoProps } from './types';
import { BerimbauIcon, CalendarIcon } from './icons';
import { formatDateShort } from '@/lib/formatDate';

export default function CardRodaConsciencia({ data }: { data: EventoProps }) {
  const imgCapa = data.imagemCapa || "https://images.unsplash.com/photo-1506869640319-fea1a2ab8e9c?auto=format&fit=crop&w=400&q=80";

  return (
    <div className="glass-card card-roda-consciencia flex flex-col h-full relative overflow-hidden group border-l-[6px] border-l-[var(--color-primary)] transition-all duration-500 hover:border-l-[12px]">
      
      {/* Marca d'água do Berimbau */}
      <div className="absolute -right-6 -bottom-6 text-[var(--color-primary)] opacity-5 dark:opacity-10 z-0 rotate-12 transition-all duration-1000 group-hover:rotate-0 group-hover:scale-110 group-hover:opacity-10 dark:group-hover:opacity-20">
        <BerimbauIcon className="w-56 h-56 drop-shadow-sm" />
      </div>

      {/* Cabeçalho com Imagem de Perfil à esquerda */}
      <div className="p-6 pb-2 flex gap-5 relative z-10 items-center">
        {/* Imagem de Rosto (Aredondada para não cortar) */}
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden shrink-0 border-4 border-[var(--color-surface-container-high)] shadow-lg transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2">
          <img src={imgCapa} alt={data.mestreConvidado || "Mestre"} className="w-full h-full object-cover" />
        </div>
        
        {/* Infos do Mestre */}
        <div className="flex flex-col justify-center">
          <span className="badge-tipo badge-evento mb-3">
            <BerimbauIcon className="w-3.5 h-3.5" /> Roda da Consciência
          </span>
          <span className="meta-label">
            Mestre Convidado
          </span>
          <h4 className="font-headline font-bold text-xl sm:text-2xl leading-tight text-[var(--color-on-surface)] mt-1 drop-shadow-sm">
            {data.mestreConvidado || "Mestre Convidado"}
          </h4>
        </div>
      </div>

      <div className="px-6 flex flex-col flex-1 relative z-10 mt-3">
        <h3 className="text-xl sm:text-2xl font-headline font-bold text-[var(--color-on-surface)] leading-tight mb-5 drop-shadow-sm">
          {data.titulo}
        </h3>

        {/* Quote/Resumo - Estilizado como citação oral */}
        {data.resumo && (
          <div className="relative mt-1 mb-6 flex-1">
            <span className="absolute -left-2 -top-3 text-5xl text-[var(--color-primary)] opacity-20 font-serif leading-none select-none">&ldquo;</span>
            <p className="text-[var(--color-on-surface-light)] text-sm sm:text-base italic pl-6 leading-relaxed z-10 relative">
              {data.resumo}
            </p>
          </div>
        )}

        <div className="meta-row justify-between mt-auto border-t border-[var(--color-outline-variant)] pt-4">
          {(data.dataCard ?? data.dataEvento) && (
            <span className="meta-date">
              <CalendarIcon />
              {formatDateShort(data.dataCard ?? data.dataEvento ?? '')}
            </span>
          )}
          <span className="meta-tag">
            {data.abertoAoPublico !== false ? 'Entrada livre' : 'Restrito'}
          </span>
        </div>
      </div>
    </div>
  );
}
