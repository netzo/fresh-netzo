<script setup>
import { useEvents } from '@theme/composables/events'
import ListItem from '@theme/components/list/ListItem.vue'
import ButtonCta from '@theme/components/buttons/ButtonCta.vue'

const { trackVideoPlay } = useEvents()
</script>

# ¿Qué es Netzo?

**Netzo es una plataforma de desarrollo ágil basada en la nube que ayuda a las empresas a optimizar el ciclo de desarrollo de sus apps empresariales a medida.** Diseñada para aumentar la productividad y facilitar la colaboración en toda la empresa, permite a los desarrolladores programar, implementar y compartir apps empresariales a medida de forma más rápida con todos los equipos.

<div class="w-full">
  <video
    allowfullscreen
    controls
    controlslist="nodownload captionssubtitles"
    loop
    class="w-full"
    poster="/netzo-intro-es.svg"
    onplay="trackVideoPlay()"
  >
    <source src="/netzo-intro-es.mp4" type="video/mp4">
    <track
    label="English"
    kind="subtitles"
    srclang="en"
    src="/netzo-intro-en.vtt"
    />
    <track
    label="Español"
    kind="subtitles"
    srclang="es"
    src="/netzo-intro-es.vtt"
    default />
   </video>
</div>

## ¿Qué son las apps empresariales a medida?

Las apps empresariales a medida, también conocidas como aplicaciones de back-office, son aplicaciones de software diseñadas específicamente para optimizar las operaciones internas de una empresa. Sus objetivos principales incluyen la productividad, la eficiencia y la rentabilidad dentro del negocio.

Al implementar apps empresariales a medida, las empresas pueden posicionarse para el crecimiento y el éxito. Algunos beneficios incluyen:

- 🚀 Optimización de operaciones
- ⏱️ Aumento de la eficiencia
- 🤝 Mejora de la colaboración
- 📊 Mejora de la toma de decisiones
- 📈 Garantía de escalabilidad y crecimiento

## ¿Qué se incluye?

- **🚀 Lanzador de aplicaciones:** Gestiona fácilmente las apps empresariales a medida visibles para los equipos de tu empresa, aumentando la productividad y la eficiencia del flujo de trabajo.

- **💻 IDE de tu elección:** Simplifica el desarrollo de software empresarial a medida desde el IDE de tu elección.

- **⚡ Netzo SDK y CLI para un desarrollo acelerado:** Utiliza el SDK y el CLI de Netzo para agilizar el desarrollo, tanto a nivel local como específicamente adaptado para apps empresariales a medida.

- **🔒 Centro de integración:** Conéctate a cualquier base de datos o API, administra de forma segura tus secretos y reduce el riesgo de violaciones de datos, al tiempo que habilitas procesos de trabajo más eficientes.
