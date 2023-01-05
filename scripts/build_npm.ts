import { build, emptyDir } from "https://deno.land/x/dnt@0.31.0/mod.ts";

// pre-build steps
await emptyDir("./npm"); // NOTE: added npm/ to .gitignore (optional)

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  typeCheck: false, // disable to avoid errors
  test: true, // default
  declaration: true, // default
  // sets scriptModule to false to allow use of top-level await
  // see https://github.com/denoland/dnt/#top-level-await
  scriptModule: false,
  compilerOptions: {
    // use ES2021 to ensure node.js 16+ compatibility
    // see https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping
    lib: ["es2021", "dom"], // required to compile with DOM types for type checking
    target: "ES2021", // ensures emitted package is compatible with node v14 or later
  },
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: "@netzo/sdk",
    version: Deno.args[0]?.replace(/^v/, ""), // remove leading v
    description:
      "Software development kit (SDK) for Netzo, the open Web platform to integrate APIs, code automations and build internal apps faster.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/netzo/sdk.git",
    },
    bugs: {
      url: "https://github.com/netzo/sdk/issues",
    },
    // sets the minimum engine to node v16.0.0 and npm v7.10.0
    // see https://nodejs.org/en/download/releases/
    engines: {
      "node": ">=16.0.0",
      "npm": ">=7.10.0",
    },
    mappings: {
      "https://esm.sh/ofetch@1.0.0": {
        name: "ofetch",
        version: "^1.0.0",
      },
    },
  },
});

// post-build steps
await Deno.copyFile("CHANGELOG.md", "npm/CHANGELOG.md");
await Deno.copyFile("LICENSE", "npm/LICENSE");
await Deno.copyFile("README.md", "npm/README.md");
