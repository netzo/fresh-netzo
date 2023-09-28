import type {
  DenoDeploymentProgress,
  DenoDeploymentProgressAssetNegotiation,
  DenoDeploymentProgressError,
  DenoDeploymentProgressLoad,
  DenoDeploymentProgressStaticFile,
  DenoDeploymentProgressSuccess,
  Deployment,
  DeploymentData,
  Manifest,
  Paginated,
  Project,
  Spinner,
} from "../../deps.ts";
import { fromFileUrl, netzo, normalize, wait } from "../../deps.ts";
import { error } from "../console.ts";
import {
  assertExistsNetzoConfig,
  assertExistsNetzoConfigMod,
  assertValidNetzoConfig,
  getNetzoConfigUrl,
  updateNetzoConfig,
} from "../utils/config.ts";
import { parseEntrypoint } from "../utils/entrypoint.ts";
import { walk } from "../utils/walk.ts";
import {
  buildProjectFilesFromManifest,
  createClient,
  readDecodeAndAddFileContentsToProjectFiles,
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
    -h, --help                    Prints help information
        --no-static               Don't include the files in the CWD as static files
        --prod                    Create a production deployment (default is preview deployment)
    -p, --project=<PROJECT_UID>   The UID of the project to deploy to
        --dry-run                 Dry run the deployment process
        --api-key=<API_KEY>       The API key to use (defaults to NETZO_API_KEY environment variable)

ARGS:
    <entrypoint>                  The file path to the entrypoint file (e.g. main.tsx)
`;

export interface Args {
  help: boolean;
  static: boolean;
  prod: boolean;
  exclude?: string[];
  include?: string[];
  project: string | null;
  importMap: string | null;
  dryRun: boolean;
  apiKey: string | null;
  apiUrl?: string;
}

// deno-lint-ignore no-explicit-any
export default async function (rawArgs: Record<string, any>): Promise<void> {
  const args: Args = {
    help: !!rawArgs.help,
    static: !rawArgs["no-static"], // negate the flag
    prod: !!rawArgs.prod,
    project: rawArgs.project ? String(rawArgs.project) : null,
    importMap: rawArgs["import-map"] ? String(rawArgs["import-map"]) : null,
    exclude: rawArgs.exclude?.split(","),
    include: rawArgs.include?.split(","),
    dryRun: !!rawArgs["dry-run"],
    apiKey: rawArgs["api-key"] ? String(rawArgs["api-key"]) : null,
    apiUrl: rawArgs["api-url"] ?? "https://api.netzo.io",
  };
  const entrypoint = typeof rawArgs._[0] === "string" ? rawArgs._[0] : null;
  if (args.help) {
    console.log(help);
    Deno.exit(0);
  }

  // enforce presence of netzo.config.ts and modify it if necessary
  const netzoConfigUrl = await getNetzoConfigUrl();
  const netzoConfigMod = await assertExistsNetzoConfigMod(netzoConfigUrl);
  let netzoConfig = await assertExistsNetzoConfig(netzoConfigMod);
  netzoConfig = assertValidNetzoConfig(netzoConfig, args);
  await updateNetzoConfig(netzoConfigUrl, netzoConfigMod);

  // console.log(netzoConfig);

  Deno.exit(0); // REMOVE: prevent deployment for now

  const apiKey = args.apiKey ?? Deno.env.get("NETZO_API_KEY") ?? null;
  if (apiKey === null) {
    console.error(help);
    error(
      "Missing API key. Set via --api-key flag or NETZO_API_KEY environment variable to avoid passing it each time.",
    );
  }
  if (entrypoint === null) {
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
      static: args.static,
      prod: args.prod,
      project: args.project,
      include: args.include?.map((pattern) => normalize(pattern)),
      exclude: args.exclude?.map((pattern) => normalize(pattern)),
      dryRun: args.dryRun,
      apiKey,
      apiUrl: args.apiUrl,
    } satisfies DeployOpts,
  );
}

interface DeployOpts {
  entrypoint: URL;
  importMapUrl: URL | null;
  static: boolean;
  prod: boolean;
  exclude?: string[];
  include?: string[];
  project: string;
  dryRun: boolean;
  apiKey: string;
  apiUrl?: string;
}

async function deploy(opts: DeployOpts): Promise<void> {
  if (opts.dryRun) {
    wait("").start().info("Performing dry run of deployment");
  }

  const projectSpinner = wait("Fetching project information...").start();
  const { api } = netzo({ apiKey: opts.apiKey, baseURL: opts.apiUrl });
  const { data: [project] } = await api.projects.get<Paginated<Project>>({
    uid: opts.project,
    $limit: 1,
  });
  if (!project) {
    projectSpinner.fail(
      "Project not found. Check your API key and project UID.",
    );
    Deno.exit(1);
  }

  const { data: deployments } = await api.deployments.get({
    projectId: project.uid,
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

  let url = opts.entrypoint ?? project.configuration?.entrypoint;
  const cwd = Deno.cwd();

  if (["http:", "https:"].includes(url.protocol)) {
    // TODO: support remote entrypoints like deployctl. Note that this
    // might not apply to netzo though, since deno deploy only really
    // uses remote deployments to deploy single-file playground projects,
    // and `netzo deploy` is really meant to deploy from local -> remote.
    projectSpinner.fail("Remote entrypoints (http/https) are not supported.");
    Deno.exit(1);
  } else if (url.protocol === "file:") {
    const path = fromFileUrl(url);
    if (!path.startsWith(cwd)) {
      error("Entrypoint must be in the current working directory.");
    }

    const entrypoint = path.slice(cwd.length);
    url = new URL(`file:///src${entrypoint}`);
  }

  let importMapUrl = opts.importMapUrl ?? project.configuration?.importMapURL;
  if (importMapUrl && importMapUrl.protocol === "file:") {
    const path = fromFileUrl(importMapUrl);
    if (!path.startsWith(cwd)) {
      error("Import map must be in the current working directory.");
    }

    const entrypoint = path.slice(cwd.length);
    importMapUrl = new URL(`file:///src${entrypoint}`);
  }

  let uploadSpinner: Spinner | null = null;
  const assets = new Map<string, string>(); // map of gitSha1 -> path
  let neededHashes: string[]; // new assets to upload (set on assetNegotiation event)
  let manifest: Manifest | undefined;

  if (opts.static) {
    wait("").start().info(`Uploading all files from the current dir (${cwd})`);
    const assetSpinner = wait("Finding static assets...").start();
    const entries = await walk(cwd, cwd, assets, {
      include: opts.include,
      exclude: opts.exclude,
    });
    const s = assets.size === 1 ? "" : "s";
    assetSpinner.succeed(`Found ${assets.size} asset${s}.`);

    // NOTE: asset negotiation done in API so we handle it with custom
    // progress event of type 'assetNegotiation' after creating deployment
    uploadSpinner = wait("Determining assets to upload...").start();

    manifest = { entries };
  }

  if (opts.dryRun) {
    uploadSpinner?.succeed(uploadSpinner?.text);
    return;
  }

  const projectFilesWithoutContents = await buildProjectFilesFromManifest(
    manifest,
  );
  const projectFiles = await readDecodeAndAddFileContentsToProjectFiles(
    projectFilesWithoutContents,
  );

  const data: DeploymentData = {
    projectId: project.uid,
    url: url.href, // e.g. file:///src/main.ts
    importMapUrl: importMapUrl?.href ?? null,
    // configures automatic JSX runtime for preact by default
    // see https://deno.com/manual@v1.34.3/advanced/jsx_dom/jsx#using-jsx-import-source-in-a-configuration-file
    compilerOptions: {
      jsx: "react-jsx",
      jsxFactory: "h",
      jsxFragmentFactory: "Fragment",
      jsxImportSource: "preact",
    },
    production: opts.prod,
    files: projectFiles,
  };

  let deploySpinner: Spinner | null = null;

  try {
    const app = await createClient({
      apiKey: opts.apiKey,
      baseURL: opts.apiUrl,
    });

    app.service("deployments").on(
      "progress",
      async (event: DenoDeploymentProgress) => {
        switch (event.type) {
          case "assetNegotiation": {
            neededHashes =
              (event as DenoDeploymentProgressAssetNegotiation).neededHashes;
            const s = neededHashes.length === 1 ? "" : "s";
            if (neededHashes.length === 0) {
              uploadSpinner!.succeed("No new assets to upload.");
              uploadSpinner = null;
            } else {
              uploadSpinner!.text =
                `${neededHashes.length} new asset${s} to upload.`;
            }
            break;
          }
          case "staticFile": {
            const { currentBytes, totalBytes } =
              event as DenoDeploymentProgressStaticFile;
            const percentage = (currentBytes / totalBytes) * 100;
            const s = neededHashes.length === 1 ? "" : "s";
            const message = `Uploading ${neededHashes.length} asset${s}...`;
            uploadSpinner!.text = `${message}... (${percentage.toFixed(1)}%)`;
            break;
          }
          case "load": {
            const { seen, total } = event as DenoDeploymentProgressLoad;
            if (uploadSpinner) {
              const s = neededHashes.length === 1 ? "" : "s";
              uploadSpinner.succeed(
                `Uploaded ${neededHashes.length} new asset${s}.`,
              );
              uploadSpinner = null;
            }
            if (deploySpinner === null) {
              deploySpinner = wait("Deploying...").start();
            }

            const progress = seen / total * 100;
            deploySpinner.text = `Deploying... (${progress.toFixed(1)}%)`;
            break;
          }
          case "uploadComplete":
            deploySpinner!.text = "Finishing deployment...";
            break;
          case "success": {
            const { domainMappings } = event as DenoDeploymentProgressSuccess;
            const deploymentKind = opts.prod ? "Production" : "Preview";
            deploySpinner!.succeed(`${deploymentKind} deployment complete.`);
            console.log("\nView at:");
            for (const { domain } of domainMappings) {
              console.log(` - https://${domain}`);
            }

            // patch ALL project.files and project.config in netzo API:
            const { project, ...config } = netzoConfig; // overwrite with latest
            await api.projects[project._id].patch<Project>({
              files: projectFiles,
              config // drops non-serializable props
            });
            deploySpinner!.succeed(
              `Patched project files (open in studio at https://app.netzo.io/workspaces/${project.workspaceId}/projects/${project._id}/studio)`,
            );
            Deno.exit(0); // exits with success code 0
            break;
          }
          case "error": {
            const { ctx } = event as DenoDeploymentProgressError;
            if (uploadSpinner) {
              uploadSpinner.fail("Upload failed.");
              uploadSpinner = null;
            }
            if (deploySpinner) {
              deploySpinner.fail("Deployment failed.");
              deploySpinner = null;
            }
            error(ctx); // exits with error code 1
          }
        }
      },
    );

    // create denoDeployment via Netzo API (accepts/returns `application/json`)
    await api.deployments.post<Deployment>(data);
    // IMPORTANT: stop listening on first 'success' event (api sends 2 somehow)
    app.service("deployments").removeAllListeners("progress");
  } catch (err: unknown) {
    if (err instanceof APIError) {
      if (uploadSpinner) {
        uploadSpinner.fail("Upload failed.");
        uploadSpinner = null;
      }
      if (deploySpinner) {
        deploySpinner.fail("Deployment failed.");
        deploySpinner = null;
      }
      error(err.toString());
    }
    error(String(err));
  }
}
