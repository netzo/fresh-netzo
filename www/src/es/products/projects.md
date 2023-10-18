---
layout: home
title: Proyectos | Productos
description: Base de Datos Totalmente Gestionada e Integrada
hero:
  name: Proyectos
  text: Apps que escalan automáticamente
  tagline: "Construye rápido, despliega al instante, sin limitaciones: Netzo está diseñado con flexibilidad en mente, por lo que puedes construir lo que necesites - sin restricciones."

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
    title: Despliegues instantáneas y globales
    details: Olvídate de configurar y mantener infraestructura en la nube. Despliega tus aplicaciones a nivel global con un solo clic.
  - icon: 🛡️
    title: Seguridad de vanguardia
    details: Netzo se ejecuta en el entorno más moderno y seguro, aprovechando el poder de Deno para garantizar el más alto nivel de seguridad para tus aplicaciones.
  - icon: 🔄
    title: Escalabilidad sin complicaciones
    details: Disfruta de la escalabilidad sin esfuerzo, ya que tus aplicaciones escalan automáticamente para satisfacer tus necesidades, sin complicaciones, porque simplemente funciona.
  - icon: 🌐
    title: Aprovecha tecnologías abiertas
    details: Empodera tu código con bibliotecas y marcos de código abierto. Simplificamos el proceso, proporcionando funcionalidades listas para usar para agilizar los ciclos de desarollo sin quitarte el control.
  - icon: 🤖
    title: Utiliza las mejores herramientas de IA
    details: Netzo permite a tus programadores trabajar localmente, y utilizar las mejores herramientas de IA como <a style="color:#0000FF; text-decoration:underline;" href="https://github.com/features/copilot" target="_blank">GitHub Copilot</a>, impulsando la productividad y facilitando la innovación.
  - icon: 💻
    title: Ayudamos a tus programadores en su zona de confort
    details: Con Netzo, tus programadores pueden crear aplicaciones directamente en su entorno de codificación preferido, como Visual Studio Code (VSCode), para una experiencia de codificación más eficiente y familiar.
  - icon: 🚀
    title: Control de versiones y despliegues
    details: Revisa y despliega cambios fácilmente. Integra con tus proveedores de control de código favoritos como GitHub, GitLab y mejora tu CI/CD.
  - icon: 💼
    title: Listo para TypeScript
    details: Los proyectos de Netzo están escritos en <code style="color:#0080ff;">JavaScript</code> con soporte nativo de <code style="color:#0080ff;">TypeScript</code>, lo que te permite construir aplicaciones de manera eficiente con control total.

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