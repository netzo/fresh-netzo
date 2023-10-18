---
layout: home
title: Projects | Products
description:
hero:
  name: Projects
  text: Serverless apps that automatically scale
  tagline: "Build fast, deploy instantly with zero limitations: Netzo is built with flexibility in mind, so you can build whatever you need - zero restrictions."
  # image:
  #   src: /images/home/3-share.svg
  #   alt: Inbox
  actions:
    - theme: brand
      text: Book a Call
      link: https://calendar.app.google/uHEnkfwpgYSM1ppN6
    - theme: alt
      text: Learn More
      link: /docs/platform/projects

features:
  - icon: 🛠️
    title: Build with code, 10x faster
    details: Netzo lets you build business software with the same flexibility as building from scratch, minus the time-consuming, costly intricacies.
  - icon: ⚡
    title: Instant, global deployments
    details: Forget about setting up and maintaining fragile cloud infrastructure. Deploy your apps globally in one-click.
  - icon: 🛡️
    title: Cutting-Edge Security
    details: Netzo runs on the most modern and secure runtime, leveraging the power of Deno to ensure the highest level of security for your applications.
  - icon: 🔄
    title: Seamless scalability
    details: Enjoy effortless scalability as your apps automatically expand to meet your growing needs, all without the hassle—because it just works.
  - icon: 🌐
    title: Embrace open technologies
    details: Empower your code with open-source libraries and frameworks. We simplify the process, providing out-of-the-box functionalities to enhance your code without sacrificing control.
  - icon: 🤖
    title: Leverage the best AI tools
    details: Netzo empowers your developers to work locally, unleashing the full potential of premier AI tools like <a style="color:#0000FF; text-decoration:underline;" href="https://github.com/features/copilot" target="_blank">GitHub Copilot</a>, supercharging productivity and driving innovation.
  - icon: 💻
    title: Empowering developers in their comfort zone
    details: With Netzo, developers can create applications directly within their preferred coding environment such as Visual Studio Code (VSCode), for a more efficient and familiar coding experience.
  - icon: 🚀
    title: Versioning & deployments
    details: Review and deploy changes easily. Integrate with your favorite source control providers such as GitHub, GitLab and improve your CI/CD.
  - icon:  💼
    title: TypeScript ready
    details: Netzo projects are written in <code style="color:#0080ff;">JavaScript</code> and native <code style="color:#0080ff;">TypeScript</code> support, allowing you to build apps efficiently with complete control.
---

<script setup>
import BannerCta from '@theme/components/banners/BannerCta.vue'
import Footer from '@theme/components/Footer.vue'
import locale from '@theme/../../locales/en'
</script>

<section class="mt-32">
  <BannerCta v-bind="locale.home.sectionBannerCta" />

  <!-- <NewsLetter /> -->

  <Footer v-bind="locale.footer" />
</section>


