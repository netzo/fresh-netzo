export interface Geolocation {
    ip: string
    hostname: string
    continent_code: string
    continent_name: string
    country_code2: string
    country_code3: string
    country_name: string
    country_capital: string
    state_prov: string
    district: string
    city: string
    zipcode: string
    latitude: number
    longitude: number
    is_eu: string
    calling_code: string
    country_tld: string
    languages: string
    country_flag: string
    isp: string
    connection_type: string
    organization: string
    asn: string
    geoname_id: number
    currency: {
      name: string
      code: string
      symbol: string
    }
    time_zone: {
      name: string
      offset: number
      current_time: string
      current_time_unix: string
      is_dst: string
      dst_savings: number
    }
  }

