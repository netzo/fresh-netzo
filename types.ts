import {
  ClientHTTP,
  ClientOptionsHTTP,
  // TODO: ClientSSE, ClientOptionsSSE,
  // TODO: ClientWebSocket, ClientOptionsWebSocket
} from "./src/mod.ts";

export type Netzo = (options: INetzoOptions) => INetzo

export interface INetzoOptions {
  apiKey: string
  baseURL?: string
}

export interface INetzo {
  baseURL: string
  getApiKey: () => string
}

export type IClient = ClientHTTP /* | ClientSSE | ClientWebSocket */

export type IClientOptions = ClientOptionsHTTP /* | ClientOptionsSSE | ClientOptionsWebSocket */