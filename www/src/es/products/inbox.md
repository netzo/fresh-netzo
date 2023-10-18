---
layout: home
title: Inbox | Productos
description:
hero:
  name: Inbox
  text: Un buzón para todas las notificaciones de tus apps
  tagline: Unifica y optimiza la comunicación, notificaciones y alertas con nuestro módulo de buzón centralizado y gestionado para todas tus aplicaciones.
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
    title: Simplifica notificaciones en tus aplicaciones
    details: Di adiós a la molestia de construir y mantener módulos de notificación propensos a errores. Integra fácilmente notificaciones en tus aplicaciones con tan solo una línea de código.
  - icon: 🎯
    title: Filtros personalizables
    details: Empodera a los usuarios para personalizar sus preferencias de notificación con opciones avanzadas de filtrado y priorización.
  - icon: 🛎️
    title: No te pierdas nada
    details: Notificaciones predeterminadas integradas para nuevas versiones disponibles, ejecución o fallo de flujos de trabajo, y más, al instante, sin necesidad de trabajo de desarrollo.

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


