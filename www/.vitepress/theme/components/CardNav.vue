<script setup lang="ts">
import type { CardNav } from './types'

const {
  title,
  description,
  icon,
  href,
} = defineProps<CardNav>()

const emit = defineEmits(['click'])
</script>

<template>
  <a
    :href="href"
    class="grid rounded h-full cursor-pointer b-1 px-2 py-4"
    @click="emit('click', $event)"
  >
    <div v-if="icon" :class="`my-auto mx-auto w-8 h-8 ${icon}`" />
    <h3
      v-if="title"
      class="!mt-3 font-medium text-base leading-6 text-center"
      v-html="title"
    />
    <p
      v-if="description"
      class="mb-0 font-normal text-sm text-center"
      v-html="description"
    />
  </a>
</template>

<style scoped>
.grid:hover {
  border: 1px solid var(--vp-c-primary)
}

:deep([href]):hover {
  color: var(--vp-c-primary);
}
</style>
