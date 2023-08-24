# Minimal

An example to illustrate the minimum requirements for a project.

## 📄 `main.tsx`

The `main.tsx` file is the entrypoint of your project. It is the only file that is required to be present and the one that actually gets executed (e.g. `deno run -A main.tsx`). The project's module graph will be built dynamically from this file and all its dependencies.

```tsx
Deno.server(() => new Response('Hello World!'))
```
