import type {
  DenoProjectDeploymentBuildLog,
  Deployment,
  DeploymentData,
  Manifest,
  Paginated,
  Project,
  Spinner,
} from "../../deps.ts";
import { fromFileUrl, netzo, normalize, wait } from "../../deps.ts";
import { error, LOGS } from "../../../utils/console.ts";
import { parseEntrypoint } from "../utils/entrypoint.ts";
import { walk } from "../utils/walk.ts";
import {
  buildAssetsFromManifest,
  createClient,
  readDecodeAndAddFileContentToAssets,
} from "../utils/netzo.ts";
import { APIError } from "../utils/api.ts";

const help = `netzo deploy
Deploy a project with static files to Netzo.

To deploy a local project
  netzo deploy --project=my-project main.ts

To deploy a local project and mark it as production:
  netzo deploy --project=my-project --prod main.ts

To deploy a local project without static files:
  netzo deploy --project=my-project --no-static main.ts

To ignore the node_modules directory while deploying:
  netzo deploy --project=my-project --exclude=node_modules main.tsx

USAGE:
    netzo deploy [OPTIONS] <entrypoint>

OPTIONS:
        --exclude=<PATTERNS>      Exclude files that match this pattern
        --include=<PATTERNS>      Only upload files that match this pattern
        --import-map=<FILE>       Use import map file
        --deno-lock=<FILE>        Use deno lock file
    -h, --help                    Prints help information
        --no-static               Don't include the files in the CWD as static files
        --prod                    Create a production deployment (default is preview deployment)
        --description=<TEXT>      A description of the deployment (like a git commit message)
    -p, --project=<PROJECT_UID>   The UID of the project to deploy to
        --dry-run                 Dry run the deployment process
        --api-key=<API_KEY>       The API key to use (defaults to NETZO_API_KEY environment variable)

ARGS:
    <entrypoint>                  The file path to the entrypoint file (e.g. main.tsx)
`;

export type Args = {
  help: boolean;
  static: boolean;
  prod: boolean;
  description: string | null;
  exclude?: string[];
  include?: string[];
  project: string | null;
  importMap: string | null;
  denoLock: string | null;
  dryRun: boolean;
  apiKey: string | null;
  apiUrl?: string;
  appUrl?: string;
};

// deno-lint-ignore no-explicit-any
export default async function (rawArgs: Record<string, any>): Promise<void> {
  const {
    NETZO_PROJECT = null,
    NETZO_API_KEY = null,
    NETZO_API_URL = "https://api.netzo.io",
    NETZO_APP_URL = "https://app.netzo.io",
  } = Deno.env.toObject();

  const args: Args = {
    help: !!rawArgs.help,
    static: !rawArgs["no-static"], // negate the flag
    prod: !!rawArgs.prod,
    description: rawArgs.description ? String(rawArgs.description) : null,
    project: rawArgs.project ? String(rawArgs.project) : NETZO_PROJECT,
    importMap: rawArgs["import-map"] ? String(rawArgs["import-map"]) : null,
    denoLock: rawArgs["deno-lock"] ? String(rawArgs["deno-lock"]) : null,
    exclude: rawArgs.exclude?.split(","),
    include: rawArgs.include?.split(","),
    dryRun: !!rawArgs["dry-run"],
    apiKey: rawArgs["api-key"] ? String(rawArgs["api-key"]) : NETZO_API_KEY,
    apiUrl: rawArgs["api-url"] ?? NETZO_API_URL,
    appUrl: rawArgs["app-url"] ?? NETZO_APP_URL,
  };
  if (args.help) {
    console.log(help);
    Deno.exit(0);
  }

  if ([null, "NETZO_API_KEY"].includes(args.apiKey)) {
    console.error(help);
    error(LOGS.missingApiKey);
  }
  const entrypoint = typeof rawArgs._[0] === "string" && rawArgs._[0];
  if (!entrypoint) {
    console.error(help);
    error("No entrypoint specifier given.");
  }
  if (rawArgs._.length > 1) {
    console.error(help);
    error("Too many positional arguments given.");
  }
  if (args.project === null) {
    console.error(help);
    error("Missing project UID.");
  }

  await deploy(
    {
      entrypoint: await parseEntrypoint(entrypoint).catch((e) => error(e)),
      importMapUrl: args.importMap === null
        ? null
        : await parseEntrypoint(args.importMap, undefined, "import map")
          .catch((e) => error(e)),
      denoLockUrl: args.denoLock === null
        ? null
        : await parseEntrypoint(args.denoLock, undefined, "deno lock")
          .catch((e) => error(e)),
      static: args.static,
      prod: args.prod,
      description: args.description,
      project: args.project,
      include: args.include?.map((pattern) => normalize(pattern)),
      exclude: args.exclude?.map((pattern) => normalize(pattern)),
      dryRun: args.dryRun,
      apiKey: args.apiKey!,
      apiUrl: args.apiUrl!,
      appUrl: args.appUrl!,
    } satisfies DeployOpts,
  );
}

