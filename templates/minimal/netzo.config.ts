import "std/dotenv/load.ts";
import { defineNetzoConfig } from "netzo/config/mod.ts";

export default defineNetzoConfig({
  entrypoint: "main.ts",
});