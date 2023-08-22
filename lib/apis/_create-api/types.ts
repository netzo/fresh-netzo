// deno-lint-ignore-file no-explicit-any
import type { FetchContext, FetchOptions } from "https://esm.sh/ofetch@1.1.1";
import type { QueryObject } from "https://esm.sh/ufo@1.2.0";

export type { FetchContext, FetchOptions };

export interface ResponseMap {
  blob: Blob;
  text: string;
  arrayBuffer: ArrayBuffer;
}

export type ResponseType = keyof ResponseMap | "json";
export type MappedType<R extends ResponseType, JsonType = any> = R extends
  keyof ResponseMap ? ResponseMap[R] : JsonType;

export type ClientMethodHandlerGET = <T = any, R extends ResponseType = "json">(
  query?: QueryObject,
  options?: Omit<FetchOptions<R>, "baseURL" | "method">,
) => Promise<MappedType<R, T>>;

export type ClientMethodHandler = <T = any, R extends ResponseType = "json">(
  data?: RequestInit["body"] | Record<string, any>,
  query?: QueryObject,
  options?: Omit<FetchOptions<R>, "baseURL" | "method">,
) => Promise<MappedType<R, T>>;

export type ClientBuilder = {
  [key: string]: ClientBuilder;
  (...segmentsOrIds: (string | number)[]): ClientBuilder;
} & {
  get: ClientMethodHandlerGET;
  post: ClientMethodHandler;
  put: ClientMethodHandler;
  delete: ClientMethodHandler;
  patch: ClientMethodHandler;
};
