import { FetchContext } from "https://esm.sh/ofetch@1.0.0";
import { Authorization } from "./types.ts";

export const auth = (
  authorization: Authorization = { type: "none" },
  context: FetchContext,
): Promise<void> | void => {
  const query = {} as Record<string, string>;
  const headers = {} as Record<string, string>;

  if (authorization.type === "basic") {
    const { username, password } = authorization;
    const token = btoa(`${username}:${password}`);
    headers.Authorization = `Basic ${token}`;
  } else if (authorization.type === "bearer") {
    const { token } = authorization;
    headers.Authorization = `Bearer ${token}`;
  } else if (authorization.type === "apiKey") {
    const { in: In, key, value } = authorization;
    if (In === "query") query[key] = value;
    if (In === "header") headers[key] = value;
  } else if (authorization.type === "oauth2") {
    const { clientId, clientSecret, authorizationUri, accessTokenUri, redirectUri, scopes } = authorization;
    // set headers from oauth2
    const token = btoa(`${clientId}:${clientSecret}`); // TODO: get token from oauth2
    headers.Authorization = `Bearer ${token}`;
  }

  context.options.query = { ...context.options.query, ...query };
  context.options.headers = { ...context.options.headers, ...headers };
};
