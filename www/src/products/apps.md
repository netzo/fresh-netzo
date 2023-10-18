---
layout: home
title: Apps | Products
description: Seamless app distribution within your organization with one-click, secure sharing and user management.
hero:
  name: Apps
  text: Ship apps to your team fast
  tagline: Simple, flexible, and fast. Securely share apps in the Apps dashboard with your teams in one-click.
  image:
    src: /images/home/3-share.svg
    alt: Apps
  actions:
    - theme: brand
      text: Book a Call
      link: https://calendar.app.google/uHEnkfwpgYSM1ppN6
    - theme: alt
      text: Learn More
      link: /docs/platform/home

features:
  - icon: 🛠️
    title: User and role management
    details: Set permissions for users to limit access to applications with programmatic control.
  - icon: 🛠️
    title: Centralize access
    details: Promote efficient teamwork by ensuring your workforce has the right tools, easily accessible.
  - icon: 🛠️
    title: Boost Collaboration and Productivity
    details: Foster collaboration with quick, secure access to essential apps. Netzo's Apps module promotes efficient teamwork, making it easier for your teams to work together and boost productivity.
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


