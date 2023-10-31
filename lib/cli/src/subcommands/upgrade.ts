import { error } from "../console.ts";
import { isSemVer, parse, semverGreaterThanOrEquals } from "../../deps.ts";
import { VERSION } from "../version.ts";

const help = `netzo upgrade
Upgrade netzo to the given version (defaults to latest).

To upgrade to latest version:
netzo upgrade

To upgrade to specific version:
netzo upgrade 1.2.3

The version is downloaded from https://deno.land/x/netzo/cli/netzo.ts

USAGE:
    netzo upgrade [OPTIONS] [<version>]

OPTIONS:
    -h, --help   Prints help information

ARGS:
    <version>    The version to upgrade to (defaults to latest)
`;

export type Args = {
  help: boolean;
};

// deno-lint-ignore no-explicit-any
export default async function (rawArgs: Record<string, any>): Promise<void> {
  const args: Args = {
    help: !!rawArgs.help,
  };
  const version = typeof rawArgs._[0] === "string" ? rawArgs._[0] : null;
  if (args.help) {
    console.log(help);
    Deno.exit();
  }
  if (rawArgs._.length > 1) {
    console.error(help);
    error("Too many positional arguments given.");
  }
  if (version && !isSemVer(version)) {
    error(`The provided version is invalid.`);
  }

  const { latest, versions } = await getVersions().catch((err: TypeError) => {
    error(err.message);
  });
  if (version && !versions.includes(version)) {
    error(
      "The provided version is not found.\n\nVisit https://github.com/netzo/github-action/releases/ for available releases.",
    );
  }

  if (!version && semverGreaterThanOrEquals(parse(VERSION), parse(latest))) {
    console.log("You're using the latest version.");
    Deno.exit();
  } else {
    const process = new Deno.Command(Deno.execPath(), {
      args: [
        "install",
        "--allow-read",
        "--allow-write",
        "--allow-env",
        "--allow-net",
        "--allow-run",
        "--no-check",
        "-f",
        `https://deno.land/x/netzo@${version ? version : latest}/cli/netzo.ts`,
      ],
    }).spawn();
    await process.status;
  }
}

export async function getVersions(): Promise<
  { latest: string; versions: string[] }
> {
  const aborter = new AbortController();
  const timer = setTimeout(() => aborter.abort(), 2500);
  const response = await fetch(
    // 'https://cdn.deno.land/deploy/meta/versions.json',
    "https://api.github.com/repos/netzo/netzo/releases",
    { signal: aborter.signal },
  );
  if (!response.ok) {
    throw new Error(
      "couldn't fetch the latest version - try again after sometime",
    );
  }
  const data = await response.json();
  clearTimeout(timer);
  const versions = data.map(({ tag_name }: { tag_name: string }) => tag_name);
  return { latest: versions[0], versions }; // builds a versions object like cdn.deno.land above
}
