import { type Handlers, Status } from "$fresh/server.ts";
import { getUser } from "netzo/authentication/utils/db.ts";
import { createHttpError } from "std/http/http_errors.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const user = await getUser(ctx.params.login);
    if (user === null) throw createHttpError(Status.NotFound, "User not found");
    return Response.json(user);
  },
};
