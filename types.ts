import {
  ClientHTTP,
  ClientOptionsHTTP,
  // TODO: ClientSSE, ClientOptionsSSE,
  // TODO: ClientWebSocket, ClientOptionsWebSocket
} from "./src/mod.ts";

export type Netzo = (options: NetzoOptions) => INetzo

export interface NetzoOptions {
  apiKey: string
  baseURL?: string
}

export interface INetzo {
  baseURL: string
  getApiKey: () => string
}

export type ClientOptions = ClientOptionsHTTP /* | ClientOptionsSSE | ClientOptionsWebSocket */

export type Client = ClientHTTP /* | ClientSSE | ClientWebSocket */
