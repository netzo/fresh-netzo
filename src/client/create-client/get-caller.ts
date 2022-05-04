import OAClientError from "../errors/OAClientError.ts";
import { Callers, routeSpec } from "../types.ts";

export default (callers: Callers, routeSpec: routeSpec, method: string) => {
  const type = routeSpec["x-type"] ?? method;
  if (!(type in callers)) throw new OAClientError(2, { type, callers });
  return callers[type];
};
