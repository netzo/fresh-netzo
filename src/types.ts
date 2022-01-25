import { Application } from "@feathersjs/feathers"

export interface Netzo extends Application {
  [k: string]: unknown // allow extensions
}

export interface NetzoOptions {
  app?: Application
  key: string
  url: string
}

// utils:

export type getApiUrl = () => string

export type getToken = () => string | null
