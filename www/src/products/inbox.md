---
layout: home
title: Inbox | Products
description:
hero:
  name: Inbox
  text:
  tagline:
  image:
    src: /images/home/3-share.svg
    alt: Inbox
  actions:
    - theme: brand
      text: Book a Call
      link: https://calendar.app.google/uHEnkfwpgYSM1ppN6
    - theme: alt
      text: Learn More
      link: /docs/platform/home

features:
  - icon: 🛠️
    title: Lorem ipsum
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique quis tempus id, ultrices in ligula. Nam vel justo cursus, faucibus lorem eget, egestas eros.

---

<script setup>
import BannerCta from '@theme/components/banners/BannerCta.vue'
import Footer from '@theme/components/Footer.vue'
import locale from '@theme/../../locales/en'
</script>

<section class="mt-32">
  <BannerCta v-bind="locale.home.sectionBannerCta" />

  <!-- <NewsLetter /> -->

  <Footer v-bind="locale.footer" />
</section>


