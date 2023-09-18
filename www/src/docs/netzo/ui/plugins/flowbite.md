<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/plugins/flowbite.svg" alt="netzo/ui/plugins/flowbite" class="mb-5 w-75px">

# `flowbite`

[Flowbite](https://flowbite.com) is an open-source library of over 600+ UI components, sections, and pages built with the utility classes from Tailwind CSS and designed in Figma.

- **labels:** `css`, `components`, `tailwindcss`

## Usage

Register the plugin in `fresh.config.ts` and ensure `main.ts` and `dev.ts` are receive the `config` object as shown below.

::: code-group
```ts [fresh.config.ts]
import { flowbite } from 'netzo/ui/plugins/flowbite/mod.ts'

await start(manifest, {
  plugins: [flowbite()]
})
```
<<< src/main.ts
<<< src/dev.ts
:::

::: warning Fresh configuration [must](https://fresh.deno.dev/docs/concepts/ahead-of-time-builds#migrating-existing-projects-with-plugins) be defined in `fresh.config.ts`.
:::

## Configuration

```ts
interface FlowbiteOptions {
  additionalStylesheets?: string[]
  additionalScripts?: string[]
  plugins?: {
    datepicker?: boolean
  }
}
```

## References

- [Flowbite](https://flowbite.com/)
