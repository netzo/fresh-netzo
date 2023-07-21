export interface Deal {
  id: number;
  title: string;
  value: number;
  currency: string;
  status: string;
  won_time: string;
}

export interface QueryGetDeals {
  user_id?: string;
  stage_id?: string;
  status?: string;
  page?: string;
  perPage?: string;
}

export interface QueryAddDeal {
  title?: string;
  value?: string;
  currency?: string;
  user_id?: number;
  person_id?: number;
  org_id?: number;
  pipeline_id?: number;
  stage_id?: number;
  status?: string;
  expected_close_date?: string;
  probability?: number;
  lost_reason?: string;
  visible_to?: string;
  add_time?: string;
}
