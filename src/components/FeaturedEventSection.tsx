import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface FeaturedEventProps {
  evento: {
    titulo: string;
    slug: string;
    imagemCapa?: { url: string; alt?: string };
    dataCard?: string;
    resumo?: string;
  };
  tituloSessao?: string;
}

export default function FeaturedEventSection({ evento, tituloSessao }: FeaturedEventProps) {
  if (!evento) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch {
      return "";
    }
  };

  return (
    <section id="destaque" className="py-20 md:py-28 bg-surface-container-low w-full relative overflow-hidden">
      {/* Decorative bg element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <div className="flex items-center gap-3 mb-12">
          <span className="w-8 h-px bg-primary" />
          <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {tituloSessao || "Em Destaque"}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center bg-surface p-6 md:p-10 rounded-[32px] shadow-sm border border-outline-variant/30">
          
          {/* Image Side */}
          {evento.imagemCapa?.url && (
            <div className="w-full lg:w-1/2 relative aspect-[4/3] lg:aspect-square max-h-[500px] rounded-2xl overflow-hidden group">
              <Image
                src={evento.imagemCapa.url}
                alt={evento.imagemCapa.alt || evento.titulo}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
          )}

          {/* Content Side */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider rounded-full mb-6">
              Destaque Principal
            </span>
            
            <h2 className="text-3xl md:text-5xl font-bold font-[var(--font-headline)] text-on-surface leading-tight mb-6">
              {evento.titulo}
            </h2>
            
            {evento.dataCard && (
              <div className="flex items-center gap-2 text-primary font-semibold mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(evento.dataCard)}</span>
              </div>
            )}

            {evento.resumo && (
              <p className="text-base md:text-lg text-on-surface-light mb-8 leading-relaxed">
                {evento.resumo}
              </p>
            )}

            <Link
              href={`/conteudo/${evento.slug}`}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary font-semibold rounded-pill spring-transition hover:bg-primary-hover hover:shadow-[0_8px_32px_rgba(140,58,42,0.2)]"
            >
              Ver Detalhes do Evento
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
