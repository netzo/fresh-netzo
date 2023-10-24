---
layout: home
title: Almacenamiento | Productos
description: Almacenamiento en la nube para tus archivos digitales
hero:
  name: Almacenamiento
  text: Guarda y usa tu contenido digital
  tagline: Todo tus archivos multimedia en la nube con escalabilidad ilimitada.

  actions:
    - theme: brand
      text: Agenda una Llamada
      link: https://calendar.app.google/uHEnkfwpgYSM1ppN6
    - theme: alt
      text: Próximamente
      # link: /docs/platform/projects/auth

features:
  - icon: 📁
    title: Gestión eficiente de medios
    details: Gestiona tus activos multimedia de manera sencilla a través de un panel intuitivo, ofreciendo una experiencia similar a Google Drive.

  - icon: 🖼️
    title: Previsualización instantánea de archivos
    details: Previsualiza rápidamente diversos tipos de medios, incluyendo imágenes, GIFs, audio, video y más, para una experiencia de visualización fluida.

  - icon: ⚡
    title: Rápido y confiable
    details: Escalabilidad a nivel empresarial y tecnología de vanguardia garantizan un rendimiento rapidísimo.

  - icon: 📲
    title: Integración nativa con todas tus aplicaciones
    details: Integra tus activos multimedia sin esfuerzo en todas tus aplicaciones, mejorando la accesibilidad y la experiencia del usuario.

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