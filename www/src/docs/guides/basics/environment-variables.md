# Environment Variables

The following basic examples show how to work with environment variables. Deno provides support for environment variables natively. The `Deno.env` object provides methods to get, set, delete, and list environment variables.

## Add an environment variable

To add an environment variable, go to Project Settings > Environment Variables and fill in the key/value fields. A new production deployment will be created with the updated environment variables.

## Preset Environment Variables

Netzo will inject a set of default environment variables to the project at runtime.

```json
{
  "DENO_REGION": "europe-west9",
  "DENO_DEPLOYMENT_ID": "63be692a877dce879a4604bd-63bf3ad110ea82bec8916dd1"
}
```

## Runtime Environments

Netzo supports three runtime environments for projects. `production` and `preview` environments will share the same environment variables which can be set directly in the project settings in Netzo. For `development` you have the option of loading them from a `.env` file or passing them as command line arguments.

- **Production:** `https://{uid}.deno.dev`
- **Preview:** `https://{uid}-{deploymentId}.deno.dev`
- **Local:** `https://localhost:PORT`

## Deno.env.get()

Get the value of an environment variable. Returns `undefined` if the variable is not defined.

```ts
const name = Deno.env.get('NAME')
```

## Deno.env.set()

Set the value of an environment variable.

```ts
Deno.env.set('NAME', 'John')
```

## Deno.env.toObject()

Get a copy of the environment variables as an object.

```ts
const env = Deno.env.toObject()
```

## Deno.env.delete()

Unset the value of an environment variable.

```ts
Deno.env.delete('NAME')
```
