<script setup lang="ts">
import BannerCta from '@theme/components/banners/BannerCta.vue'
import Section from '@theme/components/sections/Section.vue'
// import BlogHero from './BlogHero.vue'
import BlogPosts from './BlogPosts.vue'
import en from '@theme/../../locales/en'
</script>

<template>
  <div class="BlogPage">
    <Section v-bind="en.blog.hero" />

    <BlogPosts />

    <BannerCta v-bind="en.home.sectionBannerCta" />
  </div>
</template>

<style scoped>
a {
  padding-left: 8px;
}
</style>

