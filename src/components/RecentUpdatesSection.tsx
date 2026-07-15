import React from 'react';
import EventCard from './cards/EventCard';
import Link from 'next/link';
import { EventoProps } from './cards/types';

interface RecentUpdatesSectionProps {
  updates: EventoProps[];
}

export default function RecentUpdatesSection({ updates }: RecentUpdatesSectionProps) {
  if (!updates || updates.length === 0) return null;

  return (
    <section id="atualizacoes" className="relative py-20 md:py-28" aria-labelledby="updates-heading">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-px bg-primary" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-on-surface-light">Notícias & Destaques</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12 md:mb-16">
          <h2 id="updates-heading" className="font-[var(--font-headline)] text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface">
            Acontece no <span className="text-primary block sm:inline">Terreiro</span>
          </h2>
          <p className="text-on-surface-light w-full max-w-2xl text-sm md:text-base lg:text-right mt-4 lg:mt-0">
            Fique por dentro das últimas rodas, oficinas, documentos e manifestações culturais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {updates.map((item) => (
            <EventCard key={item._id} data={item} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/tipo/noticia"
            className="inline-flex items-center gap-2 bg-transparent border-2 border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary hover:text-on-primary transition-colors"
          >
            Ver todas as atualizações
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
