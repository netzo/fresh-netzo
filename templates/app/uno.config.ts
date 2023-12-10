import { defineConfig } from "netzo/framework/plugins/theme/mod.ts";
import { presetNetzo } from "netzo/framework/plugins/theme/plugins/preset-netzo.ts";

export default defineConfig({
  presets: [
    presetNetzo({
      color: "zinc",
      radius: 0.5,
    }),
  ],
});
