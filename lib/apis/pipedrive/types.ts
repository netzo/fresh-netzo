import { z } from "../deps.ts";

const dealBaseSchema = z.object({
  id: z.number(),
  creator_user_id: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    has_pic: z.boolean(),
    pic_hash: z.any(),
    active_flag: z.boolean(),
    value: z.number(),
  }),
  user_id: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    has_pic: z.boolean(),
    pic_hash: z.any(),
    active_flag: z.boolean(),
    value: z.number(),
  }),
  person_id: z.object({
    active_flag: z.boolean(),
    name: z.string(),
    email: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        primary: z.boolean(),
      }),
    ),
    phone: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        primary: z.boolean(),
      }),
    ),
    value: z.number(),
  }),
  org_id: z.object({
    name: z.string(),
    people_count: z.number(),
    owner_id: z.number(),
    address: z.string(),
    active_flag: z.boolean(),
    cc_email: z.string(),
    value: z.number(),
  }),
  stage_id: z.number(),
  title: z.string(),
  value: z.number(),
  currency: z.string(),
  add_time: z.string(),
  update_time: z.string(),
  stage_change_time: z.string(),
  active: z.boolean(),
  deleted: z.boolean(),
  status: z.string(),
  probability: z.any(),
  next_activity_date: z.string(),
  next_activity_time: z.string(),
  next_activity_id: z.number(),
  last_activity_id: z.any(),
  last_activity_date: z.any(),
  lost_reason: z.any(),
  visible_to: z.string(),
  close_time: z.any(),
  pipeline_id: z.number(),
  won_time: z.string(),
  first_won_time: z.string(),
  lost_time: z.string(),
  products_count: z.number(),
  files_count: z.number(),
  notes_count: z.number(),
  followers_count: z.number(),
  email_messages_count: z.number(),
  activities_count: z.number(),
  done_activities_count: z.number(),
  undone_activities_count: z.number(),
  participants_count: z.number(),
  expected_close_date: z.string(),
  last_incoming_mail_time: z.string(),
  last_outgoing_mail_time: z.string(),
  label: z.string(),
  stage_order_nr: z.number(),
  person_name: z.string(),
  org_name: z.string(),
  next_activity_subject: z.string(),
  next_activity_type: z.string(),
  next_activity_duration: z.string(),
  next_activity_note: z.string(),
  formatted_value: z.string(),
  weighted_value: z.number(),
  formatted_weighted_value: z.string(),
  weighted_value_currency: z.string(),
  rotten_time: z.any(),
  owner_name: z.string(),
  cc_email: z.string(),
  org_hidden: z.boolean(),
  person_hidden: z.boolean(),
});

const relatedObjectsDealSchema = z.object({
  user: z.record(
    z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
      has_pic: z.boolean(),
      pic_hash: z.any(),
      active_flag: z.boolean(),
    }),
  ),
  organization: z.record(
    z.object({
      id: z.number(),
      name: z.string(),
      people_count: z.number(),
      owner_id: z.number(),
      address: z.string(),
      active_flag: z.boolean(),
      cc_email: z.string(),
    }),
  ),
  person: z.record(
    z.object({
      active_flag: z.boolean(),
      id: z.number(),
      name: z.string(),
      email: z.array(
        z.object({
          label: z.string(),
          value: z.string(),
          primary: z.boolean(),
        }),
      ),
      phone: z.array(
        z.object({
          label: z.string(),
          value: z.string(),
          primary: z.boolean(),
        }),
      ),
      owner_id: z.number(),
    }),
  ),
  stage: z.record(
    z.object({
      id: z.number(),
      company_id: z.number(),
      order_nr: z.number(),
      name: z.string(),
      active_flag: z.boolean(),
      deal_probability: z.number(),
      pipeline_id: z.number(),
      rotten_flag: z.boolean(),
      rotten_days: z.any(),
      add_time: z.string(),
      update_time: z.string(),
      pipeline_name: z.string(),
      pipeline_deal_probability: z.boolean(),
    }),
  ),
  pipeline: z.record(
    z.object({
      id: z.number(),
      name: z.string(),
      url_title: z.string(),
      order_nr: z.number(),
      active: z.boolean(),
      deal_probability: z.boolean(),
      add_time: z.string(),
      update_time: z.string(),
    }),
  ),
});

