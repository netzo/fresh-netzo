import { fromFileUrl, Spinner, wait } from '../../deps.ts'
import { error } from '../console.ts'
import { API } from '../utils/api.ts'

const help = `netzo init
Initialize a project from an existing project.

To initialize a local project:
  netzo init --project=starter-fresh

USAGE:
    netzo init [OPTIONS] <project> [<directory>]

OPTIONS:
        --api-key=<API_KEY>        The API key to use (defaults to NETZO_API_KEY environment variable)
    -h, --help                     Prints help information
        --dry-run                  Dry run the cloning process

ARGS:
    <project>                    The UID of the project (e.g. starter-fresh)
    <directory>                    The directory path to initialize the project in (defaults to current directory)
`

export interface Args {
  help: boolean
  apiKey: string | null
  dryRun: boolean
}

// deno-lint-ignore no-explicit-any
export default async function (rawArgs: Record<string, any>): Promise<void> {
  const args: Args = {
    help: !!rawArgs.help,
    apiKey: rawArgs['api-key'] ? String(rawArgs['api-key']) : null,
    dryRun: !!rawArgs['dry-run'],
  }
  const project = typeof rawArgs._[0] === 'string' ? rawArgs._[0] : null
  const directory = typeof rawArgs._[1] === 'string' ? rawArgs._[1] : null
  if (args.help) {
    console.log(help)
    Deno.exit(0)
  }
  const apiKey = args.apiKey ?? Deno.env.get('NETZO_API_KEY') ?? null
  if (apiKey === null) {
    console.error(help)
    error('Missing API key. Set via --api-key or NETZO_API_KEY.')
  }
  if (directory === null) {
    console.error(help)
    error('No directory specifier given.')
  }
  if (rawArgs._.length > 2) {
    console.error(help)
    error('Too many positional arguments given.')
  }
  if (project === null) {
    console.error(help)
    error('Missing project UID.')
  }

  const opts = {
    apiKey,
    project,
    directory,
    dryRun: args.dryRun,
  }

  await init(opts)
}

interface InitOpts {
  apiKey: string
  project: string
  dryRun: boolean
}

async function init(opts: InitOpts): Promise<void> {
  if (opts.dryRun) {
    wait('').start().info('Performing dry run of initialization')
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
    // uses remote initializations to deploy single-file playground projects,
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

  wait('').start().info(`Uploading all files from the current dir (${cwd})`)
  const assetSpinner = wait('Finding static assets...').start()
  const assets = new Map<string, string>() // map of gitSha1 -> path
  // const entries = await walk(cwd, cwd, assets, {
  //   include: opts.include,
  //   exclude: opts.exclude,
  // })
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
    uploadSpinner.text = `${files.length} new asset${
      files.length === 1 ? '' : 's'
    } to upload.`
  }

  manifest = { entries }

  if (opts.dryRun) {
    uploadSpinner?.succeed(uploadSpinner?.text)
    return
  }

  // TODO: implement deploy via api.pushDeploy() with multipart upload and progress
  // In the meantime we api.pushDeployJson() to POST project data as JSON directly
  // until multipart upload is implemented in the API for api.pushDeploy() to work

  let initSpinner: Spinner | null = null

  for await (const event of progress) {
    switch (event.type) {
      case 'staticFile': {
        const percentage = (event.currentBytes / event.totalBytes) * 100
        uploadSpinner!.text = `Uploading ${files.length} asset${
          files.length === 1 ? '' : 's'
        }... (${percentage.toFixed(1)}%)`
        break
      }
      case 'load': {
        if (uploadSpinner) {
          uploadSpinner.succeed(
            `Uploaded ${files.length} new asset${
              files.length === 1 ? '' : 's'
            }.`,
          )
          uploadSpinner = null
        }
        if (initSpinner === null) {
          initSpinner = wait('Initializing...').start()
        }
        const progress = event.seen / event.total * 100
        initSpinner.text = `Initializing... (${progress.toFixed(1)}%)`
        break
      }
      case 'uploadComplete':
        initSpinner!.text = `Finishing initialization...`
        break
      case 'success':
        initSpinner!.succeed(`Initialization complete.`)
        break
      case 'error':
        if (uploadSpinner) {
          uploadSpinner.fail(`Upload failed.`)
          uploadSpinner = null
        }
        if (initSpinner) {
          initSpinner.fail(`Initialization failed.`)
          initSpinner = null
        }
        error(event.ctx)
    }
  }
}
