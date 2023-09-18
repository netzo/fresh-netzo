import { injectScript, injectStylesheet } from "../utils.ts";
import { FlowbiteOptions } from "./mod.ts";

export default function main(state: FlowbiteOptions = {}) {
  injectScript({
    src:
      "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js",
  });
  const { additionalScripts = [], additionalStylesheets = [] } = state;
  additionalScripts.forEach((src) => injectScript({ src }));
  additionalStylesheets.forEach((href) => injectStylesheet({ href }));
}
