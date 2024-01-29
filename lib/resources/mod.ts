// lik @unjs/unstorage but for resources instead of storage
export * from "./utils.ts";

export type Resource<T = unknown> = {
  name?: string;
  options?: Record<string, unknown>;
  find: (query?: Record<string | number, unknown>) => Promise<T[]>;
  get: (id: string) => Promise<T | undefined>;
  create: (data: T) => Promise<T>;
  update: (id: string, data: T) => Promise<T>;
  patch: (id: string, data: Partial<T>) => Promise<T>;
  remove: (id: string) => Promise<{ ok: boolean }>;
};

type ResourceFactory<T> = (opts: T) => Resource;

export function defineResource<T = any>(
  factory: ResourceFactory<T>,
): ResourceFactory<T> {
  return factory;
}
