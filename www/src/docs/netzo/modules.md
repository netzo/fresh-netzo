---
aside: false
---

<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
</script>

# `netzo/modules`

> [`https://deno.land/x/netzo/modules`](https://deno.land/x/netzo/modules)

**`netzo/modules` exports all official modules to provide essential functionality to add to your projects a plug-and-play fashion.** The Modules page will display a list of all `modules` registered in the `netzo.config` file of the project. Modules augment ordinary [Fresh](https://fresh.deno.dev/) plugins to integrate with Netzo to boost developer experience and simplify configuration.

Apart from the core modules listed below, you can always [create custom modules](/docs/platform/projects/modules#custom-modules) by registering them in `netzo.config`.

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