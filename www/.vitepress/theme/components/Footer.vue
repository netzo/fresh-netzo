<script setup lang="ts">
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import VPSocialLinks from 'vitepress/dist/client/theme-default/components/VPSocialLinks.vue'
import { ogEN } from '@theme/../config.og'
import en from '@theme/../../locales/en'

interface Footer {
  items: {
    text: string
    items: {
      text: string
      link: string
    }
  }[]
  links?: {
    icon: string
    link: string
  }[]
}

const {
  items = en.footer,
  links = [
    { icon: 'github', link: ogEN.githubURL },
    { icon: 'discord', link: ogEN.discordURL },
    { icon: 'twitter', link: ogEN.twitterURL },
    { icon: 'linkedin', link: ogEN.linkedinURL },
  // { icon: 'facebook', link: ogEN.facebookURL },
  // { icon: 'instagram', link: ogEN.instagramURL },
  // { icon: 'youtube', link: ogEN.youtubeURL },
  ],
} = defineProps<Footer>()
</script>

<template>
  <footer>
    <div class="container">
      <div v-for="(item, i) in items" :key="`footer-items-${i}`" class="footer-items">
        <h2 v-if="item.text" class="text" v-html="item.text" />
        <template v-if="item.items && item.items.length">
          <div v-for="(subItem, j) in item.items" :key="`footer-item-${i}-${j}`">
            <VPLink v-if="subItem.link" :href="subItem.link" :no-icon="subItem.noIcon">
              {{ subItem.text }}
            </VPLink>
            <a v-else-if="subItem.onClick" @click="subItem.onClick">
              {{ subItem.text }}
            </a>
          </div>
        </template>
      </div>
    </div>

    <VPSocialLinks size="small" :links="links" />
  </footer>
</template>

<style scoped>
footer {
  margin: 0 auto;
  border-top: 1px solid transparent;
  border-bottom: 1px solid var(--vp-c-divider-light);
  padding: 48px 0px 12px;
  background: var(--vp-c-bg);
  transition: border-color 0.5s, background-color 0.5s;
  display: grid;
}

.dark footer {
  border-top-color: var(--vp-c-divider-light);
  border-bottom-color: transparent;
}

.container {
  margin: 0 auto;
  /* width: 100%; */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.footer-items {
  padding: 24px 24px;
}

h2 {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: color 0.5s;
  padding-bottom: 12px;
}

a {
  cursor: pointer;
  padding: 3px 0px;
  line-height: 20px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
  display: block;
  width: max-content;
}

a:hover {
  color: var(--vp-c-text-1);
}

a[target]:hover {
  text-decoration: underline;
}

.VPSocialLinks {
  padding: 12px 0px;
}

@media (min-width: 640px) {
  footer {
    padding: 48px 32px 12px;
  }

  .container {
    /* UNCOMMENT FOR 5 COLS: grid-template-columns: repeat(3, 1fr); */
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .container {
    /* UNCOMMENT FOR 5 COLS: grid-template-columns: repeat(5, 1fr); */
    grid-template-columns: repeat(4, 1fr);
  }
}

footer {
  margin: 0 auto;
  border-top: 1px solid transparent;
  border-bottom: 1px solid var(--vp-c-divider-light);
  padding: 48px 0px 12px;
  background: var(--vp-c-bg);
  transition: border-color 0.5s, background-color 0.5s;
  display: grid;
}

.dark footer {
  border-top-color: var(--vp-c-divider-light);
  border-bottom-color: transparent;
}

.container {
  margin: 0 auto;
  /* width: 100%; */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.footer-items {
  padding: 24px 24px;
}

h2 {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: color 0.5s;
  padding-bottom: 12px;
}

a {
  cursor: pointer;
  padding: 3px 0px;
  line-height: 20px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
  display: block;
  width: max-content;
}

a:hover {
  color: var(--vp-c-text-1);
}

a[target]:hover {
  text-decoration: underline;
}

.VPSocialLinks {
  padding: 12px 0px;
}

@media (min-width: 640px) {
  footer {
    padding: 48px 32px 12px;
  }

  .container {
    /* UNCOMMENT FOR 5 COLS: grid-template-columns: repeat(3, 1fr); */
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .container {
    /* UNCOMMENT FOR 5 COLS: grid-template-columns: repeat(5, 1fr); */
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
