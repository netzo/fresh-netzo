import { auth } from "./create-api/auth/mod.ts";
import { createApi } from "./create-api/mod.ts";

export type GoogledriveOptions = {
  googleServiceAccountCredentials: string;
  scope?: Array<
    | "drive"
    | "drive.appdata"
    | "drive.file"
    | "drive.metadata"
    | "drive.metadata.readonly"
    | "drive.photos.readonly"
    | "drive.readonly"
    | "drive.scripts"
  >;
};

/**
 * Factory function for the Google Drive API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/googledrive
 *
 * @param {string} googleServiceAccountCredentials - the Google Service Account Credentials to use for authentication
 * @param {string} scope - the scope to use for authentication (default: ['drive.readonly'])
 * @returns {object} - an API client instance
 */
export const googledrive = ({
  googleServiceAccountCredentials = Deno.env.get(
    "GOOGLE_SERVICE_ACCOUNT_CREDENTIALS",
  )!,
  scope = ["drive.readonly"],
}: GoogledriveOptions) => {
  const api = createApi({
    baseURL: `https://www.googleapis.com/drive/v3`,
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "googlejwtsa",
        googleServiceAccountCredentials,
        googleAuthOptions: {
          scope: scope.map((s) => `https://www.googleapis.com/auth/${s}`),
        },
      }, ctx);
    },
  });

  return api;
};
