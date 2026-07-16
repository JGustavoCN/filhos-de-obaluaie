import Link from 'next/link';

export interface Estatistica {
  valor: string;
  rotulo: string;
}

export interface InstitucionalProps {
  institucionalTitulo?: string;
  institucionalTexto?: string;
  institucionalImagem?: string;
  estatisticas?: Estatistica[];
  citacaoTexto?: string;
  citacaoAutor?: string;
}

export default function AboutSection({ data }: { data?: InstitucionalProps }) {
  // Fallbacks caso os dados não estejam cadastrados
  const texto = data?.institucionalTexto || `Reconhecida como Patrimônio Cultural Imaterial de Tobias Barreto, a capoeira é uma manifestação de origem africana que une expressão corporal, música, mandinga, esporte, jogo e luta para formar a identidade afro-brasileira. Historicamente praticada nas "capoeiras" (áreas de pouco mato) como uma dança que camuflava o treinamento de defesa, ela se tornou um poderoso instrumento de resistência e liberdade.

Em Tobias Barreto, essa história ganhou força em 1987, quando Mestre Nhô iniciou as primeiras rodas e ensinamentos na antiga Associação Atlética. Foi nesse celeiro que Mestre Bahia (Josafá Alves dos Santos) deu seus primeiros passos na arte, um período fundamental para a inserção desse patrimônio no contexto tobiense.

Após aperfeiçoamento em São Paulo com Mestre Zezinho, Mestre Bahia retornou ao município em 2005. Movido pelo sonho de transformar realidades, reativou o antigo Centro de Interação Humana no bairro Santa Rita, batizando-o como "Filhos de Obaluaiê". Hoje, o Centro atua como um verdadeiro quilombo cultural, transcendendo a capoeira para educar para a cidadania e fortalecer nossa ancestralidade.`;

  const titulo = data?.institucionalTitulo || "A Força do Centro";
  const imagem = data?.institucionalImagem || "/images/capoeira-movement.png";
  
  const estatisticasMock = [
    { valor: "20+", rotulo: "anos de atuação" },
    { valor: "500+", rotulo: "crianças atendidas" },
    { valor: "200+", rotulo: "eventos realizados" },
    { valor: "5", rotulo: "projetos permanentes" }
  ];
  const estatisticas = data?.estatisticas && data.estatisticas.length > 0 ? data.estatisticas : estatisticasMock;

  const citacaoTexto = data?.citacaoTexto || "A capoeira não é apenas um jogo ou uma luta. É a história de um povo escrita com o corpo, cantada com a alma e preservada pela resistência.";
  const citacaoAutor = data?.citacaoAutor || "Mestre Bahia";


  return (
    <section
      id="sobre"
      className="relative py-20 md:py-28"
      aria-labelledby="about-heading"
    >
      {/* Bogolan pattern overlay — textura decorativa */}
      <div className="absolute inset-0 bogolan-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-10 h-px bg-primary" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-on-surface-light">
            Nossa Raiz Histórica
          </span>
        </div>

        <h2
          id="about-heading"
          className="font-[var(--font-headline)] text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mb-12 md:mb-16"
        >
          {titulo.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="underline decoration-primary decoration-4 underline-offset-8 text-primary">
            {titulo.split(' ').slice(-1)}
          </span>
        </h2>

        {/* Asymmetric African Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Content — larger column */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="prose prose-lg text-on-surface/90 leading-relaxed whitespace-pre-line">
              <p>{texto}</p>
            </div>
            
            {/* Asymmetric Image Grid (Restaurado) */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-8">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-2 border-surface/50">
                <img
                  src={imagem}
                  alt="Roda de Capoeira"
                  className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl md:mt-12 border-2 border-surface/50">
                <img
                  src="/images/capoeira-master.png"
                  alt="Mestre de Capoeira"
                  className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/historia"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary text-lg font-bold rounded-full hover:bg-primary-hover transition-transform hover:-translate-y-1 shadow-lg"
              >
                Conhecer Nossa História Completa
              </Link>
            </div>
          </div>

          {/* Sidebar — smaller column, offset */}
          <div className="lg:col-span-5 flex flex-col gap-10 lg:pt-8">
            
            {/* Quote Block (Restaurado) */}
            <blockquote className="relative p-8 md:p-10 bg-surface-container-low rounded-3xl border border-outline/10 shadow-lg">
              <svg className="absolute top-6 left-6 w-10 h-10 text-primary/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="relative z-10 text-xl md:text-2xl font-serif text-on-surface italic leading-snug">
                "{citacaoTexto}"
              </p>
              <footer className="mt-6 flex items-center gap-4">
                <div className="w-12 h-px bg-primary" />
                <span className="font-medium text-primary uppercase tracking-wider text-sm">{citacaoAutor}</span>
              </footer>
            </blockquote>

            {/* Estatísticas Grid */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              {estatisticas.map((stat, i) => (
                <div key={i} className="glass-card p-6 flex flex-col items-center justify-center text-center rounded-xl border border-outline/20 group hover:border-primary/50 transition-colors">
                  <span className="text-4xl md:text-5xl font-headline font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                    {stat.valor}
                  </span>
                  <span className="text-sm md:text-base font-medium text-on-surface-light uppercase tracking-wide">
                    {stat.rotulo}
                  </span>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
