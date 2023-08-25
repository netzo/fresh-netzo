<script setup lang="ts">
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import en from '@theme/../../locales/en'
</script>

<template>
  <section>
    <h3 class="subtitle">
      {{ en.home.sectionExamples.title }}
    </h3>
    <p v-if="en.home.sectionExamples.description" class="description" v-html="en.home.sectionExamples.description" />

    <div class="grid-card">
      <div v-for="(example, i) in en.home.sectionExamples.items" :key="`use-case-${i}`" class="card">
        <VPLink class="card-text" :href="example.href">
          {{ example.title }}
        </VPLink>
      </div>
    </div>

    <div class="actions">
      <VPLink :href="en.home.sectionExamples.link.href">
        {{ en.home.sectionExamples.link.text }}
      </VPLink>
    </div>
  </section>
</template>

<style scoped>
.subtitle {
  font-size: 24px;
  line-height: 1.25;
  font-weight: 900;
  margin-bottom: 32px;
}

.grid-card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  max-width: 800px;
  gap: 6px 24px;
  margin: 0px auto;
}

@media (max-width: 576px) {
  .grid-card {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(8, 1fr);
  }
}

.card {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid var(--vp-c-divider-light);
  border-radius: 8px;
  transition: all .3s;
  text-align: left;
}

.card .card-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  width: 100%;
  height: 100%;
  outline: none;
}

.card .card-text {
  padding: 20px;
}

.vp-link:hover {
  color: var(--vp-c-primary);
  cursor: pointer;
  opacity: 0.75;
}

.actions {
  margin-top: 24px;
}

.actions .vp-link {
  display: inline-block;
  margin-top: 16px;
  font-weight: 400;
  font-size: 15px;
  color: var(--vp-c-primary);
}

.actions .vp-link:hover {
  cursor: pointer;
  opacity: 0.75;
}

a.vp-link {
  color: unset;
}
</style>
