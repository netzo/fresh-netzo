import { isBinary } from "npm:istextorbinary@9.4.0";
import { feathers } from "../../../deps/@feathersjs/feathers.ts";
import { socketio } from "../../../deps/@feathersjs/socketio-client.ts";
import { Project, ProjectAssetsFile } from "../../../deps/@netzo/api/mod.ts";
import { io } from "../../../deps/socket.io-client.ts";
import { encodeBase64 } from "../../../deps/std/encoding/base64.ts";

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

// manifest:

export type ManifestEntryDirectory = {
  kind: "directory";
  entries: Record<string, ManifestEntry>;
};

export type ManifestEntryFile = {
  kind: "file";
  gitSha1: string;
  size: number;
};

export type ManifestEntrySymlink = {
  kind: "symlink";
  target: string;
};

export type ManifestEntry =
  | ManifestEntryFile
  | ManifestEntrySymlink
  | ManifestEntryDirectory;

export type Manifest = {
  entries: Record<string, ManifestEntry>;
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
          const { kind /* gitSha1, size */ } = file as ProjectAssetsFile;
          const content: string = isBinary(path)
            ? encodeBase64(await Deno.readFile(path)) // e.g. png, jpg
            : (await Deno.readTextFile(path)); // e.g. tsx, html, json, txt
          const encoding = isBinary(path) ? "base64" : "utf-8";
          return [path, {
            kind,
            content,
            encoding,
            // DISABLED: cannot pass gitSha1 alongside the above, it is EITHER
            // { content, encoding } OR { gitSha1 }, therefore necessitating an
            // asset negotiation step before deployment (which we no longer support)
            // therefore we disable passing the gitSha1 to avoid re-uploading files for now.
            // The error we get if we pass a gitSha1 alongside content and encoding is:
            // "Error: malformedRequest: data did not match any variant of untagged enum File"
            // gitSha1, // prevents need to re-upload unchanged files
          }];
        },
      ),
    ),
  );
}
