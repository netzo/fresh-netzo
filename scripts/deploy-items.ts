#!/usr/bin/env node
import { config } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts'

const { AUTH_ENV_VAR_API_KEY_EDIT: xEnvVarApiKey } = config()

const repoBaseUrl = 'https://raw.githubusercontent.com/netzo/netzo/main'
const apiBaseUrls = ['http://localhost:4321', 'https://api.netzo.io']
const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Cache-Control': 'no-cache',
}
const headers = { ...defaultHeaders, 'x-env-var-api-key': xEnvVarApiKey }

/**
 * Syncs all items present in the @netzo/netzo
 * repo to the 'dev' and 'prod' mongodb databases.
 *
 * The function fetches the @netzo/netzo/scripts/items.json array of links, and maps
 * them to an array of item.json objects to then either create a new or patch
 * an existing item record in the items collection of each of the mongodb databases
 */
export async function deployItems() {
  try {
    // GitHub:

    // 1) fetch array of item urls from @netzo/netzo/scripts/items.json
    const allUrlsResponse = await fetch(`${repoBaseUrl}/scripts/items.json`, {
      headers: defaultHeaders,
    })
    const allUrls = await allUrlsResponse.json()
    const urls = [...new Set(allUrls)] as string[] // remove possible duplicates
    console.log(
      `[deploy-items] fetched array of ${urls.length} urls from @netzo/netzo/scripts/items.json`,
    )

    // 2) map array of url pointers to each item.json to array of item objects
    const itemsJson = await Promise.all(
      urls.map((url) =>
        fetch(url, { headers: defaultHeaders }).then((res) => res.json())
      ),
    )
    console.log(
      `[deploy-items] mapped ${itemsJson.length} urls to item objects (from item.json file)`,
    )

    // Netzo API: for each apiBaseUrl (handles dev, prod and demo databases)

    await Promise.all(apiBaseUrls.map(async (apiBaseUrl) => {
      console.log(`[deploy-items] deploying to ${apiBaseUrl}`)

      try {
        // 3) merge each item.json with item in database (mongoose sets default values on create)
        // NOTE: max limit set to 250 for all services (despite $limit) on config/default.json
        // to enable fetching more items, this should be patched.
        // @see https://github.com/feathersjs/feathers/issues/499
        const items = await Promise.all(
          itemsJson.map(async (itemJson) => {
            const response = await fetch(
              `${apiBaseUrl}/items?uid=${itemJson.uid}`,
              { headers },
            )
            const { data: [item] } = await response.json()
            return { ...item, ...itemJson }
          }),
        )
        console.log(
          `[deploy-items] merged ${items.length} items from repository and database via ${apiBaseUrl} api`,
        )

        // 4) patch db record with merged item or create new if it already exists (has _id)
        // NOTE: mongoose strict mode is set to false to allow additional properties in model
        let patchedCount = 0
        let createdCount = 0
        const totalItems = await Promise.all(items.map(async (item) => {
          if (item._id) {
            try {
              await fetch(`${apiBaseUrl}/items/${item._id}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify(item),
              })
              console.debug('[deploy-items] patched', item.uid)
              ;++patchedCount
              return item
            } catch ({ message: cause }) {
              console.error(
                new Error(
                  `[deploy-items] failed updating ${item.uid}`,
                  { cause },
                ),
              )
            }
          } else {
            try {
              await fetch(`${apiBaseUrl}/items`, {
                method: 'POST',
                headers,
                body: JSON.stringify(item),
              })
              console.debug('[deploy-items] created', item.uid)
              ;++createdCount
              return item
            } catch ({ message: cause }) {
              console.error(
                new Error(
                  `[deploy-items] failed creating ${item.uid}`,
                  { cause },
                ),
              )
            }
          }
        }))

        console.log(
          `[deploy-items] patched ${patchedCount} and created ${createdCount} items in database via ${apiBaseUrl} api (${totalItems.length} total items)`,
        )
      } catch (error) {
        console.error(error.message)
      }
    }))
  } catch (error) {
    console.error(error.message)
  } finally {
    console.log(
      `[deploy-items] finished running 'deploy-items' script`,
    )
  }
}

if (import.meta.main) deployItems()
