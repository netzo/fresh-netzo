import { defineConfig } from "netzo/framework/plugins/unocss/mod.ts";
import { presetNetzo } from "netzo/framework/plugins/unocss/preset-app.netzo.ts";

export default defineConfig({
  presets: [
    presetNetzo({
      color: "zinc",
      radius: 0.5,
    }),
  ],
});
