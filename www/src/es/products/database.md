---
layout: home
title: Base de Datos | Productos
description: Base de Datos Totalmente Gestionada e Integrada
hero:
  name: Base de Datos
  text: Simplifica la Gestión de tus Datos
  tagline: Bases de datos dedicadas y escalables, sin necesidad de configuración, para cada aplicación que construyas en Netzo.
    image:
    src: /images/products/databases.svg
    alt: Netzo Databases
  actions:
    - theme: brand
      text: Agenda una Llamada
      link: https://calendar.app.google/uHEnkfwpgYSM1ppN6
    - theme: alt
      text: Conoce Más
      link: /docs/platform/projects/database

features:
  - icon: 🔒
    title: Medidas de seguridad robustas
    details: Tus datos están protegidos con avanzados protocolos de seguridad, incluyendo cifrado en reposo.

  - icon: 🚀
    title: Configuración instantánea, sin los problemas
    details: Dile adiós a las configuraciones y el mantenimiento que consumen tiempo. Accede a una base de datos completamente gestionada y portátil lista para tus aplicaciones.

  - icon: 📊
    title: Gestión de datos sencilla
    details: Gestiona y actualiza tus datos de manera sencilla a través de una interfaz amigable, tan fácil como editar una hoja de cálculo.

  - icon: 🔍
    title: Consulta de datos flexible
    details: Consulta fácilmente datos de tus bases de datos para potenciar otras aplicaciones, dándote la flexibilidad de aprovechar tus datos.

  - icon: 📈
    title: Escalabilidad bajo demanda
    details: Escala tus recursos de base de datos con facilidad a medida que crecen las necesidades de tu aplicación, sin complicaciones.

  - icon: 🌐
    title: Disponibilidad global y sincronización en Tiempo Real
    details: Accede a tu base de datos desde cualquier parte del mundo con sincronización de datos en tiempo real, garantizando un rendimiento óptimo para tu diversa base de usuarios globales.

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