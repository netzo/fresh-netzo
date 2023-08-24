---
aside: false
---

<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
</script>

# `netzo/ui/plugins`

> [`https://deno.land/x/netzo/ui/plugins`](https://deno.land/x/netzo/ui/plugins)

**The `netzo/ui/plugins` module exports all [Plugins](https://fresh.deno.dev/docs/concepts/plugins) for the [Fresh](https://fresh.deno.dev) framework.** Plugins can dynamically add new functionality to Fresh without exposing significant complexity to the user. Users can add plugins by importing and initializing them in the `start` function of the entrypoint file e.g. `main.ts`.

Apart from first-party plugins, and those provided by `netzo/ui/plugins`, you can also search for community plugins or [create your own](https://fresh.deno.dev/docs/concepts/plugins).

<SectionDocsCards :items="en.plugins" compact>
  <template #image="{ src, title }">
    <img
      class="mt-5 ml-4 max-w-14 max-h-14"
      v-bind="{ src, title }"
    >
  </template>
</SectionDocsCards>
