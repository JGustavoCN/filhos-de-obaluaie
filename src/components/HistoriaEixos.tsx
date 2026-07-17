import type { HistoriaContent } from '@/content/historia';
import HistoriaInlineText from './HistoriaInlineText';

interface HistoriaEixosProps {
  content: HistoriaContent['linguagensCulturais'];
}

export default function HistoriaEixos({ content }: HistoriaEixosProps) {
  return (
    <section className="py-24 bg-surface-container border-y border-outline/20 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Left Side: Text and Intro */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="inline-block w-max px-5 py-2 bg-secondary text-on-surface font-bold tracking-widest text-sm uppercase rounded-full mb-6 border border-outline/20">
            {content.eyebrow}
          </div>
          <h2 className="font-[var(--font-headline)] text-4xl md:text-5xl font-bold text-on-surface mb-8 leading-tight">
            {content.titulo.prefix}<br />
            <span className="text-on-surface underline decoration-primary decoration-4 underline-offset-8">{content.titulo.highlight}</span>{content.titulo.suffix}
          </h2>
          {content.introducao.map((paragrafo, index) => (
            <p key={index} className={index === 0 ? 'text-lg text-on-surface font-medium leading-relaxed mb-6' : 'text-lg text-on-surface leading-relaxed'}>
              <HistoriaInlineText content={paragrafo} />
            </p>
          ))}
        </div>

        {/* Right Side: Accordion/Blocks */}
        <div className="lg:col-span-7 space-y-8">
          
          {content.linguagens.map((linguagem, index) => (
            <div key={linguagem.id} className="bg-surface p-8 md:p-10 rounded-2xl shadow-md border border-outline/30 relative overflow-hidden group transition-colors">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-xl flex-shrink-0">{index + 1}</div>
                <h3 className="text-2xl font-[var(--font-headline)] font-bold text-on-surface">{linguagem.titulo}</h3>
              </div>
              {linguagem.paragrafos.map((paragrafo, paragrafoIndex) => {
                const temMargem = paragrafoIndex === 0 && (linguagem.paragrafos.length > 1 || linguagem.itens);

                return (
                  <p key={paragrafoIndex} className={`text-on-surface text-lg leading-relaxed${temMargem ? ' mb-4' : ''}`}>
                    <HistoriaInlineText content={paragrafo} />
                  </p>
                );
              })}
              {linguagem.itens && (
                <ul className="space-y-3 text-on-surface text-lg list-disc pl-5">
                  {linguagem.itens.map((item, itemIndex) => (
                    <li key={itemIndex}><HistoriaInlineText content={item} /></li>
                  ))}
                </ul>
              )}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