export const dealsSchema = z.object({
  success: z.boolean(),
  data: z.array(dealBaseSchema),
  related_objects: relatedObjectsDealSchema,
  additional_data: z.object({
    pagination: z.object({
      start: z.number(),
      limit: z.number(),
      more_items_in_collection: z.boolean(),
      next_start: z.number(),
    }),
  }),
}).deepPartial();

export const queryGetDealsSchema = z.object({
  user_id: z.number().optional(),
  filter_id: z.number().optional(),
  stage_id: z.number().optional(),
  status: z
    .union([
      z.literal("open"),
      z.literal("won"),
      z.literal("lost"),
      z.literal("deleted"),
      z.literal("all_not_deleted"),
    ])
    .optional(),
  start: z.number().optional(),
  limit: z.number().optional(),
  sort: z.string().optional(),
  owned_by_you: z.union([z.literal(0), z.literal(1)]).optional(),
});

export const searchDealsResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    items: z.array(
      z.object({
        result_score: z.number(),
        item: z.object({
          id: z.number(),
          type: z.string(),
          title: z.string(),
          value: z.number(),
          currency: z.string(),
          status: z.string(),
          visible_to: z.number(),
          owner: z.object({
            id: z.number(),
          }),
          stage: z.object({
            id: z.number(),
            name: z.string(),
          }),
          person: z.object({
            id: z.number(),
            name: z.string(),
          }),
          organization: z.any(),
          custom_fields: z.array(z.any()),
          notes: z.array(z.any()),
        }),
      }),
    ),
  }),
  additional_data: z.object({
    description: z.string(),
    type: z.string(),
    properties: z.object({
      start: z.object({
        type: z.string(),
        description: z.string(),
      }),
      limit: z.object({
        type: z.string(),
        description: z.string(),
      }),
      more_items_in_collection: z.object({
        type: z.string(),
        description: z.string(),
      }),
    }),
  }),
}).deepPartial();

export const querySearchDealsSchema = z.object({
  term: z.string(),
  fields: z.array(z.string()).optional(),
  exact_match: z.boolean().optional(),
  person_id: z.number().optional(),
  organization_id: z.number().optional(),
  status: z
    .union([z.literal("open"), z.literal("won"), z.literal("lost")])
    .optional(),
  include_fields: z.string().optional(),
  start: z.number().optional(),
  limit: z.number().optional(),
});

export const queryAddDealSchema = z.object({
  title: z.string(),
  value: z.string().optional(),
  currency: z.string().optional(),
  user_id: z.number().optional(),
  person_id: z.number().optional(),
  org_id: z.number().optional(),
  pipeline_id: z.number().optional(),
  stage_id: z.number().optional(),
  status: z
    .union([
      z.literal("open"),
      z.literal("won"),
      z.literal("lost"),
      z.literal("deleted"),
    ])
    .optional(),
  expected_close_date: z.string().optional(),
  probability: z.number().optional(),
  lost_reason: z.string().optional(),
  visible_to: z.string().optional(),
  add_time: z.string().optional(),
});

export const queryUpdateDealSchema = queryAddDealSchema.omit({
  add_time: true,
});

export const addOrUpdateDealResponseSchema = z.object({
  success: z.boolean(),
  data: dealBaseSchema,
  related_objects: relatedObjectsDealSchema,
}).deepPartial();

