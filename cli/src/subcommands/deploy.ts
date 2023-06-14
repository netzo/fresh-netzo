import { fromFileUrl, normalize, Spinner, wait } from '../../deps.ts'
import { error, printWarning } from '../console.ts'
import { API } from '../utils/api.ts'
import {
  ManifestEntry,
  ManifestEntryFile,
  Project,
} from '../utils/api.types.ts'
import { parseEntrypoint } from '../utils/entrypoint.ts'
import { walk } from '../utils/walk.ts'

const help = `netzo deploy
Deploy a project with static files to Netzo.

To deploy a local project:
  netzo deploy --project=my-project main.ts

To deploy a local project without static files:
  netzo deploy --project=my-project --no-static main.ts

To ignore the node_modules directory while deploying:
  netzo deploy --project=my-project --exclude=node_modules main.tsx

USAGE:
    netzo deploy [OPTIONS] <entrypoint>

OPTIONS:
        --api-key=<API_KEY>       The API key to use (defaults to NETZO_API_KEY environment variable)
        --exclude=<PATTERNS>      Exclude files that match this pattern
        --include=<PATTERNS>      Only upload files that match this pattern
        --import-map=<FILE>       Use import map file
    -h, --help                    Prints help information
        --no-static               Don't include the files in the CWD as static files
        --prod                    Create a production deployment (default is preview deployment)
    -p, --project=<PROJECT_UID>   The UID of the project to deploy to
        --dry-run                 Dry run the deployment process

ARGS:
    <entrypoint>                  The file path to the entrypoint file (e.g. main.tsx)
`

export interface Args {
  help: boolean
  static: boolean
  prod: boolean
  exclude?: string[]
  include?: string[]
  apiKey: string | null
  project: string | null
  importMap: string | null
  dryRun: boolean
}

// deno-lint-ignore no-explicit-any
export default async function (rawArgs: Record<string, any>): Promise<void> {
  const args: Args = {
    help: !!rawArgs.help,
    static: !rawArgs['no-static'], // negate the flag
    prod: !!rawArgs.prod,
    apiKey: rawArgs['api-key'] ? String(rawArgs['api-key']) : null,
    project: rawArgs.project ? String(rawArgs.project) : null,
    importMap: rawArgs['import-map'] ? String(rawArgs['import-map']) : null,
    exclude: rawArgs.exclude?.split(','),
    include: rawArgs.include?.split(','),
    dryRun: !!rawArgs['dry-run'],
  }
  const entrypoint = typeof rawArgs._[0] === 'string' ? rawArgs._[0] : null
  if (args.help) {
    console.log(help)
    Deno.exit(0)
  }
  const apiKey = args.apiKey ?? Deno.env.get('NETZO_API_KEY') ?? null
  if (apiKey === null) {
    console.error(help)
    error('Missing API key. Set via --api-key or NETZO_API_KEY.')
  }
  if (entrypoint === null) {
    console.error(help)
    error('No entrypoint specifier given.')
  }
  if (rawArgs._.length > 1) {
    console.error(help)
    error('Too many positional arguments given.')
  }
  if (args.project === null) {
    console.error(help)
    error('Missing project UID.')
  }

  const opts = {
    entrypoint: await parseEntrypoint(entrypoint).catch((e) => error(e)),
    importMapUrl: args.importMap === null
      ? null
      : await parseEntrypoint(args.importMap, undefined, 'import map')
        .catch((e) => error(e)),
    static: args.static,
    prod: args.prod,
    apiKey,
    project: args.project,
    include: args.include?.map((pattern) => normalize(pattern)),
    exclude: args.exclude?.map((pattern) => normalize(pattern)),
    dryRun: args.dryRun,
  }

  await deploy(opts)
}

interface DeployOpts {
  entrypoint: URL
  importMapUrl: URL | null
  static: boolean
  prod: boolean
  exclude?: string[]
  include?: string[]
  apiKey: string
  project: string
  dryRun: boolean
}

