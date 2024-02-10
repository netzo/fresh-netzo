import type { ULID } from "../../../deps/ulid.ts";
import { NotImplemented } from "../errors.ts";

export * from "../utils.ts";

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
};

/**
 * Creates a Resource instance to perform RESTful operations on an arbitrary resource
 * @param options {ResourceOptions} - resource options object
 * @returns a Resource instance with methods for performing RESTful operations on the resource
 */
export const Resource = <T = Record<string, unknown>>(
  options: ResourceOptions,
): Resource<T> => {
  const { idField = "id" } = options;

  return {
    options: {
      idField,
    },
    find: (_query) => {
      throw new NotImplemented();
    },
    get: (_id) => {
      throw new NotImplemented();
    },
    create: (_data) => {
      throw new NotImplemented();
    },
    update: (_id, _data) => {
      throw new NotImplemented();
    },
    patch: (_id, _data) => {
      throw new NotImplemented();
    },
    remove: (_id) => {
      throw new NotImplemented();
    },
  };
};
