---
layout: home
title: Analytics | Products
description: Monitor your apps and workflows
hero:
  name: Analytics
  text: Swiftly track and analyze performance
  tagline: Never lose sight of how your apps are performing. Troubleshooting has never been easier.
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
  - icon: 📊
    title: Search and analyze Logs
    details: Effortlessly access and analyze logs from all your applications to gain valuable insights on their performance.

  - icon: 🚀
    title: Real time data streaming
    details: Harness real-time data streaming capabilities. Monitor crucial metrics as they happen, enabling immediate responses to changing trends and opportunities.

  - icon: 📈
    title: API Endpoint monitoring
    details: Gain valuable insights into your API's performance and usage with comprehensive monitoring tools. Track endpoint response times, error rates, and usage patterns, helping you identify areas for improvement and optimization.

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


