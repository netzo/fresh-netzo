import { defineConfig } from "./unocss.ts";
import presetNetzo from "./preset-netzo.ts";

export default defineConfig({
  presets: [presetNetzo({ color: "blue", radius: 0.5 })],
});
