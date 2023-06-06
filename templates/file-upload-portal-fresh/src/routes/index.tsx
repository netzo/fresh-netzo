/** @jsx h */
import { h } from "preact";
import { Handlers } from "$fresh/server.ts";
import { signal } from "@preact/signals";
import Form from "../islands/Form.tsx";

// see https://creatomate.com/blog/the-best-video-generation-apis

export const handler: Handlers = {
  GET: async (_req, ctx) => {
    return await ctx.render();
  },
  POST: async (req, _ctx) => {
    const form = await req.formData();
    const email = form.get("email")?.toString();
    const files = form.get("files")?.toString();
    console.log({ email, files });
    // redirect to home page
    const headers = new Headers();
    headers.set("Location", "/");
    return new Response(undefined, { status: 303, headers }); // 303: See Other
  },
};

export default () => {
  const isLoading = signal(false);
  return <Form />;
};