export const personsSchema = z.object({
  success: z.boolean(),
  data: z.array(
    z.object({
      id: z.number(),
      company_id: z.number(),
      owner_id: z.object({
        id: z.number(),
        name: z.string(),
        email: z.string(),
        has_pic: z.number(),
        pic_hash: z.string(),
        active_flag: z.boolean(),
        value: z.number(),
      }),
      org_id: z.object({
        name: z.string(),
        people_count: z.number(),
        owner_id: z.number(),
        address: z.string(),
        active_flag: z.boolean(),
        cc_email: z.string(),
        value: z.number(),
      }),
      name: z.string(),
      first_name: z.string(),
      last_name: z.string(),
      open_deals_count: z.number(),
      related_open_deals_count: z.number(),
      closed_deals_count: z.number(),
      related_closed_deals_count: z.number(),
      participant_open_deals_count: z.number(),
      participant_closed_deals_count: z.number(),
      email_messages_count: z.number(),
      activities_count: z.number(),
      done_activities_count: z.number(),
      undone_activities_count: z.number(),
      files_count: z.number(),
      notes_count: z.number(),
      followers_count: z.number(),
      won_deals_count: z.number(),
      related_won_deals_count: z.number(),
      lost_deals_count: z.number(),
      related_lost_deals_count: z.number(),
      active_flag: z.boolean(),
      phone: z.array(
        z.object({
          value: z.string(),
          primary: z.boolean(),
          label: z.string(),
        }),
      ),
      email: z.array(
        z.object({
          value: z.string(),
          primary: z.boolean(),
          label: z.string(),
        }),
      ),
      primary_email: z.string(),
      first_char: z.string(),
      update_time: z.string(),
      add_time: z.string(),
      visible_to: z.string(),
      marketing_status: z.string(),
      picture_id: z.object({
        item_type: z.string(),
        item_id: z.number(),
        active_flag: z.boolean(),
        add_time: z.string(),
        update_time: z.string(),
        added_by_user_id: z.number(),
        pictures: z.record(z.string()),
        value: z.number(),
      }),
      next_activity_date: z.string(),
      next_activity_time: z.string(),
      next_activity_id: z.number(),
      last_activity_id: z.number(),
      last_activity_date: z.string(),
      last_incoming_mail_time: z.string(),
      last_outgoing_mail_time: z.string(),
      label: z.number(),
      org_name: z.string(),
      owner_name: z.string(),
      cc_email: z.string(),
    }),
  ),
  additional_data: z.object({
    pagination: z.object({
      start: z.number(),
      limit: z.number(),
      more_items_in_collection: z.boolean(),
      next_start: z.number(),
    }),
  }),
  related_objects: z.object({
    organization: z.record(
      z.object({
        id: z.number(),
        name: z.string(),
        people_count: z.number(),
        owner_id: z.number(),
        address: z.string(),
        active_flag: z.boolean(),
        cc_email: z.string(),
      }),
    ),
    user: z.record(
      z.object({
        id: z.number(),
        name: z.string(),
        email: z.string(),
        has_pic: z.number(),
        pic_hash: z.string(),
        active_flag: z.boolean(),
      }),
    ),
    picture: z.record(
      z.object({
        id: z.number(),
        item_type: z.string(),
        item_id: z.number(),
        active_flag: z.boolean(),
        add_time: z.string(),
        update_time: z.string(),
        added_by_user_id: z.number(),
        pictures: z.record(z.string()),
      }),
    ),
  }),
}).deepPartial();

export const queryGetPersonsSchema = z.object({
  user_id: z.number().optional(),
  filter_id: z.number().optional(),
  first_char: z.string().optional(),
  start: z.number().optional(),
  limit: z.number().optional(),
  sort: z.string().optional(),
});

export const querySearchPersonsSchema = querySearchDealsSchema.omit({
  person_id: true,
  status: true,
});

export const searchPersonsResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    items: z.array(
      z.object({
        result_score: z.number(),
        item: z.object({
          id: z.number(),
          type: z.string(),
          name: z.string(),
          phones: z.array(z.string()),
          emails: z.array(z.string()),
          visible_to: z.number(),
          owner: z.object({
            id: z.number(),
          }),
          organization: z.object({
            id: z.number(),
            name: z.string(),
            address: z.any(),
          }),
          custom_fields: z.array(z.any()),
          notes: z.array(z.any()),
        }),
      }),
    ),
  }),
  additional_data: z.object({
    pagination: z.object({
      start: z.number(),
      limit: z.number(),
      more_items_in_collection: z.boolean(),
    }),
  }),
}).deepPartial();

export const queryAddPersonSchema = z.object({
  name: z.string(),
  owner_id: z.number().optional(),
  org_id: z.number().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  visible_to: z.string().optional(),
  marketing_status: z
    .union([
      z.literal("no_consent"),
      z.literal("unsubscribed"),
      z.literal("subscribed"),
      z.literal("archived"),
    ])
    .optional(),
  add_time: z.string().optional(),
});

