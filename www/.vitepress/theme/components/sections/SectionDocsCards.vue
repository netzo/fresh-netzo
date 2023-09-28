<script setup lang="ts">
import { useRouter } from 'vitepress'
import type { SectionDocCard } from '../types'

const { items, compact = false } = defineProps<{ items: SectionDocCard[]; compact?: boolean }>()

const router = useRouter()
</script>

<template>
  <div v-if="items" class="w-full my-12">
    <div
      class="grid gap-y-8 gap-x-2"
      :class="compact
        ? 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4'
        : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'"
    >
      <div
        v-for="(item, i) in items"
        :key="`section-docs-cards-${item.uid}-${i}`"
        v-bind="item"
        class="section-docs-card flex flex-col max-w-sm bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-#161618 dark:border-#161618 dark:hover:bg-#1d1d1f"
        :class="{ 'cursor-pointer': item.href }"
        @click="() => item.href && router.go(item.href)"
      >
        <slot
          v-if="$slots.image || item.display?.icon || item.display?.src"
          v-bind="item.display"
          name="image"
        >
          <div v-if="!!item.display?.icon" :class="item.display.icon" />
          <img v-else-if="!!item.display?.src" class="w-full rounded-t-lg" :src="item.display.src" :alt="item.title">
        </slot>
        <div class="pa-4">
          <h5
            class="my-1 font-bold tracking-tight text-gray-900 dark:text-white"
            v-html="item.title"
          />
          <p
            class="!my-0 line-clamp-3 font-normal text-xs text-gray-700 dark:text-gray-400"
            style="line-height: unset;"
            v-html="item.description"
          />
        </div>
      </div>
    </div>
  </div>
</template>
