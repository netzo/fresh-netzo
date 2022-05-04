// FIXME: import type { OpenAPIObject, OperationObject } from "https://cdn.skypack.dev/openapi3-ts";

export type Spec = any; // FIXME: OpenAPIObject;
export type routeSpec = any; // FIXME: OperationObject;
export type Caller = (url: URL, body?: any) => Promise<any>;
export type Callers = Record<string, Caller>;
export type ValidationLevel = "off" | "warn" | "error";
export type Params = Record<string, any>;
