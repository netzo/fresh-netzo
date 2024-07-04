import "@std/dotenv/load";

import { start } from "fresh";
import config from "./fresh.config.ts";
import manifest from "./fresh.gen.ts";

await start(manifest, config);
