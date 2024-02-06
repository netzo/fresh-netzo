import { createApi } from "../../create-api/mod.ts";
import { auth } from "../../create-api/auth/mod.ts";

export type DiscordOptions = {
  tokenType: string;
  token: string;
};

/**
 * Factory function for the Discord API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/discord
 *
 * @param {string} tokenType - the token type to use for authentication
 * @param {string} token - the token to use for authentication
 * @returns {object} - an API client instance
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

  return api;
};
