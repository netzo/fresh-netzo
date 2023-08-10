interface ResponseBase {
  errors: Array<any>;
  messages: Array<any>;
  success: boolean;
}

interface QueryBase {
  name?: string;
  direction?: "asc" | "desc";
  match?: "any" | "all";
  page?: number;
  per_page?: number;
  status?: string;
}

interface ZoneBase {
  account: {
    id: string;
    name: string;
  };
  activated_on: string;
  created_on: string;
  development_mode: number;
  id: string;
  meta: {
    cdn_only: boolean;
    custom_certificate_quota: number;
    dns_only: boolean;
    foundation_dns: boolean;
    page_rule_quota: number;
    phishing_detected: boolean;
    step: number;
  };
  modified_on: string;
  name: string;
  original_dnshost: string;
  original_name_servers: Array<string>;
  original_registrar: string;
  owner: {
    id: string;
    name: string;
    type: string;
  };
  vanity_name_servers: Array<string>;
}

export interface Organizations extends ResponseBase {
  result: Array<{
    id: string;
    name: string;
    permissions: Array<string>;
    roles: Array<string>;
    status: string;
  }>;
  result_info: {
    count: number;
    page: number;
    per_page: number;
    total_count: number;
  };
}

export interface QueryOrganizations extends QueryBase {
  order?: "id" | "name" | "status";
}

export interface Zones extends ResponseBase {
  result_info: {
    count: number;
    page: number;
    per_page: number;
    total_count: number;
  };
  result: Array<ZoneBase>;
}

export interface QueryZones extends QueryBase {
  "account.id"?: string;
  "account.name"?: string;
  order?: "name" | "status" | "account.id" | "account.name";
}

export interface Zone extends ResponseBase {
  result: ZoneBase;
}

export interface QueryAddZone {
  account: {
    id: string;
  };
  name: string;
  type?: "full" | "partial";
}

export interface DeleteResponse extends ResponseBase {
  result: {
    id: string;
  };
}
