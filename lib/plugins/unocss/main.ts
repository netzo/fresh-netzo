import type { Options } from "./mod.ts";
import { injectScript } from "../utils.ts";

export default function main(options: Options) {
  injectScript(`https://cdn.jsdelivr.net/npm/@unocss/runtime/${options.build}.global.js`);
}