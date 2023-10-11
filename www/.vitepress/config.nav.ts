import type { DefaultTheme } from 'vitepress'

// NOTE: regex for multiple paths with { activeMatch: `^/(docs|cookbook|examples)/` }
// NOTE: trailing slash in links allows e.g. '/partners/index.md' instead of '/partners.md'
export const navEN: DefaultTheme.NavItem[] = [
  {
    text: 'Products',
    items: [
      { text: 'Components', link: '/docs/netzo/components' }, // TODO: '/products/components'
      { text: 'Database', link: '/docs/platform/projects/database' }, // TODO: '/products/database'
      // { text: 'Portals', link: '/products/portals' },
      // { text: 'Embed', link: '/products/embed' },
      // { text: 'Workflows', link: '/products/workflows' },
      {
        text: 'Integrations',
        items: [
          { text: 'APIs', link: '/docs/netzo/apis' },
          { text: 'Modules', link: '/docs/netzo/modules' },
        ],
      },
    ],
  },
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
      { text: 'Componenentes', link: '/docs/netzo/components' }, // TODO: '/products/components'
      { text: 'Base de datos', link: '/docs/platform/projects/database' }, // TODO: '/products/database'
      // { text: 'Portales', link: '/products/portals' },
      // { text: 'Embeds', link: '/products/embed' },
      // { text: 'Workflows', link: '/products/workflows' },
      {
        text: 'Integraciones',
        items: [
          { text: 'APIs', link: '/docs/netzo/apis' },
          { text: 'Módulos', link: '/docs/netzo/modules' },
        ],
      },
    ],
  },
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
