import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export interface DiscordOptions {
  tokenType: string;
  token: string;
}

/**
 * SDK constructor function for the Discord API
 *
 * @see https://netzo.io/docs/netzo/apis/discord
 *
 * @param {string} tokenType - the token type to use for authentication
 * @param {string} token - the token to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const discord = ({
  tokenType = Deno.env.get("DISCORD_TOKEN_TYPE") ?? "Bot",
  token = Deno.env.get("DISCORD_TOKEN")!,
}: DiscordOptions) => {
  const api = createApi({
    baseURL: "https://discord.com/api/v10",
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
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
