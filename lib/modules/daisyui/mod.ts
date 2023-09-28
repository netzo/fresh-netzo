import type { NetzoModule } from "../../config.ts";

// deno-lint-ignore no-empty-interface
export interface DaisyuiOptions extends NetzoModule {}

export const daisyui = (options: DaisyuiOptions = {}): NetzoModule => {
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
