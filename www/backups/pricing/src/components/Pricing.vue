<script setup lang="ts">
import SectionHeroSimple from '@theme/components/sections/SectionHeroSimple.vue'
import Faqs from '@theme/components/Faqs.vue'
import Section from '@theme/components/sections/Section.vue'
import Footer from '@theme/components/Footer.vue'
import PricingTable from './PricingTable.vue'

const props = defineProps({ locale: { type: Object, required: true } })
</script>

<template>
  <SectionHeroSimple v-bind="locale.pricing.hero">
    <PricingTable v-bind="locale.pricing" />
  </SectionHeroSimple>

  <Section v-bind="locale.pricing.faqs">
    <Faqs v-bind="locale.pricing.faqs" />
  </Section>

  <Footer v-bind="locale.footer" />
</template>
