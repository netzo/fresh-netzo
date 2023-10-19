---
layout: home
title: Inbox | Productos
description:
hero:
  name: Inbox
  text: Un solo lugar, todas tus notificaciones
  tagline: Unifica y optimiza la comunicación, notificaciones y alertas en un buzón centralizado y gestionado por nosotros para todas tus aplicaciones.
  # image:
  #   src: /images/home/3-share.svg
  #   alt: Inbox
  actions:
    - theme: brand
      text: Agendar una Llamada
      link: https://calendar.app.google/uHEnkfwpgYSM1ppN6
    - theme: alt
      text: Saber Más
      link: /docs/platform/inbox

features:
  - icon: ✉️
    title: Agrega notificaciones con una línea de código
    details: No construyas y mantengas módulos de notificaciones propensos a errores. Agrega notificaciones en todas tus apps con una línea de código.
  - icon: 🛎️
    title: Mantente siempre al día
    details: Notificaciones predeterminadas al desplegar nuevas versiones, al ejecutar o fallar automatizaciones, y mucho más, sin necesidad de desarrollo adicional.
  - icon: 🔍
    title: Filtra y busca notificaciones
    details: Ayuda a tu equipo a no perderse nunca notificaciones importantes con opciones avanzadas de filtrado y priorización.
  - icon: 🚨
    title: Reacciona al instante ante problemas
    details: Crea notificaciones personalizadas de alerta en tus aplicaciones y automatizaciones para reaccionar rápidamente cuando surgan problemas.
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


