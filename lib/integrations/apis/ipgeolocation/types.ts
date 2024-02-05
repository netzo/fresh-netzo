import { z } from "../../../deps/zod/mod.ts";

export const geolocationSchema = z.object({
  ip: z.string(),
  hostname: z.string(),
  continent_code: z.string(),
  continent_name: z.string(),
  country_code2: z.string(),
  country_code3: z.string(),
  country_name: z.string(),
  country_capital: z.string(),
  state_prov: z.string(),
  district: z.string(),
  city: z.string(),
  zipcode: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  is_eu: z.string(),
  calling_code: z.string(),
  country_tld: z.string(),
  languages: z.string(),
  country_flag: z.string(),
  isp: z.string(),
  connection_type: z.string(),
  organization: z.string(),
  asn: z.string(),
  geoname_id: z.number(),
  currency: z.object({
    name: z.string(),
    code: z.string(),
    symbol: z.string(),
  }),
  time_zone: z.object({
    name: z.string(),
    offset: z.number(),
    current_time: z.string(),
    current_time_unix: z.string(),
    is_dst: z.string(),
    dst_savings: z.number(),
  }),
}).deepPartial();

//types:

export type Geolocation = z.infer<typeof geolocationSchema>;
