// deno-lint-ignore-file no-explicit-any
import { _get } from "../../deps/lodash.get.ts";
import { logInfo } from "./console.ts";

export function setEnvVars(envVars: Record<string, any>) {
  for (const key in envVars) {
    Deno.env.set(key, envVars[key]);
  }
  const count = Object.keys(envVars).length;
  logInfo(`Set ${count} development environment variables`);
}

export function filterObjectsByKeyValues<T = Record<string, any>>(
  data: T[],
  filters: Record<string, any> = {},
) {
  let filteredData = data;

  if (Object.keys(filters).length > 0) {
    for (const key in filters) {
      if (filters[key]) {
        const value = filters?.[key];

        if (["string", "number", "boolean"].includes(typeof value)) {
          filteredData = filteredData.filter((item) => {
            const itemValue = _get(item, key, "") as string;
            const itemValueString = itemValue?.toString();
            return itemValue?.toLowerCase().includes(
              itemValueString?.toLowerCase(),
            );
          });
        }
      }
    }
  }

  return filteredData;
}

export async function parseRequestBody(req: Request) {
  const contentType = req.headers.get("content-type"); // case insensitive
  if (contentType?.includes("application/json")) {
    return req.json();
  } else if (contentType?.includes("multipart/form-data")) {
    const formData = await req.formData();
    return Object.fromEntries([...formData.entries()]);
  } else if (contentType?.includes("text/plain")) {
    return JSON.parse(await req.text());
  } else {
    try {
      return req.json();
    } catch (_jsonError) {
      try {
        return Object.fromEntries((await req.formData()).entries());
      } catch (_formDataError) {
        return JSON.parse(await req.text());
      }
    }
  }
}
