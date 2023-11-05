#!/usr/bin/env -S deno run --allow-read --allow-write --allow-env --allow-net --allow-run

import { parse, parseArgs, semverGreaterThanOrEquals } from "./deps.ts";
import { error } from "../utils/console.ts";
import initSubcommand from "./src/subcommands/init.ts";
import deploySubcommand from "./src/subcommands/deploy.ts";
import envSubcommand from "./src/subcommands/env.ts";
import upgradeSubcommand from "./src/subcommands/upgrade.ts";
import { MINIMUM_DENO_VERSION, VERSION } from "./src/version.ts";
import { fetchReleases, getConfigPaths } from "./src/utils/info.ts";

// ensure .env is loaded (even if not using --env)
import "https://deno.land/std@0.205.0/dotenv/load.ts";

const help = `netzo ${VERSION}
Command line tool for Netzo.

To create a new project from a template:
  netzo init

To deploy a local project:
  netzo deploy --project=my-project ./main.ts

SUBCOMMANDS:
    init      Create a project from an existing template
    deploy    Deploy a project with static files to Netzo
    env       Push project environment variables from env file to Netzo
    upgrade   Upgrade netzo to the given version (defaults to latest)
`;

if (
  !semverGreaterThanOrEquals(
    parse(Deno.version.deno),
    parse(MINIMUM_DENO_VERSION),
  )
) {
  error(
    `The Deno version you are using is too old. Please update to Deno ${MINIMUM_DENO_VERSION} or later. To do this run \`deno upgrade\`.`,
  );
}

const args = parseArgs(Deno.args, {
  alias: {
    "help": "h",
    "version": "V",
    "project": "p",
  },
  boolean: [
    "help",
    "prod",
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
    "deployment",
  ],
  default: {
    static: true,
  },
});

if (Deno.isatty(Deno.stdin.rid)) {
  let latestVersion;
  // Get the path to the update information json file.
  const { updatePath } = getConfigPaths();
  // Try to read the json file.
  const updateInfoJson = await Deno.readTextFile(updatePath).catch((error) => {
    if (error.name == "NotFound") return null;
    console.error(error);
  });
  if (updateInfoJson) {
    const updateInfo = JSON.parse(updateInfoJson) as {
      lastFetched: number;
      latest: number;
    };
    const moreThanADay =
      Math.abs(Date.now() - updateInfo.lastFetched) > 24 * 60 * 60 * 1000;
    // Fetch the latest release if it has been more than a day since the last
    // time the information about new version is fetched.
    if (moreThanADay) {
      fetchReleases();
    } else {
      latestVersion = updateInfo.latest;
    }
  } else {
    fetchReleases();
  }

  // If latestVersion is set we need to inform the user about a new release.
  if (
    latestVersion &&
    !(semverGreaterThanOrEquals(
      parse(VERSION),
      parse(latestVersion.toString()),
    ))
  ) {
    console.log(
      [
        `A new release of netzo CLI is available: ${VERSION} -> ${latestVersion}`,
        "To upgrade, run `netzo upgrade`",
        `https://github.com/netzo/github-action/releases/tag/${latestVersion}\n`,
      ].join("\n"),
    );
  }
}

const subcommand = args._.shift();
switch (subcommand) {
  case "init":
    await initSubcommand(args);
    break;
  case "deploy":
    await deploySubcommand(args);
    break;
  case "env":
    await envSubcommand(args);
    break;
  case "upgrade":
    await upgradeSubcommand(args);
    break;
  default:
    if (args.version) {
      console.log(`netzo ${VERSION}`);
      Deno.exit(0);
    }
    if (args.help) {
      console.log(help);
      Deno.exit(0);
    }
    console.error(help);
    Deno.exit(1);
}
