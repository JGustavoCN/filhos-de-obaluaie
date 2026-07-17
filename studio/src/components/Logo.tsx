import type {LogoProps} from 'sanity'

export function Logo(props: LogoProps) {
  // Apenas a renderização do logo principal na navbar superior (respirado e sem invadir o dropdown)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '4px' }}>
      <img 
        src="/static/logo.png" 
        alt="Logo Filhos de Obaluaiê" 
        style={{ width: '40px', height: '40px', objectFit: 'contain' }} 
      />
      {/* Ocultamos o título no logo do painel porque o Sanity já adiciona o nome do projeto se configurado. Se o título vier limpo, exibimos nosso nome. */}
      {props.renderDefault ? props.renderDefault({ ...props, title: 'Filhos de Obaluaiê' }) : (
        <span style={{ 
          fontWeight: 700, 
          letterSpacing: '0.5px', 
          fontSize: '18px',
          color: '#F5F5F5' // Texto em Alto Contraste
        }}>
          Filhos de Obaluaiê
        </span>
      )}
    </div>
  )
}
