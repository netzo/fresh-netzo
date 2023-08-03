import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";
import {
  Block,
  BotUser,
  Database,
  NotionPagination,
  Page,
  Pages,
  PersonUser,
  QueryDbBody,
  QuerySearch,
Users,
} from "@/lib/apis/notion/types.ts";

export interface NotionOptions {
  internalIntegrationToken: string;
  notionVersion: string;
}

/**
 * SDK constructor function for the Notion API
 *
 * @see https://netzo.io/docs/netzo/apis/notion
 *
 * @param {string} internalIntegrationToken - the Internal Integration Token to use for authentication
 * @param {string} notionVersion - the Notion API version to use
 * @returns {object} - an object of multiple utilities for the API
 */
export const notion = ({
  internalIntegrationToken = Deno.env.get("NOTION_INTERNAL_INTEGRATION_TOKEN")!,
  notionVersion = Deno.env.get("NOTION_VERSION")!,
}: NotionOptions) => {
  const api = createApi({
    baseURL: `https://api.notion.com/v1`,
    headers: {
      "content-type": "application/json",
      "Notion-Version": notionVersion,
    },
    async onRequest(ctx) {
      await auth({
        type: "bearer",
        token: internalIntegrationToken,
      }, ctx);
    },
  });

  /**
   * Get pages that belong to a database in Notion
   */
  const getPages = async (
    databaseId: string,
    query: QueryDbBody = {},
  ): Promise<Pages> => {
    const result = await api.databases[`${databaseId}`].query.post(query);
    return result.results;
  };

  /**
   * Get page properties from Notion
   */
  const getPageProperties = async (
    pageId: string,
    filter_properties = "",
  ): Promise<Page> => {
    const result = await api.pages[`${pageId}`].get(filter_properties);
    return result;
  };

  /**
   * Get page content from Notion
   */
  const getPageContent = async (
    pageId: string,
    query: NotionPagination = {},
  ): Promise<Block> => {
    const result = await api.blocks[`${pageId}`].children.get(query);
    return result.results;
  };

  /**
   * Get users connected to the workspace
   */
  const getUsers = async (
    query: NotionPagination = {},
  ): Promise<Users> => {
    const result = await api.users.get(query);
    return result.results;
  };

  /**
   * Search pages or databases in Notion
   */


  //CONSIDER DELETING SEARCH FUNCTION

  // const search = async (
  //   query: QuerySearch = {},
  // ): Promise<(Database | Page)[]> => {
  //   const result = await api.search.post(query);
  //   return result.results;
  // };

  return { api, getPages, getPageProperties, getPageContent, getUsers, search };
};
