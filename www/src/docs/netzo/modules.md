---
aside: false
---

<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
</script>

# `netzo/modules`

> [`https://deno.land/x/netzo/modules`](https://deno.land/x/netzo/modules)

**`netzo/modules` provide essential functionality to add to your projects a plug-and-play fashion.** Modules are framework-agnostic but only work when deployed to Netzo, making them different to [`netzo/ui/plugins`](/docs/netzo/ui/plugins) which are specific to [Fresh](https://fresh.deno.dev/).

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
