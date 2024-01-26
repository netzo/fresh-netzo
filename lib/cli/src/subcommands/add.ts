import { error } from "../../../core/utils/console.ts";
import { question } from "../../../deps/question/mod.ts";
import { add } from "../generators/mod.ts";

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

  let [resource, name, ...argv] = rawArgs._ as string[];
  if (!RESOURCES.includes(resource)) {
    // vendored x/question@0.0.2 to silence deprecated API warnings (Deno>=1.4)
    resource = (await question("list", "Select a resource:", RESOURCES))!;
  }
  // exit directly in case prompt is cancelled/escaped
  if (!resource) Deno.exit(1);

  if (args.dir === null) args.dir = resource;

  const addScript = import.meta.resolve(`../generators/mod.ts`);
  const generatorFile = import.meta.resolve(
    `../generators/${resource}/templates/${resource}.tpl.ts`,
  );

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
      // TODO: "--quite" will not be required when https://github.com/denoland/deno/pull/22120 is merged?
      "--quiet", // silence deprecated API warnings thrown by x/question@0.0.2 (Deno>=1.4)
      // IMPORTANT: following flags are required for @featherscloud/pinion without vendoring
      "--unstable-bare-node-builtins", // allows built-in node modules without node: specifiers
      "--unstable-sloppy-imports", // loosens requirements for imports modules (e.g. no file extension)
      "--unstable-unsafe-proto", //  enables support for Object.prototype.__proto__
      addScript,
      generatorFile,
      resource,
      name,
      ...argv,
    ],
  }).spawn();
  await process.status;

  return Deno.exit(0);

  // NOTE: cannot programatically call add() since Deno requires "certain flags
  // and calling add() programatically is also throwing the following:
  // Error: "Top-level await promise never resolved at await addSubcommand(args);"
  // proxyConsole(`Use of deprecated`)
  // return await add([generatorFile, resource, name, ...argv]);
}

// function proxyConsole(...substringsToSkip: string[]) {
//   const newConsole = new Proxy(console, {
//     get(target, prop, receiver) {
//       const method = target[prop]; // intercept method calls
//       console.log({ method, prop, receiver });
//       return (...args) => {
//         const message = args.join(" ");
//         const skip = substringsToSkip.some((s) => message.includes(s));
//         console.log({ message, substringsToSkip, skip })
//         if (!skip) method.apply(target, args);
//       };
//     },
//   });
//   console = newConsole;
// }
