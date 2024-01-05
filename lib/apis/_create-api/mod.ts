import { $fetch, type FetchOptions } from "https://esm.sh/v135/ofetch@1.1.1";
import {
  type QueryObject,
  resolveURL,
  withQuery,
} from "https://esm.sh/v135/ufo@1.2.0";
import type {
  ApiClient,
  ApiMethodHandler,
  ApiMethodHandlerGET,
  ResponseType,
} from "./types.ts";
import { headersToObject } from "./utils.ts";

const payloadMethods: ReadonlyArray<string> = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
];

/**
 * Minimal, type-safe REST client using JS proxies
 */
export function createApi<R extends ResponseType = "json">(
  defaultOptions: Omit<FetchOptions<R>, "method"> = {},
): ApiClient {
  // Callable internal target required to use `apply` on it
  const internalTarget = (() => {}) as ApiClient;

  function p(url: string): ApiClient {
    return new Proxy(internalTarget, {
      get(_target, key: string) {
        const method = String(key).toUpperCase();

        if (!["GET", ...payloadMethods].includes(method)) {
          return p(resolveURL(url, key));
        }

        const handlerGET: ApiMethodHandlerGET = <
          T = unknown,
          R extends ResponseType = "json",
        >(
          query?: QueryObject,
          options: FetchOptions<R> = {},
        ) => {
          if (query) url = withQuery(url, query);
          options = {
            ...defaultOptions,
            ...options,
            method,
            headers: {
              ...headersToObject(defaultOptions.headers),
              ...headersToObject(options.headers),
            },
            body: undefined, // GET disallows body so remove it
          } as FetchOptions<R>;

          return $fetch<T, R>(url, options);
        };

        const handler: ApiMethodHandler = <
          T = unknown,
          R extends ResponseType = "json",
        >(
          data?: RequestInit["body"] | Record<string, unknown>,
          query?: QueryObject,
          options: FetchOptions<R> = {},
        ) => {
          if (query) url = withQuery(url, query);
          options = {
            ...defaultOptions,
            ...options,
            method,
            headers: {
              ...headersToObject(defaultOptions.headers),
              ...headersToObject(options.headers),
            },
            body: data,
          } as FetchOptions<R>;

          return $fetch<T, R>(url, options);
        };

        return payloadMethods.includes(method) ? handler : handlerGET;
      },
      apply(_target, _thisArg, args: (string | number)[] = []) {
        return p(resolveURL(url, ...args.map((i) => `${i}`)));
      },
    });
  }

  return p(defaultOptions.baseURL || "/");
}
