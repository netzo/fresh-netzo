---
layout: home
title: Inbox | Products
description: Get all app notifications in one place
hero:
  name: Inbox
  text: Never miss a notification again
  tagline: Real-time view of all your app notifications. Add notifications to your apps and receive them in Netzo to stay in control.
  image:
    src: /images/products/inbox.svg
    alt: Netzo Inbox
  actions:
    - theme: brand
      text: Book a Call
      link: https://calendar.app.google/uHEnkfwpgYSM1ppN6
    - theme: alt
      text: Learn More
      link: /docs/platform/inbox

features:
  - icon: ✉️
    title: Add notifications in one line of code
    details: Stop building and maintaining error-prone notification modules. Add notifications to all your apps in a single line of code.
  - icon: 🛎️
    title: Always stay updated
    details: Built in default notifications when new versions are available, when workflows run or fail, and more instantly, without the development work.
  - icon: 🔍
    title: Shortcuts, filters, instant preview and more
    details: Help your team never miss out on important notifications with advanced filtering, shortcuts and instant message previews.
  - icon: 🚨
    title: React instantly to problems
    details: Build custom alert notifications into your apps and workflows and react swiftly when problems arise.
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


