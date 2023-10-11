---
aside: false
---

<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'

const items = en.templates.filter((item) => item.uid.startsWith('api-'))
</script>

# Use Cases

## APIs

<SectionDocsCards :items="items" />
