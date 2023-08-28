<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/plugins/daisyui.svg" alt="netzo/ui/plugins/daisyui" class="mb-5 w-75px">

# `daisyui`

[DaisyUI](https://daisyui.com) is a component library for Tailwind CSS that allows you to easily build beautiful UIs for your web apps.

- **labels:** `css`, `components`, `tailwindcss`

## Usage

Register the plugin in `fresh.config.ts` and ensure `main.ts` and `dev.ts` are receive the `config` object as shown below.

::: code-group
```ts [fresh.config.ts]
import { daisyui } from 'netzo/ui/plugins/daisyui/mod.ts'
import { defineConfig } from '$fresh/server.ts'

export default defineConfig({
  plugins: [daisyui()],
})
```
<<< src/main.ts
<<< src/dev.ts
:::

::: warning Fresh configuration [must](https://fresh.deno.dev/docs/concepts/ahead-of-time-builds#migrating-existing-projects-with-plugins) be defined in `fresh.config.ts`.
:::

## Configuration

```ts
interface DaisyuiOptions {}
```

## References

- [DaisyUI](https://daisyui.com/)
