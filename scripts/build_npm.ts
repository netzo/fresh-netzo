import { build, emptyDir } from "https://deno.land/x/dnt@0.31.0/mod.ts";

await emptyDir("./npm"); // NOTE: added npm/ to .gitignore (optional)

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  typeCheck: true,
  test: true,
  declaration: true,
  // scriptModule: false to allow use of top-level await
  // see https://github.com/denoland/dnt/#top-level-await
  scriptModule: false,
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: "@netzoio/sdk",
    version: Deno.args[0]?.replace(/^v/, ""), // remove leading v
    description:
      "Software development kit (SDK) for Netzo, the open Web platform to unify IoT devices, applications and services.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/netzoio/sdk.git",
    },
    bugs: {
      url: "https://github.com/netzoio/sdk/issues",
    },
  },
});

// post build steps
Deno.copyFileSync("CHANGELOG.md", "npm/CHANGELOG.md");
Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
