import type { DefaultTheme } from 'vitepress'

// NOTE: regex for multiple paths with { activeMatch: `^/(docs|cookbook|examples)/` }
// NOTE: trailing slash in links allows e.g. '/partners/index.md' instead of '/partners.md'
export const navEN: DefaultTheme.NavItem[] = [
  {
    text: 'Products',
    items: [
      {
        text: 'Platform', // '',
        items: [
          { text: 'Apps', link: '/products/apps' },
          { text: 'Inbox', link: '/products/inbox' },
          { text: 'Projects', link: '/products/projects' },
          // { text: 'Storage (soon)', link: '/products/storage' },
        ],
      },
      {
        text: 'Projects', // 'Projects',
        items: [
          { text: 'Portals', link: '/products/portals' },
          { text: 'Database', link: '/products/database' },
          { text: 'Workflows (soon)', link: '/products/workflows' },
          // { text: 'Analytics (soon)', link: '/products/analytics' },
        ],
      },
    ],
  },
  {
    text: 'Developer',
    items: [
      { text: 'APIs', link: '/docs/framework/apis' },
      { text: 'Portals', link: '/docs/framework/portals' },
      { text: 'CLI', link: '/docs/framework/cli' },
      { text: 'Components', link: '/docs/framework/components' },
      { text: 'Database', link: '/docs/framework/database' },
      { text: 'Plugins', link: '/docs/framework/plugins' },
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
  // { text: 'Pricing', link: '/pricing' },
  { text: 'Docs', link: '/docs/introduction/getting-started' },
]

export const navES: DefaultTheme.NavItem[] = [
  {
    text: 'Productos',
    items: [
      {
        text: 'Plataforma', // '',
        items: [
          { text: 'Apps', link: '/es/products/apps' },
          { text: 'Inbox', link: '/es/products/inbox' },
          { text: 'Proyectos', link: '/es/products/projects' },
          // { text: 'Almacenamiento (próx.)', link: '/es/products/storage' },
        ],
      },
      {
        text: 'Proyectos', // 'Projects',
        items: [
          { text: 'Auth', link: '/es/products/portals' },
          { text: 'Base de datos', link: '/es/products/database' },
          { text: 'Automatizaciones (próx.)', link: '/es/products/workflows' },
          // { text: 'Analiticas (próx.)', link: '/es/products/analytics' },
        ],
      },
    ],
  },
  {
    text: 'Desarrollador',
    items: [
      { text: 'APIs', link: '/docs/framework/apis' },
      { text: 'Auth', link: '/docs/framework/portals' },
      { text: 'CLI', link: '/docs/framework/cli' },
      { text: 'Componentes', link: '/docs/framework/components' },
      { text: 'Base de Datos', link: '/docs/framework/database' },
      { text: 'Plugins', link: '/docs/framework/plugins' },
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
