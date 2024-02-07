import { error } from "../../../plugins/utils.console.ts";
import { question } from "../../../deps/question/mod.ts";

const help = `netzo init: create a new project from an existing template.

To create a new project from a template:
  netzo init

To create a new project from a template in a custom directory:
  netzo init --dir=path/to/project

To create a new project from a template in the current working directory:
  netzo init --dir=.

USAGE:
    netzo init [OPTIONS] [<template>]

OPTIONS:
    -h, --help      Prints help information
    -d, --dir       The directory path to initialize project in (defaults to <template>)
        --dry-run   Dry run the initialization process

ARGS:
    <template>      The name of the template (omit to list all templates)
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

  const TEMPLATES = await getTemplateNames();

  let [template, ..._argsRest] = rawArgs._ as string[];
  if (!TEMPLATES.includes(template)) {
    // vendored x/question@0.0.2 to silence deprecated API warnings (Deno>=1.4)
    template = (await question("list", "Select a template:", TEMPLATES))!;
  }
  // exit directly in case prompt is cancelled/escaped
  if (!template) Deno.exit(1);

  if (args.dir === null) args.dir = template;

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
      `npm:giget@1.1.2`,
      `gh:netzo/netzo/templates/${template}`,
      args.dir,
      "--force", // init at existing directory even if exists
    ],
  }).spawn();
  await process.status;
}

async function getTemplateNames(): Promise<string[]> {
  const base = "https://raw.githubusercontent.com/netzo/netzo/main/templates";
  const response = await fetch(`${base}/templates.json`, {
    headers: { accept: "application/json", "cache-control": "no-cache" },
  });
  const allUrls: string[] = await response.json();
  const urls = [...new Set(allUrls)]
    .filter((url) => !url.includes("/templates/_wip/"));
  const pattern = `${base}/(.*)/template.json`; // extract name from
  const names = urls.map((url) => url.match(new RegExp(pattern))?.[1]);
  return names.sort((a, b) => a!.localeCompare(b!)) as string[];
}
