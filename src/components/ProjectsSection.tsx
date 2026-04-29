
const projects = [
  {
    id: "capoeira",
    title: "Capoeira",
    description: "A arte marcial que é dança, jogo e resistência histórica.",
    icon: "/assets/images/icon-capoeira.png",
    frame: "primary" as const,
  },
  {
    id: "maculele",
    title: "Maculelê",
    description: "O ritmo dos bastões que celebra a colheita e a valentia.",
    icon: "/assets/images/icon-atabaque.png",
    frame: "secondary" as const,
  },
  {
    id: "danca-afro",
    title: "Dança Afro",
    description: "Conexão espiritual através do movimento ancestral.",
    icon: "/assets/images/icon-atabaque.png",
    frame: "primary" as const,
  },
  {
    id: "samba-de-coco",
    title: "Samba de Coco",
    description: "A batida do pé no chão que ecoa o trabalho e a alegria.",
    icon: "/assets/images/icon-capoeira.png",
    frame: "secondary" as const,
  },
];

export default function ProjectsSection() {
  return (
    <section id="projetos" className="relative py-20 md:py-28" aria-labelledby="projects-heading">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-px bg-primary" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-on-surface-light">Nossas Expressões</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
          <h2 id="projects-heading" className="font-[var(--font-headline)] text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface">
            Projetos <span className="text-primary">Sociais</span>
          </h2>
          <p className="text-on-surface-light w-full max-w-2xl text-sm md:text-base md:text-right mt-4 md:mt-0">
            Mantemos viva a chama de tradições que pulsam em nosso sangue e em nossa comunidade.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 stagger-children">
          {projects.map((project) => (
            <article key={project.id} id={`card-${project.id}`} className={`card-9slice${project.frame === "secondary" ? "-secondary" : ""} group relative overflow-hidden`}>
              <div className="glass-card p-3 md:p-6 spring-transition h-full flex flex-col">
                <div className="w-14 h-14 mb-5 relative">
                  <img src={project.icon} alt="" width={56} height={56} className="object-contain mix-blend-multiply w-full h-full" />
                </div>
                <h3 className="font-[var(--font-headline)] text-2xl font-bold text-on-surface mb-3">{project.title}</h3>
                <p className="text-on-surface/90 text-sm md:text-base leading-relaxed flex-1">{project.description}</p>
                <div className="mt-5 pt-4 border-t border-neutral/40">
                  <span className="bg-primary text-on-primary px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Saiba mais
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
