import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-[72px]"
      aria-label="Seção principal"
    >
      {/* Decorative background tonal shift */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface-container-low to-surface-container pointer-events-none" />

      {/* Bogolan pattern overlay */}
      <div className="absolute inset-0 bogolan-pattern opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center py-12 md:py-0">
        {/* Text block — asymmetric positioning */}
        <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
          {/* Label tag */}
          <div className="flex items-center gap-2">
            <span className="w-8 h-px bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-on-surface-light">
              Desde 2005 · Tobias Barreto/SE
            </span>
          </div>

          <h1 className="font-[var(--font-headline)] text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-on-surface leading-[0.95] tracking-tight">
            Filhos de
            <br />
            <span className="text-primary">Obaluaiê</span>
          </h1>

          <p className="text-lg md:text-xl text-on-surface-light leading-relaxed">
            Centro Cultural de Capoeira e Expressões Afro-Brasileiras.
            Um solo sagrado de resistência, arte e ancestralidade.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mt-2">
            <a
              id="cta-historia"
              href="#sobre"
              className="px-8 py-3.5 bg-primary text-on-primary font-semibold rounded-pill spring-transition hover:bg-primary-hover hover:shadow-[0_8px_32px_rgba(140,58,42,0.2)]"
            >
              Conheça Nossa História
            </a>
            <a
              id="cta-projetos"
              href="#projetos"
              className="px-8 py-3.5 border border-secondary text-on-surface font-semibold rounded-pill spring-transition hover:bg-secondary/10"
            >
              Projetos Sociais
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-6 pt-6 border-t border-neutral/60">
            {[
              { number: "20+", label: "Anos de atuação" },
              { number: "500+", label: "Jovens impactados" },
              { number: "4", label: "Expressões culturais" },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="font-[var(--font-headline)] text-3xl font-bold text-primary">
                  {stat.number}
                </span>
                <p className="text-xs text-on-surface-light mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image — organic SVG mask */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          <div className="hero-image-mask relative w-full max-w-[640px] aspect-[4/3]">
            <Image
              src="/assets/images/hero-banner-main.png"
              alt="Roda de capoeira do Centro Cultural Filhos de Obaluaiê"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Floating decorative accent */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-10 -right-8 w-16 h-16 bg-tertiary/15 rounded-full blur-xl pointer-events-none" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs tracking-widest uppercase text-on-surface-light">Explore</span>
        <div className="w-px h-8 bg-gradient-to-b from-on-surface/30 to-transparent" />
      </div>
    </section>
  );
}
