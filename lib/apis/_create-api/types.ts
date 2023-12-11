// deno-lint-ignore-file no-explicit-any
import type { FetchContext, FetchOptions } from "https://esm.sh/v135/ofetch@1.1.1";
import type { QueryObject } from "https://esm.sh/v135/ufo@1.2.0";

export type { FetchContext, FetchOptions };

export type ResponseMap = {
  blob: Blob;
  text: string;
  arrayBuffer: ArrayBuffer;
};

export type ResponseType = keyof ResponseMap | "json";
export type MappedType<R extends ResponseType, JsonType = any> = R extends
  keyof ResponseMap ? ResponseMap[R] : JsonType;

export type ApiMethodHandlerGET<Query = QueryObject> = <
  T = any,
  R extends ResponseType = "json",
>(
  query?: Query,
  options?: Omit<FetchOptions<R>, "baseURL" | "method">,
) => Promise<MappedType<R, T>>;

export type ApiMethodHandler<Data = never, Query = QueryObject> = <
  T = any,
  R extends ResponseType = "json",
>(
  data?: Data,
  query?: Query,
  options?: Omit<FetchOptions<R>, "baseURL" | "method">,
) => Promise<MappedType<R, T>>;

export type ApiClient = {
  [key: string]: ApiClient;
  (...segmentsOrIds: (string | number)[]): ApiClient;
} & {
  get: ApiMethodHandlerGET<FetchOptions["query"]>;
  post: ApiMethodHandler<FetchOptions["body"], FetchOptions["query"]>;
  put: ApiMethodHandler<FetchOptions["body"], FetchOptions["query"]>;
  patch: ApiMethodHandler<FetchOptions["body"], FetchOptions["query"]>;
  delete: ApiMethodHandler<FetchOptions["body"], FetchOptions["query"]>;
};
