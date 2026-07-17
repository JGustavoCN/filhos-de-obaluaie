import type { HistoriaContent } from '@/content/historia';

interface HistoriaLinhaDoTempoProps {
  content: HistoriaContent['linhaDoTempo'];
}

export default function HistoriaLinhaDoTempo({ content }: HistoriaLinhaDoTempoProps) {
  return (
    <section className="py-24 bg-surface-container border-y border-outline/20 px-6 md:px-10">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block px-5 py-2 bg-secondary text-on-surface font-bold tracking-widest text-sm uppercase rounded-full mb-6 border border-outline/20">
            {content.eyebrow}
          </div>
          <h2 className="font-[var(--font-headline)] text-4xl md:text-5xl font-bold text-on-surface mb-6">
            {content.titulo.prefix}<span className="text-on-surface underline decoration-primary decoration-4 underline-offset-8">{content.titulo.highlight}</span>{content.titulo.suffix}
          </h2>
          <p className="text-lg text-on-surface/80 font-medium max-w-2xl mx-auto">
            {content.descricao}
          </p>
        </div>

        <div className="relative border-l-4 border-primary/30 ml-4 md:ml-8 space-y-12 pb-8">
          {content.itens.map((evento) => (
            <div key={evento.id} className="relative pl-8 md:pl-12 group">
              {/* Dot */}
              <div className="absolute -left-[14px] top-1 w-6 h-6 rounded-full bg-primary border-4 border-surface-container shadow-sm group-hover:scale-125 transition-transform" />
              
              <div className="bg-surface rounded-2xl p-6 md:p-8 shadow-sm border border-outline/20 group-hover:border-primary/50 transition-colors">
                <span className="text-primary font-bold text-xl md:text-2xl mb-2 block">{evento.ano}</span>
                <h3 className="text-2xl font-[var(--font-headline)] font-bold text-on-surface mb-3">{evento.titulo}</h3>
                <p className="text-on-surface/80 text-lg leading-relaxed">{evento.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