type DeployOpts = {
  entrypoint: URL;
  importMapUrl: URL | null;
  denoLockUrl: URL | null;
  static: boolean;
  prod: boolean;
  description: string | null;
  exclude?: string[];
  include?: string[];
  project: string;
  dryRun: boolean;
  apiKey: string;
  apiUrl: string;
  appUrl: string;
};

async function deploy(opts: DeployOpts): Promise<void> {
  if (opts.dryRun) {
    wait("").start().info("Performing dry run of deployment");
  }

  const projectSpinner = wait(
    `Fetching project '${opts.project}' information...`,
  ).start();
  const { api } = netzo({ apiKey: opts.apiKey, baseURL: opts.apiUrl });
  const result = await api.projects.get<Paginated<Project>>({
    uid: opts.project,
    $limit: 1,
  });
  const project = result?.data?.[0] as Project;
  if (!project) {
    projectSpinner.fail(
      `Project "${opts.project}" not found. Ensure the API key is valid for this project.`,
    );
    Deno.exit(1);
  }

  const { data: deployments } = await api.deployments.get<
    Paginated<Deployment>
  >({
    projectId: project.denoId,
  });
  if (!deployments) {
    // e.g. if projectId is invalid or API key lacks permissions the
    // API returns error with { message: string }, so data === undefined
    projectSpinner.fail("Project deployments details not found.");
    Deno.exit(1);
  }
  projectSpinner.succeed(`Project: ${project.uid}`);

  if (deployments.length === 0) {
    wait("").start().info(
      "Empty project detected, automatically pushing initial deployment to production (use --prod for further updates).",
    );
    opts.prod = true;
  }

  let entryPointUrl = opts.entrypoint ?? project.config?.entrypoint;
  const cwd = Deno.cwd();

  if (["http:", "https:"].includes(entryPointUrl.protocol)) {
    // TODO: support remote entrypoints like deployctl. Note that this
    // might not apply to netzo though, since deno deploy only really
    // uses remote deployments to deploy single-file playground projects,
    // and `netzo deploy` is really meant to deploy from local -> remote.
    projectSpinner.fail("Remote entrypoints (http/https) are not supported.");
    Deno.exit(1);
  } else if (entryPointUrl.protocol === "file:") {
    const path = fromFileUrl(entryPointUrl);
    if (!path.startsWith(cwd)) {
      error("Entrypoint must be in the current working directory.");
    }
    const entrypoint = path.slice(cwd.length);
    entryPointUrl = new URL(`file:///src${entrypoint}`);
  }

  let importMapUrl = opts.importMapUrl ?? project.config?.importMap;
  if (importMapUrl && importMapUrl.protocol === "file:") {
    const path = fromFileUrl(importMapUrl);
    if (!path.startsWith(cwd)) {
      error("Import map must be in the current working directory.");
    }
    const importMap = path.slice(cwd.length);
    importMapUrl = new URL(`file:///src${importMap}`);
  }

  let denoLockUrl = opts.denoLockUrl ?? project.config?.denoLock;
  if (denoLockUrl && denoLockUrl.protocol === "file:") {
    const path = fromFileUrl(denoLockUrl);
    if (!path.startsWith(cwd)) {
      error("Import map must be in the current working directory.");
    }
    const denoLock = path.slice(cwd.length);
    denoLockUrl = new URL(`file:///src${denoLock}`);
  }

  // NOTE: asset negotiation handled automatically by Sunhosting API
  const assetsMap = new Map<string, string>(); // map of gitSha1 -> path
  let manifest: Manifest | undefined;

  if (opts.static) {
    wait("").start().info(`Uploading all files from the current dir (${cwd})`);
    const assetSpinner = wait("Finding static assets...").start();
    const entries = await walk(cwd, cwd, assetsMap, {
      include: opts.include,
      exclude: opts.exclude,
    });
    const s = assetsMap.size === 1 ? "" : "s";
    assetSpinner.succeed(`Found ${assetsMap.size} asset${s}.`);
    manifest = { entries };
  }

  if (opts.dryRun) return;

  const assetsWithoutContent = await buildAssetsFromManifest(manifest);
  const assets = await readDecodeAndAddFileContentToAssets(
    assetsWithoutContent,
  );

  const data: DeploymentData = {
    production: opts.prod,
    // deno:
    entryPointUrl: entryPointUrl.href, // e.g. main.ts
    importMapUrl: importMapUrl?.href || null,
    denoLockUrl: denoLockUrl?.href || null,
    // configures automatic JSX runtime for preact by default
    // see https://deno.com/manual@v1.34.3/advanced/jsx_dom/jsx#using-jsx-import-source-in-a-configuration-file
    compilerOptions: {
      jsx: "react-jsx",
      jsxFactory: "h",
      jsxFragmentFactory: "Fragment",
      jsxImportSource: "preact",
    },
    assets,
    envVars: {}, // set by netzo on deployment (project.envVars[env] empty for security)
    databases: undefined, // undefined since {} throws API error
    description: opts.description || null,
  };

  let deploySpinner: Spinner | null = null;

  try {
    const app = await createClient({
      apiKey: opts.apiKey,
      baseURL: opts.apiUrl,
    });

    app.service("deployments").on(
      "progress",
      ({ level, message }: DenoProjectDeploymentBuildLog) => {
        deploySpinner ??= wait("Deploying...").start();
        let type = level; // "info" | "error"
        if (["info"].includes(type)) {
          // TODO: if (SOME CONDITION) type = "upload"
          if (message.startsWith("Downloaded")) type = "download";
          if (message.startsWith("Packaging complete")) type = "done";
          if (message.startsWith("Deployed to")) type = "success";
        }

        switch (type) {
          case "download": {
            deploySpinner.text = message;
            return;
          }
          case "done": {
            deploySpinner.succeed(message);
            deploySpinner.text = `Finishing deployment...`;
            return;
          }
          case "success": {
            deploySpinner?.succeed(message);
            const domain = message.split(" ").pop();
            const id = domain?.split(".")?.[0]?.split("-")?.pop();
            // const deploymentKind = opts.prod ? "Production" : "Preview";
            // deploySpinner!.succeed(`${deploymentKind} deployment complete.`);
            const url = new URL(
              `/workspaces/${project.workspaceId}/projects/${project._id}/deployments/${id}`,
              opts.appUrl,
            );
            console.log(`\nView at: ${url.href}`);
            deploySpinner = null;
            return Deno.exit(0); // exits with success code 0
          }
          case "error": {
            if (deploySpinner) {
              deploySpinner.fail("Deployment failed.\n");
              deploySpinner = null;
            }
            return error(message); // exits with error code 1
          }

            // app.service("deployments").removeAllListeners("progress"); // avoid memory leak
        }
      },
    );

    const _denoDeployment = await api.deployments.post<Deployment>(data, {
      projectId: project._id,
    });
  } catch (err: unknown) {
    if (err instanceof APIError) {
      if (deploySpinner) {
        (deploySpinner as Spinner).fail("Deployment failed.");
        deploySpinner = null;
      }
      error(err.toString());
    }
    error(String(err));
  }
}
