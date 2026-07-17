import type { HistoriaContent } from '@/content/historia';
import HistoriaInlineText from './HistoriaInlineText';

interface HistoriaEstruturaProps {
  content: HistoriaContent['legado'];
}

export default function HistoriaEstrutura({ content }: HistoriaEstruturaProps) {
  return (
    <section className="py-24 bg-surface-container border-t border-outline/20 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Lado Esquerdo: Estrutura Física */}
        <div className="lg:col-span-6 space-y-8">
          <div className="inline-block px-5 py-2 bg-secondary text-on-surface font-bold tracking-widest text-sm uppercase rounded-full border border-outline/20">
            {content.sede.eyebrow}
          </div>
          <h2 className="font-[var(--font-headline)] text-4xl md:text-5xl font-bold text-on-surface leading-tight">
            {content.sede.titulo.prefix}<span className="text-on-surface underline decoration-primary decoration-4 underline-offset-8">{content.sede.titulo.highlight}</span>{content.sede.titulo.suffix}
          </h2>
          <p className="text-lg text-on-surface font-medium leading-relaxed">
            {content.sede.introducao}
          </p>
          
          <div className="bg-surface p-8 rounded-2xl shadow-sm border border-outline/30 mt-6">
            <h4 className="text-xl font-bold text-on-surface mb-4">{content.sede.cardTitulo}</h4>
            <ul className="space-y-3 text-on-surface text-lg list-disc pl-5">
              {content.sede.itens.map((item, index) => (
                <li key={index}><HistoriaInlineText content={item} /></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lado Direito: Equipe e Parcerias */}
        <div className="lg:col-span-6 space-y-8">
          <div className="inline-block px-5 py-2 bg-secondary text-on-surface font-bold tracking-widest text-sm uppercase rounded-full border border-outline/20">
            {content.equipe.eyebrow}
          </div>
          <h2 className="font-[var(--font-headline)] text-4xl md:text-5xl font-bold text-on-surface leading-tight">
            {content.equipe.titulo.prefix}<span className="text-on-surface underline decoration-primary decoration-4 underline-offset-8">{content.equipe.titulo.highlight}</span>{content.equipe.titulo.suffix}
          </h2>
          <p className="text-lg text-on-surface font-medium leading-relaxed">
            {content.equipe.introducao}
          </p>
          
          <div className="bg-surface p-8 rounded-2xl shadow-sm border border-outline/30 mt-6">
            <h4 className="text-xl font-bold text-on-surface mb-4">{content.equipe.cardTitulo}</h4>
            {content.equipe.paragrafos.map((paragrafo, index) => (
              <p key={index} className={`text-on-surface text-lg leading-relaxed${index === 0 ? ' mb-4' : ''}`}>
                <HistoriaInlineText content={paragrafo} />
              </p>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
