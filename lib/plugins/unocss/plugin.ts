import type { Plugin } from "$fresh/server.ts";
import { dirname, fromFileUrl, join, walk } from "$fresh/src/server/deps.ts";
import { JSX, options as preactOptions, VNode } from "preact";
import { UnoGenerator, type UserConfig } from "../../deps/@unocss/core.ts";
import type { Theme } from "../../deps/@unocss/preset-uno.ts";
import { existsSync } from "../../deps/std/fs/exists.ts";
import type { NetzoState } from "../../mod.ts";

type PreactOptions = typeof preactOptions & { __b?: (vnode: VNode) => void };

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

export type UnocssConfig<T extends object = Theme> = UserConfig<T> & {
  /**
   * File URL to the UnoCSS config file (MUST be set to `import.meta.url`)
   */
  url: string;
  /**
   * Enable AOT mode - run UnoCSS to extract styles during the build task.
   * Enabled by default.
   */
  aot?: boolean;
  /**
   * Enable SSR mode - run UnoCSS live to extract styles during server renders.
   * Enabled by default.
   */
  ssr?: boolean;
  /**
   * Enable CSR mode - run the UnoCSS runtime on the client.
   * It will generate styles live in response to DOM events.
   * Note that this might signiticantly slow-down hydration, one
   * can always use "safelist" in unocss.config as a workaround.
   * Disabbled by default.
   */
  csr?: boolean;
};

export const defineUnocssConfig = <T extends object = Theme>(
  config: UnocssConfig<T>,
): UnocssConfig<T> => config;

declare module "preact" {
  namespace JSX {
    interface DOMAttributes<Target extends EventTarget> {
      class?: string;
      className?: string;
    }
  }
}

/**
 * Installs a hook in Preact to extract classes during server-side renders
 * @param classes - Set of class strings, which will be mutated by this function.
 */
export function installPreactHook(classes: Set<string>) {
  // Hook into options._b which is called whenever a new comparison
  // starts in Preact.
  const originalHook = (preactOptions as PreactOptions).__b;
  (preactOptions as PreactOptions).__b = (
    // deno-lint-ignore no-explicit-any
    vnode: VNode<JSX.DOMAttributes<any>>,
  ) => {
    if (typeof vnode.type === "string" && typeof vnode.props === "object") {
      const { props } = vnode;
      if (props.class) {
        props.class.split(" ").forEach((cls) => classes.add(cls));
      }
      if (props.className) {
        props.className.split(" ").forEach((cls) => classes.add(cls));
      }
    }

    if (vnode) originalHook?.(vnode);
  };
}

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

  // Include the inline reset CSS
  return unoResetCSS + css;
}

/**
 * Plugin to automatically generates CSS utility classes
 *
 * IMPORTANT: must declare a valid UnoCSS configuration file and pass it as the "config" option.
 *
 * @param config (UserConfig<Theme>) - inline UnoCSS config object extended with UnoCSS plugin options.
 * @param config.url (string) - file URL to the UnoCSS config file (MUST be set to `import.meta.url`)
 * @param config.aot (boolean) - enables ahead-of-time (AOT) mode to run UnoCSS to extract styles during the build task (default: true)
 * @param config.ssr (boolean) - enables server-side rendering (SSR) mode to run UnoCSS live to extract styles during server renders (default: true)
 * @param config.csr (boolean) - enables client-side rendering (CSR) mode to run the UnoCSS runtime on the client to generate styles live in response to DOM events (default: true)
 */
