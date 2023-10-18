<script setup>
import ListItem from '@theme/components/list/ListItem.vue'
import CardNav from '@theme/components/CardNav.vue'
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
</script>

# Getting Started

**Netzo is a cloud-based, agile-development platform that helps businesses streamline their custom business software development cycles.** Designed for organization-wide productivity and collaboration, it enables developers to code, deploy and share custom business software faster with all teams.

<div class="w-full">
  <video
    allowfullscreen
    controls
    class="w-full"
  >
    <source src="/netzo-overview.mp4" type="video/mp4">
  </video>
</div>

<!-- ## Quick Start

This guide skips over lengthy, technical descriptions for now, the goal here is to get you up and running quickly.

1. Head over to [app.netzo.io](https://app.netzo.io) and sign up to create a new account.
2. Click on the newly created workspace to navigate into it.
3. Click on the blue `Create` button to create a new project.
4. Navigate by clicking either the `Edit` or `Preview` buttons in the top right. -->

## Main Features

<ListItem
  text="<strong>Powered by Deno:</strong> Built on the next generation JavaScript and TypeScript runtime to boost DX."
  icon="i-logos-deno"
/>
<ListItem
  text="<strong>Full Node.js and NPM support:</strong> Import Node.js code and packages directly into your projects."
  icon="i-mdi-nodejs"
/>
<ListItem
  text="<strong>Serverless:</strong> Instantly deploy your code globally to the edge. No infrastructure to provision or manage."
  icon="i-fxemoji-lightningmood"
/>
<ListItem
  text="<strong>Native TypeScript:</strong> Use TypeScript without builds or complex setups. Enjoy auto-completion and type safety."
  icon="i-logos-typescript-icon"
/>

<ListItem
  text="<strong>URL imports and enhanced portability:</strong> Forget node_modules. Import code directly from versioned URLs without installation."
  icon="i-mdi-package-variant-closed"
/>
<ListItem
  text="<strong>Managed secrets:</strong> Keep secrets safe through an extra layer of security and re-use them fast when coding."
  icon="i-mdi-asterisk"
/>
<ListItem
  text="<strong>Code locally via the Netzo CLI:</strong> Code in your favorite IDE and deploy to the cloud using <code>netzo/cli</code> with no extra setup or tooling."
  icon="i-mdi-console"
/>
<ListItem
  text="<strong>Built-in toolbox of components and utilities:</strong> Import from <code>netzo</code>, a toolbox of components and utilities made to 10x your DX when developing software solutions."
  icon="i-mdi-toolbox"
/>
<ListItem
  text="<strongEU-based and GDPR compliant:</strong> We are based in the EU and fully compliant with GDPR. We embrace privacy and security by design."
  icon="i-emojione-flag-for-european-union"
/>

## Modules

<!-- NOTE: pass in 'compact' prop if using with `aside: false` -->
<!-- NOTE: could split into H3 groups via `en.components.filter(...)` -->
<SectionDocsCards :items="en.modules">
  <template #image="{ src, title }">
    <img
      class="mt-5 ml-4 max-w-14 max-h-14"
      v-bind="{ src, title }"
    >
  </template>
</SectionDocsCards>

## Quick Links

The documentation is organized into the following sections based on the intended outcomes. Feel free to jump directly into the section that best fits your needs.

<ListItem
  text="<a href=/docs/examples/overview>Examples</a> are <strong>learning-oriented</strong> and ideal to get you started quickly (e.g. how to create projects)."
  icon="i-mdi-lightbulb"
/>
<ListItem
  text="<a href=/docs/guides/overview>Guides</a> are <strong>goal-oriented</strong> and ideal to help you achieve a specific goal (e.g. how to create a REST API)."
  icon="i-mdi-ray-start-arrow"
/>
<ListItem
  text="<a href=/docs/platform/overview>Platform</a> is <strong>understanding-oriented</strong> and ideal as an overview of the platform (e.g. overview of the platform)."
  icon="i-mdi-book-open-page-variant"
/>
<ListItem
  text="<a href=/docs/concepts/overview>Concepts</a> are <strong>information-oriented</strong> and ideal to grasp the main concepts (e.g. lists of all platform modules)."
  icon="i-mdi-format-list-bulleted"
/>
