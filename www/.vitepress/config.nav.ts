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
        text: 'Templates',
        items: [
          { text: 'Apps', link: '/docs/templates/apps' },
          { text: 'APIs', link: '/docs/templates/apis' },
          { text: 'Workflows', link: '/docs/templates/workflows' },
        ],
      },
    ],
  },
  {
    text: 'Integrations',
    items: [
      { text: 'APIs', link: '/docs/netzo/apis' },
      { text: 'Modules', link: '/docs/netzo/modules' },
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
    text: 'Netzo',
    items: [
      {
        items: [
          { text: '¿Qué es Netzo?', link: '/es/netzo/what-is-netzo' },
          { text: '¿Por qué usar Netzo?', link: '/es/netzo/why-use-netzo' },
        ],
      },
      {
        text: '¿Para quién es Netzo?',
        items: [
          { text: '🧑‍💻 Equipos de Desarrollo', link: '/es/netzo/who-is-netzo-for#equipos-de-desarrollo' },
          { text: '🚀 PYMEs y Startups', link: '/es/netzo/who-is-netzo-for#pymes-y-startups' },
          { text: '🏢 Corporaciones', link: '/es/netzo/who-is-netzo-for#corporaciones' },
        ],
      },
    ],
  },
  {
    text: 'Plantillas',
    items: [
      { text: 'Apps', link: '/docs/templates/apps' },
      { text: 'APIs', link: '/docs/templates/apis' },
      { text: 'Workflows', link: '/docs/templates/workflows' },
    ],
  },
  {
    text: 'Integraciones',
    items: [
      { text: 'APIs', link: '/docs/netzo/apis' },
      { text: 'Módulos', link: '/docs/netzo/modules' },
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
