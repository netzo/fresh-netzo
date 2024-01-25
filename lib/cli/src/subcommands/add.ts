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
    netzo add [OPTIONS] [<resource>] [<name>]

OPTIONS:
    -h, --help      Prints help information
    -d, --dir       The directory path to add resource in (defaults to <resource>)
        --dry-run   Dry run the initialization process

ARGS:
    <resource>      The type of resource to add (omit to list options)
    <name>          The name of the resource to add (omit to list options)
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
  if (rawArgs._.length > 2) {
    console.error(help);
    error("Too many positional arguments given.");
  }

  const RESOURCES = ["component", "middleware", "route", "layout"];

  let [resource, name] = rawArgs._ as string[];
  if (!RESOURCES.includes(resource)) {
    // vendored x/question@0.0.2 to silence deprecated API warnings (Deno>=1.4)
    resource = (await question("list", "Select a resource:", RESOURCES))!;
  }
  // exit directly in case prompt is cancelled/escaped
  if (!resource) Deno.exit(1);

  if (args.dir === null) args.dir = resource;

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
      "--quiet", // silence deprecated API warnings thrown by x/question@0.0.2 (Deno>=1.4)
      cli,
      generatorFile,
      resource,
      name,
    ],
  }).spawn();
  await process.status;

  // NOTE: cannot programatically call cli() Deno requires --unstable flag
  // await cli([generatorFile, resource, ...args]);
}
