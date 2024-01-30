import { defineService, type ServiceOptions } from "../types.ts";
import { NotImplemented } from "../errors.ts";

export type CustomServiceOptions = ServiceOptions & {};

/**
 * Creates a Service instance to perform RESTful operations on an CUSTOM resource
 * @param options {CustomServiceOptions} - service options object
 * @returns a Service instance with methods for performing RESTful operations on the CUSTOM resource
 */
export const CustomService = defineService<CustomServiceOptions>(
  (options) => {
    const { idField = "id" } = options;

    return {
      name: "custom",
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
