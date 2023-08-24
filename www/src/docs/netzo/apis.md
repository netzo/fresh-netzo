---
aside: false
---

<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
</script>

# `netzo/apis`

> [`https://deno.land/x/netzo/apis`](https://deno.land/x/netzo/apis)

**The `netzo/apis` module exports all the API integrations currently supported. Each API integration is a function that returns a typed client for the API.** You can always use the generic [`rest`](#rest) function directly to create a client for custom APIs or APIs that are not yet supported.

<SectionDocsCards :items="en.apis" compact>
  <template #image="{ src, title }">
    <img
      class="mt-5 ml-4 max-w-14 max-h-14"
      v-bind="{ src, title }"
    >
  </template>
</SectionDocsCards>
