<script setup lang="ts">
import type { Section as ISection } from '../types'
import Section from './Section.vue'

const {
  inverted,
  topic,
  title,
  description,
  buttons,
  items,
  image,
  link,
} = defineProps<ISection>()
</script>

<template>
  <Section
    v-bind="{ inverted, topic, title, description, buttons, items, image, link }"
    class="container"
  >
    <div class="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10">
      <article
        v-for="(item, i) in items"
        :key="`card-item-${i}`"
        class="mt-12 flex flex-start gap-5 pa-4 border-0 rounded-1"
      >
        <div v-if="item.icon">
          <div :class="`w-8 h-8 ${item.icon}`" />
        </div>
        <div>
          <h3 v-if="item.title" v-html="item.title" />
          <p v-if="item.description" v-html="item.description" />
          <div class="flex mt-2">
            <span
              v-for="(chip, i) in item.typeChips"
              :key="`card-item-${i}`"
              class="chip-sm text-primary-500"
              v-html="chip"
            />
            <span
              v-for="(chip, i) in item.chips"
              :key="`card-item-${i}`"
              class="chip-sm"
              v-html="chip"
            />
          </div>
        </div>
      </article>
    </div>
  </Section>
</template>

<style scoped>
@import './section.css';

article {
  color: var(--vp-c-text-2);
}

article:hover,
article:hover p {
  color: var(--vp-c-text-1);
}
</style>
