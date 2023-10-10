<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/modules/daisyui.svg" alt="netzo/modules/daisyui" class="mb-5 w-75px">

# `daisyui`

[DaisyUI](https://daisyui.com) is a component library for Tailwind CSS that allows you to easily build beautiful UIs for your web apps.

- **labels:** `css`, `components`, `tailwindcss`

## Usage

Register the module in `netzo.config.ts` and ensure `main.ts` and `dev.ts` are receive the `config` object as shown below.

::: code-group
```ts [netzo.config.ts]
import { defineNetzoConfig } from 'netzo/config.ts'

export default defineNetzoConfig({
  modules: {
    daisyui: {}
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

interface DaisyuiOptions extends NetzoModule {}
```

## References

- [DaisyUI](https://daisyui.com/)
