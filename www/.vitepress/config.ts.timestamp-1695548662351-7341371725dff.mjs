// www/.vitepress/config.ts
import { createWriteStream } from "node:fs";
import { resolve as resolve2 } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "file:///home/ark/netzo-repos/netzo/node_modules/vitepress/dist/node/index.js";
import { withMermaid } from "file:///home/ark/netzo-repos/netzo/node_modules/vitepress-plugin-mermaid/dist/vitepress-plugin-mermaid.es.mjs";
import AutoImport from "file:///home/ark/netzo-repos/netzo/node_modules/unplugin-auto-import/dist/vite.js";
import { tabsMarkdownPlugin } from "file:///home/ark/netzo-repos/netzo/node_modules/vitepress-plugin-tabs/dist/index.js";
import Unocss from "file:///home/ark/netzo-repos/netzo/node_modules/unocss/dist/vite.mjs";
import { SitemapStream } from "file:///home/ark/netzo-repos/netzo/node_modules/sitemap/dist/index.js";

// www/.vitepress/config.og.ts
var ogEN = {
  title: "Netzo",
  description: "The smartest way to build custom business software. Build any custom dashboard, admin panel, internal API, workflow automation or website 10x faster. Build fast, share instantly and stay in control as you grow",
  image: "https://netzo.io/images/hotlink-ok/og-image.png",
  url: "https://netzo.io",
  author: "Netzo",
  type: "website",
  // social:
  githubURL: "https://github.com/netzo/netzo",
  twitterURL: "https://twitter.com/netzoio",
  discordURL: "https://discord.gg/tbDUpRQCTk",
  linkedinURL: "https://linkedin.com/company/73421774/admin/",
  facebookURL: "https://facebook.com/netzoio",
  instagramURL: "https://instagram.com/netzoio/",
  youtubeURL: "https://youtube.com/c/netzo"
};
var ogES = {
  ...ogEN,
  title: "Netzo",
  description: "La forma m\xE1s inteligente de crear apps empresariales a medida. Crea cualquier dashboard, cuadro de mandos, API interna, flujo automatizado o p\xE1gina web 10 veces m\xE1s r\xE1pido. Crea r\xE1pidamente, comparte al instante y mant\xE9n el control mientras creces.",
  image: "https://netzo.io/images/hotlink-ok/og-image-es.png"
};

// www/.vitepress/config.head.ts
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
var __vite_injected_original_dirname = "/home/ark/netzo-repos/netzo/www/.vitepress";
var head = [
  // [scripts] loaded before usercentrics
  ["script", {
    type: "text/javascript",
    async: "true"
  }, readFileSync(resolve(__vite_injected_original_dirname, "./scripts/customerly-popup.js"), "utf-8")],
  // [usercentrics] CMP (Consent Management Platform) script (loader.js)
  ["script", {
    "id": "usercentrics-cmp",
    // FIXME: loader.js script MIGHT SLOW DOWN APP (in development)
    "src": "https://app.usercentrics.eu/browser-ui/latest/loader.js",
    "data-settings-id": "sZu6kSROU",
    // 'data-disable-tracking': true, // only for non-production. default preview site
    // 'data-version': 'preview', // only for non-production. default preview site
    "async": "true"
  }],
  // [usercentrics] SMP (Smart Data Protector) script (uc-block.bundle.js): loads window.uc object
  // SMP is required to block embeds not directly implemented as scripts (e.g. iframes, noscript tags,
  // image tags) until consent is given (shows an overlay prompting user to enable, e.g. 'YouTube')
  ["script", { type: "application/javascript", src: "https://privacy-proxy.usercentrics.eu/latest/uc-block.bundle.js" }],
  // [usercentrics] DSR (Data Subject Request) script: injects button in privacy policy
  ["script", {
    type: "application/javascript",
    src: "https://dsr.consent.usercentrics.eu/dsr_url.js",
    dsr_text: "DSR"
  }],
  // [scripts] loaded after usercentrics
  ["script", {}, readFileSync(resolve(__vite_injected_original_dirname, "./scripts/usercentrics.js"), "utf-8")],
  // 1) Essential services/cookies
  ["script", {
    "src": "https://cdn.usefathom.com/script.js",
    "type": "text/plain",
    "data-usercentrics": "Fathom Analytics",
    "data-site": "QREQWIXF",
    // NOTE: will only fire event in production (under netzo.io/)
    "data-spa": "auto",
    "defer": ""
  }],
  // 2) Functional services/cookies
  ["script", {
    "type": "text/plain",
    "data-usercentrics": "Customerly",
    "defer": ""
  }, readFileSync(resolve(__vite_injected_original_dirname, "./scripts/customerly.js"), "utf-8")],
  ["script", {
    "type": "text/plain",
    "data-usercentrics": "Hotjar",
    "defer": ""
  }, readFileSync(resolve(__vite_injected_original_dirname, "./scripts/hotjar.js"), "utf-8")]
  // 3) Statistics services/cookies
  // 4) Marketing services/cookies
  // 5) Video services/cookies
];

