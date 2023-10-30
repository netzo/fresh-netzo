---
layout: home
title: Workflows | Products
description: Automate any task
hero:
  name: Workflows
  text: Automate anything in a few lines of code
  tagline: Effortlessly automate tasks and processes with on-demand cloud compute. Unlock efficiency and productivity across your organization.
  image:
    src: /images/products/workflows.svg
    alt: Netzo Workflows
  actions:
    - theme: brand
      text: Book a Call
      link: https://calendar.app.google/uHEnkfwpgYSM1ppN6
    - theme: alt
      text: Coming soon
      # link: /docs/platform/projects/auth

features:
  - icon: 🚀
    title: Customize endlessly, it's code
    details: Customize workflow logic to your exact needs using <code style="color:#0080ff;">JavaScript</code> and <code style="color:#0080ff;">TypeScript</code> with open-source library support.
  - icon: ⏰
    title: Schedule recurring tasks
    details: Automate tasks and processes on a set schedule with ease.
  - icon: 🔌
    title: Trigger tasks from webhooks
    details: Execute tasks when triggered by external events from other systems.
  - icon: 🔍
    title: Easily track performance
    details: Easily monitor and track errors, latency, and workflow performance in real-time.

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