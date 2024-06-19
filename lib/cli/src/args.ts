import { parse } from "../../deps/std/flags.ts";

export function parseArgs(args: string[]) {
  const parsed = parse(args, {
    alias: {
      "help": "h",
      "version": "V",
      "dir": "d",
      "project": "p",
    },
    boolean: [
      "help",
      "build",
      "production",
      "static",
      "version",
      "dry-run",
    ],
    string: [
      "project",
      "api-key",
      "include",
      "exclude",
      "import-map",
      "lock-file",
      "deployment",
      "api-url",
      "app-url",
    ],
    collect: ["include", "exclude"],
    default: {
      static: true,
      apiKey: Deno.env.get("NETZO_API_KEY"),
      apiUrl: Deno.env.get("NETZO_API_URL"),
      appUrl: Deno.env.get("NETZO_APP_URL"),
    },
  });
  return parsed;
}

export type Args = ReturnType<typeof parseArgs>;
