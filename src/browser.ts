// This file is entrypoint of browser builds and executes when loaded in a browser
import { rest, realtime } from './modules'

// instead of casting window to any, you can extend the Window interface
// see https://stackoverflow.com/a/43513740/5433572
declare global {
  interface Window {
    Wot: { Core: unknown; Http: unknown; WebSocket: unknown }
    Netzo: unknown
  }
}

export const Netzo = (options: NetzoOptions): Netzo => ({
  ...rest(options.rest),
  ...realtime(options?.realtime)
})

window.Netzo = Netzo
