<script setup lang="ts">
import BlogPostsItem from './BlogPostsItem.vue'
import { data as posts } from './posts.data'

const groups = [
  {
    title: 'Announcements',
    description: 'News and updates from the Netzo team.',
    seeMoreUrl: '',
  },
  // {
  //   title: 'Examples',
  //   description: 'Practical examples of what can be done with Netzo, and how to do it.',
  //   seeMoreUrl: '',
  // },
  // {
  //   title: 'Vision',
  //   description: 'Notes and open letters from the Netzo team.',
  //   seeMoreUrl: '',
  // },
  {
    title: 'Technology',
    description: 'Notes on current technologies, tools and trends.',
    seeMoreUrl: '',
  },
  // {
  //   title: 'Release Notes',
  //   description: 'Technical details about each release',
  //   seeMoreUrl: '',
  // },
]

// groups posts by series title
const groupedPosts = groups.map((group) => {
  return {
    ...group,
    items: posts.filter(post => post.group === group.title),
  }
})

const buttons = [
  {
    text: 'RSS',
    href: '/feed.rss',
  },
  {
    text: 'JSON',
    href: '/feed.json',
  },
]
</script>

<template>
  <div class="blog-posts">
    <div class="wrapper">
      <p class="buttons">
        <a
          v-for="(button, i) in buttons"
          :key="`button-cta-${i}`"
          class="vp-button"
          :href="button.href"
          target="_blank"
        >
          <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z" /></svg>
          {{ button.text }}
        </a>
      </p>

      <div v-for="group in groupedPosts" :key="group.name" class="item">
        <BlogPostsItem :group="group" />
        <div class="gh-card gh-large" data-repo="net" data-image="https://netzo.io/logos/blog/all-in-one-orchestration-solution.webm" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-posts {
  padding: 0px 24px 96px 24px !important;
}

@media (min-width: 768px) {
  .blog-posts {
    padding: 0px 32px 48px 32px;
  }
}

.wrapper {
  margin: 0 auto;
  max-width: 960px;
}

.item + .item {
  padding-top: 48px;
}

@media (min-width: 768px) {
  .item + .item {
    padding-top: 64px;
  }
}

/* actions: see also '@theme/styles/page.css' */

.buttons {
  padding: 0px;
  display: flex;
  justify-content: end;
}

.buttons .vp-button {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-left: 16px;
}

.buttons .vp-button:hover {
  color: var(--vp-c-primary);
  cursor: pointer;
}

.buttons .vp-button svg {
  margin-right: 4px;
  margin-bottom: 2px;
}
</style>
