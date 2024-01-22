import fs from 'fs'
import { join, dirname } from 'path'
import { readFile, writeFile } from 'fs/promises'
import {
  Callable,
  PinionContext,
  loadJSON,
  fromFile,
  getCallable,
  renderTemplate,
  inject,
  Location,
  exec
} from '@netzocloud/pinion'
import ts from 'typescript'
import prettier, { Options as PrettierOptions } from 'prettier'
import path from 'path'
import { DenoJson } from './types.ts'

// Set __dirname in es module
const __dirname = dirname(new URL(import.meta.url).pathname)


/**
 * Returns the name of the Netzo database adapter for a supported database type
 *
 * @param database The type of the database
 * @returns The name of the adapter
 */
export const getDatabaseAdapter = (database: DatabaseType) => (database === 'mongodb' ? 'mongodb' : 'knex')

export type NetzoAppInfo = {
  /**
   * The application language
   */
  language: 'ts' | 'js'
}

export interface AppDenoJson extends DenoJson {
  netzo?: NetzoAppInfo
}

export interface NetzoBaseContext extends PinionContext {
  /**
   * Information about the Netzo application (like chosen language, database etc.)
   * usually taken from `package.json`
   */
  netzo: NetzoAppInfo
  /**
   * The package.json file
   */
  denoJson: AppDenoJson
  /**
   * The folder where source files are put
   */
  src: string
  /**
   * The folder where test files are put
   */
  test: string
  /**
   * The language the app is generated in
   */
  language: 'js' | 'ts'
}

/**
 * Returns dependencies with the versions from the context attached (if available)
 *
 * @param dependencies The dependencies to install
 * @param versions The dependency version list
 * @returns A list of dependencies with their versions
 */
export const addVersions = (dependencies: string[], versions: DependencyVersions) =>
  dependencies.map((dep) => `${dep}@${versions[dep] ? versions[dep] : 'latest'}`)

/**
 * Loads the application package.json and populates information like the library and test directory
 * and Netzo app specific information.
 *
 * @returns The updated context
 */
export const initializeBaseContext =
  () =>
    <C extends NetzoBaseContext>(ctx: C) =>
      Promise.resolve(ctx)
        .then(loadJSON(fromFile('package.json'), (denoJson) => ({ denoJson }), {}))
        .then(
          loadJSON(path.join(__dirname, '..', 'package.json'), (denoJson: DenoJson) => ({
            dependencyVersions: {
              ...denoJson.devDependencies,
              ...ctx.dependencyVersions,
              '@netzojs/cli': version
            }
          }))
        )
        .then((ctx) => ({
          ...ctx,
          src: ctx.denoJson?.directories?.src || 'src',
          test: ctx.denoJson?.directories?.test || 'test',
          language: ctx.language || ctx.denoJson?.netzo?.language,
          netzo: ctx.denoJson?.netzo
        }))

/**
 * Checks if the current context contains a valid generated application. This is necesary for most
 * generators (besides the app generator).
 *
 * @param ctx The context to check against
 * @returns Throws an error or returns the original context
 */
export const checkPreconditions =
  () =>
    async <T extends NetzoBaseContext>(ctx: T) => {
      if (!ctx.netzo) {
        throw new Error(`Can not run generator since the current folder does not appear to be a Netzo application.
Either your package.json is missing or it does not have \`netzo\` property.
`)
      }

      return ctx
    }

const importRegex = /from '(\..*)'/g
const escapeNewLines = (code: string) => code.replace(/\n\n/g, '\n/* :newline: */')
const restoreNewLines = (code: string) => code.replace(/\/\* :newline: \*\//g, '\n')
const fixLocalImports = (code: string) => code.replace(importRegex, "from '$1.js'")

/**
 * Returns the transpiled and prettified JavaScript for a TypeScript source code
 *
 * @param typescript The TypeScript source code
 * @param options TypeScript transpilation options
 * @returns The formatted JavaScript source code
 */
export const getJavaScript = (typescript: string, options: ts.TranspileOptions = {}) => {
  const source = escapeNewLines(typescript)
  const transpiled = ts.transpileModule(source, {
    ...options,
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
      preserveValueImports: true,
      ...options.compilerOptions
    }
  })

  return fixLocalImports(restoreNewLines(transpiled.outputText))
}

const getFileName = async <C extends PinionContext & { language: 'js' | 'ts' }>(
  target: Callable<string, C>,
  ctx: C
) => `${await getCallable(target, ctx)}.${ctx.language}`
