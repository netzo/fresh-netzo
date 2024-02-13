import type { ULID } from "../../../deps/ulid.ts";

export * from "./custom.ts";
export * from "./denokv.ts";
export * from "./http.ts";

export type Method = "find" | "get" | "create" | "update" | "patch" | "remove";

export type ResourceOptions = {
  /* Name of the field to use as the ID for the items (defaults to "id"). */
  idField?: string;
};

type MaybePromise<T> = (T | undefined) | Promise<T | undefined> | undefined;

export type Id = string | number | ULID;

export type Resource<T = unknown> = {
  type?: "denokv" | "http"; // undefined means custom resource
  options?: Record<string, unknown>;
  find: (query?: Record<string, unknown>) => MaybePromise<T[]>;
  get: (id: Id) => MaybePromise<T>;
  create: (data: Partial<T>) => MaybePromise<T>;
  update: (id: Id, data: T) => MaybePromise<T>;
  patch: (id: Id, data: Partial<T>) => MaybePromise<T>;
  remove: (id: Id) => MaybePromise<{ ok: boolean }>;
  [k: string]: unknown; // circumvent Resource has no index signature
};
