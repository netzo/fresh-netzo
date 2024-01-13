import type {
  DenoProjectDeploymentBuildLog,
  Deployment,
  DeploymentData,
  Manifest,
  Paginated,
  Project,
} from "../../../deps/@netzo/api/mod.ts";
export { Spinner } from "../../../deps/wait/mod.ts";
import {
  fromFileUrl,
  globToRegExp,
  isGlob,
  normalize,
} from "../../../deps/std/path/mod.ts";
import { Spinner, wait } from "../../../deps/wait/mod.ts";
import { netzo } from "../../../apis/netzo/mod.ts";
import { error, LOGS } from "../../../framework/utils/console.ts";
import { parseEntrypoint } from "../utils/entrypoint.ts";
import { walk } from "../utils/walk.ts";
import {
  buildAssetsFromManifest,
  createClient,
  readDecodeAndAddFileContentToAssets,
} from "../utils/netzo.ts";
import { APIError } from "../utils/api.ts";
import { Args as RawArgs } from "../args.ts";

const help = `netzo deploy
Deploy a project with static files to Netzo.

To deploy a local project
  netzo deploy --project=<PROJECT_ID> main.ts

To deploy a local project after running a build task:
  netzo deploy --project=<PROJECT_ID> --build main.

To deploy a local project and mark it as production:
  netzo deploy --project=<PROJECT_ID> --production main.

To deploy a local project without static files:
  netzo deploy --project=<PROJECT_ID> --no-static main.ts

To ignore the node_modules directory while deploying:
  netzo deploy --project=<PROJECT_ID> --exclude=node_modules main.tsx

USAGE:
    netzo deploy [OPTIONS] [<entrypoint>]

OPTIONS:
        --exclude=<PATTERNS>     Exclude files that match this pattern
        --include=<PATTERNS>     Only upload files that match this pattern
        --import-map=<FILE>      Use import map file
        --lock-file=<FILE>       Use deno lock file
    -h, --help                   Prints help information
        --no-static              Don't include the files in the CWD as static files
        --build                  Runs custom build task (via "deno task build") before deploying
        --production                   Create a production deployment (default is preview deployment)
        --description=<TEXT>     A description of the deployment (like a git commit message)
    -p, --project=<PROJECT_ID>   The ID of the project to deploy to
        --dry-run                Dry run the deployment process
        --api-key=<API_KEY>      The API key to use (defaults to NETZO_API_KEY environment variable)

ARGS:
    <entrypoint>                 The file path to the entrypoint file (defaults to netzo.ts)
`;

export type Args = {
  help: boolean;
  static: boolean;
  build: boolean;
  production: boolean;
  description: string | null;
  exclude: string[];
  include: string[];
  project: string | null;
  importMap: string | null;
  lockFile: string | null;
  dryRun: boolean;
  apiKey: string | null;
  apiUrl?: string;
  appUrl?: string;
};

