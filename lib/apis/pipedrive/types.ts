export type DealId = number

export type DealData = {
  id: DealId
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
  user_id?: string
  stage_id?: string
  status?: string
  page?: string
  perPage?: string
}

export interface QueryAddOrUpdateDeal {
  title: string
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

