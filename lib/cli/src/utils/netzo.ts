import { ensureDir } from "https://deno.land/std@0.202.0/fs/mod.ts";
import {
  feathers,
  io,
  Manifest,
  ManifestEntryFile,
  Project,
  ProjectFilesFile,
  socketio,
} from "../../deps.ts";

export const createClient = async ({
  apiKey = Deno.env.get("NETZO_API_KEY")!,
  baseURL = "https://api.netzo.io",
}) => {
  const socket = io(baseURL, { transports: ["websocket"] });
  const connection = socketio(socket);
  const app = feathers().configure(connection);
  await app.service("authentication").create({ strategy: "apiKey", apiKey });
  return app;
};

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
): Omit<Project["files"], "contents"> {
  const filesWithoutContents: Record<string, ManifestEntryFile> = {};

  // deno-lint-ignore no-explicit-any
  function walk(obj: any, path: string) {
    if (obj.kind === "file") {
      const fileEntry: ManifestEntryFile = {
        kind: obj.kind,
        contents: obj.contents, // might not exists
        gitSha1: obj.gitSha1,
        size: obj.size,
      };
      filesWithoutContents[path] = fileEntry;
    } else if (typeof obj === "object") {
      for (const key in obj) {
        // deno-lint-ignore no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
          let newPath = path ? `${path}/${key}` : key;
          // WORKAROUND: remove trailing /kind and /entries from path
          if (newPath.endsWith("/kind")) {
            newPath = newPath.replace("/kind", "");
          }
          if (newPath.endsWith("/entries")) {
            newPath = newPath.replace("/entries", "");
          }

          walk(obj[key], newPath);
        }
      }
    }
  }

  walk(manifest.entries, "");

  return filesWithoutContents;
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
  filesWithoutContents: Omit<Project["files"], "contents">,
): Promise<Project["files"]> {
  return Object.fromEntries(
    await Promise.all(
      Object.entries(filesWithoutContents).map(
        async ([path, file]) => {
          const { kind, gitSha1, size } = file as ProjectFilesFile;
          // const bytes: Uint8Array = await Deno.readFile(path)
          // const contents: string = new TextDecoder().decode(bytes)
          const contents: string = await Deno.readTextFile(path);
          return [path, { kind, contents, gitSha1, size }];
        },
      ),
    ),
  );
}

/**
 * Clone project from Netzo flat manifest (project.files) to disk at rootDir
 *
 * @example
 * ```ts
 * const project = {
 *   uid: "myNewProject",
 *   files: {
 *     "deno.json": { contents: "" },
 *     "netzo.config.ts": { contents: "" },
 *     "main.ts": { contents: "" },
 *     "test/mod.test.ts": { contents: "" },
 *     "test/some/mod.test.ts": { contents: "" },
 *     "utils/mod.ts": { contents: "" },
 *     "utils/some/mod.ts": { contents: "" },
 *   }
 * };
 *
 * await cloneProjectToFS(project);
 * ```
 *
 * @param project {Project} - the project in Netzo
 * @param rootDir {string} - the root directory to clone the project to
 * @returns {Promise<void>}
 */
export async function cloneProjectToFS(project: Project, rootDir?: string) {
  const { uid, files } = project;

  if (!rootDir) rootDir = `./${uid}`;
  else if (rootDir === '.') rootDir = Deno.cwd();

  // remove directory if it already exists
  try {
    await Deno.remove(rootDir, { recursive: true });
  } catch (err) {
    // ignore error only if directory doesn't exist
    if (!(err instanceof Deno.errors.NotFound)) throw err;
  }

  // traverse the files and create files and directories
  for (const filePath in files) {
    const fileData = files[filePath];
    const fullPath = `${rootDir}/${filePath}`;

    // create the directory structure if it doesn't exist
    const dirPath = fullPath.split("/").slice(0, -1).join("/");
    await ensureDir(dirPath);

    // write the file contents
    await Deno.writeTextFile(fullPath, fileData.contents);
    console.log(`Created: ${fullPath}`);
  }
}
