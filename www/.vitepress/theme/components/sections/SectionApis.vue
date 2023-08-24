<script setup lang="ts">
import type { Section } from '../types'
import en from '~/locales/en.js'

const {
  topic = '',
  title = 'Connect <span class="text-primary-500">APIs</span> with a few lines of code',
  description = '',
} = defineProps<Section>()
</script>

<template>
  <div class="w-screen">
    <!-- <section class="container text-center">
      <h3 v-if="topic" class="topic" v-html="topic" />
      <h2 v-if="title" v-html="title" />

      <p v-if="description" v-html="description" />
    </section> -->

    <!-- NOTE: animation requires iterating twice -->
    <div class="section-apis-wrapper">
      <div
        v-for="(_, i) in [0, 1]"
        :key="`section-apis-${i}`"
        class="section-apis"
      >
        <a
          v-for="(item, i) in en.apis"
          :key="`section-apis-${item.uid}-${i}`"
          :href="item.href"
          target="_blank"
          class="mx-3"
        >
          <img v-bind="{ ...item, alt: item.alt ?? item.title, class: item.class ? `pa-3 ${item.class}` : 'pa-3' }">
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './section.css';

.section-apis a {
  display: grid;
  place-items: center;
}

.section-apis a:hover {
  cursor: pointer;
}

.section-apis img {
  display: block;
  max-width: 100px;
  max-height: 60px;
  margin: 0 1.2vw;
  justify-content: center;
}

/* .dark .section-apis img {
  filter: grayscale(1) invert(1);
} */

.section-apis img:hover {
  filter: brightness(1.3);
}

/* animation (see https://codepen.io/marknotton/pen/NWqwqqj) */

.section-apis-wrapper {
  /* border-top: 1px solid var(--vp-c-divider-light); */
  /* border-bottom: 1px solid var(--vp-c-divider-light); */
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  display: flex;
  width: 100vw;
  left: 0;
  right: 0;
}

.section-apis-wrapper .section-apis {
  display: flex;
  position: relative;
  animation: marquee 100s linear infinite;
  justify-content: space-around;
}

.section-apis-wrapper:hover .section-apis {
  animation-play-state: paused;
}

.section-apis-wrapper:before,
.section-apis-wrapper:after {
  content: "";
  position: absolute;
  width: 100px;
  height: 100px;
  z-index: -1;
  left: 0;
  top: 0;
  background: linear-gradient(to right, var(--vp-c-bg), rgba(0, 0, 0, 0) 80px, rgba(0, 0, 0, 0) calc(100% - 80px), var(--vp-c-bg));
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
 }
  100% {
    transform: translateX(-100%);
 }
}
</style>
