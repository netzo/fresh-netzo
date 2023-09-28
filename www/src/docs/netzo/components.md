---
aside: false
---

<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
</script>

# `netzo/components`

> [`https://deno.land/x/netzo/components`](https://deno.land/x/netzo/components)

**The `netzo/components` module is a collection of UI components written in [Preact](https://preactjs.com/) (TSX) and built with [Radix UI](https://www.radix-ui.com/) and [UnoCSS](https://unocss.dev/).** This is not a component library. It is a collection of re-usable components that you can copy and paste into your apps.

Pick the components you need, copy and paste the code into your project and customize to your needs. The code is yours. Use this as a reference to customize the components to your needs. Most components and documentation takes heavy inspiration from [shadcn/ui](https://ui.shadcn.com/).

::: details Why a collection of components to copy/paste instead of a library?
This approach gives you full ownership and control over the code, allowing you to decide how the components are built and styled. Start with some sensible defaults, then customize the components to your needs.
:::

<!-- NOTE: pass in 'compact' prop if using with `aside: false` -->
<!-- NOTE: could split into H3 groups via `en.components.filter(...)` -->
<SectionDocsCards :items="en.components" compact>
  <template #image="{ icon, src, title }">
    <div
      class="mt-5 ml-4 w-14 h-14"
      :class="icon"
    />
  </template>
</SectionDocsCards>