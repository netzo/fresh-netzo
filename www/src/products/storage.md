---
layout: home
title: Storage | Products
description: Store all your media files on the cloud
hero:
  name: Storage
  text: Instant cloud storage for all your media
  tagline: Hosted storage for all your media files with unlimited scalability.
  # image:
  #   src: /images/home/3-share.svg
  #   alt: App Launcher
  actions:
    - theme: brand
      text: Book a Call
      link: https://calendar.app.google/uHEnkfwpgYSM1ppN6
    - theme: alt
      text: Coming soon
      # link: /docs/platform/home

features:
  - icon: 📁
    title: Streamline media management
    details: Effortlessly manage all your media assets through an intuitive dashboard, offering an experience similar to Google Drive.

  - icon: 🖼️
    title: Instant file previews
    details: Quickly preview various media types, including images, GIFs, audio, video, and more, for a seamless viewing experience.

  - icon: ⚡
    title: Fast and dependable
    details: Enterprise-level scalability and state of the art tech to ensure lightning fast performance.

  - icon: 📲
    title: Integrate natively with all your apps
    details: Seamlessly integrate your media assets into all your applications, enhancing accessibility and user experience.

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


