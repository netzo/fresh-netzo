// import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
// import { assertExists } from "https://deno.land/std@0.97.0/testing/asserts.ts";
// import { Netzo } from "../../mod.ts";
// import { ClientOptionsAuth } from "./mod.ts";

// const { API_KEY } = config();

// const clientId = ""
// const clientSecret = ""

// const clientOptionsAuth: ClientOptionsAuth = {
//   clientId,
//   clientSecret,
//   authorizationEndpointUri: "https://github.com/login/oauth/authorize",
//   tokenUri: "https://github.com/login/oauth/access_token",
//   redirectUri: "http://localhost:8000/oauth2/callback",
//   defaults: {
//     scope: "read:user",
//   },
// }

// Deno.test("netzo.auth", { ignore: !API_KEY }, async (t) => {
//   const netzo = Netzo({ apiKey: API_KEY });
//   const auth = await netzo.auth(clientOptionsAuth);

//   await t.step("auth", () => {
//     assertExists(auth);
//   });
// });
