---
aside: false
---

<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
</script>

# `netzo/plugins`

> [`https://deno.land/x/netzo/plugins`](https://deno.land/x/netzo/plugins)

**`netzo/plugins` exports all official plugins to provide essential functionality to add to your projects a plug-and-play fashion.** The Plugins page will display a list of all `plugins` registered in the `netzo.config` file of the project.

Apart from the core plugins listed below, you can always [create custom plugins](#custom-plugins) by registering them in `netzo.config`.

<!-- NOTE: pass in 'compact' prop if using with `aside: false` -->
<!-- NOTE: could split into H3 groups via `en.components.filter(...)` -->
<SectionDocsCards :items="en.plugins" compact>
  <template #image="{ src, title }">
    <img
      class="mt-5 ml-4 max-w-14 max-h-14"
      v-bind="{ src, title }"
    >
  </template>
</SectionDocsCards>

## Adding Plugins

Adding a plugin is as simple as registering it in the `netzo.config` file of the project.

```ts
export default defineNetzoConfig({
  plugins: {
    [uid]: { /* config */ }
  }
})
```

with `uid` being a unique identifier for the plugin.

### Core Plugins

Core plugins are maintained by the Netzo team and are listed under [`netzo/plugins`](/docs/framework/plugins). All core plugins provide sensible defaults to simplify configuration and are modular by design, ensuring they work together seamlessly.

::: tabs
== Manual
Register the plugin `netzo.config.(ts|js)`
```ts
export default defineNetzoConfig({
  plugins: {
    [uid]: { /* config */ }
  }
})
```
== CLI (soon)
Run the following command in your terminal.
```sh
netzo add plugin <uid>
```
== UI (soon)
Coming soon...
:::

### Custom Plugins

Custom plugins can be register in the same way in the `netzo.config` file of the project by passing the requried configuration. Doing so will allow Netzo to display the plugin in the Plugins page.

For example, to register the Fresh plugin [`twind`](https://fresh.deno.dev/docs/examples/using-twind-v1) as a custom plugin in `netzo.config.(ts|js)` and make it available in the Plugins page, you can do the following:

::: tabs
== Manual
Register the plugin `netzo.config.(ts|js)`
```ts
import twindConfig from './twind.config.ts'
import twindPlugin from '$fresh/plugins/twind.ts'

export default defineNetzoConfig({
  plugins: {
    // either direct registration:
    twind: twindPlugin(twindConfig),
    // or passing options (e.g. to customize display in Netzo):
    twind: {
      ...twindPlugin(twindConfig),
      display: {
        avatar: 'https://twind.dev/assets/twind-logo-animated.svg'
      },
      labels: ['category:library', 'category:ui']
    }
  }
})
```
:::
