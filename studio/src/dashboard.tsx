import React from 'react'
import { dashboardTool, projectUsersWidget, projectInfoWidget, DashboardWidget } from '@sanity/dashboard'
import { documentListWidget } from 'sanity-plugin-dashboard-widget-document-list'

function customLinksWidget(): DashboardWidget {
  return {
    name: 'custom-links',
    component: function CustomLinks() {
      return (
        <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
          <h3 style={{ marginTop: 0, color: '#F5F5F5' }}>Centro Cultural Filhos de Obaluaiê</h3>
          <p style={{ color: '#888', marginBottom: '20px' }}>Bem-vindo ao Painel Oficial de Gestão de Conteúdo.</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>
              <a href="https://filhos-de-obaluaie.vercel.app" target="_blank" rel="noreferrer" style={{ color: '#D64545', textDecoration: 'none', fontWeight: 'bold' }}>
                🌍 Acessar Site Ao Vivo (Vercel)
              </a>
            </li>
            <li>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: '#D64545', textDecoration: 'none', fontWeight: 'bold' }}>
                💻 Repositório GitHub
              </a>
            </li>
            <li style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #333', color: '#ccc', fontSize: '13px' }}>
              ℹ️ Os dados do banco (imagens, textos e eventos) estão hospedados globalmente no servidor do Sanity.io. Não exclua dados sem conferir o site.
            </li>
          </ul>
        </div>
      )
    },
    layout: { width: 'small' }
  }
}

export const dashboard = dashboardTool({
  widgets: [
    customLinksWidget(),
    projectInfoWidget({
      layout: { width: 'small' }
    }),
    documentListWidget({
      title: 'Últimas Notícias Adicionadas',
      order: '_updatedAt desc',
      types: ['noticia'],
      layout: { width: 'medium' }
    }),
    documentListWidget({
      title: 'Próximos Eventos',
      order: '_createdAt desc',
      types: ['oficina', 'rodaConsciencia', 'mostraCultural'],
      layout: { width: 'medium' }
    }),
    projectUsersWidget({
      layout: { width: 'small' }
    })
  ]
})
