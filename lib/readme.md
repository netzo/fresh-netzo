<div align="center" style="padding-top: 12px;">
  <a href="https://netzo.io" target="_blank">
    <img style="background: transparent; height: 96px;" src="https://netzo.io/logos/netzo-symbol-light.svg" alt="Netzo logo" />
  </a>
</div>

<h3 align="center">Netzo</h3>

Productive open-source framework for building business web apps.

[Website](https://netzo.io) · [Docs](https://netzo.io/docs) ·
[Issues](https://github.com/netzo/netzo/issues) · [Discord](https://discord.gg/tbDUpRQCTk)

---

<div align="center" style="margin-top: 24px;">

[![Discord](https://discord.com/api/guilds/1069584352415068251/widget.png)](https://discord.gg/tbDUpRQCTk)
[![Follow on Twitter](https://img.shields.io/twitter/follow/netzoio.svg?label=follow+netzoio)](https://twitter.com/netzoio)
[![GitHub Repo stars](https://img.shields.io/github/stars/netzo/netzo?style=social)](https://github.com/netzo/netzo)

</div>

> **We are on our [road to v1](https://netzo.io/roadmap/)! Be sure to pin version via `netzo@X.Y.Z`
> to ensure things don't break.**

## What is Netzo?

Netzo is a platform and batteries-included meta-framework for Deno Fresh. It offers a collection of
modules and opinionated best practices, empowering developers to build web apps faster without
sacrificing flexibility.

- **Platform:** a cloud platform to deploy, manage, and scale your apps.
- **Framework:** built on **Deno Fresh**, a next-gen web framework designed for rapid development.

## Why Netzo?

> "Low-code tools make the first 60% easy, and the remaining 40% impossible."

Custom business app development has challenges. Traditional development is complex and
time-consuming. In business software not only is flexibility but speed and efficiency are paramount.
Our goal is to provide full-code flexibility at no-code speeds boosting developer productivity and
enabling them to build apps 10x faster.

## Main Features

- **Authentication:** built-in user management and role-based access control (RBAC).
- **Database:** built-in **Deno KV** database, a fast, reliable, and secure key-value database.
- **Components:** beautifully designed, accessible, and customizable components based on
  [`shadcn/ui`](https://ui.shadcn.com/)
- **Integrations:** a growing list of plug-and-play integrations for popular APIs and Databases.
- **CSS/Styling:** built-in, pre-defined themes powered by **UnoCSS**, an instant, on-demand atomic
  CSS engine.
- **CLI:** command-line interface (CLI) to help you develop and deploy Netzo applications.

## Quick start

1. [Install Deno CLI](https://docs.deno.com/runtime/manual/getting_started/installation)

2. [Install Netzo CLI](https://netzo.io/docs/get-started/installation)

```bash
deno install -Arfg https://deno.land/x/netzo/cli/netzo.ts
```

3. [Initialize project](https://netzo.io/docs/get-started/initialize-project)

```bash
git clone https://github.com/netzo/template-minimal
cd template-minimal
```

4. [Run project](https://netzo.io/docs/get-started/run-project)

```bash
deno task start
```

5. [Deploy project](https://netzo.io/docs/get-started/deploy-project)

```bash
netzo deploy --build --production
```

> To deploy your project, you need to create a project in the [Netzo Platform](https://app.netzo.io)
> if you don't already have one.

## Contribute

Contributions are always welcome! Please read the
[contribution guideline](https://github.com/netzo/netzo/blob/main/contributing.md) first.
