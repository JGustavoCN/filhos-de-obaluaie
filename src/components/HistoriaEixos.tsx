export default function HistoriaEixos() {
  return (
    <section className="py-24 bg-surface-container border-y border-outline/20 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Left Side: Text and Intro */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="inline-block w-max px-5 py-2 bg-secondary text-on-surface font-bold tracking-widest text-sm uppercase rounded-full mb-6 border border-outline/20">
            Eixos Formativos
          </div>
          <h2 className="font-[var(--font-headline)] text-4xl md:text-5xl font-bold text-on-surface mb-8 leading-tight">
            Mais que um esporte, <br />
            <span className="text-on-surface underline decoration-primary decoration-4 underline-offset-8">uma pedagogia.</span>
          </h2>
          <p className="text-lg text-on-surface font-medium leading-relaxed mb-6">
            Para o Mestre Bahia, o Centro Cultural nunca foi visto apenas como uma academia de treino esportivo. O trabalho é fundamentado em uma tríade pedagógica interdisciplinar que articula <strong>corpo, ritmo e memória</strong>. 
          </p>
          <p className="text-lg text-on-surface leading-relaxed">
            As atividades são voltadas para todos, de forma gratuita, inclusiva e sem distinção. Com um foco profundo em acolher crianças e jovens (de 6 a 14 anos) das periferias, trabalhamos para oferecer proteção, convivência, autoestima e alfabetização (através do PAS para adultos e teatro).
          </p>
        </div>

        {/* Right Side: Accordion/Blocks */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Eixo 1 */}
          <div className="bg-surface p-8 md:p-10 rounded-2xl shadow-md border border-outline/30 relative overflow-hidden group transition-colors">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-xl flex-shrink-0">1</div>
              <h3 className="text-2xl font-[var(--font-headline)] font-bold text-on-surface">Capoeira Contemporânea</h3>
            </div>
            <p className="text-on-surface text-lg leading-relaxed">
              Manifestação cultural, esporte e linguagem educativa. As aulas cobrem a história de resistência da capoeira, os golpes, fundamentos, códigos e ritmos, resultando na melhora da coordenação motora, agilidade, equilíbrio, respeito mútuo e disciplina social.
            </p>
          </div>

          {/* Eixo 2 */}
          <div className="bg-surface p-8 md:p-10 rounded-2xl shadow-md border border-outline/30 relative overflow-hidden group transition-colors">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-xl flex-shrink-0">2</div>
              <h3 className="text-2xl font-[var(--font-headline)] font-bold text-on-surface">Musicalidade e Percussão</h3>
            </div>
            <p className="text-on-surface text-lg leading-relaxed mb-4">
              Uma imersão rítmica na ancestralidade. Ensinamos a coordenação através da improvisação musical usando instrumentos tradicionais como <strong>berimbau, agogô, xequerê, atabaque, pandeiro, timbal e djembe</strong>.
            </p>
            <p className="text-on-surface text-lg leading-relaxed">
              Nossos ritmos mantêm viva a expressão cultural negra, tocando <em>ijexá, congo, nagô, cabula e barravento</em>.
            </p>
          </div>

          {/* Eixo 3 */}
          <div className="bg-surface p-8 md:p-10 rounded-2xl shadow-md border border-outline/30 relative overflow-hidden group transition-colors">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-xl flex-shrink-0">3</div>
              <h3 className="text-2xl font-[var(--font-headline)] font-bold text-on-surface">Expressões Cênicas e Dança</h3>
            </div>
            <p className="text-on-surface text-lg leading-relaxed mb-4">
              Trabalhamos o corpo como afirmação estética da cultura negra através do Teatro, Hip-hop e expressões tradicionais. 
            </p>
            <ul className="space-y-3 text-on-surface text-lg list-disc pl-5">
              <li><strong>Dança Afro e Puxada de Rede:</strong> Expressão simbólica e trabalho coletivo.</li>
              <li><strong>Samba de Coco e Maculelê:</strong> Sincronia de dança guerreira com porretes de madeira.</li>
              <li><strong>Hip-Hop:</strong> Para aproximar e dialogar com a linguagem urbana da juventude periférica.</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
