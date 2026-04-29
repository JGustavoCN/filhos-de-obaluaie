export default function AboutSection() {
  return (
    <section
      id="sobre"
      className="relative py-20 md:py-28"
      aria-labelledby="about-heading"
    >
      {/* Background tonal shift */}
      <div className="absolute inset-0 bg-surface-container-low pointer-events-none" />
      <div className="absolute inset-0 bogolan-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-px bg-primary" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-on-surface-light">
            Nossa Raiz
          </span>
        </div>

        <h2
          id="about-heading"
          className="font-[var(--font-headline)] text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mb-12 md:mb-16"
        >
          Sobre o <span className="text-primary">Centro</span>
        </h2>

        {/* Asymmetric African Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main text — larger column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <p className="text-lg md:text-xl text-on-surface/90 leading-relaxed">
              Fundado em <strong className="text-primary font-semibold">2005</strong>,
              o Centro Cultural e de Capoeira &quot;Filhos de Obaluaiê&quot;
              nasceu do desejo de preservar as raízes ancestrais da cultura
              afro-brasileira no coração de Sergipe, no bairro Santa Rita,
              município de Tobias Barreto.
            </p>

            <p className="text-base text-on-surface/75 leading-relaxed">
              Nossa missão transcende o ensino da técnica — buscamos o
              fortalecimento da identidade, o respeito à ancestralidade e a
              transformação social por meio das expressões que definem nossa
              história. Promovemos atividades gratuitas de capoeira,
              musicalidade, dança afro, maculelê, samba de coco e expressões
              cênicas tradicionais.
            </p>

            <p className="text-base text-on-surface/75 leading-relaxed">
              A instituição atua como articuladora de redes culturais locais e
              regionais, integrando iniciativas como o Movimento Turístico
              Cultural do Vale do Rio Real e o Coletivo Cultural
              &quot;Tobias, sou Eu!&quot;. Promovemos eventos de relevância como o
              <em> Encontro Internacional da Consciência Negra</em>, com ações
              inclusivas voltadas a diferentes públicos.
            </p>
          </div>

          {/* Sidebar — smaller column, offset */}
          <div className="lg:col-span-5 lg:pt-12 flex flex-col gap-8">
            {/* Quote block */}
            <blockquote className="relative pl-6 py-4 border-l-2 border-secondary">
              <p className="text-lg italic text-on-surface/80 leading-relaxed">
                &quot;O corpo fala, a alma canta, o pé risca a terra que nos
                sustenta.&quot;
              </p>
              <footer className="mt-3 text-sm text-on-surface-light">
                — Filosofia do Centro Cultural
              </footer>
            </blockquote>

            {/* Values list */}
            <div className="glass-card p-6">
              <h3 className="font-[var(--font-headline)] text-lg font-bold text-on-surface mb-4">
                Nossos Pilares
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  { icon: "🌍", text: "Ancestralidade como guia" },
                  { icon: "🤝", text: "Inclusão e acolhimento" },
                  { icon: "🎶", text: "Arte como resistência" },
                  { icon: "🌱", text: "Transformação social" },
                ].map((item) => (
                  <li
                    key={item.text}
                    className="flex items-center gap-3 text-on-surface/80"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
