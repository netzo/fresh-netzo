import { defineResource, type ResourceOptions } from "../plugins/api/types.ts";
import { NotImplemented } from "../plugins/api/errors.ts";

export type CustomResourceOptions = ResourceOptions;

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
      find: (_query) => {
        throw new NotImplemented();
      },
      get: (_id) => {
        throw new NotImplemented();
      },
      create: (_data: T) => {
        throw new NotImplemented();
      },
      update: (_id, _data: T) => {
        throw new NotImplemented();
      },
      patch: (_id, _data: Partial<T>) => {
        Promise.reject(new NotImplemented());
      },
      remove: (_id) => {
        Promise.reject(new NotImplemented());
      },
    };
  },
);
