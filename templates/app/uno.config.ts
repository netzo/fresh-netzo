import { defineConfig } from "netzo/plugins/unocss/mod.ts";
import { presetNetzo } from "netzo/plugins/unocss/preset-netzo.ts";

export default defineConfig({
  presets: [
    presetNetzo({
      color: "zinc",
      radius: 0.5,
    }),
  ],
});
