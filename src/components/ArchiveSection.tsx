import Link from 'next/link';
import CardDocumento from './cards/CardDocumento';
import EventCard from './cards/EventCard';
import { EventoProps } from './cards/types';

interface ArchiveSectionProps {
  documentos?: EventoProps[];
  externos?: EventoProps[];
}

export default function ArchiveSection({ documentos = [], externos = [] }: ArchiveSectionProps) {
  if ((!documentos || documentos.length === 0) && (!externos || externos.length === 0)) return null;

  return (
    <section id="acervo" className="relative py-20 md:py-28" aria-labelledby="archive-heading">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-px bg-primary" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-on-surface-light">Transparência & Conexões</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12 md:mb-16">
          <h2 id="archive-heading" className="font-[var(--font-headline)] text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface">
            Acervo & <span className="text-primary block sm:inline">Parcerias</span>
          </h2>
          <p className="text-on-surface-light w-full max-w-2xl text-sm md:text-base lg:text-right mt-4 lg:mt-0">
            Acompanhe nossas atuações externas e parcerias. Acesse também nossos editais e documentos institucionais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Coluna 1: Eventos Externos */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-outline)] mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-primary" />
              Eventos Externos
            </h3>
            <div className="flex flex-col gap-4 pr-1">
              {externos.map((ext, i) => (
                <div key={ext.id ?? ext._id ?? `ext-${i}`} className="relative">
                  <EventCard data={ext} />
                </div>
              ))}
              {externos.length === 0 && (
                <p className="text-on-surface-light text-sm italic">Nenhum evento recente.</p>
              )}
            </div>
          </div>

          {/* Coluna 2: Documentos */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-outline)] mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-primary" />
              Acervo Documental
            </h3>
            <div className="flex flex-col gap-3 max-h-[640px] overflow-y-auto pr-1 custom-scrollbar">
              {documentos.map((doc, i) => (
                <CardDocumento key={doc.id ?? doc._id ?? i} data={doc} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-card bg-tertiary/8 border border-tertiary/20">
          <p className="text-sm text-on-surface/80 max-w-2xl">
            <strong className="text-tertiary">Nota institucional:</strong> Todos os documentos estão disponíveis conforme exigências legais. Para acesso completo ao dossiê, entre em contato.
          </p>
          <Link href="/tipo/documento" className="text-tertiary hover:text-tertiary-dark text-sm font-semibold flex items-center gap-2 whitespace-nowrap">
            Ver todo o acervo <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8h8m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
