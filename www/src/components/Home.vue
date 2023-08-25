<script setup lang="ts">
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import Figure from '@theme/components/Figure.vue'
import Section from '@theme/components/sections/Section.vue'
import SectionMain from '@theme/components/sections/SectionMain.vue'
import SectionCards from '@theme/components/sections/SectionCards.vue'
import SectionHero from '@theme/components/sections/SectionHero.vue'
// import SectionQuote from '@theme/components/sections/SectionQuote.vue'
import BannerBadges from '@theme/components/banners/BannerBadges.vue'
import BannerSimple from '@theme/components/banners/BannerSimple.vue'
import BannerCta from '@theme/components/banners/BannerCta.vue'
// import ButtonCta from '@theme/components/buttons/ButtonCta.vue'
import SectionApis from '@theme/components/sections/SectionApis.vue'
import Footer from '@theme/components/Footer.vue'

const props = defineProps({ locale: { type: Object, required: true } })
</script>

<template>
  <SectionHero v-bind="locale.home.hero">
    <template #bottom>
      <div class="flex flex-col md:flex-row gap-6 md:gap-8 text-start">
        <article
          v-for="(item, i) in locale.home.hero.items"
          :key="`section-main-points-item-${i}-${item.title}`"
          class="flex flex-col"
        >
          <div class="flex items-center">
            <div v-if="item.icon" :class="item.icon" />
            <p v-if="item.title" class="ml-3 text-lg" v-html="item.title" />
          </div>
        </article>
      </div>
    </template>
  </SectionHero>

  <div class="b-y-1px border-[var(--vp-c-divider-light)]">
    <BannerBadges class="!b-none" />
  </div>
  <div class="sections pb-12 bg-secondary-100 bg-opacity-10">
    <!-- <Section id="section-what" class="!pb-0" v-bind="locale.home.sectionWhat" /> -->
    <SectionMain id="section-what" v-bind="locale.home.sectionWhat" />
  </div>

  <div class="b-y-1px border-[var(--vp-c-divider-light)]">
    <SectionApis class="!b-none bg-white" />
  </div>

  <div class="sections">
    <SectionCards
      id="section-business-benefits"
      v-bind="locale.home.sectionWhyNetzo"
    />
  </div>

  <!-- GRADIENT: bg-gradient-to-b from-[var(--vp-c-bg-alt)] from-opacity-05 to-secondary-100 to-opacity-05 -->
  <div class="sections dots-bottom">
    <Section
      id="section-what-you-can-build"
      v-bind="locale.home.sectionWhatCanYouBuild"
    >
      <template #default="{ items }">
        <div class="mt-12 mb-6 grid grid-cols-2 gap-y-10 gap-x-8 md:grid-cols-3 text-start">
          <article
            v-for="(item, i) in items"
            :key="`section-main-points-item-${i}-${item.title}`"
            class="flex flex-col"
          >
            <Figure
              v-if="item.image"
              v-bind="{ ...item.image, alt: item?.alt ?? item.title }"
            />
            <div class="mt-6">
              <h3 v-if="item.title" class="font-bold mb-3 text-overflow">
                {{ item.title }}
                <span class="chip-sm mt-2 text-overflow">
                  {{ item.uid.split('-')[0] }}
                </span>
              </h3>
              <!-- <p v-if="item.description" class="text-sm" v-html="item.description" /> -->
            </div>
          </article>
        </div>
      </template>
    </Section>
  </div>

  <!-- GRADIENT: bg-gradient-to-b from-accent-100 from-opacity-05 to-secondary-100 to-opacity-05 -->
  <!-- <div class="sections bg-accent-100 bg-opacity-10">
    <Section id="section-why" v-bind="locale.home.sectionWhy" class="container-wider">
      <div class="grid grid-cols-1 gap-12 md:grid-cols-3 text-start py-6">
        <article
          v-for="(item, i) in locale.home.sectionWhy.items"
          :key="`section-why-item-${i}`"
          class="text-justify"
        >
          <h3 class="pb-3 font-bold text-accent-500">
            {{ item.title }}
          </h3>
          <p>
            {{ item.description }}
          </p>
        </article>
      </div>
    </Section>
  </div> -->

  <!-- <div class="sections pb-24 bg-secondary-100 bg-opacity-10">
    <Section id="section-what" class="!pb-0" v-bind="locale.home.sectionWhat" />
  </div> -->

  <BannerSimple>
    <VPLink href="/docs/introduction/getting-started">
      Read the docs
    </VPLink>
  </BannerSimple>

  <div class="sections pb-24  bg-secondary-100 bg-opacity-10">
    <Section id="section-how" v-bind="locale.home.sectionHow" />

    <SectionMain
      v-for="(item, i) in locale.home.sectionHow.items"
      :key="`section-how-item-${i}`"
      v-bind="item"
      :inverted="i % 2 === 0"
    />
  </div>

  <BannerSimple>
    <VPLink href="/docs/introduction/getting-started">
      Learn more
    </VPLink>
  </BannerSimple>

  <div class="sections">
    <SectionCards
      id="section-superpowers"
      v-bind="locale.home.sectionHowIsNetzoDifferentForDevelopers"
    />
  </div>

  <div class="sections">
    <SectionCards
      id="section-competitive-advantage"
      v-bind="locale.home.sectionHowIsNetzoDifferent"
    />
  </div>

  <div class="sections pb-24">
    <Section
      id="section-who-is-netzo-for"
      v-bind="locale.home.sectionWhoIsNetzoFor"
    >
      <template #default="{ items }">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-3 text-start mt-6">
          <article
            v-for="(item, i) in items"
            :key="`section-main-points-item-${i}-${item.title}`"
            class="flex flex-col pa-6"
          >
            <img v-if="item.image" v-bind="item.image" class="w-48px h-48px">
            <div class="mt-4">
              <h3 v-if="item.title" class="mb-2 text-xl font-bold" v-html="item.title" />
              <p v-if="item.description" v-html="item.description" />
            </div>
          </article>
        </div>
      </template>
    </Section>
  </div>

  <!-- <div class="sections pb-24">
    <SectionQuote v-bind="locale.home.sectionQuote" />
  </div> -->

  <BannerCta v-bind="locale.home.sectionBannerCta" />

  <!-- <NewsLetter /> -->

  <Footer v-bind="locale.footer" />
</template>

<style scoped>
#section-what :deep(h3.topic) {
  color: var(--vp-c-secondary);
}

#section-what :deep(h2) {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

#section-what :deep(figure img) {
  margin: auto;
  height: 100% !important;
}

#section-why :deep(h3.topic) {
  color: var(--vp-c-accent);
}

#section-why :deep(figure) {
  margin-bottom: 96px;
  max-width: 700px;
}

/* #section-why :deep(.actions),
#section-what :deep(.actions) {
  margin-bottom: 0px;
} */

#section-who-is-netzo-for :deep(figure) {
  margin: auto;
  max-width: 700px;
}

.vp-button.vp-button--tertiary {
  margin-right: -8px !important;
}
</style>
