import React from 'react';

export default function HistoriaLinhaDoTempo() {
  const eventos = [
    {
      ano: "1987",
      titulo: "A Semente em Tobias Barreto",
      descricao: "Mestre Nhô chega à cidade e inicia as primeiras aulas na Associação Atlética, formando o grupo 'Novos Irmãos' e a Academia J.J. Modelagem Física."
    },
    {
      ano: "1994",
      titulo: "Aperfeiçoamento em São Paulo",
      descricao: "Mestre Bahia muda-se para São Paulo. Em Guaianazes e Glicério, aprende com Mestre Zezinho e vivencia a capoeira como ferramenta social no projeto 'Cultura de Paz'."
    },
    {
      ano: "2005",
      titulo: "O Retorno e o Renascimento",
      descricao: "Mestre Bahia volta a Tobias Barreto. Com muito esforço comunitário, reativa o antigo Centro de Interação Humana no bairro Santa Rita, fundando o que viria a ser os Filhos de Obaluaiê."
    },
    {
      ano: "2008",
      titulo: "Reconhecimento Nacional",
      descricao: "A Roda de Capoeira é oficialmente reconhecida como Patrimônio Cultural do Brasil pelo IPHAN, fortalecendo a missão de preservação que o grupo já trilhava."
    },
    {
      ano: "2022 - Atual",
      titulo: "Expansão e Acessibilidade",
      descricao: "O Centro consolida o projeto Bairro Cidadania, garantindo turmas gratuitas. Além da capoeira, as oficinas de percussão e teatro fortalecem um equipamento cultural inclusivo para toda a cidade."
    }
  ];

  return (
    <section className="py-24 bg-surface-container border-y border-outline/20 px-6 md:px-10">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block px-5 py-2 bg-secondary text-on-surface font-bold tracking-widest text-sm uppercase rounded-full mb-6 border border-outline/20">
            Linha do Tempo
          </div>
          <h2 className="font-[var(--font-headline)] text-4xl md:text-5xl font-bold text-on-surface mb-6">
            Nossa <span className="text-on-surface underline decoration-primary decoration-4 underline-offset-8">Jornada</span>
          </h2>
          <p className="text-lg text-on-surface/80 font-medium max-w-2xl mx-auto">
            Os marcos fundamentais que transformaram um sonho individual em um patrimônio cultural da comunidade tobiense.
          </p>
        </div>

        <div className="relative border-l-4 border-primary/30 ml-4 md:ml-8 space-y-12 pb-8">
          {eventos.map((evento, index) => (
            <div key={index} className="relative pl-8 md:pl-12 group">
              {/* Dot */}
              <div className="absolute -left-[14px] top-1 w-6 h-6 rounded-full bg-primary border-4 border-surface-container shadow-sm group-hover:scale-125 transition-transform" />
              
              <div className="bg-surface rounded-2xl p-6 md:p-8 shadow-sm border border-outline/20 group-hover:border-primary/50 transition-colors">
                <span className="text-primary font-bold text-xl md:text-2xl mb-2 block">{evento.ano}</span>
                <h3 className="text-2xl font-[var(--font-headline)] font-bold text-on-surface mb-3">{evento.titulo}</h3>
                <p className="text-on-surface/80 text-lg leading-relaxed">{evento.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
