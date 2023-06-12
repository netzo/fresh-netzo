import { error } from '../console.ts'
import { question } from '../../deps.ts'

const help = `netzo init
Create a new project from an existing template (see https://app.netzo.io/templates).

To create a new project from a template:
  netzo init

To create a new project from a template in a custom directory:
  netzo init --dir=path/to/

To create a new project from a template in the current working directory:
  netzo init --dir=.

To create a new project from a specific template:
  netzo init starter-app

USAGE:
    netzo init [OPTIONS] <template>

OPTIONS:
        --api-key=<API_KEY>   The API key to use (defaults to NETZO_API_KEY environment variable)
    -h, --help                Prints help information
        --dir                 The directory path to initialize project in (defaults to <template>)
        --dry-run             Dry run the initialization process

ARGS:
    <template>                The UID of the template (omit to list options)
`

export interface Args {
  help: boolean
  apiKey: string | null
  dir: string | null
  dryRun: boolean
}

// deno-lint-ignore no-explicit-any
export default async function (rawArgs: Record<string, any>): Promise<void> {
  const args: Args = {
    help: !!rawArgs.help,
    apiKey: rawArgs['api-key'] ? String(rawArgs['api-key']) : null,
    dir: rawArgs.dir ? String(rawArgs.dir) : null,
    dryRun: !!rawArgs['dry-run'],
  }

  if (args.help) {
    console.log(help)
    Deno.exit(0)
  }

  const template = typeof rawArgs._[0] === 'string'
    ? rawArgs._[0]
    // @ts-ignore: types of question module are broken due to function overloading
    : await question('list', 'Select a template:', await getTemplateUids())

  // const apiKey = args.apiKey ?? Deno.env.get('NETZO_API_KEY') ?? null
  // if (apiKey === null) {
  //   console.error(help)
  //   error('Missing API key. Set via --api-key or NETZO_API_KEY.')
  // }
  if (rawArgs._.length > 2) {
    console.error(help)
    error('Too many positional arguments given.')
  }
  if (template === null) {
    console.error(help)
    error('Missing template UID.')
  }

  const dir = args.dir ?? template! // defaults to template UID

  const process = new Deno.Command(Deno.execPath(), {
    args: [
      'run',
      '--allow-read',
      '--allow-write',
      '--allow-env',
      '--allow-net',
      '--allow-run',
      '--allow-sys',
      '--no-check',
      `npm:giget@1.1.2`,
      `gh:netzo/netzo/templates/${template}/src`,
      dir,
      '--force', // clone to existing directory even if exists
    ],
  }).spawn()
  await process.status
}

async function getTemplateUids() {
  const base = 'https://raw.githubusercontent.com/netzo/netzo/main/templates'
  const response = await fetch(`${base}/templates.json`,
    {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
    },
  )
  const allUrls: string[] = await response.json()
  const urls = [...new Set(allUrls)] // remove possible
  const pattern = `${base}/(.*)/template.json` // extract UID from URL
  return urls.map((url) => url.match(new RegExp(pattern))?.[1])
}
