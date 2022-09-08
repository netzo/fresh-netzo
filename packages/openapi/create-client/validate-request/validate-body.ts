// FIXME: import type { RequestBodyObject } from "https://cdn.skypack.dev/openapi3-ts";
import validate from "./mod.ts";
import OAClientError from "../../errors/OAClientError.ts";
import { routeSpec } from "../../types.ts";

export default (routeSpec: routeSpec, contentType: string, body: any) => {
  const requestBody = routeSpec.requestBody as any; // FIXME: as RequestBodyObject;
  if (!requestBody) return;
  if (!body && !requestBody.required) return;
  if (!body && requestBody.required) {
    throw new OAClientError(101);
  }
  if (!requestBody.content[contentType]) {
    throw new OAClientError(102, { contentType, requestBody });
  }
  const { schema } = requestBody.content[contentType];
  validate(schema, body, {}, {}, {}, "");
};
