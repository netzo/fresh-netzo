import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { /* DefaultTheme, */ defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import AutoImport from 'unplugin-auto-import/vite'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

// import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'

// import VueDevTools from 'vite-plugin-vue-devtools'
import { SitemapStream } from 'sitemap'
import { ogEN } from './config.og'
import { head } from './config.head'
import { navEN, navES } from './config.nav'
import { sidebarEN, sidebarES } from './config.sidebar'
import { unocssConfig } from './config.unocss'

const links: { url: string; lastmod?: number }[] = [] // used for sitemap.xml generation (see bellow)

export default withMermaid(defineConfig({
  titleTemplate: 'Netzo',
  lastUpdated: true,
  cleanUrls: true,
  srcDir: 'src',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { property: 'og:title', content: ogEN.title }],
    ['meta', { property: 'og:description', content: ogEN.description }],
    ['meta', { property: 'og:image', name: 'image', content: ogEN.image }],
    ['meta', { property: 'og:type', content: ogEN.type }],
    ['meta', { name: 'author', content: ogEN.author }],
    ['meta', { property: 'og:url', content: ogEN.url }],
    ['meta', { name: 'theme-color', content: '#0080ff' }],

    // Twitter
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@netzoio' }],
    ['meta', { property: 'twitter:url', content: ogEN.twitterURL }],
    ['meta', { property: 'twitter:title', content: ogEN.title }],
    ['meta', { property: 'twitter:description', content: ogEN.description }],
    ['meta', { property: 'twitter:image', content: ogEN.image }],
    ...head,
  ],

  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    },
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },

  locales: {
    root: {
      lang: 'en',
      label: '🇺🇸 EN',
      link: '/',
      themeConfig: {
        nav: navEN,
        sidebar: sidebarEN,
      },
    },
    es: {
      lang: 'es',
      label: '🇪🇸 ES',
      link: '/es',
      themeConfig: {
        nav: navES,
        sidebar: sidebarES,
      },
    },
  },

  themeConfig: {
    siteTitle: 'Netzo',
    logo: { light: '/logo.svg', dark: '/logo-dark.svg' },

    editLink: {
      pattern: 'https://github.com/netzo/website/edit/main/src/:path',
      text: 'Suggest changes to this page',
    },

    search: { provider: 'local' },

    socialLinks: [
      { icon: 'discord', link: ogEN.discordURL },
      { icon: 'twitter', link: ogEN.twitterURL },
    ],

    outline: 'deep',

    footer: { copyright: `Copyright © ${new Date().getFullYear()} Netzo` },
  },

  vite: {
    plugins: [
      AutoImport({
        imports: [
          'vue',
          'vue/macros',
          '@vueuse/head',
          '@vueuse/core',
          'vitepress',
        ],
        dts: 'auto-imports.d.ts',
        vueTemplate: true,
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

      Unocss({ ...unocssConfig }),

      // VueDevTools(), // slows down performance
    ],
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('../', import.meta.url)),
        '@theme/': fileURLToPath(new URL('./theme/', import.meta.url)),
      },
    },
  },

  vue: {
    reactivityTransform: true,
  },

  // sitemap generation (at /sitemap.xml)
  // see https://github.com/vuejs/vitepress/issues/520#issuecomment-1234457299
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id)) {
      links.push({
        // you might need to change this if not using clean urls mode
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
        lastmod: pageData.lastUpdated,
      })
    }
  },

  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({ hostname: 'https://netzo.io/' })
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
    sitemap.pipe(writeStream)
    links.forEach(link => sitemap.write(link))
    sitemap.end()
    await new Promise(resolve => writeStream.on('finish', resolve))
  },
}))
