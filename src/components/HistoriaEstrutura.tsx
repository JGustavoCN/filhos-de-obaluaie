export default function HistoriaEstrutura() {
  return (
    <section className="py-24 bg-surface-container border-t border-outline/20 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Lado Esquerdo: Estrutura Física */}
        <div className="lg:col-span-6 space-y-8">
          <div className="inline-block px-5 py-2 bg-secondary text-on-surface font-bold tracking-widest text-sm uppercase rounded-full border border-outline/20">
            A Nossa Sede
          </div>
          <h2 className="font-[var(--font-headline)] text-4xl md:text-5xl font-bold text-on-surface leading-tight">
            O Terreiro: Nossa <span className="text-on-surface underline decoration-primary decoration-4 underline-offset-8">Casa de Cultura</span>
          </h2>
          <p className="text-lg text-on-surface font-medium leading-relaxed">
            O espaço localizado no bairro Santa Rita evoluiu vertiginosamente. Hoje, nossa sede é equipada para ser um porto seguro multifuncional para a comunidade e para as dezenas de alunos diários.
          </p>
          
          <div className="bg-surface p-8 rounded-2xl shadow-sm border border-outline/30 mt-6">
            <h4 className="text-xl font-bold text-on-surface mb-4">Estrutura e Acervo Material</h4>
            <ul className="space-y-3 text-on-surface text-lg list-disc pl-5">
              <li>Amplo salão de atividades e tatames de exercícios.</li>
              <li>Sala de instrumentos com <strong>biblioteca comunitária</strong> focada em acervo negro.</li>
              <li>Cozinha e área de serviço (onde são preparados os lanches das Rodas).</li>
              <li>Acervo vasto de indumentárias: <em>redes de pesca, facões para maculelê, saias de palha, arreios, gibões e jalecos</em> para as apresentações.</li>
            </ul>
          </div>
        </div>

        {/* Lado Direito: Equipe e Parcerias */}
        <div className="lg:col-span-6 space-y-8">
          <div className="inline-block px-5 py-2 bg-secondary text-on-surface font-bold tracking-widest text-sm uppercase rounded-full border border-outline/20">
            Quem Faz Acontecer
          </div>
          <h2 className="font-[var(--font-headline)] text-4xl md:text-5xl font-bold text-on-surface leading-tight">
            O Coletivo de <span className="text-on-surface underline decoration-primary decoration-4 underline-offset-8">Oficineiros</span>
          </h2>
          <p className="text-lg text-on-surface font-medium leading-relaxed">
            O Mestre Bahia não constrói o Centro sozinho. A capacidade técnica e operacional do projeto depende de uma governança compartilhada e de profissionais dedicados em tempo integral.
          </p>
          
          <div className="bg-surface p-8 rounded-2xl shadow-sm border border-outline/30 mt-6">
            <h4 className="text-xl font-bold text-on-surface mb-4">Nossa Equipe de Multiplicadores</h4>
            <p className="text-on-surface text-lg leading-relaxed mb-4">
              Atendemos turmas pela manhã, tarde e noite sob a batuta de instrutores de excelência: <strong>Josafá Alves dos Santos</strong> e <strong>José Fernando Araújo Freitas</strong> (Capoeira); <strong>Rafael Araújo Santos</strong> e <strong>Emanoel de Jesus</strong> (Percussão); <strong>João Paulo Marciel Santos</strong> e <strong>Olívia de Souza</strong> (Dança e Teatro).
            </p>
            <p className="text-on-surface text-lg leading-relaxed">
              O projeto se expande para o <em>Povoado Jabiberi</em> e é orquestrado sob as orientações de um Comitê Gestor local.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
