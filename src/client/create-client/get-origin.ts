import OAClientError from "../errors/OAClientError.ts";
import { Spec } from "../types.ts";

export default (origin: null | string, spec: Spec) => {
  if (origin) return origin;
  if (!spec.servers || !spec.servers[0].url) {
    throw new OAClientError(3);
  }
  return spec.servers[0].url;
};
