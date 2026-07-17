import React from 'react';

export default function HistoriaOrigens() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-10 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        <div className="md:w-1/2 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-px bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-on-surface-light">Contexto Histórico</span>
          </div>
          <h2 className="font-[var(--font-headline)] text-3xl md:text-5xl font-bold text-on-surface mb-4">
            Das Raízes Banto a <span className="text-primary">Sergipe</span>
          </h2>
          <p className="text-lg text-on-surface/80 leading-relaxed">
            A história da capoeira remonta às raízes africanas, especialmente aos povos de origem banto que foram escravizados e trazidos ao Brasil. Nas senzalas, ruas e quilombos, as &quot;capoeiras&quot; (áreas de mato ralo) tornaram-se o palco onde a dança camuflava o treinamento de defesa e resistência, misturando o jogo de corpo com a luta pela liberdade.
          </p>
          <p className="text-lg text-on-surface/80 leading-relaxed">
            Vista como ameaça, a capoeiragem foi duramente reprimida, sendo até criminalizada pelo Código Penal de 1890. Apenas a partir da década de 1930 a repressão oficial foi atenuada, abrindo espaço para a consolidação das vertentes <strong>Angola</strong> (marcada pela astúcia e movimentos precisos de Mestre Pastinha) e <strong>Regional</strong> (com o jogo rápido e alto introduzido por Mestre Bimba).
          </p>
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <div className="glass-card p-8 md:p-10 rounded-2xl border-l-4 border-l-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-4 -mt-4 pointer-events-none" />
            <h3 className="font-[var(--font-headline)] text-2xl font-bold text-on-surface mb-4 relative z-10">A Chegada em Sergipe</h3>
            <p className="text-on-surface/90 leading-relaxed relative z-10 mb-4">
              Na década de 1960, a arte ganhou força em Aracaju através do <strong>Mestre Baiano</strong>, o grande precursor local. No quintal de sua casa, em chão batido, ele promovia treinos gratuitos e comunitários. 
            </p>
            <p className="text-on-surface/90 leading-relaxed relative z-10">
              A capoeira ali era pura confraternização e divertimento coletivo. Foi nesse cenário sergipano fértil que o <strong>Mestre Nhô</strong> forjou sua base. Na década de 1980, Mestre Nhô foi transferido para Tobias Barreto, plantando a semente que germinou e deu origem a toda a movimentação cultural que mais tarde seria estruturada pelos Filhos de Obaluaiê.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
