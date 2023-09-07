import type { Plugin } from "$fresh/server.ts";

// deno-lint-ignore no-empty-interface
export interface DaisyuiOptions {}

export const daisyui = (options: DaisyuiOptions = {}): Plugin => {
  return {
    name: "daisyui",
    entrypoints: { "main": import.meta.resolve("./main.ts") },
    render(ctx) {
      ctx.render();
      return {
        scripts: [{ entrypoint: "main", state: options }],
      };
    },
  };
};
