import { Handlers } from "$fresh/server.ts";

const db = await Deno.openKv();

// TODO: handle webhooks with custom db.listenQueue() handler
db.listenQueue(async (body) => {
  const response = await fetch("https://postman-echo.com/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  console.log(JSON.stringify(data));
});

export const handler: Handlers = {
  POST: async (req, _ctx) => {
    const body = await req.json();
    db.enqueue(body);
    return Response.json(body);
  },
};
