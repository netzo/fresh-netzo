// adapted from https://github.com/denoland/fresh/blob/main/src/dev/cli.ts
import { type FreshConfig } from "fresh/server.ts";
import { manifest } from "fresh/src/dev/mod.ts";
import { join, toFileUrl } from "../../deps/@std/path.ts";

const [cmd, configURL] = Deno.args;

switch (cmd) {
  case "manifest": {
    if (configURL) {
      const CONFIG_TS_PATH = join(configURL, "netzo.config.ts");
      const url = toFileUrl(CONFIG_TS_PATH).toString();
      const config: FreshConfig = (await import(url)).default;
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
