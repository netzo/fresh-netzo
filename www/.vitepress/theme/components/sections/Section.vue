<script setup lang="ts">
import ButtonCta from '@theme/components/buttons/ButtonCta.vue'
import Figure from '../Figure.vue'
import type { Section } from '../types'

const {
  inverted,
  topic,
  title,
  description,
  buttons,
  items,
  image,
  link,
} = defineProps<Section>()
</script>

<template>
  <section class="container">
    <slot name="top" />

    <h3 v-if="topic" class="topic" v-html="topic" />
    <h2 v-if="title" v-html="title" />

    <Figure v-if="image" v-bind="{ ...image, src: image.src, alt: image.alt || title }" />

    <p v-if="description" class="description" v-html="description" />

    <slot v-bind="{ inverted, topic, title, description, buttons, items, image, link }" />

    <slot name="actions">
      <div v-if="buttons && buttons.length" class="actions">
        <ButtonCta
          v-for="(button, i) in buttons"
          :key="`button-cta-${topic}-${i}`"
          :button="button"
        />
      </div>
    </slot>

    <slot name="bottom" v-bind="{ inverted, topic, title, description, buttons, items, image, link }" />
  </section>
</template>

<style scoped>
@import './section.css';

h2,
.description {
  text-align: center;
}

figure {
  margin: auto;
  max-height: 500px;
}

.topic {
  text-align: center;
  color: var(--vp-c-secondary);
  text-transform: uppercase;
  font-size: 14px;
  margin-bottom: 12px;
}
</style>
