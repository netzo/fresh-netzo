import { createApp } from './modules/app'
import { Netzo, NetzoOptions } from './types'

const Netzo = (options: NetzoOptions): Netzo => {
  const app = createApp(options)

  return app
}

export default Netzo