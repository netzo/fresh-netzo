<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/plugins/flowbite.svg" alt="netzo/plugins/flowbite" class="mb-5 w-75px">

# `flowbite`

[Flowbite](https://flowbite.com) is an open-source library of over 600+ UI components, sections, and pages built with the utility classes from Tailwind CSS and designed in Figma.

- **labels:** `css`, `components`, `tailwindcss`

## Usage

```ts
import { flowbite } from 'netzo/plugins/flowbite/mod.ts'

await start(manifest, {
  plugins: [flowbite()]
})
```

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

- [Flowbite](https://flowbite.dev/)
