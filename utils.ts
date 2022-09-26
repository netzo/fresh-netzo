import type { IClient, IClientOptions, INetzo, INetzoOptions, IItemClient } from "./types.ts";
import { IClientHTTP, IClientOptionsHTTP } from "./packages/http/types.ts";
import { createClient } from "./packages/http/mod.ts";

export const getItemUrlById = (
  id: string, baseURL = 'https://api.netzo.io'
): string => new URL(`/web/${id}`, baseURL).href;

export const getItemById = async (
  id: string,
  apiKey: string,
): Promise<IClient> => {
  const url = getItemUrlById(id);
  const headers = { accept: "application/json", "x-api-key": apiKey };
  const response = await fetch(url, { headers });
  return response.json();
}

export const createClientRequestFactory = (options: INetzoOptions) => {
  const { apiKey, baseURL = "https://api.netzo.io" } = options;

  return async ({ id }: IClientOptions): Promise<IClient> => {
    if (!id) throw new Error("No 'id' provided to as argument.");

    const item = await getItemById(id, apiKey);
    const { url: baseURL, method, headers, body } = item.client as IItemClient;

    if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      return () => createClient({ baseURL, headers, })[method]();
    }
    else {
      return () => createClient({ baseURL, headers, })[method](body);
    }
  }
}