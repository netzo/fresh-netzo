import { build, emptyDir } from "https://deno.land/x/dnt@0.30.0/mod.ts";

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
    lib: ["es2022", "dom"], // required to compile with DOM types for type checking
  },
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
    mappings: {
      "https://esm.sh/ohmyfetch@0.4.19": {
        name: "ohmyfetch",
        version: "0.4.19",
      },
    },
  },
});

// post-build steps
await Deno.copyFile("CHANGELOG.md", "npm/CHANGELOG.md");
await Deno.copyFile("LICENSE", "npm/LICENSE");
await Deno.copyFile("README.md", "npm/README.md");
