import type { INetzoClient, INetzoClientOptions, INetzo, INetzoOptions, IItemClient } from "./types.ts";
import { createClient } from "./lib/http/mod.ts";

export const getItemUrlById = (
  _type: string,
  _id: string,
  baseURL = 'https://api.netzo.io'
): string => new URL(`/${_type}s/${_id}`, baseURL).href;

export const getItemById = async (
  _type: string,
  _id: string,
  apiKey: string,
): Promise<INetzoClient> => {
  const url = getItemUrlById(_type, _id);
  const headers = { accept: "application/json", "x-api-key": apiKey };
  const response = await fetch(url, { headers });
  return response.json();
}

export const createClientRequestFactory = (options: INetzoOptions) => {
  const { apiKey, baseURL = "https://api.netzo.io" } = options;

  return async ({ _type, _id }: INetzoClientOptions): Promise<INetzoClient> => {
    if (!_type) throw new Error("No '_type' provided as argument.");
    if (!_id) throw new Error("No '_id' provided as argument.");

    const item = await getItemById(_type, _id, apiKey);
    const { url: baseURL, method, headers, body } = item.client as IItemClient;

    if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      return () => createClient({ baseURL, headers, })[method]();
    }
    else {
      return () => createClient({ baseURL, headers, })[method](body);
    }
  }
}