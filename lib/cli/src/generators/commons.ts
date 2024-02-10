// adapted from https://github.com/feathersjs/feathers/blob/dove/packages/generators/src/commons.ts
import {
  type Callable,
  fromFile,
  getCallable,
  loadJSON,
  type Location,
  type PinionContext,
  renderTemplate,
} from "../../../deps/@featherscloud/pinion/mod.ts";
import { ts } from "../../../deps/typescript.ts";
import {
  Options as PrettierOptions,
  prettier,
} from "../../../deps/prettier.ts";
import { existsSync } from "../../../deps/std/fs/exists.ts";
import { DenoJson } from "./types.ts";

export type DependencyVersions = { [key: string]: string };

export type NetzoAppInfo = {
  /**
   * The application language
   */
  language: "ts" | "js";
};

export interface AppDenoJson extends DenoJson {
  netzo?: NetzoAppInfo;
}

export interface NetzoContext extends PinionContext {
  /**
   * Information about the Netzo application (like chosen language,
   * database etc.) usually taken from "netzo" property in `deno.json`
   */
  netzo: NetzoAppInfo;
  /**
   * The deno.json file
   */
  denoJson: AppDenoJson;
  /**
   * The folder where source files are put
   */
  src: string;
  /**
   * The folder where test files are put
   */
  test: string;
  /**
   * The language the app is generated in. Note that generators will
   * overwrite to "tsx" or "jsx" if required (via setLanguageTsxOrJsx())
   */
  language: "ts" | "js" | "tsx" | "jsx";
}

/**
 * Loads the application deno.json and populates information like
 * the library and test directory and Netzo app specific information.
 *
 * @returns The updated context
 */
export const initializeBaseContext = () => <C extends NetzoContext>(ctx: C) => {
  return Promise.resolve(ctx)
    .then(
      loadJSON(
        fromFile("deno.json"),
        (denoJson: DenoJson) => ({ denoJson }),
        {},
      ),
    )
    .then((ctx) => ({
      ...ctx,
      netzo: ctx.denoJson?.netzo,
      src: ctx.denoJson?.src || ".",
      test: ctx.denoJson?.test || "test",
      language: ctx.language || ctx.denoJson?.netzo?.language || "ts",
    }));
};

/**
 * Checks if the current context contains a valid generated application.
 * This is necessary for most generators (besides the app generator).
 *
 * @param ctx The context to check against
 * @returns Throws an error or returns the original context
 */
export const checkPreconditions = () => <T extends NetzoContext>(ctx: T) => {
  // const msg =
  //   "Cannot run generator since current folder does not appear to be a Netzo application.";
  // if (!ctx.netzo) {
  //   throw new Error(
  //     `${msg} Either the "deno.json" file is missing or it does not have a "netzo" property.`,
  //   );
  // }
  return ctx;
};

const importRegex = /from '(\..*)'/g;
const escapeNewLines = (code: string) =>
  code.replace(/\n\n/g, "\n/* :newline: */");
const restoreNewLines = (code: string) =>
  code.replace(/\/\* :newline: \*\//g, "\n");
const fixLocalImports = (code: string) =>
  code.replace(importRegex, "from '$1.js'");

/**
 * Returns the transpiled and prettified JavaScript for a TypeScript source code
 *
 * @param typescript The TypeScript source code
 * @param options TypeScript transpilation options
 * @returns The formatted JavaScript source code
 */
export const getJavaScript = (
  typescript: string,
  options: ts.TranspileOptions = {},
) => {
  const source = escapeNewLines(typescript);
  const transpiled = ts.transpileModule(source, {
    ...options,
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
      preserveValueImports: true,
      ...options.compilerOptions,
    },
  });

  return fixLocalImports(restoreNewLines(transpiled.outputText));
};

const getFileName = async <
  C extends PinionContext & { language: NetzoContext["language"] },
>(
  target: Callable<string, C>,
  ctx: C,
) => {
  const fileName = `${await getCallable(target, ctx)}.${ctx.language}`;
  return fileName;
};

/**
 * The default configuration for prettifying files
 */
export const PRETTIERRC: PrettierOptions = {
  tabWidth: 2,
  useTabs: false,
  printWidth: 110,
  semi: false,
  trailingComma: "none",
  singleQuote: true,
};

/*
 * Format a source file using Prettier. Will use the local configuration, the settings set in
 * `options` or a default configuration
 *
 * @param target The file to prettify
 * @param options The Prettier options
 * @returns The updated context
 */
export const prettify =
  <C extends PinionContext & { language: NetzoContext["language"] }>(
    target: Callable<string, C>,
    options: PrettierOptions = PRETTIERRC,
  ) =>
  async (ctx: C) => {
    const fileName = await getFileName(target, ctx);
    const config = (await prettier.resolveConfig(ctx.cwd)) || options;
    const content = await Deno.readTextFile(fileName);

    try {
      await Deno.writeTextFile(
        fileName,
        await prettier.format(content, {
          parser: ["ts", "tsx"].includes(ctx.language) ? "typescript" : "babel",
          ...config,
        }),
      );
    } catch (error) {
      throw new Error(`Error prettifying ${fileName}: ${error.message}`);
    }

    return ctx;
  };

/**
 * Render a source file template for the language set in the context.
 *
 * @param templates The JavaScript and TypeScript template to render
 * @param target The target filename without extension (will be added based on language)
 * @returns The updated context
 */
export const renderSource =
  <C extends PinionContext & { language: NetzoContext["language"] }>(
    template: Callable<string, C>,
    target: Callable<string, C>,
    options?: { force: boolean },
  ) =>
  async (ctx: C) => {
    const { language } = ctx;
    const fileName = await getFileName(target, ctx);
    const content = language === "js"
      ? getJavaScript(await getCallable<string, C>(template, ctx))
      : template;
    const renderer = renderTemplate(content, fileName, options);

    return renderer(ctx).then(prettify(target));
  };

/**
 * Inject a source template as the language set in the context.
 *
 * @param template The source template to render
 * @param location The location to inject the code to. Must use the target language.
 * @param target The target file name
 * @param transpile Set to `false` if the code should not be transpiled to JavaScript
 * @returns
 */
export const injectSource =
  <C extends PinionContext & { language: NetzoContext["language"] }>(
    template: Callable<string, C>,
    location: Location<C>,
    target: Callable<string, C>,
    transpile = true,
  ) =>
  async (ctx: C) => {
    const { language } = ctx;
    const source = language === "js" && transpile
      ? getJavaScript(await getCallable<string, C>(template, ctx))
      : template;
    const fileName = await getFileName(target, ctx);
    const injector = inject(source, location, fileName);

    return injector(ctx).then(prettify(target));
  };

/**
 * Synchronously checks if a file exits
 * @param context The base context
 * @param filenames The filenames to check
 * @returns Whether the file exists or not
 */
export const fileExists = (
  ...filenames: string[]
) => filenames.every((filename) => existsSync(filename));
