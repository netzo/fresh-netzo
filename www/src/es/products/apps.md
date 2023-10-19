---
layout: home
title: Apps | Productos
description: Distribución al instante de aplicaciones dentro de tu organización, de forma segura.
hero:
  name: Apps
  text: Comparte al instante
  tagline: Comparte aplicaciones de manera segura con tus equipos y usuarios en un solo clic.
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
- icon: 🚀
  title: Comparte al instante
  details: Otorgar acceso a usuarios con un solo clic. Una vez otorgado, las aplicaciones aparecen instantáneamente en el panel de Apps de los usuarios.
- icon: 🔑
  title: Administra usuarios y roles fácilmente
  details: Configura fácilmente los permisos de usuario y controla el acceso a tus aplicaciones con precisión.
- icon: 🌐
  title: Centraliza el acceso a herramientas
  details: El módulo de Apps de Netzo permite a los usuarios acceder fácilmente a todas sus aplicaciones desde un solo panel.
- icon: 🏷️
  title: Etiqueta y filtrar aplicaciones
  details: Etiqueta tus aplicaciones con etiquetas personalizadas, facilitando a los usuarios filtrar según sus etiquetas.
- icon: 📈
  title: Mide el rendimiento en tiempo real
  details: Obten insights inmediatos sobre métricas de rendimiento, permitiendote analizar rápidamente y realizar mejoras de manera ágil.
- icon: 📢
  title: Recopila retroalimentación (próximamente)
  details: Permite a tus usuarios proporcionarte retroalimentación de manera directa desde el panel de aplicaciones, contribuyendo a la mejora de la aplicación y ciclos de iteración más agiles.

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


