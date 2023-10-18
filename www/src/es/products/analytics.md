---
layout: home
title: Analíticas | Productos
description: Monitorea tus apps y flujos de trabajo
hero:
  name: Analíticas
  text: Realiza seguimientos y análisis rápido
  tagline: Nunca pierdas de vista cómo están funcionando tus aplicaciones. La resolución de problemas nunca ha sido tan fácil.

  actions:
    - theme: brand
      text: Agendar una Llamada
      link: https://calendar.app.google/uHEnkfwpgYSM1ppN6
    - theme: alt
      text: Próximamente
      # link: /docs/platform/projects/authentication

features:
  - icon: 📊
    title: Busca y analizar registros
    details: Accede y analiza sin esfuerzo los registros de todas tus aplicaciones para obtener información valiosa sobre su rendimiento.

  - icon: 🚀
    title: Streaming de datos en tiempo real
    details: Aprovecha las capacidades de streaming de datos en tiempo real. Monitoreé métricas cruciales a medida que ocurren, lo que te permite responder de inmediato a las tendencias cambiantes y a las oportunidades.

  - icon: 📈
    title: Monitoreo de Puntos de Acceso de la API
    details: Obten información valiosa sobre el rendimiento y el uso de tus APIs con herramientas de monitoreo integrales. Realice un seguimiento de los tiempos de respuesta de los puntos de acceso, las tasas de error y los patrones de uso, lo que te ayuda a identificar áreas de mejora y optimización.

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