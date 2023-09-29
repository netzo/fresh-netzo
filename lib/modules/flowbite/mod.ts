import type { NetzoModule } from "../../config.ts";

export interface FlowbiteOptions extends NetzoModule {
  additionalStylesheets?: string[];
  additionalScripts?: string[];
  plugins?: {
    datepicker?: boolean;
  };
}

export default (options: FlowbiteOptions = {}): NetzoModule => {
  if (!options.additionalScripts) options.additionalScripts = [];
  if (!options.additionalStylesheets) options.additionalStylesheets = [];
  if (!options.plugins) options.plugins = { datepicker: true };

  if (options.plugins.datepicker) {
    options.additionalScripts.push(
      "https://unpkg.com/flowbite@1.6.3/dist/datepicker.js",
    );
  }

  return {
    name: "flowbite",
    entrypoints: { "main": import.meta.resolve("./main.ts") },
    render(ctx) {
      ctx.render();
      return {
        scripts: [{ entrypoint: "main", state: options }],
      };
    },
  };
};
