---
layout: home
title: App Launcher | Productos
description: Despliega soluciones de negocio personalizadas rapido. Netzo es la forma más flexible de construir y gestionar soluciones de software internas críticas para la misión que se adapten a las necesidades cambiantes de su organización.
hero:
  name: App Launcher
  text: Despliega soluciones de negocio rapido.
  tagline: Netzo es la forma más flexible de construir y gestionar soluciones de software internas críticas para la misión que se adapten a las necesidades cambiantes de su organización.
  image:
    src: /images/home/3-share.svg
    alt: App Launcher
  actions:
    - theme: brand
      text: Book a Call
      link: https://calendar.app.google/uHEnkfwpgYSM1ppN6
    - theme: alt
      text: Learn More
      link: /docs/platform/home

features:
  - icon: 🛠️
    title: Lorem ipsum
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique quis tempus id, ultrices in ligula. Nam vel justo cursus, faucibus lorem eget, egestas eros.

---

<script setup>
import BannerCta from '@theme/components/banners/BannerCta.vue'
import Footer from '@theme/components/Footer.vue'
import locale from '@theme/../../locales/es'
</script>

<section class="mt-32">
  <BannerCta v-bind="locale.home.sectionBannerCta" />

  <!-- <NewsLetter /> -->

  <Footer v-bind="locale.footer" />
</section>


