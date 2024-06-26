import { defineUnocssConfig } from "netzo/plugins/unocss/plugin.ts";
import { presetUno } from "../../lib/deps/@unocss/preset-uno.ts";

export default defineUnocssConfig({
  url: import.meta.url,
  presets: [presetUno()],
});
