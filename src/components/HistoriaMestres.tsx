import Image from "next/image";
import type { HistoriaContent, HistoriaMestre } from "@/content/historia";
import HistoriaInlineText from "./HistoriaInlineText";

interface HistoriaMestresProps {
  content: HistoriaContent['trajetoria'];
  mestres: HistoriaMestre[];
}

export default function HistoriaMestres({ content, mestres }: HistoriaMestresProps) {
  return (
    <section className="py-24 bg-surface px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block px-5 py-2 bg-secondary text-on-surface font-bold tracking-widest text-sm uppercase rounded-full mb-6 border border-outline/20">
            {content.eyebrow}
          </div>
          <h2 className="font-[var(--font-headline)] text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mb-6">
            {content.titulo.prefix}<span className="text-on-surface opacity-90 underline decoration-primary decoration-4 underline-offset-8">{content.titulo.highlight}</span>{content.titulo.suffix}
          </h2>
          <p className="text-lg md:text-xl text-on-surface max-w-3xl mx-auto mb-8 font-medium">
            {content.introducao}
          </p>
          <div className="max-w-4xl mx-auto bg-surface-container border-l-4 border-l-primary p-6 md:p-8 rounded-r-2xl text-left shadow-sm mb-12">
            <h4 className="font-[var(--font-headline)] text-2xl font-bold text-on-surface mb-3">{content.significado.titulo}</h4>
            <p className="text-on-surface text-lg leading-relaxed">
              <HistoriaInlineText content={content.significado.texto} />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {mestres.map((mestre) => {
            const mestreBahia = mestre.id === 'mestre-bahia';

            return (
              <div key={mestre.id} className={`glass-card rounded-2xl overflow-hidden border border-outline/40 group shadow-md bg-surface${mestreBahia ? ' md:col-span-2 lg:col-span-1' : ''}`}>
                <div className="relative w-full aspect-[4/3] bg-surface-container overflow-hidden">
                  <Image src={mestre.imagem.src} alt={mestre.imagem.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white font-[var(--font-headline)] drop-shadow-md">{mestre.nome}</h3>
                </div>
                <div className="p-6 md:p-8">
                  <div className={mestreBahia ? 'inline-block px-3 py-1 bg-primary text-on-primary text-sm font-bold rounded-sm mb-4' : 'inline-block px-3 py-1 bg-surface-container-high text-on-surface text-sm font-bold rounded-sm mb-4 border border-outline/20'}>{mestre.periodo}</div>
                  <p className="text-on-surface text-base md:text-lg leading-relaxed">
                    {mestre.descricao}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
