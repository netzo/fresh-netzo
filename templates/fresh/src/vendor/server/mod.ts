import { ServerContext } from './context.ts' // "$fresh/src/server/context.ts";
import { serve } from '$fresh/src/server/deps.ts'
export { Status } from '$fresh/src/server/deps.ts'
import {
  AppModule,
  ErrorPageModule,
  IslandModule,
  MiddlewareModule,
  RouteModule,
  StartOptions,
  UnknownPageModule,
} from '$fresh/src/server/types.ts'
export type {
  AppProps,
  ErrorHandler,
  ErrorHandlerContext,
  ErrorPageProps,
  FreshOptions,
  Handler,
  HandlerContext,
  Handlers,
  MiddlewareHandler,
  MiddlewareHandlerContext,
  PageProps,
  Plugin,
  PluginRenderResult,
  PluginRenderScripts,
  PluginRenderStyleTag,
  RenderFunction,
  RouteConfig,
  StartOptions,
  UnknownHandler,
  UnknownHandlerContext,
  UnknownPageProps,
} from '$fresh/src/server/types.ts'
export { RenderContext } from '$fresh/src/server/render.ts'
export type { InnerRenderFunction } from '$fresh/src/server/render.ts'
import {
  ALIVE_URL,
  BUILD_ID,
  JS_PREFIX,
  REFRESH_JS_URL,
} from '$fresh/src/server/constants.ts'

export interface Manifest {
  routes: Record<
    string,
    | RouteModule
    | MiddlewareModule
    | AppModule
    | ErrorPageModule
    | UnknownPageModule
  >
  islands: Record<string, IslandModule>
  baseURL: string
  config?: DenoConfig
}

export interface DenoConfig {
  importMap: string
  compilerOptions?: {
    jsx?: string
    jsxImportSource?: string
  }
}

export { ServerContext }

export async function start(routes: Manifest, opts: StartOptions = {}) {
  const ctx = await ServerContext.fromManifest(routes, opts)
  opts.port ??= 8000
  console.log({ opts, ALIVE_URL, BUILD_ID, JS_PREFIX, REFRESH_JS_URL })
  if (opts.experimentalDenoServe === true) {
    // @ts-ignore as `Deno.serve` is still unstable.
    await Deno.serve(ctx.handler() as Deno.ServeHandler, opts)
  } else {
    await serve(ctx.handler(), opts)
  }
}
