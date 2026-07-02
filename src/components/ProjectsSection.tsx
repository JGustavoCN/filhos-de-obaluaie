import Link from 'next/link';
import EventCard from '@/components/cards/EventCard';
import { EventoProps } from '@/components/cards/types';

export default function ProjectsSection({ oficinas = [] }: { oficinas?: EventoProps[] }) {
  if (!oficinas || oficinas.length === 0) return null;

  return (
    <section id="projetos" className="relative py-20 md:py-28" aria-labelledby="projects-heading">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* Cabeçalho da Seção */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-px bg-primary" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-on-surface-light">Nossas Expressões</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
          <h2 id="projects-heading" className="font-[var(--font-headline)] text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface">
            Projetos <span className="text-primary">Sociais</span>
          </h2>
          <p className="text-on-surface-light w-full max-w-2xl text-sm md:text-base md:text-right mt-4 md:mt-0">
            Mantemos viva a chama de tradições que pulsam em nosso sangue e em nossa comunidade através das oficinas.
          </p>
        </div>
        
        {/* Grid de Cards utilizando o EventCard Tipado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 stagger-children">
          {oficinas.map((project) => (
            <div key={project.id ?? project._id} className="h-full">
              <EventCard data={project} />
            </div>
          ))}
        </div>
        
        {/* Botão Inferior */}
        <div className="mt-12 flex justify-center">
          <Link href="/tipo/oficina" className="inline-flex items-center gap-2 bg-transparent border-2 border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary hover:text-on-primary transition-colors">
            Acompanhar registros das Oficinas
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
