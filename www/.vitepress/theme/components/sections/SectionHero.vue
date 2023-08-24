<script setup lang="ts">
import ChipSimple from '@theme/components/ChipSimple.vue'
import ButtonCta from '@theme/components/buttons/ButtonCta.vue'
import Figure from '@theme/components/Figure.vue'
import type { SectionHero } from '../types'

const {
  topic,
  chip,
  title,
  description,
  buttons,
  image,
} = defineProps<SectionHero>()
</script>

<template>
  <section class="min-h-[calc(100vh-64px-68px)] grid place-items-center dots-bottom">
    <slot name="top" />

    <slot>
      <div class="container-wide grid grid-cols-1 xl:grid-cols-2 gap-10 text-center xl:text-left">
        <div class="container">
          <div class="flex w-full justify-center xl:justify-start">
            <h3 v-if="topic" v-html="topic" />
            <ChipSimple v-if="chip" :chip="chip" />
          </div>
          <h1 v-if="title" v-html="title" />
          <p v-if="description" v-html="description" />
          <div v-if="buttons" class="actions flex w-full justify-center xl:justify-start">
            <ButtonCta v-for="(button, i) in buttons" :key="`button-cta-${i}`" :button="button" />
          </div>
        </div>

        <slot>
          <Figure v-if="image" v-bind="image" class="my-auto mb-12 md:mb-16 xl:mb-0 -mx-4 lg:mx-0 max-w-4xl" />
        </slot>
      </div>
    </slot>

    <slot name="bottom" />
  </section>
</template>

<style scoped>
@import './section.css';

section {
  padding: 48px 32px;
}

section h1 {
  max-width: 700px;
  font-size: 48px;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -1.5px;
  margin: 6px auto;
}

section h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-primary);
  text-transform: uppercase;
  margin-bottom: 6px;
}

section p {
  max-width: 900px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
  font-size: 20px;
  margin: 24px auto 40px;
}

@media (max-width: 960px) {
  section h3 {
    font-size: 18px;
  }

  section h1 {
    font-size: 52px;
    letter-spacing: -0.5px;
  }

  section p {
    font-size: 18px;
    margin-bottom: 32px;
  }
}

@media (max-width: 768px) {
  section {
    padding: 64px 32px;
  }

  section h3 {
    font-size: 16px;
  }

  section h1 {
    font-size: 44px;
    letter-spacing: -0.5px;
  }
}

@media (max-width: 576px) {
  section {
    padding: 32px;
  }

  section h3 {
    font-size: 15px;
  }

  section h1 {
    font-size: 40px;
    letter-spacing: -0.5px;
  }

  section p {
    font-size: 16px;
    margin: 18px 0 30px;
  }
}

@media (max-width: 480px) {
  section h3 {
    font-size: 13px;
  }

  section h1 {
    font-size: 30px;
  }

  section p {
    font-size: 14px;
  }
}
</style>
