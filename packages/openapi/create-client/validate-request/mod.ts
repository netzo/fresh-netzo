// FIXME: import type { ParameterObject } from "https://cdn.skypack.dev/openapi3-ts";
import validateParam from "./validate-param.ts";
import validateBody from "./validate-body.ts";
import { Params, routeSpec, ValidationLevel } from "../../types.ts";

export default (
  validationLevel: ValidationLevel,
  routeSpec: routeSpec,
  pathParams: Params,
  queryParams: Params,
  body: any,
  contentType: string,
) => {
  if (validationLevel === "off") return;
  try {
    if (routeSpec.parameters) {
      for (const parameter of routeSpec.parameters) {
        const value = {
          path: pathParams,
          query: queryParams,
        }[(parameter as any /* as ParameterObject */).in as "path" | "query"][
          (parameter as any /* as ParameterObject */).name
        ];
        validateParam(parameter, value);
      }
    }
    validateBody(routeSpec, contentType, body);
  } catch (e) {
    if (!(e instanceof Error)) throw e;
    if (!e.message.startsWith("[oa-client:")) throw e;
    if (validationLevel === "warn") console.warn(e);
    throw e;
  }
};
