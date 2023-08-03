interface DealDetails {
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

interface RelatedObjectsDeal {
  user: {
    [key:string]: {
      id: number
      name: string
      email: string
      has_pic: boolean
      pic_hash: any
      active_flag: boolean
    }
  }
  organization: {
    [key:string]: {
      id: number
      name: string
      people_count: number
      owner_id: number
      address: string
      active_flag: boolean
      cc_email: string
    }
  }
  person: {
    [key:string]: {
      active_flag: boolean
      id: number
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
      owner_id: number
    }
  }
  stage: {
    [key:string]: {
      id: number
      company_id: number
      order_nr: number
      name: string
      active_flag: boolean
      deal_probability: number
      pipeline_id: number
      rotten_flag: boolean
      rotten_days: any
      add_time: string
      update_time: string
      pipeline_name: string
      pipeline_deal_probability: boolean
    }
  }
  pipeline: {
    [key:string]: {
      id: number
      name: string
      url_title: string
      order_nr: number
      active: boolean
      deal_probability: boolean
      add_time: string
      update_time: string
    }
  }
}

export interface Deals {
  success: boolean
  data: DealDetails[]
  related_objects: RelatedObjectsDeal
  additional_data: {
    pagination: {
      start: number
      limit: number
      more_items_in_collection: boolean
      next_start: number
    }
  }
}

export interface QueryGetDeals {
  user_id?: number;
  filter_id?: number;
  stage_id?: number;
  status?: "open" | "won" | "lost" | "deleted" | "all_not_deleted";
  start?: number;
  limit?: number;
  sort?: string;
  owned_by_you?: 0 | 1;
}

export interface SearchDealsResponse {
  success: boolean
  data: {
    items: Array<{
      result_score: number
      item: {
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
    }>
  }
  additional_data: {
    description: string
    type: string
    properties: {
      start: {
        type: string
        description: string
      }
      limit: {
        type: string
        description: string
      }
      more_items_in_collection: {
        type: string
        description: string
      }
    }
  }
}

export interface QuerySearchDeals {
  term: string;
  fields?: string[];
  exact_match?: boolean;
  person_id?: number;
  organization_id?: number;
  status?: "open" | "won" | "lost";
  include_fields?: string;
  start?: number;
  limit?: number;
}

export interface QueryAddDeal {
  title: string;
  value?: string;
  currency?: string;
  user_id?: number;
  person_id?: number;
  org_id?: number;
  pipeline_id?: number;
  stage_id?: number;
  status?: "open" | "won" | "lost" | "deleted";
  expected_close_date?: string;
  probability?: number;
  lost_reason?: string;
  visible_to?: string;
  add_time?: string;
}

export interface QueryUpdateDeal
  extends Omit<QueryAddDeal, "title" | "add_time"> {
  title?: string;
}

export interface AddOrUpdateDealResponse {
    success: boolean
    data: DealDetails
    related_objects: RelatedObjectsDeal
  }

export interface Persons {
  success: boolean
  data: Array<{
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
        [key:string]: string
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
  }>
  additional_data: {
    pagination: {
      start: number
      limit: number
      more_items_in_collection: boolean
      next_start: number
    }
  }
  related_objects: {
    organization: {
      [key:string]: {
        id: number
        name: string
        people_count: number
        owner_id: number
        address: string
        active_flag: boolean
        cc_email: string
      }
    }
    user: {
      [key:string]: {
        id: number
        name: string
        email: string
        has_pic: number
        pic_hash: string
        active_flag: boolean
      }
    }
    picture: {
      [key:string]: {
        id: number
        item_type: string
        item_id: number
        active_flag: boolean
        add_time: string
        update_time: string
        added_by_user_id: number
        pictures: {
          [key:string]: string
        }
      }
    }
  }
}

export interface QueryGetPersons {
  user_id?: number;
  filter_id?: number;
  first_char?: string;
  start?: number;
  limit?: number;
  sort?: string;
}

export type QuerySearchPersons = Omit<QuerySearchDeals, "person_id" | "status">;

export interface SearchPersonsResponse {
  success: boolean
  data: {
    items: Array<{
      result_score: number
      item: {
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
    }>
  }
  additional_data: {
    pagination: {
      start: number
      limit: number
      more_items_in_collection: boolean
    }
  }
}

export interface QueryAddPerson {
  name: string;
  owner_id?: number;
  org_id?: number;
  email?: string;
  phone?: string;
  visible_to?: string;
  marketing_status?: "no_consent" | "unsubscribed" | "subscribed" | "archived";
  add_time?: string;
}

export interface QueryUpdatePerson extends Omit<QueryAddPerson, "name"> {
  name?: string;
}

export interface AddOrUpdatePersonResponse {
  success: boolean
  data: {
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
        [key:string]: string
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
  related_objects: {
    user: {
      [key: string]: {
        id: number
        name: string
        email: string
        has_pic: number
        pic_hash: string
        active_flag: boolean
      }
    }
  }
}

export interface DeleteResponse {
  success: boolean
  data: {
    id: number
  }
}
   







