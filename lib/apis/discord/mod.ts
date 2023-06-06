import { createApi } from "../create-api/mod.ts";
import { auth } from "../create-api/auth/mod.ts";

/**
 * SDK constructor function for the Discord API
 *
 * @param {string} tokenType - the token type to use for authentication
 * @param {string} token - the token to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const discord = ({
  tokenType = Deno.env.get("DISCORD_TOKEN_TYPE") ?? "Bot",
  token = Deno.env.get("DISCORD_TOKEN") ?? "",
}) => {
  const api = createApi({
    baseURL: "https://discord.com/api/v10",
    headers: {
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "Authorization",
        value: `${tokenType} ${token}`,
      }, ctx);
    },
  });

  return { api };
};
