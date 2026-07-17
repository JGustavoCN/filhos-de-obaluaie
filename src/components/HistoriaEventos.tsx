import Link from "next/link";
import type { HistoriaContent, HistoriaEvento } from "@/content/historia";
import HistoriaInlineText from "./HistoriaInlineText";

interface HistoriaEventosProps {
  content: HistoriaContent['eventos'];
}

function EventoIcon({ evento }: { evento: HistoriaEvento }) {
  if (evento.destaque) {
    return <span className="text-on-surface font-bold text-xl">{evento.destaque}</span>;
  }

  if (evento.id === 'rodas-aniversariantes') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/>
      </svg>
    );
  }

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
    </svg>
  );
}

export default function HistoriaEventos({ content }: HistoriaEventosProps) {
  return (
    <section className="py-24 bg-surface px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block px-5 py-2 bg-secondary text-on-surface font-bold tracking-widest text-sm uppercase rounded-full mb-6 border border-outline/20">
            {content.eyebrow}
          </div>
          <h2 className="font-[var(--font-headline)] text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mb-6">
            {content.titulo.prefix}<span className="text-on-surface underline decoration-primary decoration-4 underline-offset-8">{content.titulo.highlight}</span>{content.titulo.suffix}
          </h2>
          <p className="text-lg md:text-xl text-on-surface font-medium max-w-3xl mx-auto">
            {content.introducao}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Card Esquerdo: Eventos */}
          <div className="bg-surface-container rounded-3xl p-8 md:p-12 border border-outline/30 shadow-md">
            <h3 className="text-3xl font-[var(--font-headline)] font-bold text-on-surface mb-8 border-b border-outline/30 pb-4">{content.listaTitulo}</h3>
            
            <div className="space-y-10">
              {content.itens.map((evento) => (
                <div key={evento.id} className="flex gap-5 items-start">
                  <div className={`w-14 h-14 shrink-0 rounded-full bg-secondary flex items-center justify-center border border-outline/20${evento.destaque ? '' : ' text-on-surface'}`}>
                    <EventoIcon evento={evento} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-on-surface mb-2">{evento.titulo}</h4>
                    <p className="text-on-surface leading-relaxed text-lg">{evento.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card Direito: Projetos, Gestão e Acessibilidade */}
          <div className="space-y-12">
            <div>
              <h3 className="text-3xl font-[var(--font-headline)] font-bold text-on-surface mb-6">{content.apoios.titulo}</h3>
              <p className="text-lg text-on-surface font-medium leading-relaxed mb-6">
                {content.apoios.texto}
              </p>
              <div className="bg-primary text-on-primary p-8 rounded-2xl shadow-md">
                <h4 className="font-[var(--font-headline)] font-bold text-2xl mb-3">{content.apoios.projetoTitulo}</h4>
                <p className="text-on-primary font-medium text-lg leading-relaxed"><HistoriaInlineText content={content.apoios.projetoTexto} /></p>
              </div>
            </div>

            <div className="bg-surface-container p-8 rounded-2xl border border-outline/30 shadow-md">
              <h3 className="text-2xl font-[var(--font-headline)] font-bold text-on-surface mb-4">{content.impacto.titulo}</h3>
              <p className="text-lg text-on-surface leading-relaxed">
                {content.impacto.texto}
              </p>
            </div>

            <div className="bg-surface-container p-8 rounded-2xl border border-outline/30 shadow-md">
              <h3 className="text-2xl font-[var(--font-headline)] font-bold text-on-surface mb-4">{content.acessibilidade.titulo}</h3>
              <p className="text-lg text-on-surface leading-relaxed">
                {content.acessibilidade.texto}
              </p>
            </div>
          </div>
          
        </div>
        
        {/* Footer Navigation CTA */}
        <div className="mt-24 flex justify-center border-t border-outline/20 pt-16">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-10 py-5 bg-primary text-on-primary text-lg font-bold rounded-full hover:opacity-90 transition-opacity shadow-md"
          >
            {content.ctaTexto}
          </Link>
        </div>
      </div>
    </section>
  );
}