async function deploy(opts: DeployOpts): Promise<void> {
  if (opts.dryRun) {
    wait('').start().info('Performing dry run of deployment')
  }
  const projectSpinner = wait('Fetching project information...').start()
  const api = API.fromApiKey(opts.apiKey)
  const project = (await api.getProjectByUid(opts.project))!
  if (project === null) {
    projectSpinner.fail('Project not found.')
    Deno.exit(1)
  }
  projectSpinner.succeed(`Project: ${project.uid}`)

  let url = opts.entrypoint
  const cwd = Deno.cwd()

  if (['http:', 'https:'].includes(url.protocol)) {
    // TODO: support remote entrypoints like deployctl. Note that this
    // might not apply to netzo though, since deno deploy only really
    // uses remote deployments to deploy single-file playground projects,
    // and `netzo deploy` is really meant to deploy from local -> remote.
    projectSpinner.fail('Remote entrypoints (http/https) are not supported.')
    Deno.exit(1)
  } else if (url.protocol === 'file:') {
    const path = fromFileUrl(url)
    if (!path.startsWith(cwd)) {
      error('Entrypoint must be in the current working directory.')
    }
    const entrypoint = path.slice(cwd.length)
    url = new URL(`file:///src${entrypoint}`)
  }
  let importMapUrl = opts.importMapUrl
  if (importMapUrl && importMapUrl.protocol === 'file:') {
    const path = fromFileUrl(importMapUrl)
    if (!path.startsWith(cwd)) {
      error('Import map must be in the current working directory.')
    }
    const entrypoint = path.slice(cwd.length)
    importMapUrl = new URL(`file:///src${entrypoint}`)
  }

  let uploadSpinner: Spinner | null = null
  const files: string[] = []
  let manifest: { entries: Record<string, ManifestEntry> } | undefined =
    undefined

  if (opts.static) {
    wait('').start().info(`Uploading all files from the current dir (${cwd})`)
    const assetSpinner = wait('Finding static assets...').start()
    const assets = new Map<string, string>() // map of gitSha1 -> path
    const entries = await walk(cwd, cwd, assets, {
      include: opts.include,
      exclude: opts.exclude,
    })
    assetSpinner.succeed(
      `Found ${assets.size} asset${assets.size === 1 ? '' : 's'}.`,
    )

    uploadSpinner = wait('Determining assets to upload...').start()
    const neededHashes = await api.projectNegotiateAssets(project._id, {
      entries,
    })

    for (const hash of neededHashes) {
      const path = assets.get(hash)
      if (path === undefined) {
        error(`Asset ${hash} not found.`)
      }
      const data = await Deno.readFile(path)
      // files.push(data)
      files.push(new TextDecoder().decode(data))
    }
    if (files.length === 0) {
      uploadSpinner.succeed('No new assets to upload.')
      uploadSpinner = null
    } else {
      uploadSpinner.text = `${files.length} new asset${files.length === 1 ? '' : 's'
        } to upload.`
    }

    manifest = { entries }
  }

  if (opts.dryRun) {
    uploadSpinner?.succeed(uploadSpinner?.text)
    return
  }

  // TODO: implement deploy via api.pushDeploy() with multipart upload and progress
  // In the meantime we api.pushDeployJson() to POST project data as JSON directly
  // until multipart upload is implemented in the API for api.pushDeploy() to work

  let deploySpinner: Spinner | null = null
  const {
    entrypoint,
    importMap = importMapUrl?.href,
    envVars = {},
    envVarsDev = {},
    permissions = { net: true },
  } = project.configuration ?? {}
  const progress = api.pushDeployJson(project._id, {
    // deno-lint-ignore no-explicit-any
    ...(opts.prod && { deploymentId: 'production' }) as any,
    configuration: { entrypoint, importMap, envVars, envVarsDev, permissions },
    fs: buildFS(manifest?.entries, files),
  })

  // alerts: useful hints/warnings for the user
  const projectUrl =
    `https://app.netzo.io/workspaces/${project.workspaceId}/projects/${project._id}`
  if (!entrypoint) {
    printWarning(
      `No entrypoint configured (open ${projectUrl}/settings/configuration).`,
    )
  }
  if (!importMap) {
    printWarning(
      `No import map configured (open ${projectUrl}/settings/configuration).`,
    )
  }

  for await (const event of progress) {
    switch (event.type) {
      case 'staticFile': {
        const percentage = (event.currentBytes / event.totalBytes) * 100
        uploadSpinner!.text = `Uploading ${files.length} asset${files.length === 1 ? '' : 's'
          }... (${percentage.toFixed(1)}%)`
        break
      }
      case 'load': {
        if (uploadSpinner) {
          uploadSpinner.succeed(
            `Uploaded ${files.length} new asset${files.length === 1 ? '' : 's'
            }.`,
          )
          uploadSpinner = null
        }
        if (deploySpinner === null) {
          deploySpinner = wait('Deploying...').start()
        }
        const progress = event.seen / event.total * 100
        deploySpinner.text = `Deploying... (${progress.toFixed(1)}%)`
        break
      }
      case 'uploadComplete':
        deploySpinner!.text = `Finishing deployment...`
        break
      case 'success':
        deploySpinner!.succeed(`Deployment complete.`)
        // console.log('\nView at:')
        // for (const { domain } of event.domainMappings) {
        //   console.log(` - https://${domain}`)
        // }
        console.log('\nView in production at:')
        console.log(` - https://${event.uid}.netzo.io`)
        console.log(` - https://${event.deploymentId}.netzo.io`)
        console.log('View in development at:')
        console.log(` - https://d-${event.uid}.netzo.io`)
        console.log(` - https://d-${event.deploymentId}.netzo.io`)
        break
      case 'error':
        if (uploadSpinner) {
          uploadSpinner.fail(`Upload failed.`)
          uploadSpinner = null
        }
        if (deploySpinner) {
          deploySpinner.fail(`Deployment failed.`)
          deploySpinner = null
        }
        error(event.ctx)
    }
  }

  /* let deploySpinner: Spinner | null = null
  const req = {
    url: url.href,
    importMapUrl: importMapUrl ? importMapUrl.href : null,
    production: opts.prod,
    manifest,
  }
  const progress = api.pushDeploy(project._id, req, files)
  try {
    for await (const event of progress) {
      switch (event.type) {
        case 'staticFile': {
          const percentage = (event.currentBytes / event.totalBytes) * 100
          uploadSpinner!.text = `Uploading ${files.length} asset${files.length === 1 ? '' : 's'
            }... (${percentage.toFixed(1)}%)`
          break
        }
        case 'load': {
          if (uploadSpinner) {
            uploadSpinner.succeed(
              `Uploaded ${files.length} new asset${files.length === 1 ? '' : 's'
              }.`,
            )
            uploadSpinner = null
          }
          if (deploySpinner === null) {
            deploySpinner = wait('Deploying...').start()
          }
          const progress = event.seen / event.total * 100
          deploySpinner.text = `Deploying... (${progress.toFixed(1)}%)`
          break
        }
        case 'uploadComplete':
          deploySpinner!.text = `Finishing deployment...`
          break
        case 'success':
          deploySpinner!.succeed(`Deployment complete.`)
          console.log('\nView at:')
          for (const { domain } of event.domainMappings) {
            console.log(` - https://${domain}`)
          }
          break
        case 'error':
          if (uploadSpinner) {
            uploadSpinner.fail(`Upload failed.`)
            uploadSpinner = null
          }
          if (deploySpinner) {
            deploySpinner.fail(`Deployment failed.`)
            deploySpinner = null
          }
          error(event.ctx)
      }
    }
  } catch (err: unknown) {
    if (err instanceof APIError) {
      if (uploadSpinner) {
        uploadSpinner.fail(`Upload failed.`)
        uploadSpinner = null
      }
      if (deploySpinner) {
        deploySpinner.fail(`Deployment failed.`)
        deploySpinner = null
      }
      error(err.toString())
    }
    error(String(err))
  } */
}

function buildFS(
  entries: Record<string, ManifestEntry> = {},
  files: string[] = [],
): Project['fs'] {
  const fsWithoutContents: Record<string, ManifestEntryFile> = {}

  // deno-lint-ignore no-explicit-any
  function walk(obj: any, path: string) {
    if (obj.kind === 'file') {
      const fileEntry: ManifestEntryFile = {
        gitSha1: obj.gitSha1,
        kind: obj.kind,
        size: obj.size,
      }
      fsWithoutContents[path] = fileEntry
    } else if (typeof obj === 'object') {
      for (const key in obj) {
        // deno-lint-ignore no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
          const newPath = path ? `${path}/${key}` : key
          walk(obj[key], newPath)
        }
      }
    }
  }

  walk(entries, '')

  const fs = Object.entries(fsWithoutContents).reduce(
    // deno-lint-ignore no-unused-vars
    (acc, [path, { gitSha1, kind, size }], i) => ({
      ...acc,
      [path]: { contents: files[i] }, // NOTE: gitSha1, kind, size resolved in API
    }),
    {},
  )
  return fs
}
