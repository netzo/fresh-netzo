// lik @unjs/unstorage but for resources instead of storage
export * from "./utils.ts";
import type { ULID } from "../deps/ulid.ts";

export type Id = string | number | ULID;

export type Resource<T = unknown> = {
  name?: string;
  options?: Record<string, unknown>;
  find: (query?: Record<string | number, unknown>) => Promise<T[]>;
  get: (id: Id) => Promise<T | undefined>;
  create: (data: T) => Promise<T>;
  update: (id: Id, data: T) => Promise<T>;
  patch: (id: Id, data: Partial<T>) => Promise<T>;
  remove: (id: Id) => Promise<{ ok: boolean }>;
};

type ResourceFactory<T> = (opts: T) => Resource;

export function defineResource<T = any>(
  factory: ResourceFactory<T>,
): ResourceFactory<T> {
  return factory;
}
