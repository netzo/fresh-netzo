import {
  feathers,
  io,
  Manifest,
  ManifestEntryFile,
  Project,
  ProjectFilesFile,
  socketio,
} from '../../deps.ts'

export const createClient = async () => {
  const socket = io('https://api.netzo.io', {
    transports: ['websocket'],
  })
  const connection = socketio(socket)
  const app = feathers().configure(connection)
  await app.service('authentication').create({
    strategy: 'apiKey',
    apiKey: Deno.env.get('NETZO_API_KEY'),
  })
  return app
}

/**
 * Build flat manifest (project.files) from nested manifest
 *
 * USAGE:
 * const projectFilesWithoutContents = await buildProjectFilesFromManifest(manifest)
 * @param manifest {Manifest} - a nested manifest with entries
 * @returns {Omit<Project['files'], 'contents'>} - a flat manifest of file entries
 */
export function buildProjectFilesFromManifest(
  manifest: Manifest = { entries: {} },
): Omit<Project['files'], 'contents'> {
  const filesWithoutContents: Record<string, ManifestEntryFile> = {}

  // deno-lint-ignore no-explicit-any
  function walk(obj: any, path: string) {
    if (obj.kind === 'file') {
      const fileEntry: ManifestEntryFile = {
        kind: obj.kind,
        contents: obj.contents, // might not exists
        gitSha1: obj.gitSha1,
        size: obj.size,
      }
      filesWithoutContents[path] = fileEntry
    } else if (typeof obj === 'object') {
      for (const key in obj) {
        // deno-lint-ignore no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
          let newPath = path ? `${path}/${key}` : key
          // WORKAROUND: remove trailing /kind and /entries from path
          if (newPath.endsWith('/kind')) {
            newPath = newPath.replace('/kind', '')
          }
          if (newPath.endsWith('/entries')) {
            newPath = newPath.replace('/entries', '')
          }

          walk(obj[key], newPath)
        }
      }
    }
  }

  walk(manifest.entries, '')

  return filesWithoutContents
}

/**
 * Add 'contents' field for each file entry by reading
 * and decoding file contents from disk.
 *
 * USAGE:
 * const projectFiles = await readDecodeAndAddFileContentsToProjectFiles(manifest)
 * @param filesWithoutContents {Omit<Project['files'], 'contents'>} - a flat manifest of file entries without the 'contents' field
 * @returns {Project['files']} - a flat manifest of file entries
 */
export async function readDecodeAndAddFileContentsToProjectFiles(
  filesWithoutContents: Omit<Project['files'], 'contents'>,
): Promise<Project['files']> {
  return Object.fromEntries(
    await Promise.all(
      Object.entries(filesWithoutContents).map(
        async ([path, file]) => {
          const { kind, gitSha1, size } = file as ProjectFilesFile
          // const bytes: Uint8Array = await Deno.readFile(path)
          // const contents: string = new TextDecoder().decode(bytes)
          const contents: string = await Deno.readTextFile(path)
          return [path, { kind, contents, gitSha1, size }]
        },
      ),
    ),
  )
}
