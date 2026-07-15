import Image from "next/image";
import { client } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";

export default async function HeroSection() {
  const settings = await client.fetch(SITE_SETTINGS_QUERY);

  // Fallbacks para as imagens
  const desktopImage = settings?.imagemHeroDesktop || "/assets/images/hero-banner-main.png";
  const mobileImage = settings?.imagemHeroMobile || "/assets/images/hero-banner-mobile.png";
  // Fallbacks para textos do Hero
  const heroLabel = settings?.heroLabel || "Desde 2005 · Tobias Barreto/SE";
  const heroTitulo = settings?.heroTitulo || "Filhos de\nObaluaiê";
  const heroSubtitulo = settings?.heroSubtitulo || "Centro Cultural de Capoeira e Expressões Afro-Brasileiras.\nUm solo sagrado de resistência, arte e ancestralidade.";

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-[72px] pb-12 md:pb-0"
      aria-label="Seção principal"
    >
      {/* Mobile Background Image (Fullscreen overlay) */}
      <div className="absolute inset-0 z-0 block lg:hidden">
        <Image
          src={mobileImage}
          alt="Fundo do Centro Cultural Filhos de Obaluaiê"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay to ensure text readability against the image */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/60 via-surface/80 to-surface" />
      </div>

      {/* Decorative background tonal shift (Desktop) */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface-container-low to-surface-container pointer-events-none hidden lg:block" />

      {/* Bogolan pattern overlay */}
      <div className="absolute inset-0 bogolan-pattern opacity-40 lg:opacity-40 opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-4 items-center">
        {/* Text block */}
        <div className="lg:col-span-7 w-full flex flex-col text-center sm:text-left gap-6 md:gap-8 pt-10 md:pt-0">
          {/* Label tag */}
          <div className="flex items-center justify-center sm:justify-start gap-2 w-full">
            <span className="w-8 h-px bg-primary" />
            <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-on-surface-light">
              {heroLabel}
            </span>
          </div>

          <h1 className="font-[var(--font-headline)] min-w-0 text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-on-surface leading-[1.05] md:leading-[0.95] tracking-tight text-shadow-sm">
            {heroTitulo.split('\n').map((linha: string, idx: number, arr: string[]) => (
              <span key={idx} className={idx === arr.length - 1 && arr.length > 1 ? "text-primary sm:ml-0 ml-2" : ""}>
                {linha}
                {idx < arr.length - 1 && <br className="hidden sm:block" />}
              </span>
            ))}
          </h1>

          <p className="min-w-0 text-base md:text-xl text-on-surface-light leading-relaxed text-center sm:text-left whitespace-pre-line font-medium lg:font-normal">
            {heroSubtitulo}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4 mt-2 w-full sm:w-auto">
            <a
              id="cta-historia"
              href="#sobre"
              className="w-full sm:w-auto text-center px-8 py-3.5 bg-primary text-on-primary font-semibold rounded-pill spring-transition hover:bg-primary-hover hover:shadow-[0_8px_32px_rgba(140,58,42,0.2)]"
            >
              Conheça Nossa História
            </a>
            <a
              id="cta-projetos"
              href="#projetos"
              className="w-full sm:w-auto text-center px-8 py-3.5 border border-primary/20 lg:border-secondary text-on-surface bg-surface/50 lg:bg-transparent backdrop-blur-sm font-semibold rounded-pill spring-transition hover:bg-secondary/10"
            >
              Projetos Sociais
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-start gap-6 sm:gap-8 mt-6 pt-6 border-t border-primary/20 lg:border-neutral/60 w-full backdrop-blur-[2px] lg:backdrop-blur-none">
            {[
              { number: "20+", label: "Anos de atuação" },
              { number: "500+", label: "Jovens impactados" },
              { number: "4", label: "Expressões" },
            ].map((stat) => (
              <div key={stat.label} className="flex-1 sm:flex-none">
                <span className="font-[var(--font-headline)] text-2xl sm:text-3xl font-bold text-primary">
                  {stat.number}
                </span>
                <p className="text-[10px] sm:text-xs text-on-surface-light mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image — Only visible on Desktop now */}
        <div className="hidden lg:flex lg:col-span-5 w-full justify-end relative mt-0">
          <div className="hero-image-mask relative w-full max-w-[640px] aspect-[4/5] mx-0 overflow-hidden">
            <Image
              src={desktopImage}
              alt="Roda de capoeira do Centro Cultural Filhos de Obaluaiê"
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          {/* Floating decorative accent */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-10 -right-8 w-16 h-16 bg-tertiary/15 rounded-full blur-xl pointer-events-none" />
        </div>
      </div>

      {/* Scroll indicator - Hidden on very small screens to avoid clutter */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 opacity-60">
        <span className="text-[10px] sm:text-xs tracking-widest uppercase text-on-surface-light">Explore</span>
        <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-on-surface/30 to-transparent" />
      </div>
    </section>
  );
}
