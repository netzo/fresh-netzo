import { compile } from "npm:@mdx-js/mdx";
import { default as remarkFrontmatter } from "npm:remark-frontmatter@5.0.0";
import { default as remarkGfm } from "npm:remark-gfm@4.0.0";
import { type PluginRoute } from "../../deps/$fresh/server.ts";
import { walk } from "../../deps/std/fs/walk.ts";

export async function scanForMDXFiles(_directory: string): Promise<string[]> {
  const files: string[] = [];
  for await (
    const entry of walk(
      "/home/mrk/repos/netzo/templates/minimal/routes",
      { includeDirs: false, exts: [".mdx"] },
    )
  ) {
    files.push(entry.path);
  }
  return files;
}

export function mdxPathsToRoutes(mdxPaths: string[]): Promise<PluginRoute[]> {
  return Promise.all(mdxPaths.map(async (path: string) => {
    const routePath = path.split("/routes/").pop()!.replace(".mdx", "");

    const file = Deno.readTextFileSync(path);
    const compiled = await compile(file, {
      remarkPlugins: [remarkGfm, remarkFrontmatter],
      jsxImportSource: "preact",
    });

    const result = compiled.toString();
    const code = await import("data:text/javascript," + result);
    const comp = code.default;

    return { path: routePath, component: comp } satisfies PluginRoute;
  }));
}
