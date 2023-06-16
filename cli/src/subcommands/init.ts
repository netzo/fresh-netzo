import { error } from '../console.ts'
import { question } from '../../deps.ts'

const help = `netzo init
Create a new project from an existing template (see https://app.netzo.io/templates).

To create a new project from a template:
  netzo init

To create a new project from a specific template:
  netzo init --template=starter-app

To create a new project from a template in a custom directory:
  netzo init path/to/directory

To create a new project from a template in the current working directory:
  netzo init .

USAGE:
    netzo init [OPTIONS] [<directory>]

OPTIONS:
    -h, --help       Prints help information
    -t, --template   The UID of the template (omit to list options)
        --dry-run    Dry run the initialization process

ARGS:
    <directory>      The directory path to initialize project in (defaults to --template)
`

export interface Args {
  help: boolean
  template: string | null
  dryRun: boolean
}

// deno-lint-ignore no-explicit-any
export default async function (rawArgs: Record<string, any>): Promise<void> {
  const args: Args = {
    help: !!rawArgs.help,
    template: rawArgs.template ? String(rawArgs.template) : null,
    dryRun: !!rawArgs['dry-run'],
  }

  if (args.help) {
    console.log(help)
    Deno.exit(0)
  }
  if (rawArgs._.length > 1) {
    console.error(help)
    error('Too many positional arguments given.')
  }
  if (args.template === null) {
    // @ts-ignore: types of question module are broken due to function overloading
    args.template = await question('list', 'Select a template:', await getTemplateUids())
    // NOTE: exit directly if undefined (when cancelling/escaping prompt)
    if (args.template === undefined) Deno.exit(1)
  }
  if (args.template === null) {
    console.error(help)
    error('Missing template UID.')
  }

  const directory = typeof rawArgs._[0] === 'string' ? rawArgs._[0] : args.template! // defaults to template UID

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
      `gh:netzo/netzo/templates/${args.template}/src`,
      directory,
      '--force', // clone to existing directory even if exists
    ],
  }).spawn()
  await process.status
}

async function getTemplateUids() {
  const base = 'https://raw.githubusercontent.com/netzo/netzo/main/templates'
  const response = await fetch(`${base}/templates.json`, {
    headers: { accept: 'application/json', 'cache-control': 'no-cache' },
  })
  const allUrls: string[] = await response.json()
  const urls = [...new Set(allUrls)] // remove possible
  const pattern = `${base}/(.*)/template.json` // extract UID from URL
  return urls.map((url) => url.match(new RegExp(pattern))?.[1])
}
