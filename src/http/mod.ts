import type { FetchOptions } from 'https://esm.sh/ohmyfetch'
import { ClientBuilder, createClient } from "./create-client.ts";

export type ClientOptionsHTTP = Omit<FetchOptions<"json">, "method">

export type ClientHTTP = ClientBuilder

export const http = (options: ClientOptionsHTTP): ClientHTTP => createClient(options)

export * from "./create-client.ts";
export * from "./types.ts";
export * from "./utils.ts";