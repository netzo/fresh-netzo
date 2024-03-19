import { MongoClient } from "npm:mongodb@6.1.0";

export type MongoDBOptions = {
  url: string;
  database: string;
};

/**
 * Factory function for the MongoDB database
 *
 * @see https://netzo.io/docs/modules/databases/mongodb
 *
 * @param {string} url - connection string URL to the MongoDB instance
 * @param {string} database - the name of the database to use
 * @returns {object} - a DB client instance
 */
export const mongodb = async ({
  url = Deno.env.get("MONGODB_URL")!,
  database = Deno.env.get("MONGODB_DATABASE")!,
}: MongoDBOptions) => {
  const client = new MongoClient(url);

  await client.connect();

  const db = client.db(database);

  return db;
};
