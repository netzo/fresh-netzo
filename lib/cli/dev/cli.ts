// adapted from https://github.com/denoland/fresh/blob/main/src/dev/cli.ts
import { type FreshConfig } from "../../deps/$fresh/server.ts";
import { manifest } from "../../deps/$fresh/src/dev/mod.ts";
import { join, toFileUrl } from "../../deps/std/path/mod.ts";

const [cmd, configURL] = Deno.args;

switch (cmd) {
  case "manifest": {
    if (configURL) {
      const CONFIG_TS_PATH = join(configURL, "netzo.ts");
      const url = toFileUrl(CONFIG_TS_PATH).toString();
      const config: FreshConfig = (await import(url)).app.config;
      await manifest(configURL, config?.router?.ignoreFilePattern);
    } else {
      console.error("Missing input for manifest command");
      Deno.exit(1);
    }
    break;
  }
  default: {
    console.error("Invalid command");
    Deno.exit(1);
  }
}
