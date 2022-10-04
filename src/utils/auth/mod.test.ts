import { assertExists } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { auth, ClientOptionsAuth } from "./mod.ts";

const clientId = "";
const clientSecret = "";

const clientOptionsAuth: ClientOptionsAuth = {
  clientId,
  clientSecret,
  authorizationEndpointUri: "https://github.com/login/oauth/authorize",
  tokenUri: "https://github.com/login/oauth/access_token",
  redirectUri: "http://localhost:8000/oauth2/callback",
  defaults: {
    scope: "read:user",
  },
};

Deno.test("netzo.auth", { ignore: false }, async (t) => {
  const client = await auth(clientOptionsAuth);

  await t.step("auth", () => {
    assertExists(client);
  });
});
