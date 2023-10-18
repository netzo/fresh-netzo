---
layout: home
title: Proyectos | Productos
description: Base de Datos Totalmente Gestionada e Integrada
hero:
  name: Proyectos
  text: Apps que escalan automáticamente
  tagline: "Experimenta el futuro de la implementación de aplicaciones: instantánea, global y sin configuración, diseñada para potenciar tu negocio y su crecimiento sin esfuerzo."

  actions:
    - theme: brand
      text: Agendar una Llamada
      link: https://calendar.app.google/uHEnkfwpgYSM1ppN6
    - theme: alt
      text: Saber Más
      link: /docs/platform/projects

features:
  - icon: 🛠️
    title: Desarrollo rápido con código
    details: Netzo te permite construir software empresarial con la misma flexibilidad que construirlo desde cero, sin las complicaciones costosas y que consumen tiempo.
  - icon: ⚡
    title: Implementaciones instantáneas y globales
    details: Olvídate de configurar y mantener una infraestructura en la nube. Despliega tus aplicaciones a nivel global con un solo clic.
  - icon: 🛡️
    title: Seguridad de vanguardia
    details: Netzo se ejecuta en el entorno más moderno y seguro, aprovechando el poder de Deno para garantizar el más alto nivel de seguridad para tus aplicaciones.
  - icon: 💼
    title: Listo para TypeScript
    details: Los proyectos de Netzo están escritos en <code style="color:#0080ff;">JavaScript</code> con soporte nativo de <code style="color:#0080ff;">TypeScript</code>, lo que te permite construir aplicaciones de manera eficiente con control total.
  - icon: 🔄
    title: Escalabilidad sin complicaciones
    details: Disfruta de la escalabilidad sin esfuerzo, ya que tus aplicaciones escalan automáticamente para satisfacer tus necesidades, sin complicaciones, porque simplemente funciona.
  - icon: 🌐
    title: Aprovecha tecnologías abiertas
    details: Empodera tu código con bibliotecas y marcos de código abierto. Simplificamos el proceso, proporcionando funcionalidades listas para usar para agilizar los ciclos de desarollo sin quitarte el control.

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