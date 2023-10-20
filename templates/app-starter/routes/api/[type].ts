import { defineRoute } from "$fresh/server.ts";
import { filterObjectsByKeyValues } from "netzo/utils/mod.ts";
import { data as hydroData } from "@/components/tables/hydro/data/data.ts";
import { data as solarData } from "@/components/tables/solar/data/data.ts";
import { data as windData } from "@/components/tables/wind/data/data.ts";

export default defineRoute((req, ctx) => {
  const { type } = ctx.params;
  const url = new URL(req.url);
  const query = Object.fromEntries(url.searchParams);
  switch (type) {
    case "hydro":
      return Response.json(filterObjectsByKeyValues(hydroData, query));
    case "solar":
      return Response.json(filterObjectsByKeyValues(solarData, query));
    case "wind":
      return Response.json(filterObjectsByKeyValues(windData, query));
  }
});
