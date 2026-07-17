import Image from "next/image";
import HistoriaOrigens from "@/components/HistoriaOrigens";
import HistoriaLinhaDoTempo from "@/components/HistoriaLinhaDoTempo";
import HistoriaMestres from "@/components/HistoriaMestres";
import HistoriaEixos from "@/components/HistoriaEixos";
import HistoriaEstrutura from "@/components/HistoriaEstrutura";
import HistoriaEventos from "@/components/HistoriaEventos";
import Navbar from "@/components/Navbar";
import { historiaContent } from "@/content/historia";

export default function HistoriaPage() {
  return (
    <main className="min-h-screen bg-surface pb-0">
      <Navbar />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-screen pt-24 md:pt-32 pb-24 md:pb-36 overflow-hidden flex flex-col items-center text-center px-6">
        
        {/* Camada 1: Base com Textura Fractal Geométrica (Parallax) */}
        <div className="absolute inset-0 bg-[url('/assets/images/bg-texture-fractal-light.png')] dark:bg-[url('/assets/images/bg-texture-fractal-dark.png')] bg-cover bg-center bg-no-repeat bg-fixed opacity-60 dark:opacity-50" />
        
        {/* Camada 2: Geometria Precisa (Tecido Bogolan) */}
        <div className="absolute inset-0 bogolan-pattern opacity-15 dark:opacity-10 pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

        {/* Camada 3: Fluidez Orgânica (Luzes e Formas Desfocadas / Aura) */}
        <div className="absolute -top-32 -right-32 md:-top-40 md:-right-40 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/20 dark:bg-primary/30 rounded-full blur-[100px] md:blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 md:-bottom-32 md:-left-32 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-secondary/40 dark:bg-tertiary-container/40 rounded-[9999px] blur-[90px] md:blur-[120px] pointer-events-none" />

        {/* Camada 4: Glassmorphism suave para integrar e garantir legibilidade */}
        <div className="absolute inset-0 bg-surface/70 dark:bg-surface/75 pointer-events-none backdrop-blur-[6px]" />

        {/* Camada 5: Divisor Orgânico (Curva na base da seção) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none z-10">
          <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,120.31,192.6,106.64,236.4,97.04,279.79,77.78,321.39,56.44Z" className="fill-[var(--color-surface)]"></path>
          </svg>
        </div>
        
        {/* Conteúdo Centralizado Automaticamente */}
        <div className="flex-1 flex flex-col justify-center items-center w-full max-w-4xl z-20">
          <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mb-6 md:mb-8 relative rounded-full overflow-hidden border-4 border-outline/20 shadow-2xl transition-transform duration-700 hover:scale-105">
            <Image
              src={historiaContent.hero.logo.src}
              alt={historiaContent.hero.logo.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 md:w-12 h-px bg-primary" />
            <span className="text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-on-surface-light">
              {historiaContent.hero.eyebrow}
            </span>
            <span className="w-10 md:w-12 h-px bg-primary" />
          </div>
          
          <h1 className="font-[var(--font-headline)] text-4xl md:text-6xl lg:text-7xl font-bold text-on-surface mb-6 md:mb-8 leading-tight">
            {historiaContent.hero.titulo.prefix}<span className="text-primary block md:inline">{historiaContent.hero.titulo.highlight}</span>{historiaContent.hero.titulo.suffix}
          </h1>
          <p className="text-lg md:text-xl text-on-surface/80 max-w-3xl mx-auto font-medium leading-relaxed">
            {historiaContent.hero.descricao}
          </p>
        </div>

        {/* Scroll Indicator no fluxo da página, garantindo folga */}
        <div className="flex flex-col items-center gap-3 z-30 mt-8 md:mt-12">
          <span className="text-xs md:text-sm text-on-surface-light font-bold tracking-widest uppercase hidden md:block drop-shadow-sm">{historiaContent.hero.scrollLabel}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary drop-shadow-md animate-bounce">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Seções Modulares em Encadeamento Único */}
      <HistoriaOrigens content={historiaContent.origem} />
      <HistoriaLinhaDoTempo content={historiaContent.linhaDoTempo} />
      <HistoriaMestres content={historiaContent.trajetoria} mestres={historiaContent.mestres} />
      <HistoriaEixos content={historiaContent.linguagensCulturais} />
      <HistoriaEstrutura content={historiaContent.legado} />
      <HistoriaEventos content={historiaContent.eventos} />
      
    </main>
  );
}
