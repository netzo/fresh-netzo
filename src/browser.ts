// This file is entrypoint of browser builds and executes when loaded in a browser
import { createApp } from './modules/app'
import { Netzo, NetzoOptions } from './types'

const Netzo = (options: NetzoOptions): Netzo => {
  const app = createApp(options)

  return app
}

export default Netzo

// extends Window instead of casting to any
declare global {
  interface Window {
    Netzo: (NetzoOptions) => Netzo
  }
}

window.Netzo = Netzo
