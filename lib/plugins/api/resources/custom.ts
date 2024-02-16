import { NotImplemented } from "../errors.ts";
import type { Method, Resource, ResourceOptions } from "./mod.ts";

export type CustomResourceOptions = ResourceOptions & {
  find?: Resource["find"];
  get?: Resource["get"];
  create?: Resource["create"];
  update?: Resource["update"];
  patch?: Resource["patch"];
  remove?: Resource["remove"];
};

/**
 * Creates a Resource instance to perform RESTful operations on a custom resource
 * @param options {CustomResourceOptions} - resource options object
 * @returns a Resource instance for performing RESTful operations on the custom resource
 */
export const CustomResource = <T = Record<string, unknown>>(
  options: CustomResourceOptions,
): Resource<T> => {
  const {
    idField = "id",
    find = (_query) => {
      throw new NotImplemented(getErrorMessage("find"));
    },
    get = (_id) => {
      throw new NotImplemented(getErrorMessage("get"));
    },
    create = (_data) => {
      throw new NotImplemented(getErrorMessage("create"));
    },
    update = (_id, _data) => {
      throw new NotImplemented(getErrorMessage("update"));
    },
    patch = (_id, _data) => {
      throw new NotImplemented(getErrorMessage("patch"));
    },
    remove = (_id) => {
      throw new NotImplemented(getErrorMessage("remove"));
    },
  } = options;

  return {
    options: {
      idField,
    },
    find: find as Resource<T>["find"],
    get: get as Resource<T>["get"],
    create: create as Resource<T>["create"],
    update: update as Resource<T>["update"],
    patch: patch as Resource<T>["patch"],
    remove: remove as Resource<T>["remove"],
  };
};

function getErrorMessage(method: Method) {
  return `Method "${method}" is not implemented for this resource.`;
}
