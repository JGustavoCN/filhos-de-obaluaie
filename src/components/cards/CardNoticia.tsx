import React from 'react';
import { EventoProps } from './types';
import { NewsIcon, CalendarIcon } from './icons';
import { formatDate } from '@/lib/formatDate';

export default function CardNoticia({ data }: { data: EventoProps }) {
  return (
    <div className="glass-card overflow-hidden flex flex-col group spring-transition hover:-translate-y-2 hover:border-[var(--color-primary)]">
      <div className="w-full aspect-[4/3] overflow-hidden bg-[var(--color-surface-container-high)]">
        {data.imagemCapa ? (
          <img
            src={data.imagemCapa}
            alt={data.titulo}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div aria-hidden="true" className="flex h-full w-full items-center justify-center text-[var(--color-primary)]">
            <NewsIcon className="h-14 w-14 opacity-60" />
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <span className="badge-tipo badge-noticia">
            <NewsIcon className="w-3 h-3" />
            {data.categoriaNoticia
              ? data.categoriaNoticia.charAt(0).toUpperCase() + data.categoriaNoticia.slice(1).replace('-', '/')
              : 'Comunicado'}
          </span>
        </div>
        
        <h3 className="text-xl font-headline font-bold text-[var(--color-on-surface)] mb-2 group-hover:text-[var(--color-primary-hover)] transition-colors">
          {data.titulo || 'Notícia'}
        </h3>
        
        {data.resumo && (
          <p className="text-[var(--color-on-surface-light)] text-sm mb-4 line-clamp-3 flex-1">
            {data.resumo}
          </p>
        )}
        
        <div className="meta-row mt-auto border-t border-[var(--color-outline-variant)] pt-3">
          {(data.dataCard ?? data.dataPublicacao ?? data.dataEvento) && (
            <span className="meta-date">
              <CalendarIcon /> Publicado em {formatDate(data.dataCard ?? data.dataPublicacao ?? data.dataEvento ?? '')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
