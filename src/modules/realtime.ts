import fetch from 'isomorphic-fetch'
import { getApiUrl, getToken } from './utils'
import rest from "@feathersjs/rest-client";
import axios from "axios";

const app = feathers()
const restClient = rest(apiUrl)
const transport = restClient.axios(axios)
app.configure(transport)

// browser should have fetch already loaded, else use npm packages
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Wot: any = window?.fetch || { Core, Http, WebSocket }

export const wot: NetzoRealtime = async (options = {}) => {
  const { Core, Http, WebSocket } = Wot
  const servient = new Core.Servient()
  servient.addClientFactory(new Http.HttpClientFactory(options.http))
  servient.addClientFactory(new WebSocket.WebSocketClientFactory(options.ws))
  const wot = await servient.start() // { srv, consume, produce, discover, addDefaultLanguage.... } (from wot.__proto__)

  const fetchTD = async (_id: string): Promise<WoT.ThingDescription> => {
    const res = await fetch(`${getApiUrl()}/wot/things/${_id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    return (await res.json()) as WoT.ThingDescription
  }

  const consumeThing = async (_id: string): Promise<WoT.ConsumedThing> => {
    return wot.consume(await fetchTD(_id))
  }

  // NOTE: Object.assign() since spread (...) loose prototype properties (under __proto__)
  return Object.assign(wot, { fetchTD, consumeThing })
}
