import { error, LOGS } from "../console.ts";
import { netzo, Project, question } from "../../deps.ts";
import { cloneProjectToFS } from "../utils/netzo.ts";

const help = `netzo clone
Clone a project from Netzo to your local machine.

To clone an existing project from Netzo:
  netzo clone

To clone an existing project by UID from Netzo:
  netzo clone --project=my-project

To clone a project from Netzo to a custom directory:
  netzo clone path/to/directory

USAGE:
    netzo clone [OPTIONS] [<directory>]

OPTIONS:
    -h, --help                Prints help information
    -p, --project             The UID of the project (omit to list all projects in workspace)
        --dry-run             Dry run the initialization process
        --api-key=<API_KEY>   The API key to use (defaults to NETZO_API_KEY environment variable)

ARGS:
    <directory>               The directory path to clone project to (defaults to --project)
`;

export type Args = {
  help: boolean;
  project: string | null;
  dryRun: boolean;
  apiKey: string | null;
  apiUrl?: string;
};

// deno-lint-ignore no-explicit-any
export default async function (rawArgs: Record<string, any>): Promise<void> {
  const {
    NETZO_PROJECT = null,
    NETZO_API_KEY = null,
    NETZO_API_URL = "https://api.netzo.io",
  } = Deno.env.toObject();

  const args: Args = {
    help: !!rawArgs.help,
    project: rawArgs.project ? String(rawArgs.project) : NETZO_PROJECT,
    dryRun: !!rawArgs["dry-run"],
    apiKey: rawArgs["api-key"] ? String(rawArgs["api-key"]) : NETZO_API_KEY,
    apiUrl: rawArgs["api-url"] ?? NETZO_API_URL,
  };

  if (args.help) {
    console.log(help);
    Deno.exit(0);
  }
  if ([null, "NETZO_API_KEY"].includes(args.apiKey)) {
    console.error(help);
    error(LOGS.missingApiKey);
  }
  if (rawArgs._.length > 1) {
    console.error(help);
    error("Too many positional arguments given.");
  }

  const { api } = netzo({ apiKey: args.apiKey!, baseURL: args.apiUrl });
  let project: Project | undefined = undefined;
  if (args.project === null) {
    // TODO: limit maxes at 100 so implement pagination
    const projects: Project[] = (await api.projects.get({ $limit: 999 })).data;
    // @ts-ignore: types of question module are broken due to function overloading
    args.project = await question(
      "list",
      "Select a project:",
      projects.map(({ uid }) => uid).sort((a, b) => a!.localeCompare(b!)),
    );
    project = projects.find(({ uid }) => uid === args.project);
    // NOTE: exit directly if undefined (when cancelling/escaping prompt)
    if (args.project === undefined) Deno.exit(1);
  } else {
    project = (await api.projects.get({
      uid: args.project,
      $limit: 1,
    })).data[0];
  }
  // in case prompt is cancelled/escaped
  if (args.project === null) {
    console.error(help);
    error("Missing project UID.");
  }

  // NOTE: fetch again via "get" (not "find") to get populated project.files
  project = await api.projects[project!._id].get();

  const directory = typeof rawArgs._[0] === "string"
    ? rawArgs._[0]
    : args.project!; // defaults to project UID

  await cloneProjectToFS(project!, directory);
}
