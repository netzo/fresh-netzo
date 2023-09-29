import type { NetzoModule } from "../../config.ts";

// deno-lint-ignore no-empty-interface
export interface HtmxOptions extends NetzoModule {}

export default (options: HtmxOptions = {}): NetzoModule => {
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
