// see https://github.com/netzo/netzo/issues/38
import { Plugin } from "../../../../../deps/$fresh/src/server/mod.ts";
import { setup } from "./shared.ts";

/**
 * A fresh plugin for two-way binding of signals to DOM elements via the `bind:value` attribute.
 * @example
 * function BindDemo() {
 *   const signal = useSignal("");
 *     return (
 *       <div>
 *         <h1>Preact signal bind demo</h1>
 *         <label for="input">Some text</label>
 *         <input id="input" bind:value={signal} />
 *       <p>Input value: {signal}</p>
 *      </div>
 *   );
 * }
 */
export const bindSignal = (): Plugin => {
  setup();
  const url = new URL("./main.ts", import.meta.url).href;
  const main = `data:application/javascript,import hydrate from "${url}";
export default function(state) { hydrate(); }
`;
  return {
    name: "bindSignal",
    entrypoints: { main },
    async renderAsync(ctx) {
      await ctx.renderAsync();
      return {
        scripts: [{ entrypoint: "main", state: [] }],
      };
    },
  };
};
