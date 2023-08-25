<script setup lang="ts">
import ListItem from '@theme/components/list/ListItem.vue'
import ButtonCta from '@theme/components/buttons/ButtonCta.vue'
import type { Section } from '../types'

const {
  title,
  items = [],
  buttons,
} = defineProps<Section>()
</script>

<template>
  <div class="w-screen py-12 px-6 text-left font-semibold bg-primary-500 text-white">
    <section class="container">
      <aside>
        <h2 v-html="title" />
        <ul v-if="items.length" class="flex flex-col !pl-0 gap-2">
          <ListItem
            v-for="(item, i) in items"
            :key="`banner-cta-${i}`"
            icon="i-mdi-check-circle-outline text-secondary-500"
            v-bind="item"
          />
        </ul>
      </aside>
      <div v-if="buttons && buttons.length" class="pt-12 sm:pt-0">
        <ButtonCta :button="buttons[0]" />
      </div>
    </section>
  </div>
</template>

<style scoped>
section {
  margin: 0 auto !important;
  max-width: 900px;
  display: grid;
  place-items: center;
  grid-template-columns: 1fr;
  height: 100%;
}

h2 {
  margin-bottom: 24px;
  text-align: left;
  font-size: 32px;
  font-weight: 600;
  line-height: 1.25;
}

:deep(.vp-button) {
  color: var(--vp-c-primary) !important;
  background-color: var(--vp-c-white) !important;
}

@media (min-width: 640px) {
  section {
    max-width: 592px;
    margin: 0 auto;
    margin-bottom: 12px;
    gap: 5%;
  }

  .container {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 768px) {
  section {
    max-width: 900px;
    margin: 0px auto;
    margin-bottom: 12px;
  }
}
</style>
