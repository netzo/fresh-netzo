---
layout: home
title: Automatizaciones | Productos
description: Automatiza cualquier tarea
hero:
  name: Automatizaciones
  text: Automatiza el trabajo repetitivo
  tagline: Automatiza tareas y procesos con tan solo unas lineas de codigo. Desbloquea la eficiencia y productividad en toda tu organización.
  # image:
  #   src: /images/products/authentication.jpeg
  #   alt: App Launcher
  actions:
    - theme: brand
      text: Agendar una Llamada
      link: https://calendar.app.google/uHEnkfwpgYSM1ppN6
    - theme: alt
      text: Próximamente
      # link: /docs/platform/projects/authentication

features:
  - icon: 🚀
    title: Personalización infinita, es código
    details: Personaliza la lógica de tu flujo de trabajo según tus necesidades exactas utilizando <code style="color:#0080ff;">JavaScript</code> y <code style="color:#0080ff;">TypeScript</code> con soporte de bibliotecas de código abierto.
  - icon: ⏰
    title: Programar tareas recurrentes
    details: Automatiza tareas y procesos en un horario establecido con facilidad.
  - icon: 🔌
    title: Disparar tareas desde webhooks
    details: Ejecuta tareas cuando se desencadenan eventos externos de otros sistemas.
  - icon: 🔍
    title: Seguir el rendimiento fácilmente
    details: Monitoriza y sigue errores, latencia y el rendimiento de tus automatizaciones en tiempo real.
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