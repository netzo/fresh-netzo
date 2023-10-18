import type { DefaultTheme } from 'vitepress'

// NOTE: regex for multiple paths with { activeMatch: `^/(docs|cookbook|examples)/` }
// NOTE: trailing slash in links allows e.g. '/partners/index.md' instead of '/partners.md'
export const navEN: DefaultTheme.NavItem[] = [
  {
    text: 'Products',
    items: [
      {
        text: 'Platform', // 'Projects',
        items: [
          // { text: 'Embeds' },
          { text: 'Apps', link: '/products/apps' },
          { text: 'Inbox', link: '/products/inbox' },
          { text: 'Projects', link: '/products/projects' },
          { text: 'Storage (soon)', link: '/products/storage' },
        ],
      },
      {
        text: 'Projects', // 'Projects',
        items: [
          // { text: 'Embeds' },
          { text: 'Authentication', link: '/products/authentication' },
          { text: 'Database', link: '/products/database' },
          { text: 'Workflows (soon)', link: '/products/workflows' },
          { text: 'Analytics (soon)', link: '/' },
        ],
      },
    ],
  },
  {
    text: 'Developer',
    items: [
      { text: 'APIs', link: '/docs/netzo/apis' },
      { text: 'Authentication', link: '/docs/netzo/authentication' },
      { text: 'CLI', link: '/docs/netzo/cli' },
      { text: 'Components', link: '/docs/netzo/components' },
      { text: 'Composables', link: '/docs/netzo/composables' },
      { text: 'Database', link: '/docs/netzo/database' },
      { text: 'Plugins', link: '/docs/netzo/plugins' },
    ],
  },
  // { text: 'Enterprise', link: '' },
  {
    text: 'Use Cases',
    items: [
      { text: 'Apps', link: '/docs/use-cases/apps' },
      { text: 'APIs', link: '/docs/use-cases/apis' },
      { text: 'Workflows', link: '/docs/use-cases/workflows' },
    ],
  },
  // {
  //   text: 'Use Cases',
  //   items: [
  //     { text: '📊 Business Intelligence', link: '/use-cases#business-intelligence-bi' },
  //     { text: '💻 Admin Panels', link: '/use-cases#admin-panels-crud' },
  //     { text: '🔗 APIs (REST)', link: '/use-cases#rest-apis' },
  //     { text: '🤖 Workflow Automation', link: '/use-cases#workflows' },
  //     { text: '🌐 Websites', link: '/use-cases#websites-and-landing-pages' },
  //   ],
  // },
  { text: 'Pricing', link: '/pricing' },
  { text: 'Docs', link: '/docs/introduction/getting-started' },
]

export const navES: DefaultTheme.NavItem[] = [
  {
    text: 'Productos',
    items: [
      {
        text: 'Plataforma', // 'Projects',
        items: [
          // { text: 'Embeds' },
          { text: 'Apps', link: '/es/products/apps' },
          { text: 'Inbox', link: '/es/products/inbox' },
          { text: 'Proyectos', link: '/es/products/projects' },
          { text: 'Alacenamiento (soon)', link: '/es/products/storage' },
        ],
      },
      {
        text: 'Proyectos', // 'projects',
        items: [
          { text: 'Autenticación', link: '/es/products/authentication' },
          { text: 'Base de datos', link: '/es/products/database' },
          { text: 'Workflows (soon)', link: '/es/products/workflows' },
          { text: 'Analiticas', link: '/' },
        ],
      },
    ],
  },
  {
    text: 'Desarrollador',
    items: [
      { text: 'APIs', link: '/docs/netzo/apis' },
      { text: 'CLI', link: '/docs/netzo/cli' },
      { text: 'Componentes', link: '/docs/netzo/components' },
      { text: 'Módulos', link: '/docs/netzo/modules' },
    ],
  },
  // { text: 'Enterprise', link: '/' },
  {
    text: 'Casos de Uso',
    items: [
      { text: 'Apps', link: '/docs/use-cases/apps' },
      { text: 'APIs', link: '/docs/use-cases/apis' },
      { text: 'Workflows', link: '/docs/use-cases/workflows' },
    ],
  },
  // {
  //   text: 'Casos de Uso',
  //   items: [
  //     { text: '📊 Inteligencia de Negocios', link: '/es/use-cases#inteligencia-de-negocios-bi' },
  //     { text: '💻 Cuadros de mando', link: '/es/use-cases#cuadros-de-mando-crud' },
  //     { text: '🔗 APIs (REST)', link: '/es/use-cases#apis-rest' },
  //     { text: '🤖 Flujos de Trabajo', link: '/es/use-cases#flujos-de-trabajo' },
  //     { text: '🌐 Sitios Web', link: '/use-cases#sitios-web-y-landing-pages' },
  //   ],
  // },
  // { text: 'Precios', link: '/es/pricing' },
  { text: 'Docs', link: '/docs/introduction/getting-started' },
]
