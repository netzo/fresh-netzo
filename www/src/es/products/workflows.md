---
layout: home
title: Automatizaciones | Productos
description: Mejora las interacciones con tus clientes a través de portales
hero:
  name: Autenticación
  text: Mejora los flujos con portales
  tagline: Olvidate de la molestias de gestionar usuarios y autenticación. Crea portales atractivos que mejoran la interacción con clientes, proveedores, socios y colaboradores.
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
  - icon: ⚡
    title: Construye portales rápidamente
    details: Crea fácilmente portales para clientes, socios y proveedores con páginas de registro, autenticación y más.
  - icon: 🗝️
    title: Integraciones de proveedores en un clic
    details: Habilita opciones de inicio de sesión social de principales proveedores como Google, Auth0, GitHub y GitLab con un solo clic.

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