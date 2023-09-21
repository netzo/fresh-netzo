<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/plugins/daisyui.svg" alt="netzo/ui/plugins/daisyui" class="mb-5 w-75px">

# `daisyui`

[DaisyUI](https://daisyui.com) is a component library for Tailwind CSS that allows you to easily build beautiful UIs for your web apps.

- **labels:** `css`, `components`, `tailwindcss`

## Usage

Register the plugin in `netzo.config.ts` and ensure `main.ts` and `dev.ts` are receive the `config` object as shown below.

::: code-group
```ts [netzo.config.ts]
import { defineNetzoConfig } from 'netzo/config/mod.ts'
import { daisyui } from 'netzo/ui/plugins/daisyui/mod.ts'

export default defineNetzoConfig({
  plugins: [daisyui()],
})
```
<<< src/main.ts
<<< src/dev.ts
:::

::: warning Fresh configuration [must](https://fresh.deno.dev/docs/concepts/ahead-of-time-builds#migrating-existing-projects-with-plugins) be defined in `netzo.config.ts`.
:::

## Configuration

```ts
interface DaisyuiOptions {}
```

## References

- [DaisyUI](https://daisyui.com/)
