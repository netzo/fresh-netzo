---
layout: home
title: Database | Products
description: Fully Managed, Built-In Database
hero:
  name: Database
  text: Simplify Your Data Management
  tagline: Config free, dedicated and scalable databases for every app you build in Netzo.
  actions:
    - theme: brand
      text: Book a Call
      link: https://calendar.app.google/uHEnkfwpgYSM1ppN6
    - theme: alt
      text: Learn More
      link: /docs/platform/projects/database

features:
  - icon: 🔒
    title: Robust security measures
    details: Your data is fortified with advanced security protocols, including encryption at rest.

  - icon: 🚀
    title: Instant setup, no hassle
    details: Say farewell to time-consuming setups and maintenance. Dive into a fully managed, portable database ready for your apps.

  - icon: 📊
    title: Effortless data management
    details: Manage and update your data seamlessly through a user-friendly interface, as easily as editing a spreadsheet.

  - icon: 🔍
    title: Flexible data querying
    details: Easily query data from your databases to power other apps, giving you the flexibility to harness your data.

  - icon: 📈
    title: Scalability on demand
    details: Scale your database resources up or down with ease as your app's demands grow, without manual hassles.

  - icon: 🌐
    title: Global availability and real-time data syncing
    details: Access your database from anywhere in the world with real-time data syncing, ensuring optimal performance for your diverse, global user base.

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