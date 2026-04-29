export default function Footer() {
  return (
    <footer id="contato" className="relative py-16 md:py-20 bg-on-surface" aria-label="Rodapé">
      <div className="absolute inset-0 bogolan-pattern opacity-10 pointer-events-none" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">
          <div className="md:col-span-5">
            <h3 className="font-[var(--font-headline)] text-2xl font-bold text-surface mb-4">Filhos de Obaluaiê</h3>
            <p className="text-surface/60 text-sm md:text-base leading-relaxed w-full max-w-prose">
              Centro Cultural de Capoeira e Expressões Afro-Brasileiras. Bairro Santa Rita, Tobias Barreto — Sergipe, Brasil.
            </p>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-semibold text-surface/80 text-sm mb-4 uppercase tracking-wider">Navegação</h4>
            <ul className="flex flex-col gap-2">
              {["Sobre", "Projetos", "Acervo", "Contato"].map((item) => (
                <li key={item}><a href={`#${item.toLowerCase()}`} className="text-surface/50 hover:text-secondary text-sm transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <h4 className="font-semibold text-surface/80 text-sm mb-4 uppercase tracking-wider">Contato</h4>
            <ul className="flex flex-col gap-2 text-sm text-surface/50">
              <li>Instagram: @filhosdeobaluaie</li>
              <li>Tobias Barreto, SE — Brasil</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-surface/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-surface/40 text-xs">&copy; 2025 Filhos de Obaluaiê. Ancestral Contemporary Heritage.</p>
          <p className="text-surface/30 text-xs">Desenvolvido com respeito à ancestralidade.</p>
        </div>
      </div>
    </footer>
  );
}
