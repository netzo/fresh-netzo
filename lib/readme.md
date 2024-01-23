<div align="center" style="padding-top: 12px;">
  <a href="https://netzo.io" target="_blank">
    <img style="background: transparent; height: 96px;" src="https://netzo.io/logos/netzo-symbol-light.svg" alt="Netzo logo" />
  </a>
</div>

<h3 align="center">Netzo</h3>

<p align="center">
  The complete open-source framework for building web apps.
</p>

<p align="center">
  <a href="https://netzo.io"><strong>Website</strong></a> ·
  <a href="https://netzo.io/docs"><strong>Docs</strong></a> ·
  <a href="https://github.com/netzo/netzo/issues"><strong>Issues</strong></a> ·
  <a href="https://discord.gg/tbDUpRQCTk"><strong>Discord</strong></a>
</p>

<div align="center" style="margin-top: 24px;">

[![Discord](https://discord.com/api/guilds/1069584352415068251/widget.png)](https://discord.gg/tbDUpRQCTk)
[![Follow on Twitter](https://img.shields.io/twitter/follow/netzoio.svg?label=follow+netzoio)](https://twitter.com/netzoio)
[![GitHub Repo stars](https://img.shields.io/github/stars/netzo/netzo?style=social)](https://github.com/netzo/netzo)

</div>

## What is Netzo?

Netzo is a batteries-included meta-framework for [Deno Fresh](https://fresh.deno.dev/). It offers a collection of modules and opinionated best practices, empowering developers to build web apps faster without sacrificing flexibility.

## Main Features

- 🌐 [**APIs**](/docs/platform/apis): Collection of integrations for popular HTTP APIs and services.

- 🔒 [**Authentication**](/docs/platform/authentication): Simple user management and role-based access control (RBAC).

- 🗃️ [**Database**](/docs/platform/database): Simple data management for the multi-model, real-time database that powers apps.

- 🔔 [**Notifications**](/docs/platform/notifications): Built-in notifications system to push messages to app users in real-time.

- 🧩 [**Components**](/docs/platform/components): Customizable UI components and building blocks to import/copy-paste into apps (powered by [`shadcn-ui`]([url](https://ui.shadcn.com/)).

- 💻 [**CLI**](/docs/platform/cli): Command-line interface (CLI) to help you develop and deploy Netzo applications.


## Why Netzo?

Custom business app development has challenges. Low-code tools ease the first 60% but struggle with complexity in the remaining 40%. Traditional development is complex and time-consuming. In business software, speed and efficiency often matter more than flexibility and control.

Our goal is to provide full-code flexibility at no-code speeds by packaging common elements, allowing developers to focus on writing code.

## Tech Stack

- **Runtime:** Powered by [Deno](https://deno.com), the modern and secure JavaScript runtime, ensuring efficiency and a superior developer experience.

- **Infrastructure:** [Deno subhosting](https://deno.com/subhosting) for multi-layered security with Google's V8, Rust, and Linux containers, providing a secure environment for running untrusted code without compromising reliability.

- **Database:** [Deno KV](https://deno.com/kv), a fast, reliable, and secure key-value database, perfectly suited for Netzo's data storage needs.

- **Framework:** Built on [Deno Fresh](https://fresh.deno.dev/), a next-gen web framework designed for rapid development, contributing to Netzo's speed, reliability, and simplicity.

  - **[shadcn-ui](https://ui.shadcn.com/):** Beautifully designed, accessible, and customizable components.
  - **[UnoCSS](https://unocss.dev/):** An instant, on-demand atomic CSS engine, ensuring better performance and joyful development experiences.

## Quick start

1. [Install Deno CLI](https://docs.deno.com/runtime/manual/getting_started/installation)

2. [Install Netzo CLI](https://netzo.io/docs/get-started/installation)

```bash
deno install -Arf https://deno.land/x/netzo/cli/netzo.ts
```

3. [Initialize project](https://netzo.io/docs/get-started/initialize-project)

```bash
netzo init
```

4. [Run project](https://netzo.io/docs/get-started/run-project)

```bash
deno task start
```

5. [Deploy project](https://netzo.io/docs/get-started/deploy-project)

```bash
netzo deploy --build --production
```

> To deploy your project, you need to create a project in the [Netzo Platform](https://app.netzo.io) if you don't already have one.

## Contribute

Contributions are always welcome! Please read the [contribution guideline](https://github.com/netzo/netzo/blob/main/contributing.md) first.