// deno-lint-ignore no-explicit-any
export default async function (rawArgs: RawArgs): Promise<void> {
  const {
    NETZO_PROJECT_ID = null,
    NETZO_API_KEY = null,
    NETZO_API_URL = "https://api.netzo.io",
    NETZO_APP_URL = "https://app.netzo.io",
  } = Deno.env.toObject();

  const args: Args = {
    help: !!rawArgs.help,
    static: !rawArgs["no-static"], // negate the flag
    build: !!rawArgs.build,
    production: !!rawArgs.production,
    description: rawArgs.description ? String(rawArgs.description) : null,
    project: rawArgs.project ? String(rawArgs.project) : NETZO_PROJECT_ID,
    importMap: rawArgs["import-map"] ? String(rawArgs["import-map"]) : null,
    lockFile: rawArgs["lock-file"] ? String(rawArgs["lock-file"]) : null,
    exclude: rawArgs.exclude.flatMap((e) => e.split(",")),
    include: rawArgs.include.flatMap((i) => i.split(",")),
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
  const entrypoint = typeof rawArgs._[0] === "string"
    ? rawArgs._[0]
    : "netzo.ts";
  // if (!entrypoint) {
  //   console.error(help);
  //   error("No entrypoint specifier given.");
  // }
  if (rawArgs._.length > 1) {
    console.error(help);
    error("Too many positional arguments given.");
  }
  if (args.project === null) {
    console.error(help);
    error("Missing project ID.");
  }

  if (args.build) {
    const process = new Deno.Command(Deno.execPath(), {
      args: ["task", "build"],
    }).spawn();
    const { success } = await process.status;
    if (!success) error(LOGS.buildFailed);
  }

  await deploy(
    {
      entrypoint: await parseEntrypoint(entrypoint).catch((e) => error(e)),
      importMapUrl: args.importMap === null
        ? null
        : await parseEntrypoint(args.importMap, undefined, "import map")
          .catch((e) => error(e)),
      lockFileUrl: args.lockFile === null
        ? null
        : await parseEntrypoint(args.lockFile, undefined, "deno lock")
          .catch((e) => error(e)),
      static: args.static,
      build: args.build,
      production: args.production,
      description: args.description,
      project: args.project,
      include: args.include,
      exclude: args.exclude,
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
  lockFileUrl: URL | null;
  static: boolean;
  build: boolean;
  production: boolean;
  description: string | null;
  exclude: string[];
  include: string[];
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
  const project = await api.projects[opts.project].get<Project>();
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
  projectSpinner.succeed(`Project: ${project.name}`);

  if (deployments.length === 0) {
    wait("").start().info(
      "Empty project detected, automatically pushing initial deployment to production (use --production for further updates).",
    );
    opts.production = true;
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

  let lockFileUrl = opts.lockFileUrl ?? project.config?.lockFile;
  if (lockFileUrl && lockFileUrl.protocol === "file:") {
    const path = fromFileUrl(lockFileUrl);
    if (!path.startsWith(cwd)) {
      error("Import map must be in the current working directory.");
    }
    const lockFile = path.slice(cwd.length);
    lockFileUrl = new URL(`file:///src${lockFile}`);
  }

  // NOTE: asset negotiation handled automatically by Sunhosting API
  const assetsMap = new Map<string, string>(); // map of gitSha1 -> path
  let manifest: Manifest | undefined;

  if (opts.static) {
    wait("").start().info(`Uploading all files from the current dir (${cwd})`);
    const assetSpinner = wait("Finding static assets...").start();
    const include = opts.include.map((pattern) =>
      isGlob(pattern)
        // slice is used to remove the end-of-string anchor '$'
        ? RegExp(globToRegExp(normalize(pattern)).toString().slice(1, -2))
        : RegExp(`^${normalize(pattern)}`)
    );
    const exclude = opts.exclude.map((pattern) =>
      isGlob(pattern)
        // slice is used to remove the end-of-string anchor '$'
        ? RegExp(globToRegExp(normalize(pattern)).toString().slice(1, -2))
        : RegExp(`^${normalize(pattern)}`)
    );
    const entries = await walk(cwd, cwd, assetsMap, { include, exclude });
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
    production: opts.production,
    // deno:
    entryPointUrl: entryPointUrl.href, // e.g. main.ts
    importMapUrl: importMapUrl?.href || null,
    lockFileUrl: lockFileUrl?.href || null,
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
    databases: undefined, // set by netzo on deployment (from project.databaseId)
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
            deploySpinner?.succeed(
              message.replace("Deployed to ", "Deployed to https://"),
            ); // add protocol for clickable link
            // const domain = message.split(" ").pop();
            // const id = domain?.split(".")?.[0]?.split("-")?.pop();
            // const deploymentKind = opts.production ? "Production" : "Preview";
            // deploySpinner!.succeed(`${deploymentKind} deployment complete.`);
            console.log(
              `\nOpen in netzo at ${opts.appUrl}/workspaces/${project.workspaceId}/projects/${project._id}`,
            );
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
