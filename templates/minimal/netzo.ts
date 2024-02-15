import { Netzo } from "netzo/mod.ts";

export const netzo = await Netzo({});

if (import.meta.main) netzo.start();
