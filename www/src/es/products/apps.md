---
layout: home
title: Apps | Productos
description: Distribución al instante de aplicaciones dentro de tu organización, de forma segura.
hero:
  name: Apps
  text: Comparte aplicaciones con tu equipo rápidamente
  tagline: Sencillo, flexible y rápido. Comparte aplicaciones de forma segura en el panel de Aplicaciones con tus equipos en un solo clic.
  image:
    src: /images/home/3-share.svg
    alt: App Launcher
  actions:
    - theme: brand
      text: Agendar una Llamada
      link: https://calendar.app.google/uHEnkfwpgYSM1ppN6
    - theme: alt
      text: Saber Más
      link: /docs/platform/home

features:
  - icon: 🔒
    title: Gestión de usuarios y roles
    details: Establece permisos para los usuarios para limitar el acceso a las aplicaciones con control programático.
  - icon: 🏢
    title: Centraliza el acceso a aplicaciones criticas
    details: Fomenta el trabajo en equipo eficiente asegurándote de que tu personal tenga las herramientas adecuadas, con fácil acceso.
  - icon: 🚀
    title: Impulsa la colaboración y la productividad
    details: Fomenta la colaboración con un acceso rápido y seguro a aplicaciones esenciales. El módulo de aplicaciones de Netzo promueve un trabajo en equipo eficiente, facilitando la colaboración entre tus equipos y aumentando la productividad.

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


