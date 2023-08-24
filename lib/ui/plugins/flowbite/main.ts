import { injectScript, injectStylesheet } from "../utils.ts";
import { FlowbiteOptions } from "./mod.ts";

export default function main(state: FlowbiteOptions = {}) {
  injectScript(
    "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js",
  );
  const { additionalScripts = [], additionalStylesheets = [] } = state;
  additionalScripts.forEach((script) => injectScript(script));
  additionalStylesheets.forEach((stylesheet) => injectStylesheet(stylesheet));
}
