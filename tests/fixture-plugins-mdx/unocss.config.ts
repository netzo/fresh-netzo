import { defineUnocssConfig } from "netzo/plugins/unocss/plugin.ts";
import { presetNetzo } from "netzo/plugins/unocss/preset-netzo.ts";

export default defineUnocssConfig({
  url: import.meta.url,
  presets: [
    presetNetzo(),
  ],
});
