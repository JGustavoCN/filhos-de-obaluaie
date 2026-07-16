import { client } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import Image from "next/image";
import Link from "next/link";

export default async function AboutSection() {
  const settings = await client.fetch(SITE_SETTINGS_QUERY);

  // Fallbacks caso os dados não estejam cadastrados
  const texto = settings?.sobreTexto || `Reconhecida como Patrimônio Cultural Imaterial de Tobias Barreto, a capoeira é uma manifestação de origem africana que une expressão corporal, música, mandinga, esporte, jogo e luta para formar a identidade afro-brasileira. Historicamente praticada nas "capoeiras" (áreas de pouco mato) como uma dança que camuflava o treinamento de defesa, ela se tornou um poderoso instrumento de resistência e liberdade.

Em Tobias Barreto, essa história ganhou força em 1987, quando Mestre Nhô iniciou as primeiras rodas e ensinamentos na antiga Associação Atlética. Foi nesse celeiro que Mestre Bahia (Josafá Alves dos Santos) deu seus primeiros passos na arte, um período fundamental para a inserção desse patrimônio no contexto tobiense.

Após aperfeiçoamento em São Paulo com Mestre Zezinho, Mestre Bahia retornou ao município em 2005. Movido pelo sonho de transformar realidades, reativou o antigo Centro de Interação Humana no bairro Santa Rita, batizando-o como "Filhos de Obaluaiê". Hoje, o Centro atua como um verdadeiro quilombo cultural, transcendendo a capoeira para educar para a cidadania e fortalecer nossa ancestralidade.`;

  const citacao = settings?.sobreCitacao || `"Quando penso nos Filhos de Obaluaiê, penso primeiro em família. A capoeira é muito mais do que luta: é educação, cultura e uma forma de construir seres humanos melhores."`;

  const pilaresMock = [
    "Ancestralidade como guia",
    "Inclusão e acolhimento",
    "Arte como resistência",
    "Transformação social"
  ];
  const pilares = settings?.pilares && settings.pilares.length > 0 ? settings.pilares : pilaresMock;

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
          A Força do <span className="underline decoration-primary decoration-4 underline-offset-8">Centro</span>
        </h2>

        {/* Asymmetric African Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Main Content — larger column */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="prose prose-lg text-on-surface/90 leading-relaxed whitespace-pre-line">
              <p>{texto}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-outline/20">
                <Image
                  src="/images/capoeira-movement.png"
                  alt="Movimento e roda de Capoeira"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-outline/20 md:mt-12">
                <Image
                  src="/images/capoeira-master.png"
                  alt="Retrato de um Mestre de Capoeira"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            <div className="mt-4">
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
            
            {/* Quote block */}
            <blockquote className="relative p-8 glass-card border-l-4 border-l-primary rounded-xl">
              <p className="text-xl md:text-2xl font-[var(--font-headline)] italic text-on-surface leading-tight mb-4">
                {citacao}
              </p>
              <footer className="flex items-center gap-4 text-sm text-on-surface-light">
                <span className="w-6 h-px bg-on-surface-light/50" />
                Mestre Bahia (Josafá Alves dos Santos)
              </footer>
            </blockquote>

            {/* Values list */}
            <div className="glass-card p-8 rounded-xl border border-outline/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <h3 className="font-[var(--font-headline)] text-2xl font-bold text-on-surface mb-6 relative z-10">
                Nossos Pilares
              </h3>
              <ul className="flex flex-col gap-5 relative z-10">
                {pilares.map((pilar: string, index: number) => {
                  const icons = [
                    <svg key={0} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>,
                    <svg key={1} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
                    <svg key={2} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>,
                    <svg key={3} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
                  ];
                  return (
                    <li
                      key={index}
                      className="flex items-center gap-4 text-on-surface/80 group/item"
                    >
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-primary transition-colors group-hover/item:bg-primary group-hover/item:text-on-primary">
                        {icons[index % 4]}
                      </span>
                      <span className="text-base font-medium">{pilar}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
