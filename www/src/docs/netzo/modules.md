---
aside: false
---

<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
</script>

# `netzo/modules`

> [`https://deno.land/x/netzo/modules`](https://deno.land/x/netzo/modules)

**`netzo/modules` provide essential functionality to add to your projects a plug-and-play fashion.** Modules only work when deployed to Netzo, making them different to [`netzo/plugins`](/docs/netzo/plugins) which are normal [Fresh plugins](https://fresh.deno.dev/) plugins.

<!-- NOTE: pass in 'compact' prop if using with `aside: true` -->
<!-- NOTE: could split into H3 groups via `en.components.filter(...)` -->
<SectionDocsCards :items="en.modules" compact>
  <template #image="{ src, title }">
    <img
      class="mt-5 ml-4 max-w-14 max-h-14"
      v-bind="{ src, title }"
    >
  </template>
</SectionDocsCards>

## Installation

Adding a module is as simple as registering it in the `netzo.config` file of the project. You can do this by running the following command:

::: tabs
== Manual
Register the module `netzo.config.(ts|js)`
```ts
export default defineNetzoConfig({
  modules: {
    // first-party:
    'auth': { /* config */ },
    'db': { /* config */ },
    // custom third-party:
    'unocss': {
      name: 'UnoCSS',
      avatar: 'https://api.iconify.design/mdi:hexagon.svg?color=%230080ff',
      // ui: '/modules/unocss/ui',
      fresh: {
        plugins: [
          unocss({ /* config */ }),
        ]
      }
    },
    // custom inline:
    'my-custom-plugin': {
      name: 'My Custom Plugin',
      avatar: 'https://api.iconify.design/mdi:hexagon.svg?color=%230080ff',
      plugins: [
        freshPlugin1({ /* config */ }),
        freshPlugin2({ /* config */ })
      ]
    }
  }
})
```
== CLI (soon)
Run the following command in your terminal.
```sh
netzo add module <moduleName>
```
:::