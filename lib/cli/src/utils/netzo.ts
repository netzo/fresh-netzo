import {
  feathers,
  io,
  Manifest,
  ManifestEntryFile,
  Project,
  ProjectAssetsFile,
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
 * const projectAssetsWithoutContent = await buildAssetsFromManifest(manifest)
 * @param manifest {Manifest} - a nested manifest with entries
 * @returns {Omit<Project['files'], 'content'>} - a flat manifest of file entries
 */
export function buildAssetsFromManifest(
  manifest: Manifest = { entries: {} },
): Omit<Project["files"], "content"> {
  const filesWithoutContent: Record<string, ManifestEntryFile> = {};

  // deno-lint-ignore no-explicit-any
  function walk(obj: any, path: string) {
    if (obj.kind === "file") {
      const fileEntry: ManifestEntryFile = {
        kind: obj.kind,
        content: obj.content, // might not exists
        gitSha1: obj.gitSha1,
        size: obj.size,
      };
      filesWithoutContent[path] = fileEntry;
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

  return filesWithoutContent;
}

/**
 * Add 'content' field for each file entry by reading
 * and decoding file content from disk.
 *
 * USAGE:
 * const projectAssets = await readDecodeAndAddFileContentToAssets(manifest)
 * @param filesWithoutContent {Omit<Project['files'], 'content'>} - a flat manifest of file entries without the 'content' field
 * @returns {Project['files']} - a flat manifest of file entries
 */
export async function readDecodeAndAddFileContentToAssets(
  filesWithoutContent: Omit<Project["files"], "content">,
): Promise<Project["files"]> {
  return Object.fromEntries(
    await Promise.all(
      Object.entries(filesWithoutContent).map(
        async ([path, file]) => {
          const { kind, gitSha1, size } = file as ProjectAssetsFile;
          // const bytes: Uint8Array = await Deno.readFile(path)
          // const content: string = new TextDecoder().decode(bytes)
          const content: string = await Deno.readTextFile(path);
          return [path, {
            kind,
            content,
            encoding: "utf-8", /* gitSha1, size */
          }];
        },
      ),
    ),
  );
}
