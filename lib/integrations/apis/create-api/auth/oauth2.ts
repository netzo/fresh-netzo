import {
  AuthorizationOAuth2,
  // AuthorizationOAuth2AuthorizationCode,
  AuthorizationOAuth2ClientCredentials,
} from "./types.ts";
// import { OAuth2Client } from "https://deno.land/x/oauth2_client/mod.ts"

/**
 * Client Credential Flow (2-legged authorization)
 *
 * Relevant for: Machine-to-Machine (M2M) applications, daemons, back-end resources, and CLIs.
 * Use case: Allows applications to obtain an access token by passing their client secret and
 * client ID directly to the authorization server without user intervention.
 *
 * @see https://frontegg.com/blog/oauth-flows
 * @see https://darutk.medium.com/diagrams-and-movies-of-all-the-oauth-2-0-flows-194f3c3ade85
 */
export const getTokenClientCredentialsFlow = async (
  authorization: AuthorizationOAuth2ClientCredentials,
) => {
  const { clientId, clientSecret, accessTokenUrl, scope } = authorization;

  let scopeString: string | undefined;
  if (scope) {
    if (Array.isArray(scope)) {
      scopeString = scope.join(" ");
    } else {
      scopeString = scope;
    }
  }

  // NOTE: client_id and client_secret are passed both in the body and in
  // the header just in case the server does not support one or the other
  const response = await fetch(accessTokenUrl, {
    method: "POST",
    headers: new Headers({
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    }),
    body: new URLSearchParams({
      "grant_type": "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      ...(scopeString && { scope: scopeString }),
    }),
  });
  return response.json();
};

/**
 * Resource Owner Password Credentials Flow (3-legged authorization)
 */
// export const getTokenPasswordCredentialsFlow = async (
//   authorization: AuthorizationOAuth2PasswordCredentials,
// ) => {
//   const { clientId, clientSecret, accessTokenUrl, username, password, scope } =
//     authorization;
//   const response = await fetch(accessTokenUrl, {
//     method: "POST",
//     headers: {
//       "content-type": "application/x-www-form-urlencoded",
//     },
//     body: new URLSearchParams({
//       grant_type: "password_credentials",
//       client_id: clientId,
//       client_secret: clientSecret,
//       username,
//       password,
//       ...(scope && { scope }),
//     }),
//   });
//   return response.json();
// };

/**
 * Authorization Code Flow (3-legged authorization)
 *
 * Authorization Code Flow exchanges an authorization code for
 * a token. For this exchange to take place, you have to also
 * pass along your app’s Client Secret. The secret must be
 * securely stored on the client side.
 *
 * Use Cases: Server side web applications where the source
 * code is not exposed publicly.
 *
 * @see https://frontegg.com/blog/oauth-flows
 * @see https://darutk.medium.com/diagrams-and-movies-of-all-the-oauth-2-0-flows-194f3c3ade85
 */
// export const getTokenAuthorizationCodeFlow = async (
//   authorization: AuthorizationOAuth2AuthorizationCode,
// ) => {
//   const { clientId, clientSecret, accessTokenUrl, redirectUrl, scope } =
//     authorization;

//   const getAuthorizationCode = async () => {
//     const response = await fetch(accessTokenUrl, {
//       method: "POST",
//       headers: {
//         "content-type": "application/x-www-form-urlencoded",
//       },
//       body: new URLSearchParams({
//         grant_type: "authorization_code",
//         client_id: clientId,
//         client_secret: clientSecret,
//         redirect_uri: redirectUrl,
//         response_type: "code",
//         ...(scope && { scope }),
//       }),
//     });
//     const code = response.json();
//     console.log(code);
//     return code;
//   };

//   const response = await fetch(accessTokenUrl, {
//     method: "POST",
//     headers: {
//       "content-type": "application/x-www-form-urlencoded",
//     },
//     body: new URLSearchParams({
//       grant_type: "authorization_code",
//       client_id: clientId,
//       client_secret: clientSecret,
//       redirect_uri: redirectUrl,
//       ...(scope && { scope }),
//       code: await getAuthorizationCode(),
//     }),
//   });
//   return response.json();
// };

export const getToken = async (authorization: AuthorizationOAuth2) => {
  if (authorization.grantType === "client_credentials") {
    return await getTokenClientCredentialsFlow(authorization);
  }
  // if (authorization.grantType === "password_credentials") {
  //   return await getTokenPasswordCredentialsFlow(authorization);
  // }
  // if (authorization.grantType === "authorization_code") {
  //   return await getTokenAuthorizationCodeFlow(authorization);
  // }
  throw new Error("Grant type not supported");
};
