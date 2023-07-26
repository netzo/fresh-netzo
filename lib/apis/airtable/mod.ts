import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";
import {
  QueryAddRecords,
  QueryDeleteRecords,
  QueryRecords,
  QueryUpdateRecords,
  Record,
  RecordDeleted,
} from "@/lib/apis/airtable/types.ts";

export interface AirtableOptions {
  personalAccessToken: string;
}

/**
 * SDK constructor function for the Airtable API
 *
 * @see https://netzo.io/docs/netzo/apis/airtable
 *
 * @param {string} personalAccessToken - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const airtable = ({
  personalAccessToken = Deno.env.get("AIRTABLE_PERSONAL_ACCESS_TOKEN")!,
}: AirtableOptions) => {
  const api = createApi({
    baseURL: `https://api.airtable.com/v0`,
    headers: {
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: "bearer",
        token: personalAccessToken,
      }, ctx);
    },
  });

  /**
   * Get records from Airtable
   */
  const getRecords = async (
    dataBaseId: string,
    tableIdOrName: string,
    query: QueryRecords = {},
  ): Promise<Record[]> => {
    const result = await api[`${dataBaseId}`][`${tableIdOrName}`].get(query);
    return result.records;
  };

  /**
   * Create one or multiple records in Airtable
   */
  const addRecords = async (
    dataBaseId: string,
    tableIdOrName: string,
    data: QueryAddRecords,
  ): Promise<Record[]> => {
    const result = await api[`${dataBaseId}`][`${tableIdOrName}`].post(data);
    return result.records;
  };

  /**
   * Update one or multiple records in Airtable
   */
  const updateRecords = async (
    dataBaseId: string,
    tableIdOrName: string,
    data: QueryUpdateRecords,
  ): Promise<Record[]> => {
    const result = await api[`${dataBaseId}`][`${tableIdOrName}`].put(data);
    return result.records;
  };

  /**
   * Delete one or multiple records in Airtable
   */
  const deleteRecords = async (
    dataBaseId: string,
    tableIdOrName: string,
    query: QueryDeleteRecords,
  ): Promise<RecordDeleted[]> => {
    const result = await api[`${dataBaseId}`][`${tableIdOrName}`].delete(
      query,
    );
    return result.records;
  };

  return { api, getRecords, addRecords, updateRecords, deleteRecords };
};
