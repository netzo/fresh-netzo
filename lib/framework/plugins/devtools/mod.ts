import type { NetzoConfig } from "../../../framework/mod.ts";
import { bindSignal } from "./plugins/bindSignal/mod.ts";

export const devtools = (_options: NetzoConfig["devtools"]): Plugin => {
  return {
    ...bindSignal(),
    name: "devtools",
  };
};
