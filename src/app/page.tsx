import { client } from "@/sanity/client";
import { HOME_PAGE_QUERY } from "@/sanity/queries";
import HeroSection from "@/components/HeroSection";
import XaxaraDivider from "@/components/XaxaraDivider";
import AboutSection from "@/components/AboutSection";
import FeaturedEventSection from "@/components/FeaturedEventSection";
import RecentUpdatesSection from "@/components/RecentUpdatesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ArchiveSection from "@/components/ArchiveSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import EventCard from "@/components/cards/EventCard";
import type { EventoProps } from "@/components/cards/types";
import MasonryItem from "@/components/MasonryItem";
import { normalizeSanityEvento } from "@/sanity/normalizeEvento";

// Tipagem local da HomePage
interface HomePageData {
  heroTitulo?: string;
  heroSubtitulo?: string;
  tituloSessaoDestaque?: string;
  heroEvento?: EventoProps;
  institucionalTitulo?: string;
  institucionalTexto?: any;
  citacaoTexto?: string;
  citacaoAutor?: string;
  estatisticas?: Array<{ rotulo: string; valor: string }>;
  ctaTitulo?: string;
  ctaTexto?: string;
}

interface PageData {
  institucional: HomePageData;
  noticias: EventoProps[];
  oficinas: EventoProps[];
  agenda: EventoProps[];
  documentos: EventoProps[];
  externos: EventoProps[];
  recentUpdates: EventoProps[];
}

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

  const institucional = data.institucional;
  const oficinasNormalizadas: EventoProps[] = (data.oficinas || []).map(normalizeSanityEvento);
  const agendaNormalizada: EventoProps[] = (data.agenda || []).map(normalizeSanityEvento);
  const documentosNormalizados: EventoProps[] = (data.documentos || []).map(normalizeSanityEvento);
  const recentUpdatesNormalizados: EventoProps[] = (data.recentUpdates || []).map(normalizeSanityEvento);
  const noticiasNormalizadas: EventoProps[] = (data.noticias || []).map(normalizeSanityEvento);
  const externosNormalizados: EventoProps[] = (data.externos || []).map(normalizeSanityEvento);

  const heroProps = {
    heroTitulo: institucional.heroTitulo ?? undefined,
    heroSubtitulo: institucional.heroSubtitulo ?? undefined,
    imagemHeroDesktop: institucional.imagemHeroDesktop ?? undefined,
    imagemHeroMobile: institucional.imagemHeroMobile ?? undefined,
  };

  const aboutProps = {
    institucionalTitulo: institucional.institucionalTitulo ?? undefined,
    institucionalTexto: institucional.institucionalTexto ?? undefined,
    institucionalImagem: institucional.institucionalImagem ?? undefined,
    citacaoTexto: institucional.citacaoTexto ?? undefined,
    citacaoAutor: institucional.citacaoAutor ?? undefined,
    estatisticas: institucional.estatisticas?.flatMap(({ valor, rotulo }: { valor: string; rotulo: string }) =>
      valor && rotulo ? [{ valor, rotulo }] : [],
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

        {/* DESTAQUE PRINCIPAL */}
        {data.institucional.heroEvento && (
          <>
            <FeaturedEventSection 
              evento={data.institucional.heroEvento as any} 
              tituloSessao={data.institucional.tituloSessaoDestaque} 
            />
            <XaxaraDivider />
          </>
        )}

        {/* FEED DO TERREIRO (RecentUpdatesSection) */}
        <RecentUpdatesSection updates={recentUpdatesNormalizados} />
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
            {noticiasNormalizadas.map((noticia) => (
              <EventCard key={noticia._id} data={noticia} />
            ))}
          </div>
        </section>
        <XaxaraDivider />

        {/* OFICINAS (ProjectsSection) */}
        <ProjectsSection oficinas={oficinasNormalizadas} />
        <XaxaraDivider />

        {/* AGENDA COMPLETA */}
        <section id="agenda" className="py-20 md:py-28 max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-px bg-primary" />
            <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-on-surface-light">
              Próximos Eventos
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[10px] gap-x-6 grid-flow-row-dense">
            {agendaNormalizada.map((item) => {
              const isFeatureCard = item._type === 'oficina' || item._type === 'encontroConscienciaNegra' || item._type === 'rodaConsciencia' || item._type === 'eventoExterno';
              return (
                <MasonryItem key={item._id} className={isFeatureCard ? 'md:col-span-2' : ''}>
                  <EventCard data={item} />
                </MasonryItem>
              );
            })}
          </div>
        </section>
        <XaxaraDivider />

        {/* ACERVO (ArchiveSection) */}
        <ArchiveSection documentos={documentosNormalizados} externos={externosNormalizados} />
      </main>

      <Footer />
    </div>
  );
}
