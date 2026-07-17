import { client } from "@/sanity/client";
import { HOME_PAGE_QUERY } from "@/sanity/queries";
import HeroSection from "@/components/HeroSection";
import type { HeroProps } from "@/components/HeroSection";
import XaxaraDivider from "@/components/XaxaraDivider";
import AboutSection from "@/components/AboutSection";
import type { InstitucionalProps } from "@/components/AboutSection";
import RecentUpdatesSection from "@/components/RecentUpdatesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ArchiveSection from "@/components/ArchiveSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import EventCard from "@/components/cards/EventCard";

export default async function Home() {
  const data = await client.fetch(HOME_PAGE_QUERY);

  if (!data || !data.institucional) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface text-on-surface">
        <h1 className="text-2xl font-bold">Conteúdo Institucional não encontrado.</h1>
        <p className="mt-2 text-on-surface-variant">
          Certifique-se de configurar a Página Inicial no Sanity Studio.
        </p>
      </main>
    );
  }

  const heroProps: HeroProps = {
    heroTitulo: data.institucional.heroTitulo ?? undefined,
    heroSubtitulo: data.institucional.heroSubtitulo ?? undefined,
    imagemHeroDesktop: data.institucional.imagemHeroDesktop ?? undefined,
    imagemHeroMobile: data.institucional.imagemHeroMobile ?? undefined,
  };

  const aboutProps: InstitucionalProps = {
    institucionalTitulo: data.institucional.institucionalTitulo ?? undefined,
    institucionalTexto: data.institucional.institucionalTexto ?? undefined,
    institucionalImagem: data.institucional.institucionalImagem ?? undefined,
    citacaoTexto: data.institucional.citacaoTexto ?? undefined,
    citacaoAutor: data.institucional.citacaoAutor ?? undefined,
    estatisticas: data.institucional.estatisticas?.flatMap((estatistica) =>
      estatistica.valor && estatistica.rotulo
        ? [{ valor: estatistica.valor, rotulo: estatistica.rotulo }]
        : [],
    ),
  };

  return (
    <div className="flex flex-col w-full bg-surface">
      <Navbar />
      <main className="flex-1 w-full">
        {/* HERO SECTION */}
        <HeroSection data={heroProps} />
        
        {/* SOBRE (AboutSection) */}
        <AboutSection data={aboutProps} />
        <XaxaraDivider />

        {/* FEED DO TERREIRO (RecentUpdatesSection) */}
        <RecentUpdatesSection updates={data.recentUpdates} />
        <XaxaraDivider />

        {/* MURAL DE NOTÍCIAS */}
        <section id="atualizacoes" className="py-20 md:py-28 max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-px bg-primary" />
            <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-on-surface-light">
              Mural da Comunidade
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.noticias.map((noticia) => (
              <EventCard key={noticia._id} data={noticia} />
            ))}
          </div>
        </section>
        <XaxaraDivider />

        {/* OFICINAS (ProjectsSection) */}
        <ProjectsSection oficinas={data.oficinas} />
        <XaxaraDivider />

        {/* AGENDA COMPLETA */}
        <section id="agenda" className="py-20 md:py-28 max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-px bg-primary" />
            <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-on-surface-light">
              Próximos Eventos
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.agenda.map((item) => (
              <EventCard key={item._id} data={item} />
            ))}
          </div>
        </section>
        <XaxaraDivider />

        {/* ACERVO (ArchiveSection) */}
        <ArchiveSection documentos={data.documentos} />
      </main>

      <Footer />
    </div>
  );
}
