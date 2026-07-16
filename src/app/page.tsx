import { client } from "@/sanity/client";
import { HOME_PAGE_QUERY } from "@/sanity/queries";
import HeroSection from "@/components/HeroSection";
import XaxaraDivider from "@/components/XaxaraDivider";
import AboutSection from "@/components/AboutSection";
import RecentUpdatesSection from "@/components/RecentUpdatesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ArchiveSection from "@/components/ArchiveSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import EventCard from "@/components/cards/EventCard";
import type { EventoProps } from "@/components/cards/types";

// Tipagem local da HomePage
interface HomePageData {
  heroTitulo?: string;
  heroSubtitulo?: string;
  heroEvento?: EventoProps;
  institucionalTitulo?: string;
  institucionalTexto?: any;
  citacaoTexto?: string;
  citacaoAutor?: string;
  estatisticas?: Array<{ rotulo: string; valor: string }>;
  ctaTitulo?: string;
  ctaTexto?: string;
}

// Normalizador local simples (já que o backend retorna tudo certinho agora)
const normalizeItem = (item: any): EventoProps => {
  return {
    ...item,
    imagemCapa: typeof item?.imagemCapa === 'object' && item?.imagemCapa !== null ? item.imagemCapa.url : item?.imagemCapa,
    galeria: Array.isArray(item?.galeria) ? item.galeria.map((g: any) => typeof g === 'object' && g !== null ? g.url : g) : [],
    fotoMestre: typeof item?.fotoMestre === 'object' && item?.fotoMestre !== null ? item.fotoMestre.url : item?.fotoMestre,
  };
};

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
  const data = await client.fetch<PageData>(HOME_PAGE_QUERY);

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

  // Normalização de dados
  const oficinasNormalizadas = (data.oficinas || []).map(normalizeItem);
  const agendaNormalizada = (data.agenda || []).map(normalizeItem);
  const documentosNormalizados = (data.documentos || []).map(normalizeItem);
  const externosNormalizados = (data.externos || []).map(normalizeItem);
  const recentUpdatesNormalizados = (data.recentUpdates || []).map(normalizeItem);
  const noticiasNormalizadas = (data.noticias || []).map(normalizeItem);

  const heroProps = {
    heroTitulo: data.institucional.heroTitulo,
    heroSubtitulo: data.institucional.heroSubtitulo,
    heroEvento: data.institucional.heroEvento,
  };

  return (
    <div className="flex flex-col w-full bg-surface">
      <Navbar />
      <main className="flex-1 w-full">
        {/* HERO SECTION */}
        <HeroSection data={heroProps as any} />
        
        {/* SOBRE (AboutSection) */}
        <AboutSection data={data.institucional} />
        <XaxaraDivider />

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agendaNormalizada.map((item) => (
              <EventCard key={item._id} data={item} />
            ))}
          </div>
        </section>
        <XaxaraDivider />

        {/* ACERVO (ArchiveSection) */}
        <ArchiveSection documentos={documentosNormalizados} />
      </main>

      <Footer />
    </div>
  );
}
