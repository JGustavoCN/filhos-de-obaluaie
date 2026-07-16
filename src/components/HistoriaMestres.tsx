import Image from "next/image";

export default function HistoriaMestres() {
  return (
    <section className="py-24 bg-surface px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block px-5 py-2 bg-secondary text-on-surface font-bold tracking-widest text-sm uppercase rounded-full mb-6 border border-outline/20">
            Ancestralidade & Identidade
          </div>
          <h2 className="font-[var(--font-headline)] text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mb-6">
            As Raízes de <span className="text-on-surface opacity-90 underline decoration-primary decoration-4 underline-offset-8">Nossos Mestres</span>
          </h2>
          <p className="text-lg md:text-xl text-on-surface max-w-3xl mx-auto mb-8 font-medium">
            Nossa história não seria possível sem os grandes responsáveis por ensinar a disciplina, o respeito e a arte. Antes de nos chamarmos "Filhos de Obaluaiê", o grupo nasceu como "Berimbau de Ouro".
          </p>
          <div className="max-w-4xl mx-auto bg-surface-container border-l-4 border-l-primary p-6 md:p-8 rounded-r-2xl text-left shadow-sm mb-12">
            <h4 className="font-[var(--font-headline)] text-2xl font-bold text-on-surface mb-3">O que significa Obaluaiê?</h4>
            <p className="text-on-surface text-lg leading-relaxed">
              A transição do nome não foi meramente estética; ela marcou nossa identidade negra afro-brasileira de forma definitiva. <strong>Obaluaiê</strong> é uma palavra de matriz iorubá que significa "Rei ou Dono da Terra". Ele é o orixá reverenciado como o <em>médico dos pobres</em> e curador dos enfermos. O nome foi adotado pelo Mestre Bahia como uma eterna homenagem ao seu mentor, Mestre Zezinho, cujos ensinamentos sempre visaram a cura e a proteção da comunidade.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Card Mestre Nhô */}
          <div className="glass-card rounded-2xl overflow-hidden border border-outline/40 group shadow-md bg-surface">
            <div className="relative w-full aspect-[4/3] bg-surface-container overflow-hidden">
              <Image src="/images/mestre-nho.png" alt="Retrato histórico do Mestre Nhô" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white font-[var(--font-headline)] drop-shadow-md">Mestre Nhô</h3>
            </div>
            <div className="p-6 md:p-8">
              <div className="inline-block px-3 py-1 bg-surface-container-high text-on-surface text-sm font-bold rounded-sm mb-4 border border-outline/20">1987</div>
              <p className="text-on-surface text-base md:text-lg leading-relaxed">
                Antônio Jorge da Conceição, o Mestre Nhô, trouxe os primeiros ensinamentos de capoeira a Tobias Barreto. Funcionário público oriundo de Aracaju, notou a falta de esporte e abriu a "Academia J.J. Modelagem Física", plantando a primeira semente local no grupo "Novos Irmãos".
              </p>
            </div>
          </div>

          {/* Card Mestre Zezinho */}
          <div className="glass-card rounded-2xl overflow-hidden border border-outline/40 group shadow-md bg-surface">
            <div className="relative w-full aspect-[4/3] bg-surface-container overflow-hidden">
              <Image src="/images/mestre-zezinho.png" alt="Retrato histórico do Mestre Zezinho" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white font-[var(--font-headline)] drop-shadow-md">Mestre Zezinho</h3>
            </div>
            <div className="p-6 md:p-8">
              <div className="inline-block px-3 py-1 bg-surface-container-high text-on-surface text-sm font-bold rounded-sm mb-4 border border-outline/20">1994 - São Paulo</div>
              <p className="text-on-surface text-base md:text-lg leading-relaxed">
                José Alípio Pureza, o saudoso Mestre Zezinho, acolheu Josafá no bairro do Glicério (SP). Sob sua orientação espiritual, a capoeira tornou-se "Cultura de Paz", resgatando jovens das ruas. 
              </p>
            </div>
          </div>

          {/* Card Mestre Bahia */}
          <div className="glass-card rounded-2xl overflow-hidden border border-outline/40 group shadow-md bg-surface md:col-span-2 lg:col-span-1">
            <div className="relative w-full aspect-[4/3] bg-surface-container overflow-hidden">
              <Image src="/images/capoeira-master.png" alt="Retrato histórico do Mestre Bahia" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white font-[var(--font-headline)] drop-shadow-md">Mestre Bahia</h3>
            </div>
            <div className="p-6 md:p-8">
              <div className="inline-block px-3 py-1 bg-primary text-on-primary text-sm font-bold rounded-sm mb-4">2005 - Atual</div>
              <p className="text-on-surface text-base md:text-lg leading-relaxed">
                Josafá Alves dos Santos, o Mestre Bahia. Iniciado com Nhô e aperfeiçoado com Zezinho, voltou a Tobias Barreto com uma missão gigante: a inclusão social, alfabetização e fomento afro-brasileiro, transformando um antigo centro num quilombo urbano de oportunidades.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
