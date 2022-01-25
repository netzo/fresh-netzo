import authentication, { AuthenticationClient, AuthenticationClientOptions } from '@feathersjs/authentication-client'

export const auth = (app, options) => {
    class AuthenticationClientApiKey extends AuthenticationClient {
        // customizes auth strategy to use apikey if present to manually
        // authenticate and get the accessToken (jwt), setAccessToken()
        // from the parent class will then use the jwt as usual
        // see https://docs.feathersjs.com/api/authentication/client.html
        async getAccessToken(): Promise<string | null> {
            const token = options.key
                ? (await app.get('authentication')).accessToken
                : super.getAccessToken()
            console.log({ token })
            return token
        }
    }

    const authenticationClientOptions = {
        // @see https://docs.feathersjs.com/api/authentication/client.html#configuration
        header: 'Authorization',
        scheme: 'Bearer',
        path: '/authentication',
        jwtStrategy: 'jwt',
        locationKey: 'access_token',
        locationErrorKey: 'error',
        storageKey: 'netzo-jwt',
        // customize auth strategy if API key is passed in directly
        ...(options?.key && { Authentication: AuthenticationClientApiKey }),
    } as AuthenticationClientOptions

    return authentication(authenticationClientOptions)
}