export const unocss = ({
  url,
  aot = true,
  ssr = true,
  // IMPORTANT: csr mode is disabled by default since it significantly slows down hydration
  // due primarily to the presetIcons() being used by presetShadcn(), which bloats the base64
  // encoded ESM import of the entrypoint script to initialize the unocss runtime. To work around
  // this, the presetShadcn() already safe-lists all dynamically injected classes (e.g. those from dialogs
  // which are mounted dynamically), and additional ones can be specified in "safelist" of uno.config.
  // see https://github.com/netzo/netzo/issues/172
  csr = false,
  ...config
}: UnocssConfig): Plugin<NetzoState> => {
  // NOTE: Subhosting somehow fails when operating with and/or importing from
  // file:// URLs, so we remove the file:// prefix to avoid build/deployment errors
  const configURL = url.replace("file://", "");

  // Serialize UnoCSS config contents to base64 ES import since default fresh serialization
  // (via esbuild) looses functions when bundling the client runtime script for CSR mode.
  const exists = existsSync(configURL, { isFile: true, isReadable: true });
  if (csr && !exists) {
    throw new Error(
      `Missing UnoCSS configuration file in the project directory.`,
    );
  }
  if ((aot || ssr) && !config) {
    throw new Error(
      `Missing UnoCSS configuration file in the project directory.`,
    );
  }

  // Link to CSS file, if AOT mode is enabled
  const links = aot ? [{ rel: "stylesheet", href: "/uno.css" }] : [];

  // Add entrypoint, if CSR mode is enabled
  const scripts = csr ? [{ entrypoint: "main", state: {} }] : [];

  // In CSR-only mode, include the style resets using an inline style tag
  const styles = csr && !aot && !ssr ? [{ cssText: unoResetCSS }] : [];

  const middlewares: Plugin["middlewares"] = [];

  //  Created in configResolved()
  let uno: UnoGenerator;

  // Create a set that may be used to hold class names encountered during SSR
  const ssrClasses = new Set<string>();

  return {
    name: "unocss",
    middlewares,
    // Optional client runtime
    entrypoints: csr
      ? {
        "main": `
        data:application/javascript,
        console.time("[unocss] imports");
        import config from "data:application/javascript;base64,${
          btoa(Deno.readTextFileSync(configURL))
        }";
        import initUnocssRuntime from "https://esm.sh/@unocss/runtime@0.59.0";
        console.timeEnd("[unocss] imports");
        console.log(config);
        export default function() {
          console.time("[unocss] initUnocssRuntime");
          globalThis.__unocss = config;
          initUnocssRuntime();
          console.timeEnd("[unocss] initUnocssRuntime");
        }`,
      }
      : {},
    async configResolved(freshConfig) {
      // Create the generator object
      uno = new UnoGenerator(config);

      if (ssr) {
        // Hook into Preact to add to the set of classes during the render
        installPreactHook(ssrClasses);
      } else if (aot && freshConfig.dev) {
        // Extract classes from source code now, and generate CSS
        console.log(
          "%cGenerating UnoCSS stylesheet...",
          "color: blue; font-weight: bold",
        );
        const css = await runOverSource(uno);

        // Craft a response for requests for the generated CSS file
        const resp = new Response(css, {
          headers: {
            "Content-Type": "text/css",
            "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
          },
        });

        // Add a middleware to handle requests for the generated CSS file
        middlewares.push({
          path: "/",
          middleware: {
            handler: (_req, ctx) =>
              ctx.url.pathname === "/uno.css" ? resp : ctx.next(),
          },
        });
      }
    },
    async renderAsync(ctx) {
      // Generate inline styles, if SSR mode is enabled
      if (ssr) {
        // Clear any classes extracted during previous renders
        ssrClasses.clear();

        // Render. Preact will populate the list of classes.
        await ctx.renderAsync();

        // Run UnoCSS over the classes to generate CSS
        const { css } = await uno.generate(ssrClasses);

        // Include SSR CSS, and possibly CSR script
        return { scripts, styles: [{ cssText: `${unoResetCSS}\n${css}` }] };
      } else {
        // Include link to AOT-generated CSS file and/or CSR script
        await ctx.renderAsync();
        return { scripts, links, styles };
      }
    },
    async buildStart({ build: { outDir } }) {
      // Generate a static CSS file, if AOT mode is enabled
      if (aot) {
        // Extract classes from source code and generate CSS
        const css = await runOverSource(uno);

        // Write the generated CSS to a static file
        await Deno.writeTextFile(join(outDir, "static", "uno.css"), css);
      }
    },
  };
};
