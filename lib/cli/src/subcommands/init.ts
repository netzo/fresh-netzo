import { error } from "../../../plugins/utils.ts";
// vendored x/question@0.0.2 to silence deprecated API warnings (Deno>=1.4)
import { question } from "../../../deps/question/mod.ts";
import type { Args as RawArgs } from "../args.ts";
// never try to use import maps here, since this will be executed in a context that doesn't have them
import $ from "dax/mod.ts";
import { copy } from "jsr:@std/fs/copy";
import { join } from "jsr:@std/path";

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

export default async function (rawArgs: RawArgs): Promise<void> {
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
    template = (await question("list", "Select a template:", TEMPLATES))!;
  }
  if (!template) Deno.exit(1); // exit directly if cancelled/escaped

  if (args.dir === null) args.dir = template;

  if (import.meta.url.startsWith("file://")) {
    const templateDir =
      new URL(`../../../../templates/${template}`, import.meta.url)
        .pathname;
    const destDir = args.dir;
    if (args.dryRun) {
      console.log(`Dry run: Copying template ${templateDir} to ${destDir}`);
    } else {
      await copy(templateDir, destDir, { overwrite: true });
      console.log(`✨ Successfully cloned ${templateDir} to ${destDir}`);
    }
  } else {
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

  patchDenoJson(args.dir);
  createGit(args.dir);
}

async function getTemplateNames(): Promise<string[]> {
  const isLocal = import.meta.url.startsWith("file://");
  if (isLocal) {
    const localBase =
      new URL("../../../../templates", import.meta.url).pathname;
    const entries = Deno.readDirSync(localBase);
    const names = [];
    for (const entry of entries) {
      if (entry.isDirectory) {
        names.push(entry.name);
      }
    }
    return names.sort();
  } else {
    const remoteBase =
      "https://raw.githubusercontent.com/netzo/netzo/main/templates";
    const response = await fetch(`${remoteBase}/templates.json`, {
      headers: { accept: "application/json", "cache-control": "no-cache" },
    });
    const allUrls: string[] = await response.json();
    const urls = [...new Set(allUrls)].filter((url) =>
      !url.includes("/templates/_wip/")
    );
    const pattern = `${remoteBase}/(.*)/template.json`;
    const names = urls.map((url) => url.match(new RegExp(pattern))?.[1]);
    return names.sort((a, b) => a!.localeCompare(b!)) as string[];
  }
}

function patchDenoJson(dir: string) {
  const denoJsonPath = join(dir, "deno.json");
  const denoJson = JSON.parse(Deno.readTextFileSync(denoJsonPath));
  denoJson.imports["netzo/"] = new URL("../../../", import.meta.url).href;
  Deno.writeTextFileSync(
    denoJsonPath,
    JSON.stringify(denoJson, null, 2) + "\n",
  );
}

async function createGit(dir: string) {
  await $`git -C ${dir} init`.quiet("stdout");
  await $`git -C ${dir} branch -m main`;
  await $`git -C ${dir} add .`;
  await $`git -C ${dir} commit -m "initial commit"`.quiet("stdout");
}
