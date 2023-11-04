import { z } from "zod/mod.ts";

export const hydroSchema = z.object({
  type: z.string(),
  id: z.string(),
  name: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  timestamp: z.string(),
  waterFlowRate: z.string(),
  powerOutput: z.string(),
  waterLevel: z.string(),
  status: z.string(),
  efficiencyTurbine: z.string(),
  efficiencyGenerator: z.string(),
  inletPressure: z.string(),
  outletPressure: z.string(),
});

export type Hydro = z.infer<typeof hydroSchema>;
