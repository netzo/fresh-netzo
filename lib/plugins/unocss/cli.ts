import { UnoGenerator } from "../../deps/@unocss/core.ts";
// IMPORTANT: import from directly from vendored @std/ to avoid Deno leaking to client
import { existsSync } from "../../deps/@std/fs/exists.ts";
import { join } from "../../deps/@std/path.ts";
import { minify } from "../../deps/csso.ts";
import type { UnocssConfig } from "./types.ts";
import { cssReset, runOverDirectory } from "./utils.ts";

export * from "./types.ts";

export const generateUnoCSS = async ({
    url = `${Deno.cwd()}/uno.config.ts`,
    aot = true,
    // IMPORTANT: csr mode is disabled by default since it significantly slows down hydration
    // due primarily to the presetUno() being used by presetNetzo(), which slows down the initUnocssRuntime()
    // function from ~500ms to ~30s. To work around this, the presetShadcn() already safe-lists all dynamically
    // injected classes (e.g. those from dialogs which are mounted dynamically), and additional ones can be
    // specified in "safelist" of uno.config. (see https://github.com/netzo/netzo/issues/172)
    csr = false,
    ...config
  }: UnocssConfig & { url?: string },
) => {
  // NOTE: Subhosting somehow fails when operating with and/or importing from
  // file:// URLs, so we remove the file:// prefix to avoid build/deployment errors
  const configURL = url.replace("file://", "");

  console.log({ url, configURL })

  // Serialize UnoCSS config contents to base64 ES import since default fresh serialization
  // (via esbuild) looses functions when bundling the client runtime script for CSR mode.
  const configFileExists = existsSync(configURL, { isFile: true, isReadable: true });
  if (csr && !configFileExists) {
    throw new Error(`Missing UnoCSS configuration file in the project directory.`);
  }
  if (aot && !config) {
    throw new Error(`Missing UnoCSS configuration file in the project directory.`);
  }

  // Create the generator object
  const uno = new UnoGenerator(config);

  // Extract classes from source code and generate CSS
  console.time(`[unocss] generate cssFromSrc`)
  const cssFromSrc = await runOverDirectory(uno, new URL(".", `file://${configURL}`).href);
  console.timeEnd(`[unocss] generate cssFromSrc`)

  console.time(`[unocss] generate cssFromLib`)
  const cssFromLib = await runOverDirectory(uno, new URL("../../components", import.meta.url).href);
  console.timeEnd(`[unocss] generate cssFromLib`)

  const css = `/* reset */
${cssReset}
/* netzo/components */
${cssFromLib}
/* src */
${cssFromSrc}
`;

  // Minify the generated CSS
  console.time(`[unocss] minify`)
  const { css: cssMinified } = minify(css);
  console.timeEnd(`[unocss] minify`)

  console.log({ css: css.length, cssMinified: cssMinified.length });

  if (aot && !Deno.args.includes("build")) {
    // WORKAROUND: Write the generated CSS to a static file
    console.time(`[unocss] generate static/uno.css`)
    await Deno.writeTextFile(join(Deno.cwd(), "static", "uno.css"), cssMinified);
    console.timeEnd(`[unocss] generate static/uno.css`)
  }

  if (aot && Deno.args.includes("build")) {
    // Write the generated CSS to a static file
    console.time(`[unocss] generate _fresh/static/uno.css`)
    await Deno.writeTextFile(join(Deno.cwd(), "static", "uno.css"), cssMinified);
    console.timeEnd(`[unocss] generate _fresh/static/uno.css`)
  }
};

if (import.meta.main) generateUnoCSS({ aot: true, csr: true } as UnocssConfig);