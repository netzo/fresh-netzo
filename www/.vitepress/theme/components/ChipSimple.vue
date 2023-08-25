<script setup lang="ts">
defineProps<{
  chip: 'soon' | 'alpha' | 'beta' | 'new' | string
}>()

const chipsEnum = {
  soon: { style: 'color: var(--vp-c-white); background-color: var(--vp-c-text-2);' },
  alpha: { style: 'color: var(--vp-c-white); background-color: var(--vp-c-secondary);' },
  beta: { style: 'color: var(--vp-c-white); background-color: var(--vp-c-primary);' },
  new: { style: 'color: var(--vp-c-white); background-color: var(--vp-c-accent);' },
}

const getChipProps = (chip: string): string =>
  chipsEnum?.[chip] ?? ({ style: 'color: var(--vp-c-white); background-color: var(--vp-c-primary);' })
</script>

<template>
  <span v-bind="getChipProps(chip)" v-html="chip" />
</template>

<style scoped>
span {
  height: 16px;
  line-height: 16px;
  font-size: 8px;
  font-weight: 700;
  padding: 0px 4px;
  margin-left: 8px;
  border-radius: 4px;
  text-transform: uppercase;
}
</style>
