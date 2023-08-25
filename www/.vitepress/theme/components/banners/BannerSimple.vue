<script setup lang="ts">
defineProps({
  text: { type: String, default: '' },
})
</script>

<template>
  <div class="banner">
    <slot>
      <span v-if="text" v-html="text" />
    </slot>
  </div>
</template>

<style scoped>
.banner {
  z-index: var(--vp-z-index-banner);
  box-sizing: border-box;
  width: 100vw;
  text-align: center;
  height: var(--vp-banner-height);
  line-height: var(--vp-banner-height);
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-white);
  background: var(--vp-c-primary);
}

.banner :deep([href]) {
  text-decoration: underline;
}

.banner :deep([href]:hover) {
  cursor: pointer;
  opacity: 0.75;
}
</style>
