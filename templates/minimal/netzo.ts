import { createNetzoApp } from "netzo/mod.ts";

export const app = await createNetzoApp({});

if (import.meta.main) app.start();
