import Image from "next/image";

export default function XaxaraDivider() {
  return (
    <div className="flex items-center justify-center py-8 md:py-12 w-full max-w-4xl mx-auto px-4" aria-hidden="true">
      
      {/* Linha Decorativa Esquerda */}
      <div className="flex items-center flex-1 max-w-[100px] md:max-w-[200px]">
        <span className="w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-primary)]/30 to-[var(--color-primary)]/70 rounded-full" />
        <div className="w-2 h-2 rotate-45 bg-[var(--color-primary)]/70 ml-2 md:ml-4 flex-shrink-0" />
      </div>
      
      {/* Xaxará Central com Glow Adaptativo */}
      <div className="mx-4 md:mx-8 relative flex items-center justify-center group transition-transform duration-500 hover:scale-105">
        
        {/* Glow difuso: Escuro/Marrom no Light Mode (para contraste), Claro no Dark Mode */}
        <div className="absolute inset-0 scale-125 bg-[var(--color-primary)]/20 dark:bg-white/10 blur-xl rounded-full opacity-100 pointer-events-none"></div>

        <Image
          src="/assets/images/icon-xaxara-divider.png"
          alt=""
          width={500}
          height={120}
          className="xaxara-divider relative z-10 cursor-pointer select-none h-20 md:h-28 w-auto drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
        />
      </div>

      {/* Linha Decorativa Direita */}
      <div className="flex items-center flex-1 max-w-[100px] md:max-w-[200px]">
        <div className="w-2 h-2 rotate-45 bg-[var(--color-primary)]/70 mr-2 md:mr-4 flex-shrink-0" />
        <span className="w-full h-[2px] bg-gradient-to-l from-transparent via-[var(--color-primary)]/30 to-[var(--color-primary)]/70 rounded-full" />
      </div>

    </div>
  );
}
