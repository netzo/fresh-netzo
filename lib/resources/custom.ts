import { defineResource, type ResourceOptions } from "../core/api/types.ts";
import { NotImplemented } from "../core/api/errors.ts";

export type CustomResourceOptions = ResourceOptions & {};

/**
 * Creates a Resource instance to perform RESTful operations on an CUSTOM resource
 * @param options {CustomResourceOptions} - resource options object
 * @returns a Resource instance with methods for performing RESTful operations on the CUSTOM resource
 */
export const CustomResource = defineResource<CustomResourceOptions>(
  (options) => {
    const { idField = "id" } = options;

    return {
      options: {
        idField,
      },
      find: (query) => {
        throw new NotImplemented();
      },
      get: (id) => {
        throw new NotImplemented();
      },
      create: (data: T) => {
        throw new NotImplemented();
      },
      update: (id, data: T) => {
        throw new NotImplemented();
      },
      patch: async (id, data: Partial<T>) => {
        throw new NotImplemented();
      },
      remove: async (id) => {
        throw new NotImplemented();
      },
    };
  },
);
