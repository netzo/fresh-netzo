export interface AuthorizationNone {
  type: 'none'
}

export interface AuthorizationBasic {
  type: 'basic'
  username: string
  password: string
}

export interface AuthorizationBearer {
  type: 'bearer'
  token: string
}

export interface AuthorizationApiKey {
  type: 'apiKey'
  in: 'query' | 'header' // | "cookie";
  key: string
  value: string
}

export interface AuthorizationOAuth2ClientCredentials {
  type: 'oauth2'
  grantType: 'client_credentials'
  headerPrefix: 'Bearer' | string
  authorizationUri: string
  clientId: string
  clientSecret: string
  scope?: string
}

export interface AuthorizationOAuth2PasswordCredentials {
  type: 'oauth2'
  grantType: 'password_credentials'
  headerPrefix: 'Bearer' | string
  accessTokenUri: string
  clientId: string
  clientSecret: string
  username: string
  password: string
  scope?: string
}

export interface AuthorizationOAuth2Implicit {
  type: 'oauth2'
  grantType: 'implicit'
  headerPrefix: 'Bearer' | string
  callbackUri: string
  authorizationUri: string
  clientId: string
  clientSecret: string
  scope?: string
  state: string
}

export interface AuthorizationOAuth2AuthorizationCode {
  type: 'oauth2'
  grantType: 'authorization_code'
  headerPrefix: 'Bearer' | string
  callbackUri: string
  authorizationUri: string
  accessTokenUri: string
  clientId: string
  clientSecret: string
  scope?: string
  state: string
}

export type AuthorizationOAuth2 =
  | AuthorizationOAuth2ClientCredentials
  | AuthorizationOAuth2PasswordCredentials
  | AuthorizationOAuth2Implicit
  | AuthorizationOAuth2AuthorizationCode

export type Authorization =
  | AuthorizationNone
  | AuthorizationBasic
  | AuthorizationBearer
  | AuthorizationApiKey
  | AuthorizationOAuth2
