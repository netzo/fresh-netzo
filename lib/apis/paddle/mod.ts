import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";
// TODO: import type { } from "./types.ts";

export interface PaddleOptions {
  apiKey: string;
  baseURL?: string;
}

/**
 * SDK constructor function for the Paddle API
 *
 * @see https://developer.paddle.com/api-reference/overview
 *
 * @param {string} apiKey - the API key to use for authentication
 * @param {string} baseURL - the base URL to use for the API
 * @returns {object} - an object of multiple utilities for the API
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

  return { api };
};
