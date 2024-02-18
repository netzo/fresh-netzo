import { auth } from "../../create-api/auth/mod.ts";
import { createApi } from "../../create-api/mod.ts";
// TODO: import type { } from "./types.ts";

export type PaddleOptions = {
  apiKey: string;
  baseURL?: string;
};

/**
 * Factory function for the Paddle API
 *
 * @see https://developer.paddle.com/api/overview
 *
 * @param {string} apiKey - the API key to use for authentication
 * @param {string} baseURL - the base URL to use for the API
 * @returns {object} - an API client instance
 */
export const paddle = ({
  apiKey = Deno.env.get("PADDLE_API_KEY")!,
  baseURL = "https://api.paddle.com/", // or https://sandbox-api.paddle.com/
}: PaddleOptions) => {
  const api = createApi({
    baseURL,
    headers: {
      "content-type": "application/json",
      "Paddle-Version": "1",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "bearer",
        token: apiKey,
      }, ctx);
    },
  });

  return api;
};
