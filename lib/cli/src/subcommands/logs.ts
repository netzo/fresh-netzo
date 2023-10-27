import { netzo, Paginated, Project, wait } from "../../deps.ts";
import { error, LOGS } from "../console.ts";
import { APIError, DenoAPI } from "../utils/api.ts";

const help = `netzo logs
Stream logs for the given project.

To show the latest logs of a project:
  netzo logs --project=my-project

To show the logs of a particular deployment:
  netzo logs --project=my-project --deployment=6405152d946bb1948d4b18ebc5431

To show the latest logs of a project (in development):
  netzo logs --project=my-project --env=development

To show the logs of a particular deployment (in development):
  netzo logs --project=my-project --deployment=6405152d946bb1948d4b18ebc5431 --env=development

USAGE:
    netzo logs [OPTIONS] <project>

OPTIONS:
        --deployment   The ID of the deployment you want to stream logs for (defaults to latest deployment)
        --prod         Select the production deployment
    -p, --project      The UID of the project you want to stream logs for
        --api-key      The API key to use (defaults to NETZO_API_KEY environment variable)
`;

export type Args = {
  help: boolean;
  prod: boolean;
  deployment: string | null;
  project: string | null;
  apiKey: string | null;
  apiUrl?: string;
};

// deno-lint-ignore no-explicit-any
export default async function (rawArgs: Record<string, any>): Promise<void> {
  const args: Args = {
    help: !!rawArgs.help,
    prod: !!rawArgs.prod,
    deployment: rawArgs.deployment ? String(rawArgs.deployment) : null,
    project: rawArgs.project ? String(rawArgs.project) : null,
    apiKey: rawArgs["api-key"] ? String(rawArgs["api-key"]) : null,
    apiUrl: rawArgs["api-url"] ?? "https://api.netzo.io",
  };

  if (args.help) {
    console.log(help);
    Deno.exit(0);
  }
  const apiKey = args.apiKey ?? Deno.env.get("NETZO_API_KEY") ?? null;
  if ([null, "NETZO_API_KEY"].includes(apiKey)) {
    console.error(help);
    error(LOGS.missingApiKey);
  }
  if (args.project === null) {
    console.error(help);
    error("Missing project UID.");
  }
  if (rawArgs._.length > 1) {
    console.error(help);
    error("Too many positional arguments given.");
  }

  const opts: LogsOpts = {
    project: args.project,
    deploymentId: args.deployment,
    prod: args.prod,
    apiKey,
    apiUrl: args.apiUrl,
  };

  await logs(opts);
}

type LogsOpts = {
  project: string;
  deploymentId: string | null;
  prod: boolean;
  apiKey: string;
  apiUrl?: string;
};

async function logs(opts: LogsOpts): Promise<void> {
  if (opts.prod && opts.deploymentId) {
    error(
      "You can't select a deployment and choose production flag at the same time",
    );
  }
  const projectSpinner = wait("Fetching project information...").start();
  const { api } = netzo({ apiKey: opts.apiKey, baseURL: opts.apiUrl });
  const { data: [project] } = await api.projects.get<Paginated<Project>>({
    uid: opts.project,
    $limit: 1,
  });
  // FIXME: get deployments from project using `api` client
  const projectDeployments = await DenoAPI.getDeployments(project._id);
  if (project === null) {
    projectSpinner.fail("Project not found.");
    Deno.exit(1);
  }
  if (opts.prod) {
    if (!project.hasProductionDeployment) {
      projectSpinner.fail("This project doesn't have a production deployment");
      Deno.exit(1);
    }
    opts.deploymentId = project.productionDeployment?.id || null;
  }
  if (projectDeployments === null) {
    projectSpinner.fail("Project not found.");
    Deno.exit(1);
  }
  projectSpinner.succeed(`Project: ${project.name}`);
  const logs = opts.deploymentId
    ? DenoAPI.getLogs(project._id, opts.deploymentId)
    : DenoAPI.getLogs(project._id, "latest");
  if (logs === null) {
    projectSpinner.fail("Project not found.");
    Deno.exit(1);
  }
  try {
    for await (const log of logs) {
      if (log.type === "ready" || log.type === "ping") {
        continue;
      }
      const color = getLogColor(log.level);
      console.log(
        `%c${log.time}   %c${log.region}%c ${log.message.trim()}`,
        "color: aquamarine",
        "background-color: grey",
        `color: ${color}`,
      );
    }
  } catch (err: unknown) {
    if (
      err instanceof APIError
    ) {
      error(err.toString());
    }
  } finally {
    console.log("%cconnection closed", "color: red");
  }
}

function getLogColor(logLevel: string) {
  switch (logLevel) {
    case "debug": {
      return "grey";
    }
    case "error": {
      return "red";
    }
    case "info": {
      return "blue";
    }
    default: {
      return "initial";
    }
  }
}
