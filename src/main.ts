import { rest, realtime } from './modules'

/**
 * Internal usage: things from Netzo API
 *
 * const netzo = Netzo({...})
 * const thing = netzo.wot.consumeThing(_id)
 * console.log(await thing.readProperty('temp'))
 *
 * const td = netzo.wot.fetchTD(_id)
 * const thing = await netzo.wot.consume(td)
 * console.log(await thing.readProperty('temp'))
 *
 * External usage: things from any hosted TD
 *
 * const netzo = Netzo({...})
 * const td = await fetchTD(url)
 * const thing = await netzo.wot.consume(td)
 * console.log(await thing.readProperty('temp'))
 *
 * const netzo = await Netzo.init(options: NetzoOptions)
 * const thing = netzo.wot.consumeThing(THING_ID) // wot() invoked by async init()
 * const dashboards = netzo.api.service('dashboards') // api() invoked by async init()
 * netzo.on('event', () => {})
 */

export const Netzo = (options: NetzoOptions): Netzo => ({
  ...rest(options.rest),
  ...realtime(options?.realtime)
})
