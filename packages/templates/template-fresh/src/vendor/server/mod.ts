import { ServerContext } from './context.ts' // "https://deno.land/x/fresh@1.1.4/src/server/context.ts";
import { serve } from 'https://deno.land/x/fresh@1.1.4/src/server/deps.ts'
export { Status } from 'https://deno.land/x/fresh@1.1.4/src/server/deps.ts'
import {
  AppModule,
  ErrorPageModule,
  IslandModule,
  MiddlewareModule,
  RouteModule,
  StartOptions,
  UnknownPageModule,
} from 'https://deno.land/x/fresh@1.1.4/src/server/types.ts'
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
} from 'https://deno.land/x/fresh@1.1.4/src/server/types.ts'
export { RenderContext } from 'https://deno.land/x/fresh@1.1.4/src/server/render.ts'
export type { InnerRenderFunction } from 'https://deno.land/x/fresh@1.1.4/src/server/render.ts'
import {
  ALIVE_URL,
  BUILD_ID,
  JS_PREFIX,
  REFRESH_JS_URL,
} from 'https://deno.land/x/fresh@1.1.4/src/server/constants.ts'

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
  baseUrl: string
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
  console.log({ ALIVE_URL, BUILD_ID, JS_PREFIX, REFRESH_JS_URL })
  if (opts.experimentalDenoServe === true) {
    // @ts-ignore as `Deno.serve` is still unstable.
    await Deno.serve(ctx.handler() as Deno.ServeHandler, opts)
  } else {
    await serve(ctx.handler(), opts)
  }
}
