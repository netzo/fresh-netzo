<script setup lang="ts">
defineProps({
  author: { type: Object, required: true },
})
</script>

<template>
  <a
    class="author"
    :href="author.href"
    target="_blank"
    rel="noopnener noreferrer"
  >
    <img
      :src="author.avatar"
      :alt="author.name"
      class="avatar"
    >
    {{ author.name }}
  </a>
</template>

<style scoped>
p.author {
  color: var(--vp-c-text-2);
  font-size: 14px;
  margin-bottom: 6px;
}

.author {
  display: flex;
  width: max-content;
  border-radius: 10px;
  font-size: 14px;
}

.author:hover {
  opacity: 0.90;
}

.author img {
  border-radius: 100%;
  height: 20px;
  margin-right: 12px;
}

a:not(:hover) {
  color: var(--vp-c-text-2);
}

:deep(a[href]):hover {
  color: var(--vp-c-primary);
}

.author + .author {
  margin-top: 6px;
}
</style>
