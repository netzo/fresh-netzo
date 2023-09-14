import { kvDelete, kvGet, kvList, kvSet } from "../../../../db/mod.ts";

function getParts(prefix: string, requestUrl: URL) {
  const prefixParts = prefix.split("/");
  const pathParts = requestUrl.pathname.split("/").slice(
    prefixParts.length,
  );
  return pathParts;
}

export interface HandlerProps {
  prefix: string;
}

export default function generateHandlers(props: HandlerProps) {
  return {
    async GET(req: Request) {
      const requestUrl = new URL(req.url);
      const pathParts = getParts(props.prefix, requestUrl);
      let response;

      if (pathParts.length > 0 && pathParts[0] === "list") {
        const prefixParam = requestUrl
          .searchParams
          .get("prefix")?.split(",") || [];
        response = await kvList(prefixParam);
      } else {
        const keyParam = requestUrl.searchParams.get("key")?.split(",") || [];
        response = await kvGet(keyParam);
      }

      return new Response(JSON.stringify(response), {
        headers: { "content-type": "application/json" },
      });
    },

    async POST(req: Request) {
      const requestUrl = new URL(req.url);
      const pathParts = getParts(props.prefix, requestUrl);
      let response;

      if (pathParts.length > 0 && pathParts[0] === "sum") {
        response = []; // TODO
      } else if (pathParts.length > 0 && pathParts[0] === "min") {
        response = []; // TODO
      } else if (pathParts.length > 0 && pathParts[0] === "max") {
        response = []; // TODO
      } else {
        const keyParam = requestUrl.searchParams.get("key")?.split(",") || [];
        response = await kvSet(keyParam, JSON.parse(await req.text()));
      }

      return new Response(JSON.stringify(response), {
        headers: { "content-type": "application/json" },
      });
    },

    async DELETE(req: Request) {
      const requestUrl = new URL(req.url);
      const keyParam = requestUrl.searchParams.get("key")?.split(",") || [];
      await kvDelete(keyParam);

      return new Response("", {
        status: 200,
      });
    },
  };
}