import getCaller from "./get-caller.ts";
import getOrigin from "./get-origin.ts";
import getCallPath from "./get-call-path.ts";
import validateRequest from "./validate-request/mod.ts";
import { Callers, Params, Spec, ValidationLevel } from "../types.ts";

const createClientPathMethod = (
  spec: Spec,
  path: string,
  method: string,
  callers: Callers,
  origin: string | null,
  validationLevel: ValidationLevel,
) =>
  (
    {
      pathParams = {},
      queryParams = {},
      body = null,
      contentType = "application/json",
    }: {
      pathParams: Params;
      queryParams: Params;
      body: any;
      contentType: string;
    } = {
      pathParams: {},
      queryParams: {},
      body: null,
      contentType: "application/json",
    },
  ) => {
    const routeSpec = spec.paths[path][method];
    validateRequest(
      validationLevel,
      routeSpec,
      pathParams,
      queryParams,
      body,
      contentType,
    );
    const caller = getCaller(callers, routeSpec, method);
    const callOrigin = getOrigin(origin, spec);
    const callPath = getCallPath(path, pathParams);
    const callUrl = new URL(callOrigin + callPath);
    for (const key in queryParams) {
      callUrl.searchParams.append(key, queryParams[key]);
    }
    return caller(callUrl, body);
  };

export const createClient = (
  spec: Spec,
  callers: Callers,
  {
    origin = null,
    validationLevel = "off",
  }: { origin: null | string; validationLevel: ValidationLevel } = {
    origin: null,
    validationLevel: "off",
  },
) => {
  const client: any = {};
  for (const path in spec.paths) {
    client[path] = {};
    for (const method in spec.paths[path]) {
      client[path][method] = createClientPathMethod(
        spec,
        path,
        method,
        callers,
        origin,
        validationLevel,
      );
    }
  }
  return client;
};
