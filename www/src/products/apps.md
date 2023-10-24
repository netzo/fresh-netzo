---
layout: home
title: Apps | Products
description: Seamless app distribution within your organization with one-click, secure sharing and user management.
hero:
  name: Apps
  text: Ship apps to your team fast
  tagline: Securely share apps in the Apps dashboard with teams and individuals in one-click.
  image:
    src: /images/products/app-launcher.svg
    alt: Apps
  actions:
    - theme: brand
      text: Book a Call
      link: https://calendar.app.google/uHEnkfwpgYSM1ppN6
    - theme: alt
      text: Learn More
      link: /docs/platform/home

features:
  - icon: 🚀
    title: Share instantly
    details: Grant user access with a single click. Once granted, applications appear instantly on users' dashboards in the form of tiles.
  - icon: 🔑
    title: Manage users and role easily
    details: Easily configure user permissions and control access to your applications with precision.
  - icon: 🌐
    title: Centralize access to tools
    details: Netzo's Apps module allows users to easily access all their authorized applications from a single dashboard.
  - icon: 🏷️
    title: Tag and filter apps
    details: Label your apps with custom tags, making it simple for end users to filter applications in the Apps module based on their tags.
  - icon: 📈
    title: Measure performance in real-time
    details: Gain immediate insights into application performance metrics, allowing you to analyze data quickly and make improvements fast.
  - icon:  📢
    title: Collect feedback (coming soon)
    details: Enable your users to provide direct feedback to developers and managers right from the Apps dashboard, contributing to app improvement and faster iteration cycles.

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


