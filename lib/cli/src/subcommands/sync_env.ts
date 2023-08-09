// from https://github.com/drollinger/deployctl
// see https://github.com/denoland/deployctl/issues/138

import { config, netzo, Paginated, Project, wait } from "../../deps.ts";
import { error } from "../console.ts";

const help = `netzo env
Sync environment variable with Netzo.

USAGE:
    netzo env [OPTIONS] <ENV_FILE>

OPTIONS:
    -h, --help                Prints help information
    -p, --project=NAME        The project to deploy to
        --api-key=<API_KEY>   The API key to use (defaults to NETZO_API_KEY environment variable)
`;

export interface Args {
  help: boolean;
  project: string | null;
  apiKey: string | null;
  apiUrl?: string;
}

// deno-lint-ignore no-explicit-any
export default async function (rawArgs: Record<string, any>): Promise<void> {
  const args: Args = {
    help: !!rawArgs.help,
    project: rawArgs.project ? String(rawArgs.project) : null,
    apiKey: rawArgs["api-key"] ? String(rawArgs["api-key"]) : null,
    apiUrl: rawArgs["api-url"] ?? "https://api.netzo.io",
  };
  const envFile: string | null = typeof rawArgs._[0] === "string"
    ? rawArgs._[0]
    : null;
  if (args.help) {
    console.log(help);
    Deno.exit(0);
  }
  const apiKey = args.apiKey ?? Deno.env.get("NETZO_API_KEY") ?? null;
  if (apiKey === null) {
    console.error(help);
    error(
      "Missing API key. Set via --api-key flag or NETZO_API_KEY environment variable to avoid passing it each time.",
    );
  }
  if (envFile === null) {
    console.error(help);
    error("No environment file specifier given.");
  }
  if (rawArgs._.length > 1) {
    console.error(help);
    error("Too many positional arguments given.");
  }
  if (args.project === null) {
    console.error(help);
    error("Missing project name.");
  }

  await syncEnv(
    {
      envFile,
      project: args.project,
      apiKey,
      apiUrl: args.apiUrl,
    } satisfies SyncEnvOpts,
  );
}

interface SyncEnvOpts {
  envFile: string;
  project: string;
  apiKey: string;
  apiUrl?: string;
}

async function syncEnv(opts: SyncEnvOpts): Promise<void> {
  const projectSpinner = wait("Fetching project information...").start();
  const { api } = netzo({ apiKey: opts.apiKey, baseURL: opts.apiUrl });
  const { data: [project] } = await api.projects.get<Paginated<Project>>({
    uid: opts.project,
    $limit: 1,
  });
  if (project === null) {
    projectSpinner.fail("Project not found.");
    Deno.exit(1);
  }
  projectSpinner.succeed(`Project: ${project.name}`);

  const fileSpinner = wait("Reading env file...").start();
  let envVars: Record<string, string> = {};
  try {
    envVars = await config({ path: opts.envFile });
    if (Object.keys(envVars).length === 0) {
      fileSpinner.info("File did not contain any variables.");
      Deno.exit(1);
    }
  } catch {
    fileSpinner.fail(`Could not load file: ${opts.envFile}`);
    Deno.exit(1);
  }
  fileSpinner.succeed(`File Loaded: ${opts.envFile}`);

  const syncSpinner = wait("Syncing environment variables...").start();
  try {
    await api.projects[project._id].patch<Project>({
      ...project.configuration,
      envVars,
    });
  } catch {
    syncSpinner.fail("Failed to sync variables.");
    Deno.exit(1);
  }
  syncSpinner.succeed("Environment variables synced.");
}
