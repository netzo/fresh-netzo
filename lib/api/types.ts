// lik @unjs/unstorage but for services instead of storage
export * from "./utils.ts";
import type { ULID } from "../deps/ulid.ts";

export type Id = string | number | ULID;

export type Service<T = unknown> = {
  adapter?: "denokv" | "http"; // undefined means custom service
  options?: Record<string, unknown>;
  find?: (query?: Record<string | number, unknown>) => Promise<T[]>;
  get?: (id: Id) => Promise<T | undefined>;
  create?: (data: T) => Promise<T>;
  update?: (id: Id, data: T) => Promise<T>;
  patch?: (id: Id, data: Partial<T>) => Promise<T>;
  remove?: (id: Id) => Promise<{ ok: boolean }>;
};

type ServiceFactory<T> = (opts: T) => Service;

export function defineService<T = any>(
  factory: ServiceFactory<T>,
): ServiceFactory<T> {
  return factory;
}
