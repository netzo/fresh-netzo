import type { Plugin } from "../../../deps/$fresh/server.ts";
import type { NetzoConfig } from "../../../framework/mod.ts";
import { bindSignal } from "./plugins/bindSignal/mod.ts";
import { enabled } from "../mod.ts";

export const devtools = (options: NetzoConfig["devtools"]): Plugin => {
  if (!enabled(options)) return { name: "devtools" };

  return {
    ...bindSignal(),
    name: "devtools",
  };
};
