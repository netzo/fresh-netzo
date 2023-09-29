<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/modules/htmx.svg" alt="netzo/modules/htmx" class="mb-5 w-75px">

# `htmx`

[HTMX](https://htmx.org) is a javascript library that allows you to access AJAX, WebSockets and Server Sent Events directly in HTML, using attributes, so you can build modern user interfaces with the simplicity and power of hypertext.

- **labels:** `html`, `javascript`, `hypertext`

## Usage

Register the module in `netzo.config.ts` and ensure `main.ts` and `dev.ts` are receive the `config` object as shown below.

::: code-group
```ts [netzo.config.ts]
import { defineNetzoConfig } from 'netzo/config.ts'

export default defineNetzoConfig({
  modules: {
    htmx: {}
  }
})
```
<<< src/main.ts
<<< src/dev.ts
:::

::: warning Fresh configuration [must](https://fresh.deno.dev/docs/concepts/ahead-of-time-builds#migrating-existing-projects-with-plugins) be defined in `netzo.config.ts`.
:::

## Configuration

```ts
import type { NetzoModule } from 'netzo/config.ts'

interface HtmxOptions extends NetzoModule {}
```

## References

- [HTMX](https://htmx.org/)
- [Introduction to HTMX](https://www.sitepoint.com/htmx-introduction/)
