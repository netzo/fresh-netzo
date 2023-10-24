---
layout: home
title: Autenticación | Productos
description: Mejora las interacciones con tus clientes a través de portales
hero:
  name: Autenticación
  text: Mejora los flujos con portales
  tagline: Olvidate de la molestias de gestionar usuarios y autenticación. Crea portales atractivos que mejoran la interacción con clientes, proveedores, socios y colaboradores.
  image:
    src: /images/products/authentication.svg
    alt: Netzo Authentication Module
  actions:
    - theme: brand
      text: Agenda una Llamada
      link: https://calendar.app.google/uHEnkfwpgYSM1ppN6
    - theme: alt
      text: Conoce Más
      link: /docs/platform/projects/authentication

features:
  - icon: ⚡
    title: Construye portales rápidamente
    details: Crea fácilmente portales para clientes, socios y proveedores con páginas de registro, autenticación y más.
  - icon: 🗝️
    title: Integraciones de proveedores en un clic
    details: Habilita opciones de inicio de sesión social de principales proveedores como Google, Auth0, GitHub y GitLab con un solo clic.
  - icon: 👥
    title: Gestión de usuarios simplificada
    details: Administra usuarios y roles de forma sencilla en una interfaz de usuario intuitiva y amigable.
  - icon: 🔒
    title: Seguridad de datos
    details: Los datos de usuario se almacenan en la base de datos integrada del portal para garantizar seguridad y darte control total.
  - icon: 📜
    title: Enlaza tus políticas de manera sencilla
    details: Asegura el cumplimiento vinculando directamente tus políticas a la página de registro en la configuración.
  - icon: ✉️
    title: Flujos de correo personalizados
    details: Personaliza y gestiona eficientemente comunicaciones por correo, como registros, actualizaciones de contraseñas y mucho más, de manera sencilla.
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