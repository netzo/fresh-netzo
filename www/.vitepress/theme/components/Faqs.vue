<script setup lang="ts">
import type { Section } from './types'

const {
  items,
} = defineProps<Section>()
</script>

<template>
  <details v-for="(faq, i) in items" :key="`faq-${i}`">
    <summary>
      <div class="py-3" v-html="faq.title" />
    </summary>
    <div v-html="faq.description " />
  </details>
</template>

<style scoped>
details,
summary {
  background-color: var(--vp-c-bg);
  border-radius: 8px;
}

details {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid var(--vp-c-divider-light);
  transition: all .3s;
  text-align: left;
}

details + details {
  margin-top: 12px;
}

details:not([open]):hover {
  border: 1px solid var(--vp-c-divider);
}

details[open] {
  border: 1px solid var(--vp-c-text-1);
}

details:has(:focus-visible) {
  border: 2px solid var(--vp-c-primary);
  border-radius: 8px;
}

details summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  width: 100%;
  height: 100%;
  outline: none;
}

details[open] summary {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}

summary:hover {
  cursor: pointer;
}

details summary > div {
  padding: 20px;
  padding-right: 40px;
  cursor: pointer;
}

details > div {
  padding: 0 20px 20px 20px;
  font-size: 16px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
  text-align: left;
}
</style>
