import { defineRoute } from "$fresh/server.ts";
import { getData, getOptions } from "../components/tables/solar/data/data.tsx";
import Table from "@/islands/Solar.tsx";

export default defineRoute(async (req, ctx) => {
  const data = await getData();
  const options = getOptions(data);

  return <Table data={data} options={options} />;
});
