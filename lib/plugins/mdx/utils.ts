import { type PluginRoute } from "fresh/server.ts";
import { compile } from "../../deps/@mdx-js/mdx.ts";
import { walk } from "../../deps/@std/fs.ts";
import { join, toFileUrl } from "../../deps/@std/path.ts";
import { Root } from "../../deps/@types/hast.ts";
import { type MdxjsEsm } from "../../deps/mdast-util-mdxjs-esm.ts";
import { remarkFrontmatter } from "../../deps/remark-frontmatter.ts";
import { remarkGfm } from "../../deps/remark-gfm.ts";
import { Project } from "../../deps/ts-morph.ts";
import { visit } from "../../deps/unist-util-visit.ts";

export async function scanForMDXFiles(directory: string): Promise<string[]> {
  const files: string[] = [];
  for await (
    const entry of walk(directory, { includeDirs: false, exts: [".mdx"] })
  ) {
    files.push(entry.path);
  }
  return files;
}

export function mdxPathsToRoutes(
  mdxPaths: string[],
  routesDir: string,
): Promise<PluginRoute[]> {
  return Promise.all(mdxPaths.map(async (path: string) => {
    const routePath = path.split("/routes/").pop()!.replace(".mdx", "");

    const file = Deno.readTextFileSync(path);
    const compiled = await compile(file, {
      rehypePlugins: [rehypeLogger],
      remarkPlugins: [remarkGfm, remarkFrontmatter, [
        remarkAbsoluteImportPaths,
        { basePath: routesDir },
      ], remarkLogger],
      jsxImportSource: "preact",
    });

    const result = compiled.toString();
    // console.log({ file, result });
    const code = await import("data:text/javascript," + result);
    const comp = code.default;

    return { path: routePath, component: comp } satisfies PluginRoute;
  }));
}

type RemarkAbsoluteImportPathsOptions = {
  basePath?: string;
};

function remarkAbsoluteImportPaths(
  options: Readonly<RemarkAbsoluteImportPathsOptions>,
): (tree: Root) => void {
  const basePath = options.basePath || "";

  return function (tree: Root) {
    visit(tree, "mdxjsEsm", (node: MdxjsEsm) => {
      const project = new Project({
        useInMemoryFileSystem: true,
      });

      const sourceFile = project.createSourceFile("tempFile.ts", node.value);
      const imports = sourceFile.getImportDeclarations();

      imports.forEach((importDeclaration) => {
        const originalSpecifier = importDeclaration.getModuleSpecifierValue();
        if (originalSpecifier.startsWith("http")) return;
        const updatedPath = join(basePath, originalSpecifier);

        const newSpecifier = toFileUrl(updatedPath).href;

        if (node.data?.estree) {
          const estreeBody = node.data.estree.body;
          const importNode = estreeBody.find((n) =>
            n.type === "ImportDeclaration" &&
            n.source.type === "Literal" &&
            n.source.value === originalSpecifier
          );
          if (importNode) {
            importNode.source.value = newSpecifier;
            importNode.source.raw = `"${newSpecifier}"`;
          }
        }
      });
    });
  };
}

function remarkLogger(): (tree: Root) => undefined {
  return function (tree: Root) {
    visit(tree, "root", (node: Root) => {
      // console.log(node);
    });
  };
}

function rehypeLogger(): (tree: Root) => undefined {
  return function (tree: Root) {
    visit(tree, "root", (node: Element) => {
      // console.log(node);
    });
  };
}
