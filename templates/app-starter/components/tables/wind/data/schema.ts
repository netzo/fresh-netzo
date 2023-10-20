import { z } from "zod/mod.ts";

export const windSchema = z.object({
  type: z.string(),
  id: z.string(),
  name: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  timestamp: z.string(),
  windSpeed: z.string(),
  powerOutput: z.string(),
  angleBlade: z.string(),
  status: z.string(),
  temperature: z.string(),
  humidity: z.string(),
  efficiencyGearbox: z.string(),
  efficiencyGenerator: z.string(),
  angleYaw: z.string(),
  anglePitch: z.string(),
});

export type Wind = z.infer<typeof windSchema>;
