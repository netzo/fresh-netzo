import {
  AuthorizationOAuth2,
  AuthorizationOAuth2AuthorizationCode,
  AuthorizationOAuth2ClientCredentials,
  AuthorizationOAuth2Implicit,
  AuthorizationOAuth2PasswordCredentials,
} from '../types.ts'
// import { OAuth2Client } from "https://deno.land/x/oauth2_client/mod.ts"

/**
 * Client Credential Flow (2-legged authorization)
 *
 * The Client Credentials Flow allows applications to pass their
 * Client Secret and Client ID to an authorization server, which
 * authenticates the user, and returns a token. This happens
 * without any user intervention.
 *
 * Relevant for: M2M apps (daemons, back-end resources, and CLIs)
 *
 * @see https://frontegg.com/blog/oauth-flows
 * @see https://darutk.medium.com/diagrams-and-movies-of-all-the-oauth-2-0-flows-194f3c3ade85
 */
const DEFAULTS: AuthorizationOAuth2ClientCredentials = {
  type: 'oauth2',
  grantType: 'client_credentials',
  headerPrefix: 'Bearer',
  clientId:
    '333607581312-m8un366ektgv0agc3q897ld1ep3dmr84.apps.googleusercontent.com',
  clientSecret: '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',
  authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
  scope: 'https://www.googleapis.com/auth/drive',
}
export const getTokenClientCredentialsFlow = async (
  authorization: AuthorizationOAuth2ClientCredentials = DEFAULTS,
) => {
  const { clientId, clientSecret, authorizationUrl, scope } = authorization
  const response = await fetch(authorizationUrl, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    }),
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
      ...(scope && { scope }),
    }),
  })
  return response.json()
}

/**
 * Resource Owner Password Credentials Flow (3-legged authorization)
 */
export const getTokenPasswordCredentialsFlow = async (
  authorization: AuthorizationOAuth2PasswordCredentials,
) => {
  const { clientId, clientSecret, accessTokenUrl, username, password, scope } =
    authorization
  const response = await fetch(accessTokenUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'password_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      username,
      password,
      ...(scope && { scope }),
    }),
  })
  return response.json()
}

/**
 * Implicit Flow (3-legged authorization)
 */
export const getTokenImplicitFlow = async (
  authorization: AuthorizationOAuth2Implicit,
) => {
  const { clientId, authorizationUrl, redirectUrl, scope } = authorization
  const response = await fetch(authorizationUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'implicit',
      client_id: clientId,
      redirect_uri: redirectUrl,
      ...(scope && { scope }),
    }),
  })
  return response.json()
}

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
export const getTokenAuthorizationCodeFlow = async (
  authorization: AuthorizationOAuth2AuthorizationCode,
) => {
  const { clientId, clientSecret, accessTokenUrl, redirectUrl, scope } =
    authorization

  const getAuthorizationCode = async () => {
    const response = await fetch(accessTokenUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUrl,
        response_type: 'code',
        ...(scope && { scope }),
      }),
    })
    const code = response.json()
    console.log(code)
    return code
  }

  const response = await fetch(accessTokenUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUrl,
      ...(scope && { scope }),
      code: await getAuthorizationCode(),
    }),
  })
  return response.json()
}

export const getToken = async (authorization: AuthorizationOAuth2) => {
  if (authorization.grantType === 'client_credentials') {
    return await getTokenClientCredentialsFlow(authorization)
  }
  if (authorization.grantType === 'password_credentials') {
    return await getTokenPasswordCredentialsFlow(authorization)
  }
  if (authorization.grantType === 'implicit') {
    return await getTokenImplicitFlow(authorization)
  }
  if (authorization.grantType === 'authorization_code') {
    return await getTokenAuthorizationCodeFlow(authorization)
  }
  throw new Error('Grant type not supported')
}
