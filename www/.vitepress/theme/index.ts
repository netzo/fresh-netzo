import type { App } from 'vue'
import { h } from 'vue'
import Theme from 'vitepress/theme'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import {
  defaultConfig as formkitDefaultConfig,
  plugin as formkitPlugin,
} from '@formkit/vue'
// import Banner from './components/banners/Banner.vue'
import ButtonCta from './components/buttons/ButtonCta.vue'
import SvgImage from './components/SvgImage.vue'
import { BUTTONS } from './components/buttons/buttons'

import 'uno.css'
import './styles/index.css'

export default {
  ...Theme,
  Layout() {
    // see https://vitepress.dev/guide/extending-default-theme#layout-slots
    return h(Theme.Layout, null, {
      // 'sidebar-top': () => h(PreferenceSwitch),
      // 'aside-bottom': () => h(VueJobs)
      // 'layout-top': () => h(Banner),
      'nav-bar-content-after': () => h(ButtonCta, { button: BUTTONS['nav-bar-cta'] }),
    })
  },
  enhanceApp({ app }: { app: App }) {
    enhanceAppWithTabs(app)
    app.component('SvgImage', SvgImage)
    app.use(formkitPlugin, formkitDefaultConfig)
  },
}
