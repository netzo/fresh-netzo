<script setup lang="ts">
import ChipSimple from '@theme/components/ChipSimple.vue'
import ButtonCta from '@theme/components/buttons/ButtonCta.vue'
import Figure from '@theme/components/Figure.vue'
import type { SectionHeroSimple } from '../types'

const {
  topic,
  chip,
  title,
  description,
  buttons,
  image,
} = defineProps<SectionHeroSimple>()
</script>

<template>
  <section class="!text-center">
    <div class="container">
      <div class="flex justify-center items-center w-full">
        <h3 v-if="topic" v-html="topic" />
        <ChipSimple v-if="chip" :chip="chip" />
      </div>
      <h1 v-if="title" v-html="title" />
      <p v-if="description" v-html="description" />
      <div v-if="buttons" class="actions">
        <ButtonCta v-for="(button, i) in buttons" :key="`button-cta-${i}`" :button="button" />
      </div>
    </div>

    <slot>
      <Figure v-if="image" v-bind="image" class="my-12 mx-auto max-w-1100px" />
    </slot>
  </section>
</template>

<style scoped>
@import './section.css';

section {
  padding-bottom: 48px 24px 0px;
}

section h1 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 24px;
}

section h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-primary);
  text-transform: uppercase;
  margin-bottom: 6px;
}
</style>
