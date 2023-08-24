<script setup lang="ts">
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import Figure from '../Figure.vue'
import type { Section } from '../types'

const {
  inverted,
  topic,
  title,
  description,
  items,
  image,
} = defineProps<Section>()
</script>

<template>
  <section :class="{ inverted }">
    <div class="container">
      <article>
        <h3 v-if="topic" class="topic" v-html="topic" />
        <h2 v-if="title" v-html="title" />
        <p v-if="description" class="mb-6" v-html="description" />
        <!-- :class="{ 'text-right flex-row-reverse': inverted }" -->
        <article
          v-for="(item, i) in items"
          :key="`article-${i}`"
          class="flex flex-start gap-5"
        >
          <div>
            <div v-if="item.icon" :class="`w-6 h-6 ${item.icon}`" />
          </div>
          <div>
            <h4 v-if="item.title" v-html="item.title" />
            <p v-if="item.description" v-html="item.description" />
          </div>
        </article>
        <VPLink v-if="link" v-bind="link">
          {{ link.text }}
        </VPLink>
      </article>

      <slot>
        <Figure
          v-if="image"
          v-bind="{ ...image, alt: image.alt || title }"
        />
      </slot>
    </div>
  </section>
</template>

<style scoped>
@import './section.css';
section {
  padding: 72px 32px;
  margin: 0px auto;
}

.container {
  display: grid;
  gap: 5%;
  grid-template-columns: 1fr;
  max-width: 1200px; /* override 1024px */
  min-height: 350px;
}

.topic {
  color: var(--vp-c-secondary);
  text-transform: uppercase;
  font-size: 14px;
  margin-bottom: 12px;
}

article {
  color: var(--vp-c-text-2);
  padding: 12px 0px;
  max-width: calc(100vw - 32px - 32px); /* required to prevent overflow on small screens */
}
article + article {
  border-top: 1px solid var(--vp-c-text-4);
  padding-top: 16px;
}

article p {
  font-size: 14px;
}

h4 {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}

a {
  display: inline-block;
  margin-top: 16px;
  font-weight: 400;
  font-size: 15px;
  color: var(--vp-c-primary);
}

a:hover {
  cursor: pointer;
  opacity: 0.75;
}

/* figure */

:deep(figure) {
  display: grid;
  /* place-items: center; */
  position: relative;
}

:deep(figure picture) {
  display: grid;
  place-items: center;
}

:deep(figure img),
:deep(figure video) {
  position: relative;
  margin: auto;
   /* max-width: unset; must reset */
  /* height: 465px; */
  height: 350px;
  overflow: visible;
}

@media (min-width: 768px) {
  section {
    padding: 32px 32px; /* 48px * 1.5 */
    margin: 0px auto;
  }

  .container {
    gap: 10%;
    grid-template-columns: 1fr 1fr;
  }

  .inverted :deep(figure) {
    grid-row: 1; /* place figure in first column (left or up) */
  }

  :deep(figure img),
  :deep(figure video) {
    position: absolute;
  }

  .inverted :deep(figure img),
  .inverted :deep(figure video) {
    left: unset;
    right: 24px; /* adds some padding */
  }
}
</style>
