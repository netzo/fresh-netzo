<script setup lang="ts">
import BlogPostAuthor from './BlogPostAuthor.vue'

const { page, frontmatter } = useData()
</script>

<template>
  <section>
    <img :src="frontmatter.image" :alt="frontmatter.title">
    <h2 v-if="frontmatter.title" v-html="frontmatter.title" />
    <p
      v-if="frontmatter.date"
      class="date"
      v-html="new Date(frontmatter.date).toDateString()"
    />
    <BlogPostAuthor
      v-for="a in frontmatter.author"
      :key="`author-${a.name}`"
      :author="a"
    />
  </section>
</template>

<style scoped>
section {
  padding-bottom: 42px;
}

img {
  max-height: 250px;
  margin: auto;
}

h2 {
  margin-top: 36px;
  margin-bottom: 24px;
}

p.date {
  margin-top: -12px;
  margin-bottom: 16px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}
</style>
