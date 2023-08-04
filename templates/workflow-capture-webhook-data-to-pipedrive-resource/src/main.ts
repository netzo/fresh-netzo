import { pipedrive } from "netzo/apis/pipedrive/mod.ts";
const { api } = pipedrive({ apiKey: Deno.env.get("PIPEDRIVE_API_TOKEN") });

// see https://developers.pipedrive.com/docs/api/v1

Deno.serve(async (req: Request) => {
  const event = await req.json();
  const [resource1, resource2] = await Promise.all([
    api.endpoint1.post({
      // POST_BODY_1
      //e.g.  event?.email
    }),
    api.endpoint2.post({
      // POST_BODY_2
      //e.g.  event?.email
    }),
  ]);

  return Response.json({ resource1, resource2 });
});
