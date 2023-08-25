import { z } from "../deps.ts";

export const campaignSchema = z.object({
  id: z.string(),
  web_id: z.number(),
  parent_campaign_id: z.string(),
  type: z.string(),
  create_time: z.string(),
  archive_url: z.string(),
  long_archive_url: z.string(),
  status: z.string(),
  emails_sent: z.number(),
  send_time: z.string(),
  content_type: z.string(),
  needs_block_refresh: z.boolean(),
  resendable: z.boolean(),
  recipients: z.object({
    list_id: z.string(),
    list_is_active: z.boolean(),
    list_name: z.string(),
    segment_text: z.string(),
    recipient_count: z.number(),
    segment_opts: z.object({
      saved_segment_id: z.number(),
      prebuilt_segment_id: z.string(),
      match: z.string(),
      conditions: z.array(z.any()),
    }),
  }),
  settings: z.object({
    subject_line: z.string(),
    preview_text: z.string(),
    title: z.string(),
    from_name: z.string(),
    reply_to: z.string(),
    use_conversation: z.boolean(),
    to_name: z.string(),
    folder_id: z.string(),
    authenticate: z.boolean(),
    auto_footer: z.boolean(),
    inline_css: z.boolean(),
    auto_tweet: z.boolean(),
    auto_fb_post: z.array(z.string()),
    fb_comments: z.boolean(),
    timewarp: z.boolean(),
    template_id: z.number(),
    drag_and_drop: z.boolean(),
  }),
  variate_settings: z.object({
    winning_combination_id: z.string(),
    winning_campaign_id: z.string(),
    winner_criteria: z.string(),
    wait_time: z.number(),
    test_size: z.number(),
    subject_lines: z.array(z.string()),
    send_times: z.array(z.string()),
    from_names: z.array(z.string()),
    reply_to_addresses: z.array(z.string()),
    contents: z.array(z.string()),
    combinations: z.array(
      z.object({
        id: z.string(),
        subject_line: z.number(),
        send_time: z.number(),
        from_name: z.number(),
        reply_to: z.number(),
        content_description: z.number(),
        recipients: z.number(),
      }),
    ),
  }),
  tracking: z.object({
    opens: z.boolean(),
    html_clicks: z.boolean(),
    text_clicks: z.boolean(),
    goal_tracking: z.boolean(),
    ecomm360: z.boolean(),
    google_analytics: z.string(),
    clicktale: z.string(),
    salesforce: z.object({
      campaign: z.boolean(),
      notes: z.boolean(),
    }),
    capsule: z.object({
      notes: z.boolean(),
    }),
  }),
  rss_opts: z.object({
    feed_url: z.string(),
    frequency: z.string(),
    schedule: z.object({
      hour: z.number(),
      daily_send: z.object({
        sunday: z.boolean(),
        monday: z.boolean(),
        tuesday: z.boolean(),
        wednesday: z.boolean(),
        thursday: z.boolean(),
        friday: z.boolean(),
        saturday: z.boolean(),
      }),
      weekly_send_day: z.string(),
      monthly_send_date: z.number(),
    }),
    last_sent: z.string(),
    constrain_rss_img: z.boolean(),
  }),
  ab_split_opts: z.object({
    split_test: z.string(),
    pick_winner: z.string(),
    wait_units: z.string(),
    wait_time: z.number(),
    split_size: z.number(),
    from_name_a: z.string(),
    from_name_b: z.string(),
    reply_email_a: z.string(),
    reply_email_b: z.string(),
    subject_a: z.string(),
    subject_b: z.string(),
    send_time_a: z.string(),
    send_time_b: z.string(),
    send_time_winner: z.string(),
  }),
  social_card: z.object({
    image_url: z.string(),
    description: z.string(),
    title: z.string(),
  }),
  report_summary: z.object({
    opens: z.number(),
    unique_opens: z.number(),
    open_rate: z.number(),
    clicks: z.number(),
    subscriber_clicks: z.number(),
    click_rate: z.number(),
    ecommerce: z.object({
      total_orders: z.number(),
      total_spent: z.number(),
      total_revenue: z.number(),
    }),
  }),
  delivery_status: z.object({
    enabled: z.boolean(),
    can_cancel: z.boolean(),
    status: z.string(),
    emails_sent: z.number(),
    emails_canceled: z.number(),
  }),
  _links: z.array(
    z.object({
      rel: z.string(),
      href: z.string(),
      method: z.string(),
      targetSchema: z.string(),
      schema: z.string(),
    }),
  ),
}).deepPartial();

export const campaignsSchema = z.object({
  campaigns: z.array(campaignSchema),
  total_items: z.number(),
  _links: z.array(
    z.object({
      rel: z.string(),
      href: z.string(),
      method: z.string(),
      targetSchema: z.string(),
      schema: z.string(),
    }),
  ),
}).deepPartial();

export const queryCampaignsSchema = z.object({
  fields: z.array(z.string()).optional(),
  exclude_fields: z.array(z.string()).optional(),
  count: z.number().optional(),
  offset: z.number().optional(),
  type: z
    .union([
      z.literal("regular"),
      z.literal("plaintext"),
      z.literal("absplit"),
      z.literal("rss"),
      z.literal("variate"),
    ])
    .optional(),
  status: z
    .union([
      z.literal("save"),
      z.literal("paused"),
      z.literal("schedule"),
      z.literal("sending"),
      z.literal("sent"),
    ])
    .optional(),
  before_send_time: z.string().optional(),
  since_send_time: z.string().optional(),
  before_create_time: z.string().optional(),
  since_create_time: z.string().optional(),
  list_id: z.string().optional(),
  member_id: z.string().optional(),
  sort_field: z.string().optional(),
  sort_dir: z.union([z.literal("ASC"), z.literal("DESC")]).optional(),
});

export const queryCampaignSchema = z.object({
  fields: z.array(z.string()).optional(),
  exclude_fields: z.array(z.string()).optional(),
});

export const campaignContentSchema = z.object({
  variate_contents: z.array(
    z.object({
      content_label: z.string(),
      plain_text: z.string(),
      html: z.string(),
    }),
  ),
  plain_text: z.string(),
  html: z.string(),
  archive_html: z.string(),
  _links: z.array(
    z.object({
      rel: z.string(),
      href: z.string(),
      method: z.string(),
      targetSchema: z.string(),
      schema: z.string(),
    }),
  ),
}).deepPartial();

export const dataUpdateCampaignContentSchema = z.object({
  archive: z
    .object({
      archive_type: z.string().optional(),
      archive_content: z.string(),
    })
    .optional(),
  template: z.object({}).optional(),
  plain_text: z.string().optional(),
  html: z.string().optional(),
  url: z.string().optional(),
  variate_contents: z.array(z.object({})).optional(),
});

export const dataScheduleCampaignSchema = z.object({
  schedule_time: z.string(),
  batch_delivery: z
    .object({
      batch_delay: z.number(),
      batch_count: z.number(),
    })
    .optional(),
  timewarp: z.boolean().optional(),
});

//types:

export type Campaign = z.infer<typeof campaignSchema>;
export type Campaigns = z.infer<typeof campaignsSchema>;
export type QueryCampaigns = z.infer<typeof queryCampaignsSchema>;
export type QueryCampaign = z.infer<typeof queryCampaignSchema>;
export type CampaignContent = z.infer<typeof campaignContentSchema>;
export type DataUpdateCampaignContent = z.infer<
  typeof dataUpdateCampaignContentSchema
>;
export type DataScheduleCampaign = z.infer<typeof dataScheduleCampaignSchema>;
