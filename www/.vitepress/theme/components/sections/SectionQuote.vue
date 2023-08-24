<script setup lang="ts">
import type { Section } from '../types'

const {
  title = 'Time to ship that idea',
  description = '',
  image,
  name = '',
} = defineProps<Section & { name: string }>()
</script>

<template>
  <div class="!max-w-135 px-6 mx-auto pt-14 py-4 grid grid-cols-1 gap-8 text-center">
    <q class="text-2xl" v-html="description" />
    <div class="mx-auto">
      <span class="flex flex-row items-center">
        <img v-bind="image" class="h-12" loading="lazy">
        <div class="flex flex-col pl-8"><span class="font-semibold" v-html="name" />
          <span class="text-sm" v-html="title" />
        </div>
      </span>
    </div>
  </div>
</template>

<style scoped>
@import './section.css';
</style>
