---
layout: home
title: Inbox | Products
description: Get all app notifications in one place
hero:
  name: Inbox
  text: Get all notifications in one place
  tagline: Consolidate and streamline communications, notifications, and alerts in a centralized, managed inbox for all your apps.
  # image:
  #   src: /images/home/3-share.svg
  #   alt: Inbox
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
    title: Filter and search notifications
    details: Help your team never miss out on important notifications with advanced filtering and prioritization options.
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


