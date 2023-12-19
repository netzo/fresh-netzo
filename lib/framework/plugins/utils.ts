import type { Plugin } from "../../deps/$fresh/server.ts";
import { logInfo } from "../utils/console.ts";
import type { NetzoState } from "../mod.ts";

/**
 * An internal utility to bundle plugins based on app configuration.
 * @param state {NetzoState} - the app configuration
 * @returns {Promise<Plugin[]>} - the bundled plugins
 */
export async function createPluginsForModules(
  state: NetzoState,
): Promise<Plugin[]> {
  // NOTE: async plugin initialization is parallelized for better performance
  const PLUGINS = ["auth", "ui", "api", "devtools"];
  const UI = ["head", "nav", "header", "footer", "theme"];
  const pluginsWithDuplicates = (await Promise.all(
    PLUGINS.map(async (name) => {
      if (["ui"].includes(name)) {
        const enabled = UI.filter((key) => !!state.config?.ui?.[key]?.enabled);
        if (!enabled.length) return; // skip if no UI plugins are enabled
      } else if (!state.config?.[name]?.enabled) return; // skip disabled plugins

      switch (name) {
        case "auth": {
          const mod = await import("./auth/mod.ts");
          return [mod.auth(state.config[name])];
        }
        case "ui": {
          const mod = await import("./ui/mod.ts");
          return [mod.ui(state.config[name])];
        }
        case "api": {
          const mod = await import("./api/mod.ts");
          return [mod.api(state.config[name])];
        }
        case "devtools": {
          const mod = await import("./devtools/mod.ts");
          return [mod.devtools(state.config[name])];
        }
      }
    }),
  )).flat().filter((plugin) => !!plugin?.name);

  // deduplicate plugins by name (uses includes(searchElement, fromIndex))
  const names = pluginsWithDuplicates.map(({ name }) => name);
  const plugins = pluginsWithDuplicates.filter(
    ({ name }, i) => !names.includes(name, i + 1),
  );
  logInfo(`Plugins: ${
    plugins.map(
      ({ name }) => `${!!state.config[name]?.enabled ? "✅" : "❌"} ${name}`,
    ).join(" | ")
  }`);

  return plugins;
}
