import type { HistoriaContent } from '@/content/historia';
import HistoriaInlineText from './HistoriaInlineText';

interface HistoriaOrigensProps {
  content: HistoriaContent['origem'];
}

export default function HistoriaOrigens({ content }: HistoriaOrigensProps) {
  return (
    <section className="py-20 md:py-28 px-6 md:px-10 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        <div className="md:w-1/2 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-px bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-on-surface-light">{content.eyebrow}</span>
          </div>
          <h2 className="font-[var(--font-headline)] text-3xl md:text-5xl font-bold text-on-surface mb-4">
            {content.titulo.prefix}<span className="text-primary">{content.titulo.highlight}</span>{content.titulo.suffix}
          </h2>
          {content.paragrafos.map((paragrafo, index) => (
            <p key={index} className="text-lg text-on-surface/80 leading-relaxed">
              <HistoriaInlineText content={paragrafo} />
            </p>
          ))}
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <div className="glass-card p-8 md:p-10 rounded-2xl border-l-4 border-l-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-4 -mt-4 pointer-events-none" />
            <h3 className="font-[var(--font-headline)] text-2xl font-bold text-on-surface mb-4 relative z-10">{content.destaque.titulo}</h3>
            {content.destaque.paragrafos.map((paragrafo, index) => (
              <p key={index} className={`text-on-surface/90 leading-relaxed relative z-10${index === 0 ? ' mb-4' : ''}`}>
                <HistoriaInlineText content={paragrafo} />
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
