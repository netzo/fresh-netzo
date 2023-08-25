<script setup lang="ts">
import type { ListItem } from '../types'

const { icon, text } = defineProps<ListItem>()
</script>

<template>
  <li class="flex flex-row gap-2">
    <span v-if="icon" class="min-w-24px">
      <div :class="`mt-3px mr-1 ${icon}`" />
    </span>
    <span v-html="text" />
  </li>
</template>