export const queryUpdatePersonSchema = queryAddPersonSchema.partial();

export const addOrUpdatePersonResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    id: z.number(),
    company_id: z.number(),
    owner_id: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
      has_pic: z.number(),
      pic_hash: z.string(),
      active_flag: z.boolean(),
      value: z.number(),
    }),
    org_id: z.object({
      name: z.string(),
      people_count: z.number(),
      owner_id: z.number(),
      address: z.string(),
      active_flag: z.boolean(),
      cc_email: z.string(),
      value: z.number(),
    }),
    name: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    open_deals_count: z.number(),
    related_open_deals_count: z.number(),
    closed_deals_count: z.number(),
    related_closed_deals_count: z.number(),
    participant_open_deals_count: z.number(),
    participant_closed_deals_count: z.number(),
    email_messages_count: z.number(),
    activities_count: z.number(),
    done_activities_count: z.number(),
    undone_activities_count: z.number(),
    files_count: z.number(),
    notes_count: z.number(),
    followers_count: z.number(),
    won_deals_count: z.number(),
    related_won_deals_count: z.number(),
    lost_deals_count: z.number(),
    related_lost_deals_count: z.number(),
    active_flag: z.boolean(),
    phone: z.array(
      z.object({
        value: z.string(),
        primary: z.boolean(),
        label: z.string(),
      }),
    ),
    email: z.array(
      z.object({
        value: z.string(),
        primary: z.boolean(),
        label: z.string(),
      }),
    ),
    primary_email: z.string(),
    first_char: z.string(),
    update_time: z.string(),
    add_time: z.string(),
    visible_to: z.string(),
    marketing_status: z.string(),
    picture_id: z.object({
      item_type: z.string(),
      item_id: z.number(),
      active_flag: z.boolean(),
      add_time: z.string(),
      update_time: z.string(),
      added_by_user_id: z.number(),
      pictures: z.record(z.string()),
      value: z.number(),
    }),
    next_activity_date: z.string(),
    next_activity_time: z.string(),
    next_activity_id: z.number(),
    last_activity_id: z.number(),
    last_activity_date: z.string(),
    last_incoming_mail_time: z.string(),
    last_outgoing_mail_time: z.string(),
    label: z.number(),
    org_name: z.string(),
    owner_name: z.string(),
    cc_email: z.string(),
  }),
  related_objects: z.object({
    user: z.record(
      z.object({
        id: z.number(),
        name: z.string(),
        email: z.string(),
        has_pic: z.number(),
        pic_hash: z.string(),
        active_flag: z.boolean(),
      }),
    ),
  }),
}).deepPartial();

export const deleteResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    id: z.number(),
  }),
}).deepPartial();

//types:

export type Deals = z.infer<typeof dealsSchema>;
export type QueryGetDeals = z.infer<typeof queryGetDealsSchema>;
export type SearchDealsResponse = z.infer<typeof searchDealsResponseSchema>;
export type QuerySearchDeals = z.infer<typeof querySearchDealsSchema>;
export type QueryAddDeal = z.infer<typeof queryAddDealSchema>;
export type QueryUpdateDeal = z.infer<typeof queryUpdateDealSchema>;
export type AddOrUpdateDealResponse = z.infer<
  typeof addOrUpdateDealResponseSchema
>;
export type Persons = z.infer<typeof personsSchema>;
export type QueryGetPersons = z.infer<typeof queryGetPersonsSchema>;
export type QuerySearchPersons = z.infer<typeof querySearchPersonsSchema>;
export type SearchPersonsResponse = z.infer<typeof searchPersonsResponseSchema>;
export type QueryAddPerson = z.infer<typeof queryAddPersonSchema>;
export type QueryUpdatePerson = z.infer<typeof queryUpdatePersonSchema>;
export type AddOrUpdatePersonResponse = z.infer<
  typeof addOrUpdatePersonResponseSchema
>;
export type DeleteResponse = z.infer<typeof deleteResponseSchema>;
