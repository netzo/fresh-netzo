import { error } from "../../../core/utils/console.ts";
import { question } from "../../../deps/question/mod.ts";

const help = `netzo add: add a new resource to an existing project.

To add a new resource:
  netzo add

To add a new resource by type (e.g. 'route'):
  netzo add route

To add a new resource in a custom directory:
  netzo add --dir=path/to/project

To add a new resource in the current working directory:
  netzo add --dir=.

USAGE:
    netzo add [OPTIONS] [<resource>]

OPTIONS:
    -h, --help      Prints help information
    -d, --dir       The directory path to add resource in (defaults to <resource>)
        --dry-run   Dry run the initialization process

ARGS:
    <resource>      The type of resource to add (omit to list options)
`;

export type Args = {
  help: boolean;
  dir: string | null;
  dryRun: boolean;
};

// deno-lint-ignore no-explicit-any
export default async function (rawArgs: Record<string, any>): Promise<void> {
  const args: Args = {
    help: !!rawArgs.help,
    dir: rawArgs.dir ? String(rawArgs.dir) : null,
    dryRun: !!rawArgs["dry-run"],
  };

  if (args.help) {
    console.log(help);
    Deno.exit(0);
  }
  if (rawArgs._.length > 1) {
    console.error(help);
    error("Too many positional arguments given.");
  }
  const resource = typeof rawArgs._[0] === "string"
    ? rawArgs._[0]
    // @ts-ignore: types of question module are broken due to function overloading
    : await question(
      "list",
      "Select a resource:",
      ["component", "island", "middleware", "route"],
    );
  // exit directly in case prompt is cancelled/escaped
  if (!resource) Deno.exit(1);

  if (args.dir === null) args.dir = resource;

  // TODO: update all usages of import.meta.resolve(...).replace("file://", ""); to use built-in
  // import.meta.filename/import.meta.dirname once these land in Deno (this
  // is required since doing import.meta.resolve returns a file:// url for
  // unix but not for windows, so we can't simply use .replace('file://', '')
  const cli = import.meta.resolve(
    `../generators/cli.ts`,
  ).replace("file://", "");
  const generatorFile = import.meta.resolve(
    `../generators/${resource}/templates/${resource}.tpl.ts`,
  ).replace("file://", "");

  const process = new Deno.Command(Deno.execPath(), {
    args: [
      "run",
      "--allow-read",
      "--allow-write",
      "--allow-env",
      "--allow-net",
      "--allow-run",
      "--allow-sys",
      "--no-check",
      "--unstable",
      cli,
      generatorFile,
      resource,
      // ...args,
    ],
  }).spawn();
  await process.status;

  // NOTE: cannot programatically call cli() Deno requires --unstable flag
  // await cli([generatorFile, resource, ...args]);
}
