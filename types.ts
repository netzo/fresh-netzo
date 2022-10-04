export type Netzo = (options: NetzoOptions) => INetzo;

export interface NetzoOptions {
  apiKey: string;
  baseURL?: string;
}

export interface INetzo {
  baseURL: string;
  getApiKey: () => string;
}
