<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/modules/unocss.svg" alt="netzo/modules/unocss" class="mb-5 w-75px">

# `unocss`

[UnoCSS](https://unocss.dev) is an instant, on-demand atomic CSS engine. It generates atomic CSS classes on the fly based on the classes and attributes used in your project.

- **labels:** `css`, `components`, `unocss`

## Usage

Register the plugin in `netzo.config.ts` and ensure `main.ts` and `dev.ts` are receive the `config` object as shown below.

::: code-group
```ts [netzo.config.ts]
import { defineNetzoConfig } from 'netzo/config.ts'
import { unocss } from 'netzo/modules/unocss/mod.ts'
import { presetNetzo } from 'netzo/modules/unocss/preset-netzo.ts'

export default defineNetzoConfig({
  fresh: {
    plugins: [
      unocss({
        presets: [presetNetzo()]
      // ...additional configuration
      })
    ]
  }
})
```
<<< src/main.ts
<<< src/dev.ts
:::

::: warning Fresh configuration [must](https://fresh.deno.dev/docs/concepts/ahead-of-time-builds#migrating-existing-projects-with-plugins) be defined in `netzo.config.ts`.
:::

## Configuration

This plugin accepts the original UnoCSS [`UserConfig`](https://unocss.dev/config) object.

```ts
interface UnocssOptions extends UserConfig {
  // see https://unocss.dev/config
}
```

## References

- [UnoCSS](https://unocss.dev/)
