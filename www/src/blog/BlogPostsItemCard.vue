<script setup lang="ts">
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import BlogPostAuthor from './BlogPostAuthor.vue'

const props = defineProps({
  item: { type: Object, required: true },
})
</script>

<template>
  <VPLink class="blog-posts-item-card" :href="item.href" no-icon>
    <article>
      <figure v-if="item.image" class="figure">
        <img class="image" :src="item.image" :alt="item.title">
      </figure>

      <div class="data">
        <div class="title">
          <h2 class="name">
            {{ item.title }}
          </h2>
          <p class="date">
            {{ item.date.string }}
          </p>
          <div class="mr-3">
            <BlogPostAuthor
              v-for="author in item.author"
              :key="`author-${author.name}`"
              :author="author"
            />
          </div>
        </div>

        <!-- <div v-if="item.category" class="category">
          <span>
            {{ item.category }}
          </span>
        </div> -->
      </div>
    </article>
  </VPLink>
</template>

<style scoped>
.blog-posts-item-card {
  display: block;
  padding: 12px 0px;
}

.blog-posts-item-card:hover .figure {
  /* transform: translateY(-4px); */
}

.blog-posts-item-card:hover .title {
  color: var(--vp-c-primary);
}

article {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
}

figure {
  display: grid;
  align-items: center;
  padding: 0px 16px;
}

img {
  max-height: 150px;
}

.data {
  margin-top: 24px;
  padding: 0px 16px;
}

.name {
  margin-bottom: 16px;
}

.date {
  padding-bottom: 16px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.25s;
}

.title {
  font-size: 20px;
  font-weight: 500;
  transition: color 0.25s;
  flex-grow: 1;
  padding-right: 8px;
}

@media (min-width: 512px) {
  figure {
    place-items: center;
    padding: 0px 24px;
  }
}

@media (min-width: 768px) {
  .blog-posts-item-card {
    padding: 24px 0px;
  }

  article {
    grid-template-columns: 1fr 1fr;
  }
  figure {
    place-items: center;
    padding: 0px 32px;
  }

  .data {
    padding: 0px 32px;
  }
}
</style>
