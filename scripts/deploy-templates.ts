#!/usr/bin/env -S deno run --allow-env --allow-net --allow-read
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

const { AUTH_ENV_VAR_API_KEY_EDIT: xEnvVarApiKey } = config();

const repoBaseUrl = "https://raw.githubusercontent.com/netzo/netzo/main";
const apiBaseUrls = ["http://localhost:4321", "https://api.netzo.io"];
const defaultHeaders = {
  accept: "application/json",
  "content-type": "application/json",
  "cache-control": "no-cache",
};
const headers = { ...defaultHeaders, "x-env-var-api-key": xEnvVarApiKey };

/**
 * Syncs all templates present in the @netzo/netzo
 * repo to the 'dev' and 'prod' mongodb databases.
 *
 * The function fetches the @netzo/netzo/templates/templates.json array of links, and maps
 * them to an array of template.json objects to then either create a new or patch
 * an existing template record in the templates collection of each of the mongodb databases
 */
export async function deployTemplates() {
  try {
    // GitHub:

    // 1) fetch array of template urls from @netzo/netzo/templates/templates.json
    const allUrlsResponse = await fetch(
      `${repoBaseUrl}/templates/templates.json`,
      {
        headers: defaultHeaders,
      },
    );
    const allUrls = await allUrlsResponse.json();
    const urls = [...new Set(allUrls)] as string[]; // remove possible duplicates
    console.log(
      `[deploy-templates] fetched array of ${urls.length} urls from @netzo/netzo/templates/templates.json`,
    );

    // 2) map array of url pointers to each template.json to array of template objects
    const templatesJson = await Promise.all(
      urls.map((url) =>
        fetch(url, { headers: defaultHeaders }).then((res) => res.json())
      ),
    );
    console.log(
      `[deploy-templates] mapped ${templatesJson.length} urls to template objects (from template.json file)`,
    );

    // Netzo API: for each apiBaseUrl (handles dev, prod and demo databases)

    await Promise.all(apiBaseUrls.map(async (apiBaseUrl) => {
      console.log(`[deploy-templates] deploying to ${apiBaseUrl}`);

      try {
        // 3) merge each template.json with template in database (mongoose sets default values on create)
        // NOTE: max limit set to 250 for all services (despite $limit) on config/default.json
        // to enable fetching more templates, this should be patched.
        // @see https://github.com/feathersjs/feathers/issues/499
        const templates = await Promise.all(
          templatesJson.map(async (templateJson) => {
            const response = await fetch(
              `${apiBaseUrl}/templates?uid=${templateJson.uid}`,
              { headers },
            );
            const { data: [template] } = await response.json();
            return { ...template, ...templateJson };
          }),
        );
        console.log(
          `[deploy-templates] merged ${templates.length} templates from repository and database via ${apiBaseUrl} api`,
        );

        // 4) patch db record with merged template or create new if it already exists (has _id)
        // NOTE: mongoose strict mode is set to false to allow additional properties in model
        let patchedCount = 0;
        let createdCount = 0;
        const totalTemplates = await Promise.all(
          templates.map(async (template) => {
            if (template._id) {
              try {
                await fetch(`${apiBaseUrl}/templates/${template._id}`, {
                  method: "PATCH",
                  headers,
                  body: JSON.stringify(template),
                });
                console.debug("[deploy-templates] patched", template.uid);
                ++patchedCount;
                return template;
              } catch ({ message: cause }) {
                console.error(
                  new Error(
                    `[deploy-templates] failed updating ${template.uid}`,
                    { cause },
                  ),
                );
              }
            } else {
              try {
                await fetch(`${apiBaseUrl}/templates`, {
                  method: "POST",
                  headers,
                  body: JSON.stringify(template),
                });
                console.debug("[deploy-templates] created", template.uid);
                ++createdCount;
                return template;
              } catch ({ message: cause }) {
                console.error(
                  new Error(
                    `[deploy-templates] failed creating ${template.uid}`,
                    { cause },
                  ),
                );
              }
            }
          }),
        );

        console.log(
          `[deploy-templates] patched ${patchedCount} and created ${createdCount} templates in database via ${apiBaseUrl} api (${totalTemplates.length} total templates)`,
        );
      } catch (error) {
        console.error(error.message);
      }
    }));
  } catch (error) {
    console.error(error.message);
  } finally {
    console.log(
      `[deploy-templates] finished running 'deploy-templates' script`,
    );
  }
}

if (import.meta.main) deployTemplates();
