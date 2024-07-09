import type { App, ResolvedFreshConfig } from "fresh";
import type { Builder } from "fresh/dev";
import { UnoGenerator } from "../../deps/@unocss/core.ts";
// IMPORTANT: import from directly from vendored @std/ to avoid Deno leaking to client
import { existsSync } from "../../deps/@std/fs/exists.ts";
import { walk } from "../../deps/@std/fs/walk.ts";
import { dirname, fromFileUrl, join } from "../../deps/@std/path.ts";
import { minify } from "../../deps/csso.ts";
import type { NetzoState } from "../../mod.ts";
import { logInfo } from "../utils.ts";
import type { UnocssConfig } from "./types.ts";

export * from "./types.ts";

// Regular expression to support @unocss-skip-start/end comments in source code
const SKIP_START_COMMENT = "@unocss-skip-start";
const SKIP_END_COMMENT = "@unocss-skip-end";
const SKIP_COMMENT_RE = new RegExp(
  `(//\\s*?${SKIP_START_COMMENT}\\s*?|\\/\\*\\s*?${SKIP_START_COMMENT}\\s*?\\*\\/|<!--\\s*?${SKIP_START_COMMENT}\\s*?-->)[\\s\\S]*?(//\\s*?${SKIP_END_COMMENT}\\s*?|\\/\\*\\s*?${SKIP_END_COMMENT}\\s*?\\*\\/|<!--\\s*?${SKIP_END_COMMENT}\\s*?-->)`,
  "g",
);

// Inline reset from https://esm.sh/@unocss/reset@0.56.5/tailwind-compat.css
const unoResetCSS = `/* reset */
a,hr{color:inherit}progress,sub,sup{vertical-align:baseline}blockquote,body,dd,dl,fieldset,figure,h1,h2,h3,h4,h5,h6,hr,menu,ol,p,pre,ul{margin:0}fieldset,legend,menu,ol,ul{padding:0}*,::after,::before{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--un-default-border-color,#e5e7eb)}html{line-height:1.5;-webkit-text-size-adjust:100%;text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"}body{line-height:inherit}hr{height:0;border-top-width:1px}abbr:where([title]){text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}menu,ol,ul{list-style:none}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}
`;

/**
 * Runs UnoCSS over the source code of the project
 * @param uno The UnoCSS generator object
 * @returns The generated CSS content
 */
async function runOverSource(uno: UnoGenerator): Promise<string> {
  // Find source files
  const projectDir = fromFileUrl(dirname(Deno.mainModule));
  const sourceFiles = [];
  for await (
    const entry of walk(projectDir, {
      includeDirs: false,
      exts: [".tsx", ".ts", ".jsx", ".html"],
    })
  ) {
    sourceFiles.push(entry.path);
  }

  // Read the source code into a single string
  const sourceCode = await Promise.all(
    sourceFiles.map((filename) => Deno.readTextFile(filename)),
  ).then((x) => x.join("\n").replace(SKIP_COMMENT_RE, ""));

  // Extract UnoCSS classes from the source code and generate CSS
  const { css } = await uno.generate(sourceCode);

  // Minify the generated CSS
  const { css: cssMinified } = minify(css);

  // Include the inline reset CSS
  return unoResetCSS + cssMinified;
}

/**
 * Plugin to automatically generates CSS utility classes
 *
 * IMPORTANT: must declare a valid UnoCSS configuration file and pass it as the "config" option.
 *
 * @exampe Add the following scripts and styles to the _app.tsx file:
 * <link rel="stylesheet" href="https://esm.sh/@unocss/reset@0.56.5/tailwind-compat.css" />
 * <script type="module" src="https://deno.land/x/netzo/plugins/unocss/runtime.js" />
 * <link rel="stylesheet" href="/uno.css" />
 *
 * @param config (UserConfig<Theme>) - inline UnoCSS config object extended with UnoCSS plugin options.
 * @param config.url (string) - file URL to the UnoCSS config file (MUST be set to `import.meta.url`)
 * @param config.aot (boolean) - enables ahead-of-time (AOT) mode to run UnoCSS to extract styles during the build task (default: true)
 * @param config.csr (boolean) - enables client-side rendering (CSR) mode to run the UnoCSS runtime on the client to generate styles live in response to DOM events (default: false)
 */
export const unocss = async (
  _builder: Builder,
  app: App<NetzoState>, {
  url,
  aot = true,
    // IMPORTANT: csr mode is disabled by default since it significantly slows down hydration
  // due primarily to the presetUno() being used by presetNetzo(), which slows down the initUnocssRuntime()
  // function from ~500ms to ~30s. To work around this, the presetShadcn() already safe-lists all dynamically
  // injected classes (e.g. those from dialogs which are mounted dynamically), and additional ones can be
  // specified in "safelist" of uno.config. (see https://github.com/netzo/netzo/issues/172)
  csr = false,
  ...config
}: UnocssConfig) => {
  // NOTE: Subhosting somehow fails when operating with and/or importing from
  // file:// URLs, so we remove the file:// prefix to avoid build/deployment errors
  const configURL = url.replace("file://", "");

  // Serialize UnoCSS config contents to base64 ES import since default fresh serialization
  // (via esbuild) looses functions when bundling the client runtime script for CSR mode.
  const configFileExists = existsSync(configURL, { isFile: true, isReadable: true });
  if (csr && !configFileExists) {
    throw new Error(
      `Missing UnoCSS configuration file in the project directory.`,
    );
  }
  if (aot && !config) {
    throw new Error(`Missing UnoCSS configuration file in the project directory.`);
  }

  // IMPORTANT: removes specific presets to avoid ~30s slow-down in hydration for CSR
  // (it's not the base64 encoded config which slows the initUnocssRuntime() function down,
  // but rather the preset usage e.g. presetUno() (registered internally by the presetNetzo()))
  const main = `/* unocss runtime */
import config from "data:application/javascript;base64,${btoa(Deno.readTextFileSync(configURL))}";
import initUnocssRuntime from "https://esm.sh/@unocss/runtime@0.59.0";

const SKIP = ["@unocss/preset-uno", "@unocss/preset-icons"];
config.presets?.forEach((p, i) => {
  if (SKIP.includes(p.name)) delete config.presets[i];
  config.presets?.[i]?.presets?.forEach((p, j) => {
    if (SKIP.includes(p.name)) delete config.presets[i].presets[j];
  });
});

export default function() {
  globalThis.__unocss = config;
  console.time("[unocss] initUnocssRuntime");
  setTimeout(() => initUnocssRuntime(), 0);
  console.timeEnd("[unocss] initUnocssRuntime");
}
`;

  app.get("/unocss/runtime.js", (_ctx) => new Response(main, {
    headers: {
      "content-type": "application/javascript",
      "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
    },
  }));

  // Create the generator object
  const uno = new UnoGenerator(config);

  if (aot && app.config.mode === "development") {
    // Extract classes from source code now, and generate CSS
    logInfo("Generating UnoCSS stylesheet...");
    const css = await runOverSource(uno);

    // Add a middleware to handle requests for the generated CSS file with no-cache headers
    app.all("/uno.css", (_ctx) => new Response(css, {
      headers: {
        "content-type": "text/css",
        "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
      },
    }));
  }

  // Generate a static CSS file, if AOT mode is enabled AND building
  if (aot && Deno.args.includes("build")) {
    // Extract classes from source code and generate CSS
    const css = await runOverSource(uno);

    // Write the generated CSS to a static file
    const { outDir } = (app as unknown as ResolvedFreshConfig).build;
    await Deno.writeTextFile(join(outDir, "static", "uno.css"), css);
  }
};