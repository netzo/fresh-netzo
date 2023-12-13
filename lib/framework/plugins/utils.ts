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
  const PLUGINS = ["kv", "auth", "api", "layout", "theme", "devtools"];
  const pluginsWithDuplicates = (await Promise.all(
    PLUGINS.map(async (name) => {
      if (!state.config?.[name]?.enabled) return; // skip disabled plugins
      switch (name) {
        case "kv": {
          return;
        }
        case "auth": {
          const mod = await import("./auth/mod.ts");
          return [mod.auth(state.config[name])];
        }
        case "layout": {
          const mod = await import("./layout/mod.ts");
          const { theme } = await import("./theme/mod.ts");
          return [
            mod.layout(state.config[name]),
            theme(state.config.theme),
          ];
        }
        case "theme": {
          const mod = await import("./theme/mod.ts");
          return [mod.theme(state.config[name])];
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
