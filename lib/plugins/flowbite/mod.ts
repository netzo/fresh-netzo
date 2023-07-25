import { Plugin } from "fresh/server.ts";

export type FlowbitePluginOptions = {
  additionalStylesheets?: string[];
  additionalScripts?: string[];
  plugins?: {
    datepicker?: boolean;
  };
};

export default (options: FlowbitePluginOptions = {}): Plugin => {
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
        scripts: [
          {
            entrypoint: "main",
            state: options,
          },
        ],
      };
    },
  };
};
