import type { Plugin } from "../../deps.ts";

export interface Options {
  // see https://unocss.dev/integrations/runtime#builds
  build?: 'uno' | 'core' | 'attributify' | 'mini'
}

export default function unocss(options: Options = { build: 'uno' }): Plugin {
  return {
    name: "unocss",
    entrypoints: { "main": import.meta.resolve("./main.ts") },
    render(ctx) {
      ctx.render();
      return {
        scripts: [
          {
            entrypoint: "main",
            state: options,
          },
        ],
      };
    }
  }
}