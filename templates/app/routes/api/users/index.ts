import type { Handlers } from "$fresh/server.ts";
import { collectValues, listUsers } from "netzo/authentication/utils/db.ts";
import { getCursor } from "netzo/authentication/utils/http.ts";

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);
    const iter = listUsers({
      cursor: getCursor(url),
      limit: 10,
    });
    const values = await collectValues(iter);
    return Response.json({ values, cursor: iter.cursor });
  },
};
