import type { Plugin } from "../deps.ts";

// deno-lint-ignore no-empty-interface
export interface HtmxOptions {}

export const htmx = (options: HtmxOptions = {}): Plugin => {
  return {
    name: "htmx",
    entrypoints: { "main": import.meta.resolve("./main.ts") },
    render(ctx) {
      ctx.render();
      return {
        scripts: [{ entrypoint: "main", state: options }],
      };
    },
  };
};