// www/.vitepress/config.nav.ts
var navEN = [
  {
    text: "Netzo",
    items: [
      {
        items: [
          { text: "What is Netzo?", link: "/netzo/what-is-netzo" },
          { text: "Why use Netzo?", link: "/netzo/why-use-netzo" }
        ]
      },
      {
        text: "Who is Netzo for?",
        items: [
          { text: "\u{1F9D1}\u200D\u{1F4BB} Developer Teams", link: "/netzo/who-is-netzo-for#developer-teams" },
          { text: "\u{1F680} SMBs and Startups", link: "/netzo/who-is-netzo-for#smbs-and-startups" },
          { text: "\u{1F3E2} Enterprises", link: "/netzo/who-is-netzo-for#enterprises" }
        ]
      }
    ]
  },
  {
    text: "Templates",
    items: [
      { text: "Apps", link: "/docs/templates/apps" },
      { text: "APIs", link: "/docs/templates/apis" },
      { text: "Workflows", link: "/docs/templates/workflows" }
    ]
  },
  {
    text: "Integrations",
    items: [
      { text: "APIs", link: "/docs/netzo/apis" },
      { text: "Plugins", link: "/docs/netzo/ui/plugins" }
    ]
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
  { text: "Pricing", link: "/pricing" },
  { text: "Docs", link: "/docs/introduction/getting-started" }
];
var navES = [
  {
    text: "Netzo",
    items: [
      {
        items: [
          { text: "\xBFQu\xE9 es Netzo?", link: "/es/netzo/what-is-netzo" },
          { text: "\xBFPor qu\xE9 usar Netzo?", link: "/es/netzo/why-use-netzo" }
        ]
      },
      {
        text: "\xBFPara qui\xE9n es Netzo?",
        items: [
          { text: "\u{1F9D1}\u200D\u{1F4BB} Equipos de Desarrollo", link: "/es/netzo/who-is-netzo-for#equipos-de-desarrollo" },
          { text: "\u{1F680} PYMEs y Startups", link: "/es/netzo/who-is-netzo-for#pymes-y-startups" },
          { text: "\u{1F3E2} Corporaciones", link: "/es/netzo/who-is-netzo-for#corporaciones" }
        ]
      }
    ]
  },
  {
    text: "Plantillas",
    items: [
      { text: "Apps", link: "/docs/templates/apps" },
      { text: "APIs", link: "/docs/templates/apis" },
      { text: "Workflows", link: "/docs/templates/workflows" }
    ]
  },
  {
    text: "Integraciones",
    items: [
      { text: "APIs", link: "/docs/netzo/apis" },
      { text: "Plugins", link: "/docs/netzo/ui/plugins" }
    ]
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
  { text: "Docs", link: "/docs/introduction/getting-started" }
];

// www/.vitepress/config.sidebar.ts
var legalEN = {
  text: "English",
  collapsed: false,
  items: [
    { text: "Legal Notice", link: "/legal/legal-notice" },
    { text: "Cookie Notice", link: "/legal/cookie-notice" },
    { text: "Privacy Policy", link: "/legal/privacy-policy" },
    {
      text: "Agreements and Terms",
      link: "/legal/website-terms-of-use",
      items: [
        { text: "Website terms of use", link: "/legal/website-terms-of-use" },
        { text: "Main Services Agreement", link: "/legal/main-services-agreement" }
        // { text: 'Professional Services Terms', link: '/legal/professional-services-terms' },
      ]
    }
  ]
};
var legalES = {
  text: "Espa\xF1ol",
  collapsed: false,
  items: [
    { text: "Aviso legal", link: "/es/legal/legal-notice" },
    { text: "Aviso de cookies", link: "/es/legal/cookie-notice" },
    { text: "Pol\xEDtica de privacidad", link: "/es/legal/privacy-policy" },
    {
      text: "Acuerdos y t\xE9rminos",
      link: "/es/legal/website-terms-of-use",
      items: [
        { text: "T\xE9rminos de uso del sitio web", link: "/es/legal/website-terms-of-use" },
        { text: "Acuerdo de servicios principales", link: "/es/legal/main-services-agreement" },
        { text: "Acuerdo de servicios profesionales", link: "/es/legal/professional-services-terms" }
        // { text: 'Open Source License Disclosure', link: '/legal/open-source-license-disclosure' },
      ]
    }
  ]
};
var sidebarEN = {
  // '/blog/': [
  //   {
  //     text: 'Announcements',
  //     collapsed: false,
  //     items: [
  //       { text: 'Netzo Beta 01', link: '/blog/posts/announcements-netzo-beta-01' },
  //     ],
  //   },
  //   {
  //     text: 'Technology and Tools',
  //     collapsed: false,
  //     items: [
  //       { text: 'Problems of UI-based Platforms', link: '/blog/posts/technology-problems-of-ui-based-tools' },
  //       { text: 'Maximizing Efficiency and Productivity Through Automation', link: '/blog/posts/technology-maximizing-efficiency-and-productivity-through-automation' },
  //     ],
  //   },
  //   // {
  //   //   text: 'Vision',
  //   //   collapsed: false,
  //   //   items: [
  //   //     { text: 'Unlock the Power of IoT Interoperability', link: '/blog/posts/vision-unlock-the-power-of-iot-interoperability' },
  //   //     { text: 'The Unexploited Potential of IoT', link: '/blog/posts/vision-the-unexploited-potential-of-iot' },
  //   //     { text: 'A Small Team on a Grand Mission', link: '/blog/posts/vision-a-small-team-on-a-grand-mission' },
  //   //   ],
  //   // },
  // ],
  "/docs/": [
    {
      text: "Introduction",
      collapsed: false,
      items: [
        { text: "Getting Started", link: "/docs/introduction/getting-started" },
        { text: "What is a Project?", link: "/docs/introduction/what-is-a-project" },
        { text: "How to Deploy", link: "/docs/introduction/how-to-deploy" },
        { text: "Use Cases", link: "/docs/introduction/use-cases" },
        { text: "Core Concepts", link: "/docs/introduction/core-concepts" }
        // { text: 'Troubleshooting', link: '/docs/introduction/troubleshooting' }
        // { text: 'Help Center', link: 'https://help.netzo.io/' },
      ]
    },
    // {
    //   text: 'Examples',
    //   collapsed: true,
    //   items: [
    //     { text: '<code>minimal</code>', link: '/docs/examples/minimal' },
    //     { text: '<code>starter</code>', link: '/docs/examples/starter' },
    //   ],
    // },
    {
      text: "Guides",
      collapsed: true,
      items: [
        {
          text: "Basics",
          link: "/docs/guides/basics",
          items: [
            { text: "Import/Export", link: "/docs/guides/basics/import-export" },
            { text: "HTTP", link: "/docs/guides/basics/http" },
            { text: "HTML", link: "/docs/guides/basics/html" },
            { text: "JSX/TSX", link: "/docs/guides/basics/jsx-tsx" },
            { text: "Fetch", link: "/docs/guides/basics/fetch" },
            { text: "Environment Variables", link: "/docs/guides/basics/environment-variables" }
          ]
        },
        { text: "Routing", link: "/docs/guides/routing" },
        { text: "Interacting with APIs", link: "/docs/guides/interacting-with-apis" },
        { text: "WebAssembly", link: "/docs/guides/webassembly" }
      ]
    },
    {
      text: "Platform",
      collapsed: true,
      items: [
        { text: "Home", link: "/docs/platform/home" },
        { text: "Workspaces", link: "/docs/platform/workspaces" },
        {
          text: "Projects",
          link: "/docs/platform/projects",
          items: [
            // { text: 'Overview', link: '/docs/platform/projects/overview' },
            { text: "Studio", link: "/docs/platform/projects/studio" },
            { text: "Requests", link: "/docs/platform/projects/requests" },
            { text: "Databases", link: "/docs/platform/projects/databases" },
            { text: "Deployments", link: "/docs/platform/projects/deployments" },
            { text: "Logs", link: "/docs/platform/projects/logs" },
            { text: "Settings", link: "/docs/platform/projects/settings" }
          ]
        },
        { text: "Variables", link: "/docs/platform/variables" },
        { text: "Notifications", link: "/docs/platform/notifications" },
        { text: "Templates", link: "/docs/platform/templates" },
        { text: "Users", link: "/docs/platform/users" }
      ]
    },
    {
      text: "Templates",
      collapsed: false,
      items: [
        { text: "Apps", link: "/docs/templates/apps" },
        { text: "APIs", link: "/docs/templates/apis" },
        { text: "Workflows", link: "/docs/templates/workflows" }
      ]
    },
    {
      text: "<code>https://deno.land/x/netzo</code>",
      collapsed: false,
      items: [
        {
          text: "<code>apis</code>",
          link: "/docs/netzo/apis",
          collapsed: true,
          items: [
            { text: "<code>activecampaign</code>", link: "/docs/netzo/apis/activecampaign" },
            { text: "<code>airtable</code>", link: "/docs/netzo/apis/airtable" },
            { text: "<code>brevo</code>", link: "/docs/netzo/apis/brevo" },
            { text: "<code>chartmogul</code>", link: "/docs/netzo/apis/chartmogul" },
            { text: "<code>clickup</code>", link: "/docs/netzo/apis/clickup" },
            { text: "<code>cloudflare</code>", link: "/docs/netzo/apis/cloudflare" },
            { text: "<code>contpaqicomercial</code>", link: "/docs/netzo/apis/contpaqicomercial" },
            { text: "<code>discord</code>", link: "/docs/netzo/apis/discord" },
            { text: "<code>facturama</code>", link: "/docs/netzo/apis/facturama" },
            { text: "<code>fathomanalytics</code>", link: "/docs/netzo/apis/fathomanalytics" },
            { text: "<code>github</code>", link: "/docs/netzo/apis/github" },
            { text: "<code>googleappsheet</code>", link: "/docs/netzo/apis/googleappsheet" },
            { text: "<code>googledrive</code>", link: "/docs/netzo/apis/googledrive" },
            { text: "<code>googlesheets</code>", link: "/docs/netzo/apis/googlesheets" },
            { text: "<code>holded</code>", link: "/docs/netzo/apis/holded" },
            { text: "<code>hubspot</code>", link: "/docs/netzo/apis/hubspot" },
            { text: "<code>ipgeolocation</code>", link: "/docs/netzo/apis/ipgeolocation" },
            { text: "<code>jsonplaceholder</code>", link: "/docs/netzo/apis/jsonplaceholder" },
            { text: "<code>mailchimpmarketing</code>", link: "/docs/netzo/apis/mailchimpmarketing" },
            { text: "<code>mailgun</code>", link: "/docs/netzo/apis/mailgun" },
            { text: "<code>medium</code>", link: "/docs/netzo/apis/medium" },
            { text: "<code>monday</code>", link: "/docs/netzo/apis/monday" },
            { text: "<code>mongodbatlasdata</code>", link: "/docs/netzo/apis/mongodbatlasdata" },
            { text: "<code>netzo</code>", link: "/docs/netzo/apis/netzo" },
            { text: "<code>notion</code>", link: "/docs/netzo/apis/notion" },
            { text: "<code>openai</code>", link: "/docs/netzo/apis/openai" },
            { text: "<code>paddle</code>", link: "/docs/netzo/apis/paddle" },
            { text: "<code>pandadoc</code>", link: "/docs/netzo/apis/pandadoc" },
            { text: "<code>pipedrive</code>", link: "/docs/netzo/apis/pipedrive" },
            { text: "<code>rest</code>", link: "/docs/netzo/apis/rest" },
            { text: "<code>restdb</code>", link: "/docs/netzo/apis/restdb" },
            { text: "<code>sendgrid</code>", link: "/docs/netzo/apis/sendgrid" },
            { text: "<code>shopify</code>", link: "/docs/netzo/apis/shopify" },
            { text: "<code>stripe</code>", link: "/docs/netzo/apis/stripe" },
            { text: "<code>whatsappbusiness</code>", link: "/docs/netzo/apis/whatsappbusiness" },
            { text: "<code>wix</code>", link: "/docs/netzo/apis/wix" }
          ]
        },
        { text: "<code>cli</code>", link: "/docs/netzo/cli" },
        { text: "<code>db</code>", link: "/docs/netzo/db" },
        {
          text: "<code>ui</code>",
          link: "/docs/netzo/ui",
          collapsed: false,
          items: [
            {
              text: "<code>components</code>",
              link: "/docs/netzo/ui/components",
              collapsed: true,
              items: [
                { text: "<code>accordion</code>", link: "/docs/netzo/ui/components/accordion" },
                { text: "<code>alert</code>", link: "/docs/netzo/ui/components/alert" },
                { text: "<code>alert-dialog</code>", link: "/docs/netzo/ui/components/alert-dialog" },
                { text: "<code>aspect-ratio</code>", link: "/docs/netzo/ui/components/aspect-ratio" },
                { text: "<code>avatar</code>", link: "/docs/netzo/ui/components/avatar" },
                { text: "<code>badge</code>", link: "/docs/netzo/ui/components/badge" },
                { text: "<code>button</code>", link: "/docs/netzo/ui/components/button" },
                { text: "<code>calendar</code>", link: "/docs/netzo/ui/components/calendar" },
                { text: "<code>card</code>", link: "/docs/netzo/ui/components/card" },
                { text: "<code>checkbox</code>", link: "/docs/netzo/ui/components/checkbox" },
                { text: "<code>collapsible</code>", link: "/docs/netzo/ui/components/collapsible" },
                { text: "<code>combobox</code>", link: "/docs/netzo/ui/components/combobox" },
                { text: "<code>command</code>", link: "/docs/netzo/ui/components/command" },
                { text: "<code>context-menu</code>", link: "/docs/netzo/ui/components/context-menu" },
                { text: "<code>data-table</code>", link: "/docs/netzo/ui/components/data-table" },
                { text: "<code>date-picker</code>", link: "/docs/netzo/ui/components/date-picker" },
                { text: "<code>dialog</code>", link: "/docs/netzo/ui/components/dialog" },
                { text: "<code>dropdown-menu</code>", link: "/docs/netzo/ui/components/dropdown-menu" },
                { text: "<code>form</code>", link: "/docs/netzo/ui/components/form" },
                { text: "<code>hover-card</code>", link: "/docs/netzo/ui/components/hover-card" },
                { text: "<code>input</code>", link: "/docs/netzo/ui/components/input" },
                { text: "<code>label</code>", link: "/docs/netzo/ui/components/label" },
                { text: "<code>menubar</code>", link: "/docs/netzo/ui/components/menubar" },
                { text: "<code>navigation-menu</code>", link: "/docs/netzo/ui/components/navigation-menu" },
                { text: "<code>popover</code>", link: "/docs/netzo/ui/components/popover" },
                { text: "<code>progress</code>", link: "/docs/netzo/ui/components/progress" },
                { text: "<code>radio-group</code>", link: "/docs/netzo/ui/components/radio-group" },
                { text: "<code>scroll-area</code>", link: "/docs/netzo/ui/components/scroll-area" },
                { text: "<code>select</code>", link: "/docs/netzo/ui/components/select" },
                { text: "<code>separator</code>", link: "/docs/netzo/ui/components/separator" },
                { text: "<code>sheet</code>", link: "/docs/netzo/ui/components/sheet" },
                { text: "<code>skeleton</code>", link: "/docs/netzo/ui/components/skeleton" },
                { text: "<code>slider</code>", link: "/docs/netzo/ui/components/slider" },
                { text: "<code>switch</code>", link: "/docs/netzo/ui/components/switch" },
                { text: "<code>table</code>", link: "/docs/netzo/ui/components/table" },
                { text: "<code>tabs</code>", link: "/docs/netzo/ui/components/tabs" },
                { text: "<code>textarea</code>", link: "/docs/netzo/ui/components/textarea" },
                { text: "<code>toast</code>", link: "/docs/netzo/ui/components/toast" },
                { text: "<code>toggle</code>", link: "/docs/netzo/ui/components/toggle" },
                { text: "<code>tooltip</code>", link: "/docs/netzo/ui/components/tooltip" },
                { text: "<code>typography</code>", link: "/docs/netzo/ui/components/typography" }
              ]
            },
            { text: "<code>composables</code>", link: "/docs/netzo/ui/composables" },
            {
              text: "<code>plugins</code>",
              link: "/docs/netzo/ui/plugins",
              collapsed: true,
              items: [
                { text: "<code>daisyui</code>", link: "/docs/netzo/ui/plugins/daisyui" },
                { text: "<code>flowbite</code>", link: "/docs/netzo/ui/plugins/flowbite" },
                { text: "<code>htmx</code>", link: "/docs/netzo/ui/plugins/htmx" },
                { text: "<code>netzoAppLayout</code>", link: "/docs/netzo/ui/plugins/netzoAppLayout" },
                { text: "<code>netzoAuth</code>", link: "/docs/netzo/ui/plugins/netzoAuth" },
                { text: "<code>netzoDB</code>", link: "/docs/netzo/ui/plugins/netzoDB" },
                { text: "<code>netzoErrorPages</code>", link: "/docs/netzo/ui/plugins/netzoErrorPages" },
                { text: "<code>unocss</code>", link: "/docs/netzo/ui/plugins/unocss" }
              ]
            }
          ]
        }
      ]
    },
    {
      text: "API Reference",
      link: "/docs/api-reference/index",
      collapsed: true,
      items: [
        { text: "Authentication", link: "/docs/api-reference/authentication" },
        { text: "Reference", link: "https://api.netzo.io/docs/" }
      ]
    },
    {
      text: "Legal",
      collapsed: true,
      items: [
        { text: "Fair Use Policy", link: "/docs/legal/fair-use-policy" },
        { text: "Code of Conduct", link: "/docs/legal/code-of-conduct" },
        { text: "Security Notice", link: "/docs/legal/security-notice" },
        {
          text: "Quick links",
          collapsed: false,
          items: legalEN.items
        }
      ]
    }
  ],
  "/netzo/": [
    {
      items: [
        { text: "What is Netzo?", link: "/netzo/what-is-netzo" },
        { text: "Why use Netzo?", link: "/netzo/why-use-netzo" },
        {
          text: "Who is Netzo for?",
          items: [
            { text: "\u{1F9D1}\u200D\u{1F4BB} Developer Teams", link: "/netzo/who-is-netzo-for#developer-teams" },
            { text: "\u{1F680} Startups and SMBs", link: "/netzo/who-is-netzo-for#smbs-and-startups" },
            { text: "\u{1F3E2} Enterprises", link: "/netzo/who-is-netzo-for#enterprises" }
          ]
        }
      ]
    }
  ],
  "/use-cases/": [
    {
      items: [
        {
          text: "Use Cases",
          items: [
            { text: "\u{1F4CA} Business Intelligence", link: "/use-cases#business-intelligence-bi" },
            { text: "\u{1F4BB} Admin Panels", link: "/use-cases#admin-panels-crud" },
            { text: "\u{1F517} APIs (REST)", link: "/use-cases#rest-apis" },
            { text: "\u{1F916} Workflow Automation", link: "/use-cases#workflows" },
            { text: "\u{1F310} Websites", link: "/use-cases#websites-and-landing-pages" }
          ]
        }
      ]
    }
  ],
  "/legal/": [legalEN]
};
var sidebarES = {
  // '/blog/': sidebarEN['/blog/'],
  // '/docs/': sidebarEN['/docs/'],
  "/es/netzo/": [
    {
      items: [
        { text: "\xBFQu\xE9 es Netzo?", link: "/es/netzo/what-is-netzo" },
        { text: "\xBFPor qu\xE9 usar Netzo?", link: "/es/netzo/why-use-netzo" },
        {
          text: "\xBFPara qui\xE9n es Netzo?",
          items: [
            { text: "\u{1F9D1}\u200D\u{1F4BB} Equipos de Desarrollo", link: "/es/netzo/who-is-netzo-for#equipos-de-desarrollo" },
            { text: "\u{1F680} Startups y PYMEs", link: "/es/netzo/who-is-netzo-for#pymes-y-startups" },
            { text: "\u{1F3E2} Empresas", link: "/es/netzo/who-is-netzo-for#corporaciones" }
          ]
        }
      ]
    }
  ],
  "/es/use-cases/": [
    {
      items: [
        {
          text: "Casos de Uso",
          items: [
            { text: "\u{1F4CA} Inteligencia de Negocios", link: "/es/use-cases#inteligencia-de-negocios-bi" },
            { text: "\u{1F4BB} Cuadros de Mando", link: "/es/use-cases#cuadros-de-mando-crud" },
            { text: "\u{1F517} APIs (REST)", link: "/es/use-cases#apis-rest" },
            { text: "\u{1F916} Flujos de Trabajo", link: "/es/use-cases#flujos-de-trabajo" },
            { text: "\u{1F310} Sitios Web", link: "/use-cases#sitios-web-y-landing-pages" }
          ]
        }
      ]
    }
  ],
  "/es/legal/": [legalES]
};

// www/.vitepress/config.unocss.ts
var unocssConfig = {
  safelist: [
    "i-mdi-toolbox-outline",
    "i-mdi-head-sync-outline",
    "i-mdi-star-four-points-outline",
    "i-mdi-apps",
    "i-mdi-robot",
    "i-mdi-code-braces",
    "i-mdi-speedometer",
    "i-mdi-toolbox",
    "i-mdi-rocket",
    "i-mdi-rocket-launch",
    "i-mdi-rocket-launch-outline",
    "i-mdi-eye-outline",
    "i-flat-color-icons-sales-performance",
    "i-mdi-factory",
    "i-mdi-safe-square-outline",
    "i-el-tasks",
    "i-eos-icons-iot",
    "i-mdi-finance",
    "i-mdi-server-security",
    "i-mdi-api",
    "i-mdi-middleware",
    "i-mdi-asterisk",
    "i-mdi-lock-open-variant-outline",
    "i-mdi-application-import",
    "i-mdi-application-brackets-outline",
    "i-mdi-clock-fast",
    "i-mdi-arrow-expand",
    "i-mdi-pipe",
    "i-mdi-chart-areaspline",
    "i-mdi-brain",
    "i-mdi-tools",
    "i-mdi-clock",
    "i-mdi-console",
    "i-mdi-minus",
    "i-mdi-lightbulb",
    "i-fxemoji-lightningmood",
    "i-logos-deno",
    "i-logos-typescript-icon",
    "i-emojione-flag-for-european-union",
    "i-mdi-package-variant-closed",
    "i-mdi-view-dashboard",
    "i-mdi-view-dashboard-outline",
    "i-mdi-book-open-page-variant",
    "i-mdi-account-group-outline",
    "i-mdi-check",
    "i-mdi-close",
    "i-mdi-clock-outline",
    "i-mdi-all-inclusive",
    "i-mdi-shape",
    "i-mdi-server-off",
    "i-mdi-bug",
    "i-mdi-git",
    "i-mdi-lightning-bolt",
    "i-mdi-share-variant",
    "i-ic-baseline-hub",
    "i-ic-outline-feedback",
    "i-mdi-police-badge",
    "i-mdi-check-circle-outline",
    "i-mdi-security",
    "i-mdi-graph",
    "i-mdi-nodejs",
    "i-logos-fresh",
    "i-mdi-key",
    "i-mdi-console",
    "i-emojione-flag-for-european-union",
    "i-mdi-play-circle",
    "i-mdi-head-lightbulb-outline",
    "i-tabler-packages",
    "i-bx-timer",
    "i-mdi-hexagon-multiple",
    "i-mdi-hexagon-multiple-outline",
    "i-mdi-widgets",
    "i-mdi-send",
    "i-mdi-send-clock",
    "i-mdi-database-lock",
    "i-mdi-microsoft-visual-studio-code",
    "i-mdi-table",
    "i-mdi-button-pointer",
    "i-mdi-label",
    "i-mdi-theme-light-dark",
    "i-mdi-form-dropdown",
    "i-mdi-shape",
    "i-mdi-button-pointer",
    "i-mdi-format-title",
    "i-mdi-link",
    "i-mdi-loading",
    "i-mdi-information",
    "i-mdi-alert-circle",
    "i-mdi-alert-box",
    "i-mdi-checkbox-marked",
    "i-mdi-format-list-group",
    "i-mdi-form-textbox",
    "i-mdi-card",
    "i-mdi-calendar",
    "i-mdi-apple-keyboard-command",
    "i-mdi-arrow-collapse-vertical",
    "i-mdi-calendar-range",
    "i-mdi-radiobox-marked",
    "i-mdi-form-select",
    "i-mdi-toggle-switch",
    "i-mdi-card-text",
    "i-mdi-view-grid",
    "i-mdi-view-sequential",
    "i-mdi-card-search",
    "i-mdi-window-maximize",
    "i-mdi-aspect-ratio",
    "i-mdi-account-circle",
    "i-mdi-form-textarea",
    "i-mdi-tooltip-text",
    "i-mdi-power-standby",
    "i-mdi-tooltip",
    "i-mdi-format-text",
    "i-mdi-cursor-move",
    "i-mdi-format-vertical-align-center",
    "i-mdi-theme-light-dark",
    "i-carbon-progress-bar",
    "i-mdi-ray-vertex",
    "i-mdi-view-compact",
    "i-mdi-view-split-vertical",
    "i-mdi-view-gallery-outline",
    "i-mdi-picture-in-picture-bottom-right",
    "i-mdi-view-headline"
  ]
};

// www/.vitepress/config.ts
var __vite_injected_original_import_meta_url = "file:///home/ark/netzo-repos/netzo/www/.vitepress/config.ts";
var links = [];
var config_default = withMermaid(defineConfig({
  titleTemplate: "Netzo",
  lastUpdated: true,
  cleanUrls: true,
  srcDir: "src",
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
    ["meta", { property: "og:title", content: ogEN.title }],
    ["meta", { property: "og:description", content: ogEN.description }],
    ["meta", { property: "og:image", name: "image", content: ogEN.image }],
    ["meta", { property: "og:type", content: ogEN.type }],
    ["meta", { name: "author", content: ogEN.author }],
    ["meta", { property: "og:url", content: ogEN.url }],
    ["meta", { name: "theme-color", content: "#0080ff" }],
    // Twitter
    ["meta", { property: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:site", content: "@netzoio" }],
    ["meta", { property: "twitter:url", content: ogEN.twitterURL }],
    ["meta", { property: "twitter:title", content: ogEN.title }],
    ["meta", { property: "twitter:description", content: ogEN.description }],
    ["meta", { property: "twitter:image", content: ogEN.image }],
    ...head
  ],
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin);
    },
    theme: {
      light: "github-light",
      dark: "github-dark"
    }
  },
  locales: {
    root: {
      lang: "en",
      label: "\u{1F1FA}\u{1F1F8} EN",
      link: "/",
      themeConfig: {
        nav: navEN,
        sidebar: sidebarEN
      }
    },
    es: {
      lang: "es",
      label: "\u{1F1EA}\u{1F1F8} ES",
      link: "/es",
      themeConfig: {
        nav: navES,
        sidebar: sidebarES
      }
    }
  },
  themeConfig: {
    siteTitle: "Netzo",
    logo: { light: "/logo.svg", dark: "/logo-dark.svg" },
    editLink: {
      pattern: "https://github.com/netzo/website/edit/main/src/:path",
      text: "Suggest changes to this page"
    },
    search: { provider: "local" },
    socialLinks: [
      { icon: "discord", link: ogEN.discordURL },
      { icon: "twitter", link: ogEN.twitterURL }
    ],
    outline: "deep",
    footer: { copyright: `Copyright \xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} Netzo` }
  },
  vite: {
    plugins: [
      AutoImport({
        imports: [
          "vue",
          "vue/macros",
          "@vueuse/head",
          "@vueuse/core",
          "vitepress"
        ],
        dts: "auto-imports.d.ts",
        vueTemplate: true
      }),
      // FIXME: not working (see https://github.com/antfu/unplugin-vue-components/issues/213)
      // Components({
      //   dirs: [
      //     '.vitepress/theme/components',
      //   ],
      //   extensions: ['vue', 'md'],
      //   include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      //   dts: 'components.d.ts',
      // }),
      Unocss({ ...unocssConfig })
      // VueDevTools(), // slows down performance
    ],
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("../", __vite_injected_original_import_meta_url)),
        "@theme/": fileURLToPath(new URL("./theme/", __vite_injected_original_import_meta_url))
      }
    }
  },
  vue: {
    reactivityTransform: true
  },
  // sitemap generation (at /sitemap.xml)
  // see https://github.com/vuejs/vitepress/issues/520#issuecomment-1234457299
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id)) {
      links.push({
        // you might need to change this if not using clean urls mode
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, "$2"),
        lastmod: pageData.lastUpdated
      });
    }
  },
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({ hostname: "https://netzo.io/" });
    const writeStream = createWriteStream(resolve2(outDir, "sitemap.xml"));
    sitemap.pipe(writeStream);
    links.forEach((link) => sitemap.write(link));
    sitemap.end();
    await new Promise((resolve3) => writeStream.on("finish", resolve3));
  }
}));
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid3d3Ly52aXRlcHJlc3MvY29uZmlnLnRzIiwgInd3dy8udml0ZXByZXNzL2NvbmZpZy5vZy50cyIsICJ3d3cvLnZpdGVwcmVzcy9jb25maWcuaGVhZC50cyIsICJ3d3cvLnZpdGVwcmVzcy9jb25maWcubmF2LnRzIiwgInd3dy8udml0ZXByZXNzL2NvbmZpZy5zaWRlYmFyLnRzIiwgInd3dy8udml0ZXByZXNzL2NvbmZpZy51bm9jc3MudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9hcmsvbmV0em8tcmVwb3MvbmV0em8vd3d3Ly52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2Fyay9uZXR6by1yZXBvcy9uZXR6by93d3cvLnZpdGVwcmVzcy9jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvYXJrL25ldHpvLXJlcG9zL25ldHpvL3d3dy8udml0ZXByZXNzL2NvbmZpZy50c1wiO2ltcG9ydCB7IGNyZWF0ZVdyaXRlU3RyZWFtIH0gZnJvbSAnbm9kZTpmcydcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAnbm9kZTp1cmwnXG5pbXBvcnQgeyAvKiBEZWZhdWx0VGhlbWUsICovIGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcydcbmltcG9ydCB7IHdpdGhNZXJtYWlkIH0gZnJvbSAndml0ZXByZXNzLXBsdWdpbi1tZXJtYWlkJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCB7IHRhYnNNYXJrZG93blBsdWdpbiB9IGZyb20gJ3ZpdGVwcmVzcy1wbHVnaW4tdGFicydcbi8vIGltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgVW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJ1xuLy8gaW1wb3J0IFZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcbmltcG9ydCB7IFNpdGVtYXBTdHJlYW0gfSBmcm9tICdzaXRlbWFwJ1xuaW1wb3J0IHsgb2dFTiB9IGZyb20gJy4vY29uZmlnLm9nJ1xuaW1wb3J0IHsgaGVhZCB9IGZyb20gJy4vY29uZmlnLmhlYWQnXG5pbXBvcnQgeyBuYXZFTiwgbmF2RVMgfSBmcm9tICcuL2NvbmZpZy5uYXYnXG5pbXBvcnQgeyBzaWRlYmFyRU4sIHNpZGViYXJFUyB9IGZyb20gJy4vY29uZmlnLnNpZGViYXInXG5pbXBvcnQgeyB1bm9jc3NDb25maWcgfSBmcm9tICcuL2NvbmZpZy51bm9jc3MnXG5cbmNvbnN0IGxpbmtzOiB7IHVybDogc3RyaW5nOyBsYXN0bW9kPzogbnVtYmVyIH1bXSA9IFtdIC8vIHVzZWQgZm9yIHNpdGVtYXAueG1sIGdlbmVyYXRpb24gKHNlZSBiZWxsb3cpXG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhNZXJtYWlkKGRlZmluZUNvbmZpZyh7XG4gIHRpdGxlVGVtcGxhdGU6ICdOZXR6bycsXG4gIGxhc3RVcGRhdGVkOiB0cnVlLFxuICBjbGVhblVybHM6IHRydWUsXG4gIHNyY0RpcjogJ3NyYycsXG5cbiAgaGVhZDogW1xuICAgIFsnbGluaycsIHsgcmVsOiAnaWNvbicsIHR5cGU6ICdpbWFnZS9zdmcreG1sJywgaHJlZjogJy9sb2dvLnN2ZycgfV0sXG4gICAgWydtZXRhJywgeyBwcm9wZXJ0eTogJ29nOnRpdGxlJywgY29udGVudDogb2dFTi50aXRsZSB9XSxcbiAgICBbJ21ldGEnLCB7IHByb3BlcnR5OiAnb2c6ZGVzY3JpcHRpb24nLCBjb250ZW50OiBvZ0VOLmRlc2NyaXB0aW9uIH1dLFxuICAgIFsnbWV0YScsIHsgcHJvcGVydHk6ICdvZzppbWFnZScsIG5hbWU6ICdpbWFnZScsIGNvbnRlbnQ6IG9nRU4uaW1hZ2UgfV0sXG4gICAgWydtZXRhJywgeyBwcm9wZXJ0eTogJ29nOnR5cGUnLCBjb250ZW50OiBvZ0VOLnR5cGUgfV0sXG4gICAgWydtZXRhJywgeyBuYW1lOiAnYXV0aG9yJywgY29udGVudDogb2dFTi5hdXRob3IgfV0sXG4gICAgWydtZXRhJywgeyBwcm9wZXJ0eTogJ29nOnVybCcsIGNvbnRlbnQ6IG9nRU4udXJsIH1dLFxuICAgIFsnbWV0YScsIHsgbmFtZTogJ3RoZW1lLWNvbG9yJywgY29udGVudDogJyMwMDgwZmYnIH1dLFxuXG4gICAgLy8gVHdpdHRlclxuICAgIFsnbWV0YScsIHsgcHJvcGVydHk6ICd0d2l0dGVyOmNhcmQnLCBjb250ZW50OiAnc3VtbWFyeV9sYXJnZV9pbWFnZScgfV0sXG4gICAgWydtZXRhJywgeyBuYW1lOiAndHdpdHRlcjpzaXRlJywgY29udGVudDogJ0BuZXR6b2lvJyB9XSxcbiAgICBbJ21ldGEnLCB7IHByb3BlcnR5OiAndHdpdHRlcjp1cmwnLCBjb250ZW50OiBvZ0VOLnR3aXR0ZXJVUkwgfV0sXG4gICAgWydtZXRhJywgeyBwcm9wZXJ0eTogJ3R3aXR0ZXI6dGl0bGUnLCBjb250ZW50OiBvZ0VOLnRpdGxlIH1dLFxuICAgIFsnbWV0YScsIHsgcHJvcGVydHk6ICd0d2l0dGVyOmRlc2NyaXB0aW9uJywgY29udGVudDogb2dFTi5kZXNjcmlwdGlvbiB9XSxcbiAgICBbJ21ldGEnLCB7IHByb3BlcnR5OiAndHdpdHRlcjppbWFnZScsIGNvbnRlbnQ6IG9nRU4uaW1hZ2UgfV0sXG4gICAgLi4uaGVhZCxcbiAgXSxcblxuICBtYXJrZG93bjoge1xuICAgIGNvbmZpZyhtZCkge1xuICAgICAgbWQudXNlKHRhYnNNYXJrZG93blBsdWdpbilcbiAgICB9LFxuICAgIHRoZW1lOiB7XG4gICAgICBsaWdodDogJ2dpdGh1Yi1saWdodCcsXG4gICAgICBkYXJrOiAnZ2l0aHViLWRhcmsnLFxuICAgIH0sXG4gIH0sXG5cbiAgbG9jYWxlczoge1xuICAgIHJvb3Q6IHtcbiAgICAgIGxhbmc6ICdlbicsXG4gICAgICBsYWJlbDogJ1x1RDgzQ1x1RERGQVx1RDgzQ1x1RERGOCBFTicsXG4gICAgICBsaW5rOiAnLycsXG4gICAgICB0aGVtZUNvbmZpZzoge1xuICAgICAgICBuYXY6IG5hdkVOLFxuICAgICAgICBzaWRlYmFyOiBzaWRlYmFyRU4sXG4gICAgICB9LFxuICAgIH0sXG4gICAgZXM6IHtcbiAgICAgIGxhbmc6ICdlcycsXG4gICAgICBsYWJlbDogJ1x1RDgzQ1x1RERFQVx1RDgzQ1x1RERGOCBFUycsXG4gICAgICBsaW5rOiAnL2VzJyxcbiAgICAgIHRoZW1lQ29uZmlnOiB7XG4gICAgICAgIG5hdjogbmF2RVMsXG4gICAgICAgIHNpZGViYXI6IHNpZGViYXJFUyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICB0aGVtZUNvbmZpZzoge1xuICAgIHNpdGVUaXRsZTogJ05ldHpvJyxcbiAgICBsb2dvOiB7IGxpZ2h0OiAnL2xvZ28uc3ZnJywgZGFyazogJy9sb2dvLWRhcmsuc3ZnJyB9LFxuXG4gICAgZWRpdExpbms6IHtcbiAgICAgIHBhdHRlcm46ICdodHRwczovL2dpdGh1Yi5jb20vbmV0em8vd2Vic2l0ZS9lZGl0L21haW4vc3JjLzpwYXRoJyxcbiAgICAgIHRleHQ6ICdTdWdnZXN0IGNoYW5nZXMgdG8gdGhpcyBwYWdlJyxcbiAgICB9LFxuXG4gICAgc2VhcmNoOiB7IHByb3ZpZGVyOiAnbG9jYWwnIH0sXG5cbiAgICBzb2NpYWxMaW5rczogW1xuICAgICAgeyBpY29uOiAnZGlzY29yZCcsIGxpbms6IG9nRU4uZGlzY29yZFVSTCB9LFxuICAgICAgeyBpY29uOiAndHdpdHRlcicsIGxpbms6IG9nRU4udHdpdHRlclVSTCB9LFxuICAgIF0sXG5cbiAgICBvdXRsaW5lOiAnZGVlcCcsXG5cbiAgICBmb290ZXI6IHsgY29weXJpZ2h0OiBgQ29weXJpZ2h0IFx1MDBBOSAke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX0gTmV0em9gIH0sXG4gIH0sXG5cbiAgdml0ZToge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICBpbXBvcnRzOiBbXG4gICAgICAgICAgJ3Z1ZScsXG4gICAgICAgICAgJ3Z1ZS9tYWNyb3MnLFxuICAgICAgICAgICdAdnVldXNlL2hlYWQnLFxuICAgICAgICAgICdAdnVldXNlL2NvcmUnLFxuICAgICAgICAgICd2aXRlcHJlc3MnLFxuICAgICAgICBdLFxuICAgICAgICBkdHM6ICdhdXRvLWltcG9ydHMuZC50cycsXG4gICAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxuICAgICAgfSksXG5cbiAgICAgIC8vIEZJWE1FOiBub3Qgd29ya2luZyAoc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi12dWUtY29tcG9uZW50cy9pc3N1ZXMvMjEzKVxuICAgICAgLy8gQ29tcG9uZW50cyh7XG4gICAgICAvLyAgIGRpcnM6IFtcbiAgICAgIC8vICAgICAnLnZpdGVwcmVzcy90aGVtZS9jb21wb25lbnRzJyxcbiAgICAgIC8vICAgXSxcbiAgICAgIC8vICAgZXh0ZW5zaW9uczogWyd2dWUnLCAnbWQnXSxcbiAgICAgIC8vICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC5tZCQvXSxcbiAgICAgIC8vICAgZHRzOiAnY29tcG9uZW50cy5kLnRzJyxcbiAgICAgIC8vIH0pLFxuXG4gICAgICBVbm9jc3MoeyAuLi51bm9jc3NDb25maWcgfSksXG5cbiAgICAgIC8vIFZ1ZURldlRvb2xzKCksIC8vIHNsb3dzIGRvd24gcGVyZm9ybWFuY2VcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICd+JzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuLi8nLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICAgJ0B0aGVtZS8nOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vdGhlbWUvJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgdnVlOiB7XG4gICAgcmVhY3Rpdml0eVRyYW5zZm9ybTogdHJ1ZSxcbiAgfSxcblxuICAvLyBzaXRlbWFwIGdlbmVyYXRpb24gKGF0IC9zaXRlbWFwLnhtbClcbiAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy92aXRlcHJlc3MvaXNzdWVzLzUyMCNpc3N1ZWNvbW1lbnQtMTIzNDQ1NzI5OVxuICB0cmFuc2Zvcm1IdG1sOiAoXywgaWQsIHsgcGFnZURhdGEgfSkgPT4ge1xuICAgIGlmICghL1tcXFxcL100MDRcXC5odG1sJC8udGVzdChpZCkpIHtcbiAgICAgIGxpbmtzLnB1c2goe1xuICAgICAgICAvLyB5b3UgbWlnaHQgbmVlZCB0byBjaGFuZ2UgdGhpcyBpZiBub3QgdXNpbmcgY2xlYW4gdXJscyBtb2RlXG4gICAgICAgIHVybDogcGFnZURhdGEucmVsYXRpdmVQYXRoLnJlcGxhY2UoLygoXnxcXC8paW5kZXgpP1xcLm1kJC8sICckMicpLFxuICAgICAgICBsYXN0bW9kOiBwYWdlRGF0YS5sYXN0VXBkYXRlZCxcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuXG4gIGJ1aWxkRW5kOiBhc3luYyAoeyBvdXREaXIgfSkgPT4ge1xuICAgIGNvbnN0IHNpdGVtYXAgPSBuZXcgU2l0ZW1hcFN0cmVhbSh7IGhvc3RuYW1lOiAnaHR0cHM6Ly9uZXR6by5pby8nIH0pXG4gICAgY29uc3Qgd3JpdGVTdHJlYW0gPSBjcmVhdGVXcml0ZVN0cmVhbShyZXNvbHZlKG91dERpciwgJ3NpdGVtYXAueG1sJykpXG4gICAgc2l0ZW1hcC5waXBlKHdyaXRlU3RyZWFtKVxuICAgIGxpbmtzLmZvckVhY2gobGluayA9PiBzaXRlbWFwLndyaXRlKGxpbmspKVxuICAgIHNpdGVtYXAuZW5kKClcbiAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHdyaXRlU3RyZWFtLm9uKCdmaW5pc2gnLCByZXNvbHZlKSlcbiAgfSxcbn0pKVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9hcmsvbmV0em8tcmVwb3MvbmV0em8vd3d3Ly52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2Fyay9uZXR6by1yZXBvcy9uZXR6by93d3cvLnZpdGVwcmVzcy9jb25maWcub2cudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvYXJrL25ldHpvLXJlcG9zL25ldHpvL3d3dy8udml0ZXByZXNzL2NvbmZpZy5vZy50c1wiO2V4cG9ydCBjb25zdCBvZ0VOID0ge1xuICB0aXRsZTogJ05ldHpvJyxcbiAgZGVzY3JpcHRpb246ICdUaGUgc21hcnRlc3Qgd2F5IHRvIGJ1aWxkIGN1c3RvbSBidXNpbmVzcyBzb2Z0d2FyZS4gQnVpbGQgYW55IGN1c3RvbSBkYXNoYm9hcmQsIGFkbWluIHBhbmVsLCBpbnRlcm5hbCBBUEksIHdvcmtmbG93IGF1dG9tYXRpb24gb3Igd2Vic2l0ZSAxMHggZmFzdGVyLiBCdWlsZCBmYXN0LCBzaGFyZSBpbnN0YW50bHkgYW5kIHN0YXkgaW4gY29udHJvbCBhcyB5b3UgZ3JvdycsXG4gIGltYWdlOiAnaHR0cHM6Ly9uZXR6by5pby9pbWFnZXMvaG90bGluay1vay9vZy1pbWFnZS5wbmcnLFxuICB1cmw6ICdodHRwczovL25ldHpvLmlvJyxcbiAgYXV0aG9yOiAnTmV0em8nLFxuICB0eXBlOiAnd2Vic2l0ZScsXG4gIC8vIHNvY2lhbDpcbiAgZ2l0aHViVVJMOiAnaHR0cHM6Ly9naXRodWIuY29tL25ldHpvL25ldHpvJyxcbiAgdHdpdHRlclVSTDogJ2h0dHBzOi8vdHdpdHRlci5jb20vbmV0em9pbycsXG4gIGRpc2NvcmRVUkw6ICdodHRwczovL2Rpc2NvcmQuZ2cvdGJEVXBSUUNUaycsXG4gIGxpbmtlZGluVVJMOiAnaHR0cHM6Ly9saW5rZWRpbi5jb20vY29tcGFueS83MzQyMTc3NC9hZG1pbi8nLFxuICBmYWNlYm9va1VSTDogJ2h0dHBzOi8vZmFjZWJvb2suY29tL25ldHpvaW8nLFxuICBpbnN0YWdyYW1VUkw6ICdodHRwczovL2luc3RhZ3JhbS5jb20vbmV0em9pby8nLFxuICB5b3V0dWJlVVJMOiAnaHR0cHM6Ly95b3V0dWJlLmNvbS9jL25ldHpvJyxcbn1cblxuZXhwb3J0IGNvbnN0IG9nRVMgPSB7XG4gIC4uLm9nRU4sXG4gIHRpdGxlOiAnTmV0em8nLFxuICBkZXNjcmlwdGlvbjogJ0xhIGZvcm1hIG1cdTAwRTFzIGludGVsaWdlbnRlIGRlIGNyZWFyIGFwcHMgZW1wcmVzYXJpYWxlcyBhIG1lZGlkYS4gQ3JlYSBjdWFscXVpZXIgZGFzaGJvYXJkLCBjdWFkcm8gZGUgbWFuZG9zLCBBUEkgaW50ZXJuYSwgZmx1am8gYXV0b21hdGl6YWRvIG8gcFx1MDBFMWdpbmEgd2ViIDEwIHZlY2VzIG1cdTAwRTFzIHJcdTAwRTFwaWRvLiBDcmVhIHJcdTAwRTFwaWRhbWVudGUsIGNvbXBhcnRlIGFsIGluc3RhbnRlIHkgbWFudFx1MDBFOW4gZWwgY29udHJvbCBtaWVudHJhcyBjcmVjZXMuJyxcbiAgaW1hZ2U6ICdodHRwczovL25ldHpvLmlvL2ltYWdlcy9ob3RsaW5rLW9rL29nLWltYWdlLWVzLnBuZycsXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2Fyay9uZXR6by1yZXBvcy9uZXR6by93d3cvLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvYXJrL25ldHpvLXJlcG9zL25ldHpvL3d3dy8udml0ZXByZXNzL2NvbmZpZy5oZWFkLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2Fyay9uZXR6by1yZXBvcy9uZXR6by93d3cvLnZpdGVwcmVzcy9jb25maWcuaGVhZC50c1wiO2ltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHR5cGUgeyBIZWFkQ29uZmlnIH0gZnJvbSAndml0ZXByZXNzJ1xuXG5leHBvcnQgY29uc3QgaGVhZDogSGVhZENvbmZpZ1tdID0gW1xuICAvLyBbc2NyaXB0c10gbG9hZGVkIGJlZm9yZSB1c2VyY2VudHJpY3NcbiAgWydzY3JpcHQnLCB7XG4gICAgdHlwZTogJ3RleHQvamF2YXNjcmlwdCcsIGFzeW5jOiAndHJ1ZScsXG4gIH0sIHJlYWRGaWxlU3luYyhyZXNvbHZlKF9fZGlybmFtZSwgJy4vc2NyaXB0cy9jdXN0b21lcmx5LXBvcHVwLmpzJyksICd1dGYtOCcpXSxcblxuICAvLyBbdXNlcmNlbnRyaWNzXSBDTVAgKENvbnNlbnQgTWFuYWdlbWVudCBQbGF0Zm9ybSkgc2NyaXB0IChsb2FkZXIuanMpXG4gIFsnc2NyaXB0Jywge1xuICAgICdpZCc6ICd1c2VyY2VudHJpY3MtY21wJyxcbiAgICAvLyBGSVhNRTogbG9hZGVyLmpzIHNjcmlwdCBNSUdIVCBTTE9XIERPV04gQVBQIChpbiBkZXZlbG9wbWVudClcbiAgICAnc3JjJzogJ2h0dHBzOi8vYXBwLnVzZXJjZW50cmljcy5ldS9icm93c2VyLXVpL2xhdGVzdC9sb2FkZXIuanMnLFxuICAgICdkYXRhLXNldHRpbmdzLWlkJzogJ3NadTZrU1JPVScsXG4gICAgLy8gJ2RhdGEtZGlzYWJsZS10cmFja2luZyc6IHRydWUsIC8vIG9ubHkgZm9yIG5vbi1wcm9kdWN0aW9uLiBkZWZhdWx0IHByZXZpZXcgc2l0ZVxuICAgIC8vICdkYXRhLXZlcnNpb24nOiAncHJldmlldycsIC8vIG9ubHkgZm9yIG5vbi1wcm9kdWN0aW9uLiBkZWZhdWx0IHByZXZpZXcgc2l0ZVxuICAgICdhc3luYyc6ICd0cnVlJyxcbiAgfV0sXG5cbiAgLy8gW3VzZXJjZW50cmljc10gU01QIChTbWFydCBEYXRhIFByb3RlY3Rvcikgc2NyaXB0ICh1Yy1ibG9jay5idW5kbGUuanMpOiBsb2FkcyB3aW5kb3cudWMgb2JqZWN0XG4gIC8vIFNNUCBpcyByZXF1aXJlZCB0byBibG9jayBlbWJlZHMgbm90IGRpcmVjdGx5IGltcGxlbWVudGVkIGFzIHNjcmlwdHMgKGUuZy4gaWZyYW1lcywgbm9zY3JpcHQgdGFncyxcbiAgLy8gaW1hZ2UgdGFncykgdW50aWwgY29uc2VudCBpcyBnaXZlbiAoc2hvd3MgYW4gb3ZlcmxheSBwcm9tcHRpbmcgdXNlciB0byBlbmFibGUsIGUuZy4gJ1lvdVR1YmUnKVxuICBbJ3NjcmlwdCcsIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnLCBzcmM6ICdodHRwczovL3ByaXZhY3ktcHJveHkudXNlcmNlbnRyaWNzLmV1L2xhdGVzdC91Yy1ibG9jay5idW5kbGUuanMnIH1dLFxuXG4gIC8vIFt1c2VyY2VudHJpY3NdIERTUiAoRGF0YSBTdWJqZWN0IFJlcXVlc3QpIHNjcmlwdDogaW5qZWN0cyBidXR0b24gaW4gcHJpdmFjeSBwb2xpY3lcbiAgWydzY3JpcHQnLCB7XG4gICAgdHlwZTogJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnLFxuICAgIHNyYzogJ2h0dHBzOi8vZHNyLmNvbnNlbnQudXNlcmNlbnRyaWNzLmV1L2Rzcl91cmwuanMnLFxuICAgIGRzcl90ZXh0OiAnRFNSJyxcbiAgfV0sXG5cbiAgLy8gW3NjcmlwdHNdIGxvYWRlZCBhZnRlciB1c2VyY2VudHJpY3NcbiAgWydzY3JpcHQnLCB7fSwgcmVhZEZpbGVTeW5jKHJlc29sdmUoX19kaXJuYW1lLCAnLi9zY3JpcHRzL3VzZXJjZW50cmljcy5qcycpLCAndXRmLTgnKV0sXG4gIC8vIDEpIEVzc2VudGlhbCBzZXJ2aWNlcy9jb29raWVzXG4gIFsnc2NyaXB0Jywge1xuICAgICdzcmMnOiAnaHR0cHM6Ly9jZG4udXNlZmF0aG9tLmNvbS9zY3JpcHQuanMnLFxuICAgICd0eXBlJzogJ3RleHQvcGxhaW4nLFxuICAgICdkYXRhLXVzZXJjZW50cmljcyc6ICdGYXRob20gQW5hbHl0aWNzJyxcbiAgICAnZGF0YS1zaXRlJzogJ1FSRVFXSVhGJywgLy8gTk9URTogd2lsbCBvbmx5IGZpcmUgZXZlbnQgaW4gcHJvZHVjdGlvbiAodW5kZXIgbmV0em8uaW8vKVxuICAgICdkYXRhLXNwYSc6ICdhdXRvJyxcbiAgICAnZGVmZXInOiAnJyxcbiAgfV0sXG4gIC8vIDIpIEZ1bmN0aW9uYWwgc2VydmljZXMvY29va2llc1xuICBbJ3NjcmlwdCcsIHtcbiAgICAndHlwZSc6ICd0ZXh0L3BsYWluJyxcbiAgICAnZGF0YS11c2VyY2VudHJpY3MnOiAnQ3VzdG9tZXJseScsXG4gICAgJ2RlZmVyJzogJycsXG4gIH0sIHJlYWRGaWxlU3luYyhyZXNvbHZlKF9fZGlybmFtZSwgJy4vc2NyaXB0cy9jdXN0b21lcmx5LmpzJyksICd1dGYtOCcpXSxcbiAgWydzY3JpcHQnLCB7XG4gICAgJ3R5cGUnOiAndGV4dC9wbGFpbicsXG4gICAgJ2RhdGEtdXNlcmNlbnRyaWNzJzogJ0hvdGphcicsXG4gICAgJ2RlZmVyJzogJycsXG4gIH0sIHJlYWRGaWxlU3luYyhyZXNvbHZlKF9fZGlybmFtZSwgJy4vc2NyaXB0cy9ob3RqYXIuanMnKSwgJ3V0Zi04JyldLFxuICAvLyAzKSBTdGF0aXN0aWNzIHNlcnZpY2VzL2Nvb2tpZXNcbiAgLy8gNCkgTWFya2V0aW5nIHNlcnZpY2VzL2Nvb2tpZXNcbiAgLy8gNSkgVmlkZW8gc2VydmljZXMvY29va2llc1xuXVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9hcmsvbmV0em8tcmVwb3MvbmV0em8vd3d3Ly52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2Fyay9uZXR6by1yZXBvcy9uZXR6by93d3cvLnZpdGVwcmVzcy9jb25maWcubmF2LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2Fyay9uZXR6by1yZXBvcy9uZXR6by93d3cvLnZpdGVwcmVzcy9jb25maWcubmF2LnRzXCI7aW1wb3J0IHR5cGUgeyBEZWZhdWx0VGhlbWUgfSBmcm9tICd2aXRlcHJlc3MnXG5cbi8vIE5PVEU6IHJlZ2V4IGZvciBtdWx0aXBsZSBwYXRocyB3aXRoIHsgYWN0aXZlTWF0Y2g6IGBeLyhkb2NzfGNvb2tib29rfGV4YW1wbGVzKS9gIH1cbi8vIE5PVEU6IHRyYWlsaW5nIHNsYXNoIGluIGxpbmtzIGFsbG93cyBlLmcuICcvcGFydG5lcnMvaW5kZXgubWQnIGluc3RlYWQgb2YgJy9wYXJ0bmVycy5tZCdcbmV4cG9ydCBjb25zdCBuYXZFTjogRGVmYXVsdFRoZW1lLk5hdkl0ZW1bXSA9IFtcbiAge1xuICAgIHRleHQ6ICdOZXR6bycsXG4gICAgaXRlbXM6IFtcbiAgICAgIHtcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdXaGF0IGlzIE5ldHpvPycsIGxpbms6ICcvbmV0em8vd2hhdC1pcy1uZXR6bycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdXaHkgdXNlIE5ldHpvPycsIGxpbms6ICcvbmV0em8vd2h5LXVzZS1uZXR6bycgfV0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnV2hvIGlzIE5ldHpvIGZvcj8nLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ1x1RDgzRVx1REREMVx1MjAwRFx1RDgzRFx1RENCQiBEZXZlbG9wZXIgVGVhbXMnLCBsaW5rOiAnL25ldHpvL3doby1pcy1uZXR6by1mb3IjZGV2ZWxvcGVyLXRlYW1zJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1x1RDgzRFx1REU4MCBTTUJzIGFuZCBTdGFydHVwcycsIGxpbms6ICcvbmV0em8vd2hvLWlzLW5ldHpvLWZvciNzbWJzLWFuZC1zdGFydHVwcycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdcdUQ4M0NcdURGRTIgRW50ZXJwcmlzZXMnLCBsaW5rOiAnL25ldHpvL3doby1pcy1uZXR6by1mb3IjZW50ZXJwcmlzZXMnIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnVGVtcGxhdGVzJyxcbiAgICBpdGVtczogW1xuICAgICAgeyB0ZXh0OiAnQXBwcycsIGxpbms6ICcvZG9jcy90ZW1wbGF0ZXMvYXBwcycgfSxcbiAgICAgIHsgdGV4dDogJ0FQSXMnLCBsaW5rOiAnL2RvY3MvdGVtcGxhdGVzL2FwaXMnIH0sXG4gICAgICB7IHRleHQ6ICdXb3JrZmxvd3MnLCBsaW5rOiAnL2RvY3MvdGVtcGxhdGVzL3dvcmtmbG93cycgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgdGV4dDogJ0ludGVncmF0aW9ucycsXG4gICAgaXRlbXM6IFtcbiAgICAgIHsgdGV4dDogJ0FQSXMnLCBsaW5rOiAnL2RvY3MvbmV0em8vYXBpcycgfSxcbiAgICAgIHsgdGV4dDogJ1BsdWdpbnMnLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvcGx1Z2lucycgfSxcbiAgICBdLFxuICB9LFxuICAvLyB7XG4gIC8vICAgdGV4dDogJ1VzZSBDYXNlcycsXG4gIC8vICAgaXRlbXM6IFtcbiAgLy8gICAgIHsgdGV4dDogJ1x1RDgzRFx1RENDQSBCdXNpbmVzcyBJbnRlbGxpZ2VuY2UnLCBsaW5rOiAnL3VzZS1jYXNlcyNidXNpbmVzcy1pbnRlbGxpZ2VuY2UtYmknIH0sXG4gIC8vICAgICB7IHRleHQ6ICdcdUQ4M0RcdURDQkIgQWRtaW4gUGFuZWxzJywgbGluazogJy91c2UtY2FzZXMjYWRtaW4tcGFuZWxzLWNydWQnIH0sXG4gIC8vICAgICB7IHRleHQ6ICdcdUQ4M0RcdUREMTcgQVBJcyAoUkVTVCknLCBsaW5rOiAnL3VzZS1jYXNlcyNyZXN0LWFwaXMnIH0sXG4gIC8vICAgICB7IHRleHQ6ICdcdUQ4M0VcdUREMTYgV29ya2Zsb3cgQXV0b21hdGlvbicsIGxpbms6ICcvdXNlLWNhc2VzI3dvcmtmbG93cycgfSxcbiAgLy8gICAgIHsgdGV4dDogJ1x1RDgzQ1x1REYxMCBXZWJzaXRlcycsIGxpbms6ICcvdXNlLWNhc2VzI3dlYnNpdGVzLWFuZC1sYW5kaW5nLXBhZ2VzJyB9LFxuICAvLyAgIF0sXG4gIC8vIH0sXG4gIHsgdGV4dDogJ1ByaWNpbmcnLCBsaW5rOiAnL3ByaWNpbmcnIH0sXG4gIHsgdGV4dDogJ0RvY3MnLCBsaW5rOiAnL2RvY3MvaW50cm9kdWN0aW9uL2dldHRpbmctc3RhcnRlZCcgfSxcbl1cblxuZXhwb3J0IGNvbnN0IG5hdkVTOiBEZWZhdWx0VGhlbWUuTmF2SXRlbVtdID0gW1xuICB7XG4gICAgdGV4dDogJ05ldHpvJyxcbiAgICBpdGVtczogW1xuICAgICAge1xuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ1x1MDBCRlF1XHUwMEU5IGVzIE5ldHpvPycsIGxpbms6ICcvZXMvbmV0em8vd2hhdC1pcy1uZXR6bycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdcdTAwQkZQb3IgcXVcdTAwRTkgdXNhciBOZXR6bz8nLCBsaW5rOiAnL2VzL25ldHpvL3doeS11c2UtbmV0em8nIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnXHUwMEJGUGFyYSBxdWlcdTAwRTluIGVzIE5ldHpvPycsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnXHVEODNFXHVEREQxXHUyMDBEXHVEODNEXHVEQ0JCIEVxdWlwb3MgZGUgRGVzYXJyb2xsbycsIGxpbms6ICcvZXMvbmV0em8vd2hvLWlzLW5ldHpvLWZvciNlcXVpcG9zLWRlLWRlc2Fycm9sbG8nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnXHVEODNEXHVERTgwIFBZTUVzIHkgU3RhcnR1cHMnLCBsaW5rOiAnL2VzL25ldHpvL3doby1pcy1uZXR6by1mb3IjcHltZXMteS1zdGFydHVwcycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdcdUQ4M0NcdURGRTIgQ29ycG9yYWNpb25lcycsIGxpbms6ICcvZXMvbmV0em8vd2hvLWlzLW5ldHpvLWZvciNjb3Jwb3JhY2lvbmVzJyB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgdGV4dDogJ1BsYW50aWxsYXMnLFxuICAgIGl0ZW1zOiBbXG4gICAgICB7IHRleHQ6ICdBcHBzJywgbGluazogJy9kb2NzL3RlbXBsYXRlcy9hcHBzJyB9LFxuICAgICAgeyB0ZXh0OiAnQVBJcycsIGxpbms6ICcvZG9jcy90ZW1wbGF0ZXMvYXBpcycgfSxcbiAgICAgIHsgdGV4dDogJ1dvcmtmbG93cycsIGxpbms6ICcvZG9jcy90ZW1wbGF0ZXMvd29ya2Zsb3dzJyB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnSW50ZWdyYWNpb25lcycsXG4gICAgaXRlbXM6IFtcbiAgICAgIHsgdGV4dDogJ0FQSXMnLCBsaW5rOiAnL2RvY3MvbmV0em8vYXBpcycgfSxcbiAgICAgIHsgdGV4dDogJ1BsdWdpbnMnLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvcGx1Z2lucycgfSxcbiAgICBdLFxuICB9LFxuICAvLyB7XG4gIC8vICAgdGV4dDogJ0Nhc29zIGRlIFVzbycsXG4gIC8vICAgaXRlbXM6IFtcbiAgLy8gICAgIHsgdGV4dDogJ1x1RDgzRFx1RENDQSBJbnRlbGlnZW5jaWEgZGUgTmVnb2Npb3MnLCBsaW5rOiAnL2VzL3VzZS1jYXNlcyNpbnRlbGlnZW5jaWEtZGUtbmVnb2Npb3MtYmknIH0sXG4gIC8vICAgICB7IHRleHQ6ICdcdUQ4M0RcdURDQkIgQ3VhZHJvcyBkZSBtYW5kbycsIGxpbms6ICcvZXMvdXNlLWNhc2VzI2N1YWRyb3MtZGUtbWFuZG8tY3J1ZCcgfSxcbiAgLy8gICAgIHsgdGV4dDogJ1x1RDgzRFx1REQxNyBBUElzIChSRVNUKScsIGxpbms6ICcvZXMvdXNlLWNhc2VzI2FwaXMtcmVzdCcgfSxcbiAgLy8gICAgIHsgdGV4dDogJ1x1RDgzRVx1REQxNiBGbHVqb3MgZGUgVHJhYmFqbycsIGxpbms6ICcvZXMvdXNlLWNhc2VzI2ZsdWpvcy1kZS10cmFiYWpvJyB9LFxuICAvLyAgICAgeyB0ZXh0OiAnXHVEODNDXHVERjEwIFNpdGlvcyBXZWInLCBsaW5rOiAnL3VzZS1jYXNlcyNzaXRpb3Mtd2ViLXktbGFuZGluZy1wYWdlcycgfSxcbiAgLy8gICBdLFxuICAvLyB9LFxuICAvLyB7IHRleHQ6ICdQcmVjaW9zJywgbGluazogJy9lcy9wcmljaW5nJyB9LFxuICB7IHRleHQ6ICdEb2NzJywgbGluazogJy9kb2NzL2ludHJvZHVjdGlvbi9nZXR0aW5nLXN0YXJ0ZWQnIH0sXG5dXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2Fyay9uZXR6by1yZXBvcy9uZXR6by93d3cvLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvYXJrL25ldHpvLXJlcG9zL25ldHpvL3d3dy8udml0ZXByZXNzL2NvbmZpZy5zaWRlYmFyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2Fyay9uZXR6by1yZXBvcy9uZXR6by93d3cvLnZpdGVwcmVzcy9jb25maWcuc2lkZWJhci50c1wiO2ltcG9ydCB0eXBlIHsgRGVmYXVsdFRoZW1lIH0gZnJvbSAndml0ZXByZXNzJ1xuaW1wb3J0IGVuIGZyb20gJ34vbG9jYWxlcy9lbi5qcydcblxuZXhwb3J0IGNvbnN0IGxlZ2FsRU4gPSB7XG4gIHRleHQ6ICdFbmdsaXNoJyxcbiAgY29sbGFwc2VkOiBmYWxzZSxcbiAgaXRlbXM6IFtcbiAgICB7IHRleHQ6ICdMZWdhbCBOb3RpY2UnLCBsaW5rOiAnL2xlZ2FsL2xlZ2FsLW5vdGljZScgfSxcbiAgICB7IHRleHQ6ICdDb29raWUgTm90aWNlJywgbGluazogJy9sZWdhbC9jb29raWUtbm90aWNlJyB9LFxuICAgIHsgdGV4dDogJ1ByaXZhY3kgUG9saWN5JywgbGluazogJy9sZWdhbC9wcml2YWN5LXBvbGljeScgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnQWdyZWVtZW50cyBhbmQgVGVybXMnLFxuICAgICAgbGluazogJy9sZWdhbC93ZWJzaXRlLXRlcm1zLW9mLXVzZScsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7IHRleHQ6ICdXZWJzaXRlIHRlcm1zIG9mIHVzZScsIGxpbms6ICcvbGVnYWwvd2Vic2l0ZS10ZXJtcy1vZi11c2UnIH0sXG4gICAgICAgIHsgdGV4dDogJ01haW4gU2VydmljZXMgQWdyZWVtZW50JywgbGluazogJy9sZWdhbC9tYWluLXNlcnZpY2VzLWFncmVlbWVudCcgfSxcbiAgICAgICAgLy8geyB0ZXh0OiAnUHJvZmVzc2lvbmFsIFNlcnZpY2VzIFRlcm1zJywgbGluazogJy9sZWdhbC9wcm9mZXNzaW9uYWwtc2VydmljZXMtdGVybXMnIH0sXG4gICAgICBdLFxuICAgIH1dLFxufVxuXG5leHBvcnQgY29uc3QgbGVnYWxFUyA9IHtcbiAgdGV4dDogJ0VzcGFcdTAwRjFvbCcsXG4gIGNvbGxhcHNlZDogZmFsc2UsXG4gIGl0ZW1zOiBbXG4gICAgeyB0ZXh0OiAnQXZpc28gbGVnYWwnLCBsaW5rOiAnL2VzL2xlZ2FsL2xlZ2FsLW5vdGljZScgfSxcbiAgICB7IHRleHQ6ICdBdmlzbyBkZSBjb29raWVzJywgbGluazogJy9lcy9sZWdhbC9jb29raWUtbm90aWNlJyB9LFxuICAgIHsgdGV4dDogJ1BvbFx1MDBFRHRpY2EgZGUgcHJpdmFjaWRhZCcsIGxpbms6ICcvZXMvbGVnYWwvcHJpdmFjeS1wb2xpY3knIH0sXG4gICAge1xuICAgICAgdGV4dDogJ0FjdWVyZG9zIHkgdFx1MDBFOXJtaW5vcycsXG4gICAgICBsaW5rOiAnL2VzL2xlZ2FsL3dlYnNpdGUtdGVybXMtb2YtdXNlJyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHsgdGV4dDogJ1RcdTAwRTlybWlub3MgZGUgdXNvIGRlbCBzaXRpbyB3ZWInLCBsaW5rOiAnL2VzL2xlZ2FsL3dlYnNpdGUtdGVybXMtb2YtdXNlJyB9LFxuICAgICAgICB7IHRleHQ6ICdBY3VlcmRvIGRlIHNlcnZpY2lvcyBwcmluY2lwYWxlcycsIGxpbms6ICcvZXMvbGVnYWwvbWFpbi1zZXJ2aWNlcy1hZ3JlZW1lbnQnIH0sXG4gICAgICAgIHsgdGV4dDogJ0FjdWVyZG8gZGUgc2VydmljaW9zIHByb2Zlc2lvbmFsZXMnLCBsaW5rOiAnL2VzL2xlZ2FsL3Byb2Zlc3Npb25hbC1zZXJ2aWNlcy10ZXJtcycgfSxcbiAgICAgICAgLy8geyB0ZXh0OiAnT3BlbiBTb3VyY2UgTGljZW5zZSBEaXNjbG9zdXJlJywgbGluazogJy9sZWdhbC9vcGVuLXNvdXJjZS1saWNlbnNlLWRpc2Nsb3N1cmUnIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIF0sXG59XG5cbmV4cG9ydCBjb25zdCBzaWRlYmFyRU46IERlZmF1bHRUaGVtZS5TaWRlYmFyID0ge1xuICAvLyAnL2Jsb2cvJzogW1xuICAvLyAgIHtcbiAgLy8gICAgIHRleHQ6ICdBbm5vdW5jZW1lbnRzJyxcbiAgLy8gICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gIC8vICAgICBpdGVtczogW1xuICAvLyAgICAgICB7IHRleHQ6ICdOZXR6byBCZXRhIDAxJywgbGluazogJy9ibG9nL3Bvc3RzL2Fubm91bmNlbWVudHMtbmV0em8tYmV0YS0wMScgfSxcbiAgLy8gICAgIF0sXG4gIC8vICAgfSxcbiAgLy8gICB7XG4gIC8vICAgICB0ZXh0OiAnVGVjaG5vbG9neSBhbmQgVG9vbHMnLFxuICAvLyAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgLy8gICAgIGl0ZW1zOiBbXG4gIC8vICAgICAgIHsgdGV4dDogJ1Byb2JsZW1zIG9mIFVJLWJhc2VkIFBsYXRmb3JtcycsIGxpbms6ICcvYmxvZy9wb3N0cy90ZWNobm9sb2d5LXByb2JsZW1zLW9mLXVpLWJhc2VkLXRvb2xzJyB9LFxuICAvLyAgICAgICB7IHRleHQ6ICdNYXhpbWl6aW5nIEVmZmljaWVuY3kgYW5kIFByb2R1Y3Rpdml0eSBUaHJvdWdoIEF1dG9tYXRpb24nLCBsaW5rOiAnL2Jsb2cvcG9zdHMvdGVjaG5vbG9neS1tYXhpbWl6aW5nLWVmZmljaWVuY3ktYW5kLXByb2R1Y3Rpdml0eS10aHJvdWdoLWF1dG9tYXRpb24nIH0sXG4gIC8vICAgICBdLFxuICAvLyAgIH0sXG4gIC8vICAgLy8ge1xuICAvLyAgIC8vICAgdGV4dDogJ1Zpc2lvbicsXG4gIC8vICAgLy8gICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAvLyAgIC8vICAgaXRlbXM6IFtcbiAgLy8gICAvLyAgICAgeyB0ZXh0OiAnVW5sb2NrIHRoZSBQb3dlciBvZiBJb1QgSW50ZXJvcGVyYWJpbGl0eScsIGxpbms6ICcvYmxvZy9wb3N0cy92aXNpb24tdW5sb2NrLXRoZS1wb3dlci1vZi1pb3QtaW50ZXJvcGVyYWJpbGl0eScgfSxcbiAgLy8gICAvLyAgICAgeyB0ZXh0OiAnVGhlIFVuZXhwbG9pdGVkIFBvdGVudGlhbCBvZiBJb1QnLCBsaW5rOiAnL2Jsb2cvcG9zdHMvdmlzaW9uLXRoZS11bmV4cGxvaXRlZC1wb3RlbnRpYWwtb2YtaW90JyB9LFxuICAvLyAgIC8vICAgICB7IHRleHQ6ICdBIFNtYWxsIFRlYW0gb24gYSBHcmFuZCBNaXNzaW9uJywgbGluazogJy9ibG9nL3Bvc3RzL3Zpc2lvbi1hLXNtYWxsLXRlYW0tb24tYS1ncmFuZC1taXNzaW9uJyB9LFxuICAvLyAgIC8vICAgXSxcbiAgLy8gICAvLyB9LFxuICAvLyBdLFxuICAnL2RvY3MvJzogW1xuICAgIHtcbiAgICAgIHRleHQ6ICdJbnRyb2R1Y3Rpb24nLFxuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHsgdGV4dDogJ0dldHRpbmcgU3RhcnRlZCcsIGxpbms6ICcvZG9jcy9pbnRyb2R1Y3Rpb24vZ2V0dGluZy1zdGFydGVkJyB9LFxuICAgICAgICB7IHRleHQ6ICdXaGF0IGlzIGEgUHJvamVjdD8nLCBsaW5rOiAnL2RvY3MvaW50cm9kdWN0aW9uL3doYXQtaXMtYS1wcm9qZWN0JyB9LFxuICAgICAgICB7IHRleHQ6ICdIb3cgdG8gRGVwbG95JywgbGluazogJy9kb2NzL2ludHJvZHVjdGlvbi9ob3ctdG8tZGVwbG95JyB9LFxuICAgICAgICB7IHRleHQ6ICdVc2UgQ2FzZXMnLCBsaW5rOiAnL2RvY3MvaW50cm9kdWN0aW9uL3VzZS1jYXNlcycgfSxcbiAgICAgICAgeyB0ZXh0OiAnQ29yZSBDb25jZXB0cycsIGxpbms6ICcvZG9jcy9pbnRyb2R1Y3Rpb24vY29yZS1jb25jZXB0cycgfSxcbiAgICAgICAgLy8geyB0ZXh0OiAnVHJvdWJsZXNob290aW5nJywgbGluazogJy9kb2NzL2ludHJvZHVjdGlvbi90cm91Ymxlc2hvb3RpbmcnIH1cbiAgICAgICAgLy8geyB0ZXh0OiAnSGVscCBDZW50ZXInLCBsaW5rOiAnaHR0cHM6Ly9oZWxwLm5ldHpvLmlvLycgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICAvLyB7XG4gICAgLy8gICB0ZXh0OiAnRXhhbXBsZXMnLFxuICAgIC8vICAgY29sbGFwc2VkOiB0cnVlLFxuICAgIC8vICAgaXRlbXM6IFtcbiAgICAvLyAgICAgeyB0ZXh0OiAnPGNvZGU+bWluaW1hbDwvY29kZT4nLCBsaW5rOiAnL2RvY3MvZXhhbXBsZXMvbWluaW1hbCcgfSxcbiAgICAvLyAgICAgeyB0ZXh0OiAnPGNvZGU+c3RhcnRlcjwvY29kZT4nLCBsaW5rOiAnL2RvY3MvZXhhbXBsZXMvc3RhcnRlcicgfSxcbiAgICAvLyAgIF0sXG4gICAgLy8gfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnR3VpZGVzJyxcbiAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnQmFzaWNzJyxcbiAgICAgICAgICBsaW5rOiAnL2RvY3MvZ3VpZGVzL2Jhc2ljcycsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHsgdGV4dDogJ0ltcG9ydC9FeHBvcnQnLCBsaW5rOiAnL2RvY3MvZ3VpZGVzL2Jhc2ljcy9pbXBvcnQtZXhwb3J0JyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnSFRUUCcsIGxpbms6ICcvZG9jcy9ndWlkZXMvYmFzaWNzL2h0dHAnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdIVE1MJywgbGluazogJy9kb2NzL2d1aWRlcy9iYXNpY3MvaHRtbCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ0pTWC9UU1gnLCBsaW5rOiAnL2RvY3MvZ3VpZGVzL2Jhc2ljcy9qc3gtdHN4JyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnRmV0Y2gnLCBsaW5rOiAnL2RvY3MvZ3VpZGVzL2Jhc2ljcy9mZXRjaCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ0Vudmlyb25tZW50IFZhcmlhYmxlcycsIGxpbms6ICcvZG9jcy9ndWlkZXMvYmFzaWNzL2Vudmlyb25tZW50LXZhcmlhYmxlcycgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7IHRleHQ6ICdSb3V0aW5nJywgbGluazogJy9kb2NzL2d1aWRlcy9yb3V0aW5nJyB9LFxuICAgICAgICB7IHRleHQ6ICdJbnRlcmFjdGluZyB3aXRoIEFQSXMnLCBsaW5rOiAnL2RvY3MvZ3VpZGVzL2ludGVyYWN0aW5nLXdpdGgtYXBpcycgfSxcbiAgICAgICAgeyB0ZXh0OiAnV2ViQXNzZW1ibHknLCBsaW5rOiAnL2RvY3MvZ3VpZGVzL3dlYmFzc2VtYmx5JyB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdQbGF0Zm9ybScsXG4gICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7IHRleHQ6ICdIb21lJywgbGluazogJy9kb2NzL3BsYXRmb3JtL2hvbWUnIH0sXG4gICAgICAgIHsgdGV4dDogJ1dvcmtzcGFjZXMnLCBsaW5rOiAnL2RvY3MvcGxhdGZvcm0vd29ya3NwYWNlcycgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdQcm9qZWN0cycsXG4gICAgICAgICAgbGluazogJy9kb2NzL3BsYXRmb3JtL3Byb2plY3RzJyxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgLy8geyB0ZXh0OiAnT3ZlcnZpZXcnLCBsaW5rOiAnL2RvY3MvcGxhdGZvcm0vcHJvamVjdHMvb3ZlcnZpZXcnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdTdHVkaW8nLCBsaW5rOiAnL2RvY3MvcGxhdGZvcm0vcHJvamVjdHMvc3R1ZGlvJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnUmVxdWVzdHMnLCBsaW5rOiAnL2RvY3MvcGxhdGZvcm0vcHJvamVjdHMvcmVxdWVzdHMnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdEYXRhYmFzZXMnLCBsaW5rOiAnL2RvY3MvcGxhdGZvcm0vcHJvamVjdHMvZGF0YWJhc2VzJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnRGVwbG95bWVudHMnLCBsaW5rOiAnL2RvY3MvcGxhdGZvcm0vcHJvamVjdHMvZGVwbG95bWVudHMnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdMb2dzJywgbGluazogJy9kb2NzL3BsYXRmb3JtL3Byb2plY3RzL2xvZ3MnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdTZXR0aW5ncycsIGxpbms6ICcvZG9jcy9wbGF0Zm9ybS9wcm9qZWN0cy9zZXR0aW5ncycgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7IHRleHQ6ICdWYXJpYWJsZXMnLCBsaW5rOiAnL2RvY3MvcGxhdGZvcm0vdmFyaWFibGVzJyB9LFxuICAgICAgICB7IHRleHQ6ICdOb3RpZmljYXRpb25zJywgbGluazogJy9kb2NzL3BsYXRmb3JtL25vdGlmaWNhdGlvbnMnIH0sXG4gICAgICAgIHsgdGV4dDogJ1RlbXBsYXRlcycsIGxpbms6ICcvZG9jcy9wbGF0Zm9ybS90ZW1wbGF0ZXMnIH0sXG4gICAgICAgIHsgdGV4dDogJ1VzZXJzJywgbGluazogJy9kb2NzL3BsYXRmb3JtL3VzZXJzJyB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdUZW1wbGF0ZXMnLFxuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHsgdGV4dDogJ0FwcHMnLCBsaW5rOiAnL2RvY3MvdGVtcGxhdGVzL2FwcHMnIH0sXG4gICAgICAgIHsgdGV4dDogJ0FQSXMnLCBsaW5rOiAnL2RvY3MvdGVtcGxhdGVzL2FwaXMnIH0sXG4gICAgICAgIHsgdGV4dDogJ1dvcmtmbG93cycsIGxpbms6ICcvZG9jcy90ZW1wbGF0ZXMvd29ya2Zsb3dzJyB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICc8Y29kZT5odHRwczovL2Rlbm8ubGFuZC94L25ldHpvPC9jb2RlPicsXG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICc8Y29kZT5hcGlzPC9jb2RlPicsXG4gICAgICAgICAgbGluazogJy9kb2NzL25ldHpvL2FwaXMnLFxuICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+YWN0aXZlY2FtcGFpZ248L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL2FwaXMvYWN0aXZlY2FtcGFpZ24nIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5haXJ0YWJsZTwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vYXBpcy9haXJ0YWJsZScgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPmJyZXZvPC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by9hcGlzL2JyZXZvJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+Y2hhcnRtb2d1bDwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vYXBpcy9jaGFydG1vZ3VsJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+Y2xpY2t1cDwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vYXBpcy9jbGlja3VwJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+Y2xvdWRmbGFyZTwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vYXBpcy9jbG91ZGZsYXJlJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+Y29udHBhcWljb21lcmNpYWw8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL2FwaXMvY29udHBhcWljb21lcmNpYWwnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5kaXNjb3JkPC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by9hcGlzL2Rpc2NvcmQnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5mYWN0dXJhbWE8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL2FwaXMvZmFjdHVyYW1hJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+ZmF0aG9tYW5hbHl0aWNzPC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by9hcGlzL2ZhdGhvbWFuYWx5dGljcycgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPmdpdGh1YjwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vYXBpcy9naXRodWInIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5nb29nbGVhcHBzaGVldDwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vYXBpcy9nb29nbGVhcHBzaGVldCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPmdvb2dsZWRyaXZlPC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by9hcGlzL2dvb2dsZWRyaXZlJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+Z29vZ2xlc2hlZXRzPC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by9hcGlzL2dvb2dsZXNoZWV0cycgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPmhvbGRlZDwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vYXBpcy9ob2xkZWQnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5odWJzcG90PC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by9hcGlzL2h1YnNwb3QnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5pcGdlb2xvY2F0aW9uPC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by9hcGlzL2lwZ2VvbG9jYXRpb24nIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5qc29ucGxhY2Vob2xkZXI8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL2FwaXMvanNvbnBsYWNlaG9sZGVyJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+bWFpbGNoaW1wbWFya2V0aW5nPC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by9hcGlzL21haWxjaGltcG1hcmtldGluZycgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPm1haWxndW48L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL2FwaXMvbWFpbGd1bicgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPm1lZGl1bTwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vYXBpcy9tZWRpdW0nIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5tb25kYXk8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL2FwaXMvbW9uZGF5JyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+bW9uZ29kYmF0bGFzZGF0YTwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vYXBpcy9tb25nb2RiYXRsYXNkYXRhJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+bmV0em88L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL2FwaXMvbmV0em8nIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5ub3Rpb248L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL2FwaXMvbm90aW9uJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+b3BlbmFpPC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by9hcGlzL29wZW5haScgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPnBhZGRsZTwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vYXBpcy9wYWRkbGUnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5wYW5kYWRvYzwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vYXBpcy9wYW5kYWRvYycgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPnBpcGVkcml2ZTwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vYXBpcy9waXBlZHJpdmUnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5yZXN0PC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by9hcGlzL3Jlc3QnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5yZXN0ZGI8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL2FwaXMvcmVzdGRiJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+c2VuZGdyaWQ8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL2FwaXMvc2VuZGdyaWQnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5zaG9waWZ5PC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by9hcGlzL3Nob3BpZnknIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5zdHJpcGU8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL2FwaXMvc3RyaXBlJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+d2hhdHNhcHBidXNpbmVzczwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vYXBpcy93aGF0c2FwcGJ1c2luZXNzJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+d2l4PC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by9hcGlzL3dpeCcgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7IHRleHQ6ICc8Y29kZT5jbGk8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL2NsaScgfSxcbiAgICAgICAgeyB0ZXh0OiAnPGNvZGU+ZGI8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL2RiJyB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJzxjb2RlPnVpPC9jb2RlPicsXG4gICAgICAgICAgbGluazogJy9kb2NzL25ldHpvL3VpJyxcbiAgICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6ICc8Y29kZT5jb21wb25lbnRzPC9jb2RlPicsXG4gICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9uZXR6by91aS9jb21wb25lbnRzJyxcbiAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPmFjY29yZGlvbjwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvY29tcG9uZW50cy9hY2NvcmRpb24nIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+YWxlcnQ8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL3VpL2NvbXBvbmVudHMvYWxlcnQnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+YWxlcnQtZGlhbG9nPC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by91aS9jb21wb25lbnRzL2FsZXJ0LWRpYWxvZycgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5hc3BlY3QtcmF0aW88L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL3VpL2NvbXBvbmVudHMvYXNwZWN0LXJhdGlvJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPmF2YXRhcjwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvY29tcG9uZW50cy9hdmF0YXInIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+YmFkZ2U8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL3VpL2NvbXBvbmVudHMvYmFkZ2UnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+YnV0dG9uPC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by91aS9jb21wb25lbnRzL2J1dHRvbicgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5jYWxlbmRhcjwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvY29tcG9uZW50cy9jYWxlbmRhcicgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5jYXJkPC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by91aS9jb21wb25lbnRzL2NhcmQnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+Y2hlY2tib3g8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL3VpL2NvbXBvbmVudHMvY2hlY2tib3gnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+Y29sbGFwc2libGU8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL3VpL2NvbXBvbmVudHMvY29sbGFwc2libGUnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+Y29tYm9ib3g8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL3VpL2NvbXBvbmVudHMvY29tYm9ib3gnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+Y29tbWFuZDwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvY29tcG9uZW50cy9jb21tYW5kJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPmNvbnRleHQtbWVudTwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvY29tcG9uZW50cy9jb250ZXh0LW1lbnUnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+ZGF0YS10YWJsZTwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvY29tcG9uZW50cy9kYXRhLXRhYmxlJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPmRhdGUtcGlja2VyPC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by91aS9jb21wb25lbnRzL2RhdGUtcGlja2VyJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPmRpYWxvZzwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvY29tcG9uZW50cy9kaWFsb2cnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+ZHJvcGRvd24tbWVudTwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvY29tcG9uZW50cy9kcm9wZG93bi1tZW51JyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPmZvcm08L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL3VpL2NvbXBvbmVudHMvZm9ybScgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5ob3Zlci1jYXJkPC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by91aS9jb21wb25lbnRzL2hvdmVyLWNhcmQnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+aW5wdXQ8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL3VpL2NvbXBvbmVudHMvaW5wdXQnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+bGFiZWw8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL3VpL2NvbXBvbmVudHMvbGFiZWwnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+bWVudWJhcjwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvY29tcG9uZW50cy9tZW51YmFyJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPm5hdmlnYXRpb24tbWVudTwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvY29tcG9uZW50cy9uYXZpZ2F0aW9uLW1lbnUnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+cG9wb3ZlcjwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvY29tcG9uZW50cy9wb3BvdmVyJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPnByb2dyZXNzPC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by91aS9jb21wb25lbnRzL3Byb2dyZXNzJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPnJhZGlvLWdyb3VwPC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by91aS9jb21wb25lbnRzL3JhZGlvLWdyb3VwJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPnNjcm9sbC1hcmVhPC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by91aS9jb21wb25lbnRzL3Njcm9sbC1hcmVhJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPnNlbGVjdDwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvY29tcG9uZW50cy9zZWxlY3QnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+c2VwYXJhdG9yPC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by91aS9jb21wb25lbnRzL3NlcGFyYXRvcicgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5zaGVldDwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvY29tcG9uZW50cy9zaGVldCcgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5za2VsZXRvbjwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvY29tcG9uZW50cy9za2VsZXRvbicgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5zbGlkZXI8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL3VpL2NvbXBvbmVudHMvc2xpZGVyJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPnN3aXRjaDwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvY29tcG9uZW50cy9zd2l0Y2gnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+dGFibGU8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL3VpL2NvbXBvbmVudHMvdGFibGUnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+dGFiczwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvY29tcG9uZW50cy90YWJzJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPnRleHRhcmVhPC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by91aS9jb21wb25lbnRzL3RleHRhcmVhJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPnRvYXN0PC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by91aS9jb21wb25lbnRzL3RvYXN0JyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPnRvZ2dsZTwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvY29tcG9uZW50cy90b2dnbGUnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+dG9vbHRpcDwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvY29tcG9uZW50cy90b29sdGlwJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPnR5cG9ncmFwaHk8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL3VpL2NvbXBvbmVudHMvdHlwb2dyYXBoeScgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5jb21wb3NhYmxlczwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvY29tcG9zYWJsZXMnIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6ICc8Y29kZT5wbHVnaW5zPC9jb2RlPicsXG4gICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9uZXR6by91aS9wbHVnaW5zJyxcbiAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHsgdGV4dDogJzxjb2RlPmRhaXN5dWk8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL3VpL3BsdWdpbnMvZGFpc3l1aScgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5mbG93Yml0ZTwvY29kZT4nLCBsaW5rOiAnL2RvY3MvbmV0em8vdWkvcGx1Z2lucy9mbG93Yml0ZScgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5odG14PC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by91aS9wbHVnaW5zL2h0bXgnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+bmV0em9BcHBMYXlvdXQ8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL3VpL3BsdWdpbnMvbmV0em9BcHBMYXlvdXQnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+bmV0em9BdXRoPC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by91aS9wbHVnaW5zL25ldHpvQXV0aCcgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT5uZXR6b0RCPC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by91aS9wbHVnaW5zL25ldHpvREInIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnPGNvZGU+bmV0em9FcnJvclBhZ2VzPC9jb2RlPicsIGxpbms6ICcvZG9jcy9uZXR6by91aS9wbHVnaW5zL25ldHpvRXJyb3JQYWdlcycgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICc8Y29kZT51bm9jc3M8L2NvZGU+JywgbGluazogJy9kb2NzL25ldHpvL3VpL3BsdWdpbnMvdW5vY3NzJyB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdBUEkgUmVmZXJlbmNlJyxcbiAgICAgIGxpbms6ICcvZG9jcy9hcGktcmVmZXJlbmNlL2luZGV4JyxcbiAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHsgdGV4dDogJ0F1dGhlbnRpY2F0aW9uJywgbGluazogJy9kb2NzL2FwaS1yZWZlcmVuY2UvYXV0aGVudGljYXRpb24nIH0sXG4gICAgICAgIHsgdGV4dDogJ1JlZmVyZW5jZScsIGxpbms6ICdodHRwczovL2FwaS5uZXR6by5pby9kb2NzLycgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnTGVnYWwnLFxuICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAgeyB0ZXh0OiAnRmFpciBVc2UgUG9saWN5JywgbGluazogJy9kb2NzL2xlZ2FsL2ZhaXItdXNlLXBvbGljeScgfSxcbiAgICAgICAgeyB0ZXh0OiAnQ29kZSBvZiBDb25kdWN0JywgbGluazogJy9kb2NzL2xlZ2FsL2NvZGUtb2YtY29uZHVjdCcgfSxcbiAgICAgICAgeyB0ZXh0OiAnU2VjdXJpdHkgTm90aWNlJywgbGluazogJy9kb2NzL2xlZ2FsL3NlY3VyaXR5LW5vdGljZScgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdRdWljayBsaW5rcycsXG4gICAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgICAgICBpdGVtczogbGVnYWxFTi5pdGVtcyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgXSxcbiAgJy9uZXR6by8nOiBbXG4gICAge1xuICAgICAgaXRlbXM6IFtcbiAgICAgICAgeyB0ZXh0OiAnV2hhdCBpcyBOZXR6bz8nLCBsaW5rOiAnL25ldHpvL3doYXQtaXMtbmV0em8nIH0sXG4gICAgICAgIHsgdGV4dDogJ1doeSB1c2UgTmV0em8/JywgbGluazogJy9uZXR6by93aHktdXNlLW5ldHpvJyB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1dobyBpcyBOZXR6byBmb3I/JyxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgeyB0ZXh0OiAnXHVEODNFXHVEREQxXHUyMDBEXHVEODNEXHVEQ0JCIERldmVsb3BlciBUZWFtcycsIGxpbms6ICcvbmV0em8vd2hvLWlzLW5ldHpvLWZvciNkZXZlbG9wZXItdGVhbXMnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdcdUQ4M0RcdURFODAgU3RhcnR1cHMgYW5kIFNNQnMnLCBsaW5rOiAnL25ldHpvL3doby1pcy1uZXR6by1mb3Ijc21icy1hbmQtc3RhcnR1cHMnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdcdUQ4M0NcdURGRTIgRW50ZXJwcmlzZXMnLCBsaW5rOiAnL25ldHpvL3doby1pcy1uZXR6by1mb3IjZW50ZXJwcmlzZXMnIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgXSxcbiAgJy91c2UtY2FzZXMvJzogW1xuICAgIHtcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnVXNlIENhc2VzJyxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgeyB0ZXh0OiAnXHVEODNEXHVEQ0NBIEJ1c2luZXNzIEludGVsbGlnZW5jZScsIGxpbms6ICcvdXNlLWNhc2VzI2J1c2luZXNzLWludGVsbGlnZW5jZS1iaScgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1x1RDgzRFx1RENCQiBBZG1pbiBQYW5lbHMnLCBsaW5rOiAnL3VzZS1jYXNlcyNhZG1pbi1wYW5lbHMtY3J1ZCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1x1RDgzRFx1REQxNyBBUElzIChSRVNUKScsIGxpbms6ICcvdXNlLWNhc2VzI3Jlc3QtYXBpcycgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1x1RDgzRVx1REQxNiBXb3JrZmxvdyBBdXRvbWF0aW9uJywgbGluazogJy91c2UtY2FzZXMjd29ya2Zsb3dzJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnXHVEODNDXHVERjEwIFdlYnNpdGVzJywgbGluazogJy91c2UtY2FzZXMjd2Vic2l0ZXMtYW5kLWxhbmRpbmctcGFnZXMnIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgXSxcbiAgJy9sZWdhbC8nOiBbbGVnYWxFTl0sXG59XG5cbmV4cG9ydCBjb25zdCBzaWRlYmFyRVM6IERlZmF1bHRUaGVtZS5TaWRlYmFyID0ge1xuICAvLyAnL2Jsb2cvJzogc2lkZWJhckVOWycvYmxvZy8nXSxcbiAgLy8gJy9kb2NzLyc6IHNpZGViYXJFTlsnL2RvY3MvJ10sXG4gICcvZXMvbmV0em8vJzogW1xuICAgIHtcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHsgdGV4dDogJ1x1MDBCRlF1XHUwMEU5IGVzIE5ldHpvPycsIGxpbms6ICcvZXMvbmV0em8vd2hhdC1pcy1uZXR6bycgfSxcbiAgICAgICAgeyB0ZXh0OiAnXHUwMEJGUG9yIHF1XHUwMEU5IHVzYXIgTmV0em8/JywgbGluazogJy9lcy9uZXR6by93aHktdXNlLW5ldHpvJyB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1x1MDBCRlBhcmEgcXVpXHUwMEU5biBlcyBOZXR6bz8nLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6ICdcdUQ4M0VcdURERDFcdTIwMERcdUQ4M0RcdURDQkIgRXF1aXBvcyBkZSBEZXNhcnJvbGxvJywgbGluazogJy9lcy9uZXR6by93aG8taXMtbmV0em8tZm9yI2VxdWlwb3MtZGUtZGVzYXJyb2xsbycgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1x1RDgzRFx1REU4MCBTdGFydHVwcyB5IFBZTUVzJywgbGluazogJy9lcy9uZXR6by93aG8taXMtbmV0em8tZm9yI3B5bWVzLXktc3RhcnR1cHMnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdcdUQ4M0NcdURGRTIgRW1wcmVzYXMnLCBsaW5rOiAnL2VzL25ldHpvL3doby1pcy1uZXR6by1mb3IjY29ycG9yYWNpb25lcycgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICBdLFxuICAnL2VzL3VzZS1jYXNlcy8nOiBbXG4gICAge1xuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdDYXNvcyBkZSBVc28nLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6ICdcdUQ4M0RcdURDQ0EgSW50ZWxpZ2VuY2lhIGRlIE5lZ29jaW9zJywgbGluazogJy9lcy91c2UtY2FzZXMjaW50ZWxpZ2VuY2lhLWRlLW5lZ29jaW9zLWJpJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnXHVEODNEXHVEQ0JCIEN1YWRyb3MgZGUgTWFuZG8nLCBsaW5rOiAnL2VzL3VzZS1jYXNlcyNjdWFkcm9zLWRlLW1hbmRvLWNydWQnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdcdUQ4M0RcdUREMTcgQVBJcyAoUkVTVCknLCBsaW5rOiAnL2VzL3VzZS1jYXNlcyNhcGlzLXJlc3QnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdcdUQ4M0VcdUREMTYgRmx1am9zIGRlIFRyYWJham8nLCBsaW5rOiAnL2VzL3VzZS1jYXNlcyNmbHVqb3MtZGUtdHJhYmFqbycgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1x1RDgzQ1x1REYxMCBTaXRpb3MgV2ViJywgbGluazogJy91c2UtY2FzZXMjc2l0aW9zLXdlYi15LWxhbmRpbmctcGFnZXMnIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgXSxcbiAgJy9lcy9sZWdhbC8nOiBbbGVnYWxFU10sXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2Fyay9uZXR6by1yZXBvcy9uZXR6by93d3cvLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvYXJrL25ldHpvLXJlcG9zL25ldHpvL3d3dy8udml0ZXByZXNzL2NvbmZpZy51bm9jc3MudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvYXJrL25ldHpvLXJlcG9zL25ldHpvL3d3dy8udml0ZXByZXNzL2NvbmZpZy51bm9jc3MudHNcIjtleHBvcnQgY29uc3QgdW5vY3NzQ29uZmlnID0ge1xuICBzYWZlbGlzdDogW1xuICAgICdpLW1kaS10b29sYm94LW91dGxpbmUnLFxuICAgICdpLW1kaS1oZWFkLXN5bmMtb3V0bGluZScsXG4gICAgJ2ktbWRpLXN0YXItZm91ci1wb2ludHMtb3V0bGluZScsXG4gICAgJ2ktbWRpLWFwcHMnLFxuICAgICdpLW1kaS1yb2JvdCcsXG4gICAgJ2ktbWRpLWNvZGUtYnJhY2VzJyxcbiAgICAnaS1tZGktc3BlZWRvbWV0ZXInLFxuICAgICdpLW1kaS10b29sYm94JyxcbiAgICAnaS1tZGktcm9ja2V0JyxcbiAgICAnaS1tZGktcm9ja2V0LWxhdW5jaCcsXG4gICAgJ2ktbWRpLXJvY2tldC1sYXVuY2gtb3V0bGluZScsXG4gICAgJ2ktbWRpLWV5ZS1vdXRsaW5lJyxcbiAgICAnaS1mbGF0LWNvbG9yLWljb25zLXNhbGVzLXBlcmZvcm1hbmNlJyxcbiAgICAnaS1tZGktZmFjdG9yeScsXG4gICAgJ2ktbWRpLXNhZmUtc3F1YXJlLW91dGxpbmUnLFxuICAgICdpLWVsLXRhc2tzJyxcbiAgICAnaS1lb3MtaWNvbnMtaW90JyxcbiAgICAnaS1tZGktZmluYW5jZScsXG4gICAgJ2ktbWRpLXNlcnZlci1zZWN1cml0eScsXG4gICAgJ2ktbWRpLWFwaScsXG4gICAgJ2ktbWRpLW1pZGRsZXdhcmUnLFxuICAgICdpLW1kaS1hc3RlcmlzaycsXG4gICAgJ2ktbWRpLWxvY2stb3Blbi12YXJpYW50LW91dGxpbmUnLFxuICAgICdpLW1kaS1hcHBsaWNhdGlvbi1pbXBvcnQnLFxuICAgICdpLW1kaS1hcHBsaWNhdGlvbi1icmFja2V0cy1vdXRsaW5lJyxcbiAgICAnaS1tZGktY2xvY2stZmFzdCcsXG4gICAgJ2ktbWRpLWFycm93LWV4cGFuZCcsXG4gICAgJ2ktbWRpLXBpcGUnLFxuICAgICdpLW1kaS1jaGFydC1hcmVhc3BsaW5lJyxcbiAgICAnaS1tZGktYnJhaW4nLFxuICAgICdpLW1kaS10b29scycsXG4gICAgJ2ktbWRpLWNsb2NrJyxcbiAgICAnaS1tZGktY29uc29sZScsXG4gICAgJ2ktbWRpLW1pbnVzJyxcbiAgICAnaS1tZGktbGlnaHRidWxiJyxcbiAgICAnaS1meGVtb2ppLWxpZ2h0bmluZ21vb2QnLFxuICAgICdpLWxvZ29zLWRlbm8nLFxuICAgICdpLWxvZ29zLXR5cGVzY3JpcHQtaWNvbicsXG4gICAgJ2ktZW1vamlvbmUtZmxhZy1mb3ItZXVyb3BlYW4tdW5pb24nLFxuICAgICdpLW1kaS1wYWNrYWdlLXZhcmlhbnQtY2xvc2VkJyxcbiAgICAnaS1tZGktdmlldy1kYXNoYm9hcmQnLFxuICAgICdpLW1kaS12aWV3LWRhc2hib2FyZC1vdXRsaW5lJyxcbiAgICAnaS1tZGktYm9vay1vcGVuLXBhZ2UtdmFyaWFudCcsXG4gICAgJ2ktbWRpLWFjY291bnQtZ3JvdXAtb3V0bGluZScsXG4gICAgJ2ktbWRpLWNoZWNrJyxcbiAgICAnaS1tZGktY2xvc2UnLFxuICAgICdpLW1kaS1jbG9jay1vdXRsaW5lJyxcbiAgICAnaS1tZGktYWxsLWluY2x1c2l2ZScsXG4gICAgJ2ktbWRpLXNoYXBlJyxcbiAgICAnaS1tZGktc2VydmVyLW9mZicsXG4gICAgJ2ktbWRpLWJ1ZycsXG4gICAgJ2ktbWRpLWdpdCcsXG4gICAgJ2ktbWRpLWxpZ2h0bmluZy1ib2x0JyxcbiAgICAnaS1tZGktc2hhcmUtdmFyaWFudCcsXG4gICAgJ2ktaWMtYmFzZWxpbmUtaHViJyxcbiAgICAnaS1pYy1vdXRsaW5lLWZlZWRiYWNrJyxcbiAgICAnaS1tZGktcG9saWNlLWJhZGdlJyxcbiAgICAnaS1tZGktY2hlY2stY2lyY2xlLW91dGxpbmUnLFxuICAgICdpLW1kaS1zZWN1cml0eScsXG4gICAgJ2ktbWRpLWdyYXBoJyxcbiAgICAnaS1tZGktbm9kZWpzJyxcbiAgICAnaS1sb2dvcy1mcmVzaCcsXG4gICAgJ2ktbWRpLWtleScsXG4gICAgJ2ktbWRpLWNvbnNvbGUnLFxuICAgICdpLWVtb2ppb25lLWZsYWctZm9yLWV1cm9wZWFuLXVuaW9uJyxcbiAgICAnaS1tZGktcGxheS1jaXJjbGUnLFxuICAgICdpLW1kaS1oZWFkLWxpZ2h0YnVsYi1vdXRsaW5lJyxcbiAgICAnaS10YWJsZXItcGFja2FnZXMnLFxuICAgICdpLWJ4LXRpbWVyJyxcbiAgICAnaS1tZGktaGV4YWdvbi1tdWx0aXBsZScsXG4gICAgJ2ktbWRpLWhleGFnb24tbXVsdGlwbGUtb3V0bGluZScsXG4gICAgJ2ktbWRpLXdpZGdldHMnLFxuICAgICdpLW1kaS1zZW5kJyxcbiAgICAnaS1tZGktc2VuZC1jbG9jaycsXG4gICAgJ2ktbWRpLWRhdGFiYXNlLWxvY2snLFxuICAgICdpLW1kaS1taWNyb3NvZnQtdmlzdWFsLXN0dWRpby1jb2RlJyxcbiAgICAnaS1tZGktdGFibGUnLFxuICAgICdpLW1kaS1idXR0b24tcG9pbnRlcicsXG4gICAgJ2ktbWRpLWxhYmVsJyxcbiAgICAnaS1tZGktdGhlbWUtbGlnaHQtZGFyaycsXG4gICAgJ2ktbWRpLWZvcm0tZHJvcGRvd24nLFxuICAgICdpLW1kaS1zaGFwZScsXG4gICAgJ2ktbWRpLWJ1dHRvbi1wb2ludGVyJyxcbiAgICAnaS1tZGktZm9ybWF0LXRpdGxlJyxcbiAgICAnaS1tZGktbGluaycsXG4gICAgJ2ktbWRpLWxvYWRpbmcnLFxuICAgICdpLW1kaS1pbmZvcm1hdGlvbicsXG4gICAgJ2ktbWRpLWFsZXJ0LWNpcmNsZScsXG4gICAgJ2ktbWRpLWFsZXJ0LWJveCcsXG4gICAgJ2ktbWRpLWNoZWNrYm94LW1hcmtlZCcsXG4gICAgJ2ktbWRpLWZvcm1hdC1saXN0LWdyb3VwJyxcbiAgICAnaS1tZGktZm9ybS10ZXh0Ym94JyxcbiAgICAnaS1tZGktY2FyZCcsXG4gICAgJ2ktbWRpLWNhbGVuZGFyJyxcbiAgICAnaS1tZGktYXBwbGUta2V5Ym9hcmQtY29tbWFuZCcsXG4gICAgJ2ktbWRpLWFycm93LWNvbGxhcHNlLXZlcnRpY2FsJyxcbiAgICAnaS1tZGktY2FsZW5kYXItcmFuZ2UnLFxuICAgICdpLW1kaS1yYWRpb2JveC1tYXJrZWQnLFxuICAgICdpLW1kaS1mb3JtLXNlbGVjdCcsXG4gICAgJ2ktbWRpLXRvZ2dsZS1zd2l0Y2gnLFxuICAgICdpLW1kaS1jYXJkLXRleHQnLFxuICAgICdpLW1kaS12aWV3LWdyaWQnLFxuICAgICdpLW1kaS12aWV3LXNlcXVlbnRpYWwnLFxuICAgICdpLW1kaS1jYXJkLXNlYXJjaCcsXG4gICAgJ2ktbWRpLXdpbmRvdy1tYXhpbWl6ZScsXG4gICAgJ2ktbWRpLWFzcGVjdC1yYXRpbycsXG4gICAgJ2ktbWRpLWFjY291bnQtY2lyY2xlJyxcbiAgICAnaS1tZGktZm9ybS10ZXh0YXJlYScsXG4gICAgJ2ktbWRpLXRvb2x0aXAtdGV4dCcsXG4gICAgJ2ktbWRpLXBvd2VyLXN0YW5kYnknLFxuICAgICdpLW1kaS10b29sdGlwJyxcbiAgICAnaS1tZGktZm9ybWF0LXRleHQnLFxuICAgICdpLW1kaS1jdXJzb3ItbW92ZScsXG4gICAgJ2ktbWRpLWZvcm1hdC12ZXJ0aWNhbC1hbGlnbi1jZW50ZXInLFxuICAgICdpLW1kaS10aGVtZS1saWdodC1kYXJrJyxcbiAgICAnaS1jYXJib24tcHJvZ3Jlc3MtYmFyJyxcbiAgICAnaS1tZGktcmF5LXZlcnRleCcsXG4gICAgJ2ktbWRpLXZpZXctY29tcGFjdCcsXG4gICAgJ2ktbWRpLXZpZXctc3BsaXQtdmVydGljYWwnLFxuICAgICdpLW1kaS12aWV3LWdhbGxlcnktb3V0bGluZScsXG4gICAgJ2ktbWRpLXBpY3R1cmUtaW4tcGljdHVyZS1ib3R0b20tcmlnaHQnLFxuICAgICdpLW1kaS12aWV3LWhlYWRsaW5lJyxcbiAgXSxcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1MsU0FBUyx5QkFBeUI7QUFDeFUsU0FBUyxXQUFBQSxnQkFBZTtBQUN4QixTQUFTLHFCQUFxQjtBQUM5QixTQUE2QixvQkFBb0I7QUFDakQsU0FBUyxtQkFBbUI7QUFDNUIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywwQkFBMEI7QUFFbkMsT0FBTyxZQUFZO0FBRW5CLFNBQVMscUJBQXFCOzs7QUNWcVIsSUFBTSxPQUFPO0FBQUEsRUFDOVQsT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUFBLEVBQ2IsT0FBTztBQUFBLEVBQ1AsS0FBSztBQUFBLEVBQ0wsUUFBUTtBQUFBLEVBQ1IsTUFBTTtBQUFBO0FBQUEsRUFFTixXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixZQUFZO0FBQUEsRUFDWixhQUFhO0FBQUEsRUFDYixhQUFhO0FBQUEsRUFDYixjQUFjO0FBQUEsRUFDZCxZQUFZO0FBQ2Q7QUFFTyxJQUFNLE9BQU87QUFBQSxFQUNsQixHQUFHO0FBQUEsRUFDSCxPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFDYixPQUFPO0FBQ1Q7OztBQ3RCZ1QsU0FBUyxvQkFBb0I7QUFDN1UsU0FBUyxlQUFlO0FBRHhCLElBQU0sbUNBQW1DO0FBSWxDLElBQU0sT0FBcUI7QUFBQTtBQUFBLEVBRWhDLENBQUMsVUFBVTtBQUFBLElBQ1QsTUFBTTtBQUFBLElBQW1CLE9BQU87QUFBQSxFQUNsQyxHQUFHLGFBQWEsUUFBUSxrQ0FBVywrQkFBK0IsR0FBRyxPQUFPLENBQUM7QUFBQTtBQUFBLEVBRzdFLENBQUMsVUFBVTtBQUFBLElBQ1QsTUFBTTtBQUFBO0FBQUEsSUFFTixPQUFPO0FBQUEsSUFDUCxvQkFBb0I7QUFBQTtBQUFBO0FBQUEsSUFHcEIsU0FBUztBQUFBLEVBQ1gsQ0FBQztBQUFBO0FBQUE7QUFBQTtB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LElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFB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QUFBQSxNQUN6QyxFQUFFLE1BQU0sV0FBVyxNQUFNLEtBQUssV0FBVztBQUFBLElBQzNDO0FBQUEsSUFFQSxTQUFTO0FBQUEsSUFFVCxRQUFRLEVBQUUsV0FBVyxtQkFBZSxvQkFBSSxLQUFLLEdBQUUsWUFBWSxDQUFDLFNBQVM7QUFBQSxFQUN2RTtBQUFBLEVBRUEsTUFBTTtBQUFBLElBQ0osU0FBUztBQUFBLE1BQ1AsV0FBVztBQUFBLFFBQ1QsU0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLFFBQ0EsS0FBSztBQUFBLFFBQ0wsYUFBYTtBQUFBLE1BQ2YsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BWUQsT0FBTyxFQUFFLEdBQUcsYUFBYSxDQUFDO0FBQUE7QUFBQSxJQUc1QjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxPQUFPLHdDQUFlLENBQUM7QUFBQSxRQUNsRCxXQUFXLGNBQWMsSUFBSSxJQUFJLFlBQVksd0NBQWUsQ0FBQztBQUFBLE1BQy9EO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLEVBQ3ZCO0FBQUE7QUFBQTtBQUFBLEVBSUEsZUFBZSxDQUFDLEdBQUcsSUFBSSxFQUFFLFNBQVMsTUFBTTtBQUN0QyxRQUFJLENBQUMsa0JBQWtCLEtBQUssRUFBRSxHQUFHO0FBQy9CLFlBQU0sS0FBSztBQUFBO0FBQUEsUUFFVCxLQUFLLFNBQVMsYUFBYSxRQUFRLHVCQUF1QixJQUFJO0FBQUEsUUFDOUQsU0FBUyxTQUFTO0FBQUEsTUFDcEIsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQUEsRUFFQSxVQUFVLE9BQU8sRUFBRSxPQUFPLE1BQU07QUFDOUIsVUFBTSxVQUFVLElBQUksY0FBYyxFQUFFLFVBQVUsb0JBQW9CLENBQUM7QUFDbkUsVUFBTSxjQUFjLGtCQUFrQkMsU0FBUSxRQUFRLGFBQWEsQ0FBQztBQUNwRSxZQUFRLEtBQUssV0FBVztBQUN4QixVQUFNLFFBQVEsVUFBUSxRQUFRLE1BQU0sSUFBSSxDQUFDO0FBQ3pDLFlBQVEsSUFBSTtBQUNaLFVBQU0sSUFBSSxRQUFRLENBQUFBLGFBQVcsWUFBWSxHQUFHLFVBQVVBLFFBQU8sQ0FBQztBQUFBLEVBQ2hFO0FBQ0YsQ0FBQyxDQUFDOyIsCiAgIm5hbWVzIjogWyJyZXNvbHZlIiwgInJlc29sdmUiXQp9Cg==
