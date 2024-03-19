import { createClient } from "npm:redis@^4.5";

export type RedisOptions = {
  url: string;
};

/**
 * Factory function for the Redis database
 *
 * @see https://netzo.io/docs/modules/databases/redis
 *
 * @param {string} url - connection string URL to the Redis instance in the form of "redis[s]://[[username][:password]@][host][:port][/db-number]"
 * @returns {object} - a DB client instance
 */
export const redis = async ({
  url = Deno.env.get("REDIS_URL")!,
}: RedisOptions) => {
  const db = createClient({ url });

  await db.connect();

  return db;
};
