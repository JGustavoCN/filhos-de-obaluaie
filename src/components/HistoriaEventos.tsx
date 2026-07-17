import Link from "next/link";

export default function HistoriaEventos() {
  return (
    <section className="py-24 bg-surface px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block px-5 py-2 bg-secondary text-on-surface font-bold tracking-widest text-sm uppercase rounded-full mb-6 border border-outline/20">
            Impacto Social & Eventos
          </div>
          <h2 className="font-[var(--font-headline)] text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mb-6">
            Nossa Vida <span className="text-on-surface underline decoration-primary decoration-4 underline-offset-8">Comunitária</span>
          </h2>
          <p className="text-lg md:text-xl text-on-surface font-medium max-w-3xl mx-auto">
            O Centro Filhos de Obaluaiê atua em duas direções: traz a comunidade para dentro do equipamento cultural e, ao mesmo tempo, leva nossas práticas para fora, ocupando espaços públicos em Tobias Barreto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Card Esquerdo: Eventos */}
          <div className="bg-surface-container rounded-3xl p-8 md:p-12 border border-outline/30 shadow-md">
            <h3 className="text-3xl font-[var(--font-headline)] font-bold text-on-surface mb-8 border-b border-outline/30 pb-4">Mostras e Celebrações</h3>
            
            <div className="space-y-10">
              <div className="flex gap-5 items-start">
                <div className="w-14 h-14 shrink-0 rounded-full bg-secondary flex items-center justify-center border border-outline/20">
                  <span className="text-on-surface font-bold text-xl">17</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-on-surface mb-2">Encontro da Consciência Negra</h4>
                  <p className="text-on-surface leading-relaxed text-lg">Nosso evento de maior alcance, com participação de mestres de diversas partes do mundo. Já celebramos mais de 17 edições ininterruptas de intercâmbio cultural no mês de novembro.</p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-14 h-14 shrink-0 rounded-full bg-secondary flex items-center justify-center border border-outline/20 text-on-surface">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-on-surface mb-2">Rodas de Aniversariantes</h4>
                  <p className="text-on-surface leading-relaxed text-lg">Mensalmente, celebramos a vida dos nossos alunos na última semana do mês com brincadeiras de roda, música e lanche com a família (com cuscuz com mistura, arroz doce e mungunzá).</p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-14 h-14 shrink-0 rounded-full bg-secondary flex items-center justify-center border border-outline/20 text-on-surface">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-on-surface mb-2">Mostra Cultural nas Escolas</h4>
                  <p className="text-on-surface leading-relaxed text-lg">Realizamos ações formativas fora de nossa sede, fazendo intervenções em praças e escolas (como Iraildes, Telma, Nicodemos Falcão), além de participar do Sarau Cultural Tobias, sou Eu.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card Direito: Projetos, Gestão e Acessibilidade */}
          <div className="space-y-12">
            <div>
              <h3 className="text-3xl font-[var(--font-headline)] font-bold text-on-surface mb-6">Apoios Institucionais</h3>
              <p className="text-lg text-on-surface font-medium leading-relaxed mb-6">
                Ao longo dos anos, amadurecemos estruturalmente para garantir financiamento e melhorias no nosso espaço no Bairro Santa Rita. Nossas aulas são possíveis graças a editais públicos (como a Lei Paulo Gustavo) e parcerias com o comércio local e Prefeitura.
              </p>
              <div className="bg-primary text-on-primary p-8 rounded-2xl shadow-md">
                <h4 className="font-[var(--font-headline)] font-bold text-2xl mb-3">O Projeto Bairro Cidadania</h4>
                <p className="text-on-primary font-medium text-lg leading-relaxed">Uma iniciativa contínua (2022-2024) que permite turmas 100% gratuitas. O projeto tem a força da Federação Sergipana de Capoeira e patrocínios privados fundamentais de parceiros como <strong>Honda, Grupo Ágape e Minas Calçados</strong>.</p>
              </div>
            </div>

            <div className="bg-surface-container p-8 rounded-2xl border border-outline/30 shadow-md">
              <h3 className="text-2xl font-[var(--font-headline)] font-bold text-on-surface mb-4">Impacto Direto na Vida dos Jovens</h3>
              <p className="text-lg text-on-surface leading-relaxed">
                Relatos orais de nossos alunos confirmam que a capoeira vai muito além do esporte. Nas rodas, eles aprendem a diferença entre ataque e defesa, a importância de evitar a violência e o domínio das próprias emoções. A roda de conversa inicial — tradicionalmente conduzida pelo Mestre Bahia — é apontada por mães e aprendizes como o momento vital onde se cultiva o respeito, a tolerância e o pertencimento à cultura afro-brasileira.
              </p>
            </div>

            <div className="bg-surface-container p-8 rounded-2xl border border-outline/30 shadow-md">
              <h3 className="text-2xl font-[var(--font-headline)] font-bold text-on-surface mb-4">Compromisso com a Acessibilidade</h3>
              <p className="text-lg text-on-surface leading-relaxed">
                Além do acolhimento a populações vulneráveis e LGBTQIAP+, nossa gestão busca ativamente ampliar a estrutura física (rampas, banheiros PCDs) e o corpo de instrutores preparados para lidar com crianças e adultos com deficiências auditivas e intelectuais. 
              </p>
            </div>
          </div>
          
        </div>
        
        {/* Footer Navigation CTA */}
        <div className="mt-24 flex justify-center border-t border-outline/20 pt-16">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-10 py-5 bg-primary text-on-primary text-lg font-bold rounded-full hover:opacity-90 transition-opacity shadow-md"
          >
            Voltar para a Página Inicial
          </Link>
        </div>
      </div>
    </section>
  );
}
