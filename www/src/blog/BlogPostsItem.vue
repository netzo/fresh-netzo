<script setup lang="ts">
// import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import BlogPostsItemCard from './BlogPostsItemCard.vue'

const props = defineProps({
  group: { type: Object, required: true },
})

const regex = /\[([^\[]+)\](\(.*\))/gm

const description = computed(() => {
  // replace markdown link to html tag.
  // [name](https://...) -> <a href="https://...">name</a>
  return props.group.description.replace(
    /\[([^\]]+)\]\(([^\)]+)\)/,
    '<a href="$2" class="link" target="_blank" rel="noopener">$1</a>',
  )
})
</script>

<template>
  <section class="blog-posts-item">
    <h2 class="title">
      {{ group.title }}
    </h2>
    <p class="description" v-html="description" />

    <div class="wrapper">
      <div class="items">
        <div v-for="item in group.items" :key="item.title" class="item">
          <BlogPostsItemCard :item="item" />
        </div>
      </div>
    </div>

    <!-- <div class="action">
      <VPLink class="action-link" :href="group.seeMoreUrl" no-icon>
        Load all posts
      </VPLink>
    </div> -->
  </section>
</template>

<style scoped>
.blog-posts-item {
  border-top: 1px solid var(--vp-c-divider-light);
  padding-top: 16px;
}

@media (min-width: 768px) {
  .blog-posts-item {
    padding-top: 24px;
  }

  .item {
    padding: 0px;
  }
}

.title {
  font-size: 20px;
  font-weight: 500;
  transition: color 0.25s;
}

.description {
  padding-top: 8px;
  font-size: 14px;
  font-weight: 500;
  max-width: 512px;
  color: var(--vp-c-text-2);
  transition: color 0.25s;
}

.description :deep(.link) {
  color: var(--vp-c-primary);
  transition: color 0.25s;
}

.description :deep(.link:hover) {
  color: var(--vp-c-primary-dark);
}

.wrapper {
  padding-top: 32px;
  padding-left: 32px;
  padding-right: 32px;
}

.items {
  display: flex;
  flex-wrap: wrap;
  margin: -16px -12px;
}

.item {
  width: 100%;
  border-radius: 8px;
}

.item:hover {
  box-shadow: 0 0 8px 0 var(--vp-c-shadow-light);
  background: var(--vp-c-bg-soft);
}

@media (min-width: 768px) {
  .wrapper {
    max-width: 632px;
  }
}

@media (min-width: 960px) {
  .wrapper {
    max-width: 960px;
  }
}

.action {
  padding-top: 40px;
  text-align: center;
}

.action-link {
  display: inline-block;
  border: 1px solid var(--vp-c-primary);
  border-radius: 24px;
  padding: 0 24px;
  line-height: 48px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-primary);
  transition: border-color 0.25s, color 0.25s;
}

.action-link:hover {
  border-color: var(--vp-c-primary-dark);
  color: var(--vp-c-primary-dark);
}
</style>
