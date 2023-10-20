import { z } from "zod/mod.ts";

export const solarSchema = z.object({
  type: z.string(),
  id: z.string(),
  name: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  timestamp: z.string(),
  irradiance: z.string(),
  temperature: z.string(),
  powerOutput: z.string(),
  status: z.string(),
  efficiencyPanel: z.string(),
  efficiencyInverter: z.string(),
  ambientTemperature: z.string(),
  shadingEffect: z.string(),
});

export type Solar = z.infer<typeof solarSchema>;
