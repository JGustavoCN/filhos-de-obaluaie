const documents = [
  { title: "Edital 01/2024 — Lei Paulo Gustavo", type: "PDF", size: "2.4 MB", date: "Jan 2024" },
  { title: "Relatório Anual de Atividades 2023", type: "PDF", size: "5.1 MB", date: "Dez 2023" },
  { title: "Estatuto Social Atualizado", type: "PDF", size: "1.2 MB", date: "Jun 2022" },
  { title: "Plano de Trabalho — Cultura Viva", type: "PDF", size: "3.8 MB", date: "Mar 2024" },
];

export default function ArchiveSection() {
  return (
    <section id="acervo" className="relative py-20 md:py-28" aria-labelledby="archive-heading">
      <div className="absolute inset-0 bg-surface-container-low pointer-events-none" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-px bg-primary" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-on-surface-light">Transparência</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
          <h2 id="archive-heading" className="font-[var(--font-headline)] text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface">
            Acervo <span className="text-primary">Documental</span>
          </h2>
          <p className="text-on-surface-light w-full max-w-2xl text-sm md:text-base md:text-right mt-4 md:mt-0">
            Transparência e preservação. Acesse editais, registros de projetos e documentos institucionais.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {documents.map((doc, i) => (
            <a key={i} href="#" className="group glass-card flex items-center justify-between p-5 md:p-6 spring-transition hover:border-primary/30">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-card bg-primary/10 flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 2h5l5 5v11a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#8C3A2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M11 2v5h5" stroke="#8C3A2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-on-surface text-sm md:text-base group-hover:text-primary transition-colors">{doc.title}</h3>
                  <p className="text-xs text-on-surface-light mt-0.5">{doc.type} · {doc.size} · {doc.date}</p>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-on-surface-light group-hover:text-primary transition-colors shrink-0"><path d="M10 3v10m0 0l-4-4m4 4l4-4M4 17h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          ))}
        </div>
        <div className="mt-8 p-5 rounded-card bg-tertiary/8 border border-tertiary/20">
          <p className="text-sm text-on-surface/80">
            <strong className="text-tertiary">Nota institucional:</strong> Todos os documentos estão disponíveis conforme exigências da Lei Paulo Gustavo e editais de fomento cultural. Para acesso completo ao dossiê, entre em contato.
          </p>
        </div>
      </div>
    </section>
  );
}
