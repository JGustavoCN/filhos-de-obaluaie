import { buildLegacyTheme } from 'sanity'

const props = {
  '--oba-surface': '#121212', // Background Base
  '--oba-surface-container': '#2A2A2A', // Secondary
  '--oba-text': '#F5F5F5', // On-Surface
  '--oba-brand': '#D64545', // Primary Dark
  '--oba-red': '#D64545', // Error
}

export const theme = buildLegacyTheme({
  /* Forçando inversão de cores para Modo Escuro Perpétuo */
  '--black': props['--oba-text'],
  '--white': props['--oba-surface'],

  '--gray': '#888',
  '--gray-base': '#888',

  '--component-bg': props['--oba-surface'],
  '--component-text-color': props['--oba-text'],

  /* Brand Colors */
  '--brand-primary': props['--oba-brand'],

  /* Default button */
  '--default-button-color': '#444',
  '--default-button-primary-color': props['--oba-brand'],
  '--default-button-success-color': '#22863a',
  '--default-button-warning-color': '#f5b041',
  '--default-button-danger-color': props['--oba-red'],

  /* State */
  '--state-info-color': '#3182ce',
  '--state-success-color': '#22863a',
  '--state-warning-color': '#f5b041',
  '--state-danger-color': props['--oba-red'],

  /* Navbar (Topo) */
  '--main-navigation-color': props['--oba-surface-container'],
  '--main-navigation-color--inverted': props['--oba-text'],

  '--focus-color': props['--oba-brand'],
})
