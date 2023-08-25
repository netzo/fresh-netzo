<script setup lang="ts">
const { isDark } = useData() // IMPORTANT: use vitepress/useData() not @vueuse/useDark()

const items = computed(() => [
  {
    alt: 'Backed by Lanzadera',
    title: 'Backed by Lanzadera',
    src: `/images/home/logos/logo-lanzadera-${isDark.value ? 'dark' : 'light'}.svg`,
    href: 'https://lanzadera.es',
    class: 'h-30px',
  },
  // {
  //   alt: 'Based in the EU',
  //   title: 'Based in the EU',
  //   src: '/images/home/logos/logo-gdpr.webp',
  //   href: 'https://european-union.europa.eu/index_en',
  //   class: 'h-45px',
  // },
  {
    alt: 'Backed by Madrid Emprende',
    title: 'Backed by Madrid Emprende',
    src: `/images/home/logos/logo-madrid-emprende-${isDark.value ? 'dark' : 'light'}.svg`,
    href: 'https://madridemprende.es',
    class: 'h-35px',
  },
])
</script>

<template>
  <section>
    <div class="container flex flex-col gap-12 pt-6 pb-4 sm:flex-row sm:gap-16 sm:py-0 justify-between mx-auto">
      <a
        v-for="(item, i) in items"
        :key="`banner-badges-${i}`"
        :href="item.href"
        target="_blank"
      >
        <img v-bind="item">
      </a>
    </div>
  </section>
</template>

<style scoped>
svg {
  fill: red !important;
}

section {
  border-top: 1px solid var(--vp-c-divider-light);
  border-bottom: 1px solid var(--vp-c-divider-light);
  padding: 10px !important;
  padding: 0px;
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
}

section a {
  display: grid;
  place-items: center;
}

section a:hover {
  cursor: pointer;
}

section img {
  display: block;
  justify-content: center;
}

/* .dark section img {
  filter: grayscale(1) invert(1);
} */

section img:hover {
  filter: brightness(1.3);
}
</style>
