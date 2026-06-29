import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import XaxaraDivider from "@/components/XaxaraDivider";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ArchiveSection from "@/components/ArchiveSection";
import Footer from "@/components/Footer";
import EventCard from "@/components/cards/EventCard";
import Link from 'next/link';
import { client } from "@/sanity/client";
import { HOME_HERO_QUERY, HOME_NOTICIAS_QUERY, HOME_AGENDA_QUERY, CONTEUDO_POR_TIPO_QUERY } from "@/sanity/queries";
import { eventosMock } from "@/app/testes/page";

export default async function Home() {
  // Buscar blocos separados da API
  let heroEvent = await client.fetch(HOME_HERO_QUERY);
  let noticias = await client.fetch(HOME_NOTICIAS_QUERY);
  let agenda = await client.fetch(HOME_AGENDA_QUERY);
  let documentos = await client.fetch(CONTEUDO_POR_TIPO_QUERY, { tipo: "documento" }).then(res => res.slice(0, 4));

  // ==========================================
  // FALLBACK VISUAL (Para o ambiente de Dev)
  // ==========================================
  if (!heroEvent) {
    heroEvent = eventosMock.find(e => e.tipo === 'consciencia-negra');
  }
  if (!noticias || noticias.length === 0) {
    noticias = eventosMock.filter(e => e.tipo === 'noticia').slice(0, 3);
  }
  if (!agenda || agenda.length === 0) {
    agenda = [eventosMock.find(e => e.tipo === 'aniversario'), eventosMock.find(e => e.tipo === 'roda-consciencia')].filter(Boolean);
  }
  if (!documentos || documentos.length === 0) {
    documentos = eventosMock.filter(e => e.tipo === 'documento').slice(0, 4);
  }
  // ==========================================

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        
        {/* NOVO: Destaque Principal do Sanity (Hero Event Dinâmico) */}
        {heroEvent && (
          <section className="relative z-20 -mt-16 md:mt-20 max-w-[1400px] mx-auto px-6 md:px-10 mb-20">
            <EventCard data={heroEvent} />
          </section>
        )}

        <AboutSection />
        <XaxaraDivider />
        
        <ProjectsSection />
        <XaxaraDivider />

        {/* BENTO GRID: NOTÍCIAS */}
        <section className="py-20 md:py-28 max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-10 h-px bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-on-surface-light">Mural da Comunidade</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <h2 className="font-[var(--font-headline)] text-4xl md:text-5xl font-bold text-on-surface">
              Últimas <span className="text-primary">Notícias</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {noticias.map((noticia: any) => (
              <EventCard key={noticia.id || noticia._id} data={noticia} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/tipo/noticia" className="inline-flex items-center gap-2 bg-transparent border-2 border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary hover:text-on-primary transition-colors">
              Ler todas as notícias
            </Link>
          </div>
        </section>
        <XaxaraDivider />

        {/* BENTO GRID: AGENDA E ANIVERSÁRIOS */}
        <section className="py-20 md:py-28 max-w-[1400px] mx-auto px-6 md:px-10 bg-surface-container-low rounded-[3rem] my-10">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-10 h-px bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-on-surface-light">Programação Cultural</span>
          </div>
          <h2 className="font-[var(--font-headline)] text-4xl md:text-5xl font-bold text-on-surface mb-12">
            Agenda & <span className="text-primary">Eventos</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {agenda.map((item: any) => (
              <EventCard key={item.id || item._id} data={item} />
            ))}
          </div>
        </section>
        <XaxaraDivider />

        <ArchiveSection documentos={documentos} />
      </main>
      <Footer />
    </>
  );
}
