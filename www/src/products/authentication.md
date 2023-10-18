---
layout: home
title: Authentication | Products
description: Managed customer portals
hero:
  name: Authentication
  text: Improve workflows with portals
  tagline: Eliminate the hassle of managing users and authentication. Create beautiful portals that improve engagement with customers, vendors, partners, and suppliers.
  image:
    src: /images/products/authentication.jpeg
    alt: App Launcher
  actions:
    - theme: brand
      text: Book a Call
      link: https://calendar.app.google/uHEnkfwpgYSM1ppN6
    - theme: alt
      text: Learn More
      link: /docs/platform/projects/authentication

features:
  - icon: ⚡
    title: Build portals fast
    details: Effortlessly create customer, partner, and vendor portals with out of the box sign-up pages, authentication and more.
  - icon: 🗝️
    title: One-click provider integrations
    details: Enable social login options from leading providers like Google, Auth0, GitHub, and GitLab in one-click.
  - icon: 👥
    title: Streamlined user management
    details: Manage users and roles seamlessly in a intuitive, user friendly UI.
  - icon:  🔒
    title: Data Safety
    details: User data is stored within the portals integrated database ensure security and giving you full control.
  - icon: 📜
    title: Easy policy linking
    details: Ensure compliance by directly linking your policies to the sign-up page in the configuration.
  - icon: ✉️
    title: Personalized email flows
    details: Customize and manage email communications efficiently such as sign up, password update and more easily.
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