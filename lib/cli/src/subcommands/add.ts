import { error } from "../../../core/utils/console.ts";
import { question } from "../../../deps/question/mod.ts";
import { cli } from "../generators/cli.ts";

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

  const url = new URL(
    `../generators/${resource}/${resource}.tpl.ts`,
    import.meta.url,
  );
  // const url = import.meta.resolve(`file:/home/mrk/repos/netzo/cli/src/generators/${resource}/${resource}.tpl.ts`)

  // await cli(typeof rawArgs._[0] === "string"
  //   ? Deno.args
  //   : [...Deno.args, resource]
  // )

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
      new URL(`../generators/cli.ts`, import.meta.url).href,
      resource,
      args.dir,
      "--force", // init at existing directory even if exists
    ],
  }).spawn();
  await process.status;
}
