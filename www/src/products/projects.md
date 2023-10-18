---
layout: home
title: Projects | Products
description:
hero:
  name: Projects
  text: Serverless apps that automatically scale
  tagline: "Experience the future of app deployment: instant, global and with zero configuration, designed to empower your business for effortless growth."
  # image:
  #   src: /images/home/3-share.svg
  #   alt: Inbox
  actions:
    - theme: brand
      text: Book a Call
      link: https://calendar.app.google/uHEnkfwpgYSM1ppN6
    - theme: alt
      text: Learn More
      link: /docs/platform/projects

features:
  - icon: 🛠️
    title: Build with code, 10x faster
    details: Netzo lets you build business software with the same flexibility as building from scratch, minus the time-consuming, costly intricacies.
  - icon: ⚡
    title: Instant, global deployments
    details: Forget about setting up and maintaining fragile cloud infrastructure. Deploy your apps globally in one-click.
  - icon: 🛡️
    title: Cutting-Edge Security
    details: Netzo runs on the most modern and secure runtime, leveraging the power of Deno to ensure the highest level of security for your applications.
  - icon:  💼
    title: TypeScript ready
    details: Netzo projects are written in <code style="color:#0080ff;">JavaScript</code> and native <code style="color:#0080ff;">TypeScript</code> support, allowing you to build apps efficiently with complete control.
  - icon: 🔄
    title: Seamless scalability
    details: Enjoy effortless scalability as your apps automatically expand to meet your growing needs, all without the hassle—because it just works.
  - icon: 🌐
    title: Embrace open technologies
    details: Empower your code with open-source libraries and frameworks. We simplify the process, providing out-of-the-box functionalities to enhance your code without sacrificing control.
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


