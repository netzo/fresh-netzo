<script setup>
import { useEvents } from '@theme/composables/events'
import ListItem from '@theme/components/list/ListItem.vue'
import ButtonCta from '@theme/components/buttons/ButtonCta.vue'

const { trackVideoPlay } = useEvents()
</script>

# What is Netzo?

**Netzo is a cloud-based, agile-development platform that helps businesses streamline their custom internal tools development cycles.** Designed for business-wide productivity and collaboration, it enables developers to code, deploy and share custom internal tools faster with all teams.

<div class="w-full">
  <video
    allowfullscreen
    controls
    controlslist="nodownload captionssubtitles"
    loop
    class="w-full"
    poster="/netzo-intro-en.svg"
    onplay="trackVideoPlay()"
  >
    <source src="/netzo-intro-en.mp4" type="video/mp4">
    <track
    label="English"
    kind="subtitles"
    srclang="en"
    src="/netzo-intro-en.vtt"
    default
    />
    <track
    label="Español"
    kind="subtitles"
    srclang="es"
    src="/netzo-intro-es.vtt"
     />
   </video>
</div>

## What are internal tools?

Internal tools, also known as back-office apps, are software applications specifically designed to optimize a company's internal operations. Their primary objectives include: productivity, efficiency, and cost-effectiveness within the business.

By implementing internal tools, businesses can position themselves for growth and success. Some benefits include:

- 🚀 Streamline Operations
- ⏱️ Increase Efficiency
- 🤝 Improve Collaboration
- 📊 Enhance Decision-Making
- 📈 Ensure Scalability and Growth

## What's included?

- **🚀 App Launcher:** Quickly access custom internal applications, boosting productivity and workflow efficiency.

- **💻 In-browser IDE:** Simplify custom tool development with comprehensive in-browser toolset, one-click deployments, and collaboration features.

- **⚡ Netzo SDK and CLI for accelerated development:** Utilize the Netzo SDK and CLI to expedite development, both locally and specifically tailored for internal tooling.

- **🔒 Integration hub:** Connect to any database or API, securely manage your secrets and reduce the risk of data breaches while enabling more efficient work processes.
