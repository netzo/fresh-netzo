export interface Deal {
  id: number
  creator_user_id: {
    id: number
    name: string
    email: string
    has_pic: boolean
    pic_hash: any
    active_flag: boolean
    value: number
  }
  user_id: {
    id: number
    name: string
    email: string
    has_pic: boolean
    pic_hash: any
    active_flag: boolean
    value: number
  }
  person_id: {
    active_flag: boolean
    name: string
    email: Array<{
      label: string
      value: string
      primary: boolean
    }>
    phone: Array<{
      label: string
      value: string
      primary: boolean
    }>
    value: number
  }
  org_id: {
    name: string
    people_count: number
    owner_id: number
    address: string
    active_flag: boolean
    cc_email: string
    value: number
  }
  stage_id: number
  title: string
  value: number
  currency: string
  add_time: string
  update_time: string
  stage_change_time: string
  active: boolean
  deleted: boolean
  status: string
  probability: any
  next_activity_date: string
  next_activity_time: string
  next_activity_id: number
  last_activity_id: any
  last_activity_date: any
  lost_reason: any
  visible_to: string
  close_time: any
  pipeline_id: number
  won_time: string
  first_won_time: string
  lost_time: string
  products_count: number
  files_count: number
  notes_count: number
  followers_count: number
  email_messages_count: number
  activities_count: number
  done_activities_count: number
  undone_activities_count: number
  participants_count: number
  expected_close_date: string
  last_incoming_mail_time: string
  last_outgoing_mail_time: string
  label: string
  stage_order_nr: number
  person_name: string
  org_name: string
  next_activity_subject: string
  next_activity_type: string
  next_activity_duration: string
  next_activity_note: string
  formatted_value: string
  weighted_value: number
  formatted_weighted_value: string
  weighted_value_currency: string
  rotten_time: any
  owner_name: string
  cc_email: string
  org_hidden: boolean
  person_hidden: boolean
}

export interface QueryGetDeals {
  user_id?: number
  filter_id?: number
  stage_id?: string
  status?: string
  start?: number
  limit?: number
  sort?: string
  owned_by_you?: number
}

export interface SearchDealsResult {
    id: number
    type: string
    title: string
    value: number
    currency: string
    status: string
    visible_to: number
    owner: {
      id: number
    }
    stage: {
      id: number
      name: string
    }
    person: {
      id: number
      name: string
    }
    organization: any
    custom_fields: Array<any>
    notes: Array<any>
}

export interface QuerySearchDeals {
  term: string
  fields?: string[]
  exact_match?: boolean
  person_id?: number
  organization_id?: number
  status?: string
  include_fields?: string
  start?: number
  limit?: number
}

export interface QueryAddOrUpdateDeal {
  title?: string
  value?: string
  currency?: string
  user_id?: number
  person_id?: number
  org_id?: number
  pipeline_id?: number
  stage_id?: number
  status?: string
  expected_close_date?: string
  probability?: number
  lost_reason?: string
  visible_to?: string
  add_time?: string
}

export interface Person {
  id: number
  company_id: number
  owner_id: {
    id: number
    name: string
    email: string
    has_pic: number
    pic_hash: string
    active_flag: boolean
    value: number
  }
  org_id: {
    name: string
    people_count: number
    owner_id: number
    address: string
    active_flag: boolean
    cc_email: string
    value: number
  }
  name: string
  first_name: string
  last_name: string
  open_deals_count: number
  related_open_deals_count: number
  closed_deals_count: number
  related_closed_deals_count: number
  participant_open_deals_count: number
  participant_closed_deals_count: number
  email_messages_count: number
  activities_count: number
  done_activities_count: number
  undone_activities_count: number
  files_count: number
  notes_count: number
  followers_count: number
  won_deals_count: number
  related_won_deals_count: number
  lost_deals_count: number
  related_lost_deals_count: number
  active_flag: boolean
  phone: Array<{
    value: string
    primary: boolean
    label: string
  }>
  email: Array<{
    value: string
    primary: boolean
    label: string
  }>
  primary_email: string
  first_char: string
  update_time: string
  add_time: string
  visible_to: string
  marketing_status: string
  picture_id: {
    item_type: string
    item_id: number
    active_flag: boolean
    add_time: string
    update_time: string
    added_by_user_id: number
    pictures: {
      '128': string
      '512': string
    }
    value: number
  }
  next_activity_date: string
  next_activity_time: string
  next_activity_id: number
  last_activity_id: number
  last_activity_date: string
  last_incoming_mail_time: string
  last_outgoing_mail_time: string
  label: number
  org_name: string
  owner_name: string
  cc_email: string
}

export interface QueryGetPersons {
  user_id?: number
  filter_id?: number
  first_char?: string
  start?: number
  limit?: number
  sort?: string
}

export interface QuerySearchPersons {
  term: string
  fields?: string[]
  exact_match?: boolean
  organization_id?: number
  include_fields?: string
  start?: number
  limit?: number
}

export interface SearchPersonsResult {
    id: number
    type: string
    name: string
    phones: Array<string>
    emails: Array<string>
    visible_to: number
    owner: {
      id: number
    }
    organization: {
      id: number
      name: string
      address: any
    }
    custom_fields: Array<any>
    notes: Array<any>
}

export interface QueryAddOrUpdatePerson {
  name?: string
  owner_id?: number
  org_id?: number
  email?: string
  phone?: string
  visible_to?: string
  marketing_status?: string
  add_time?: string
}
