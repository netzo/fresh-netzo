export interface Campaign {
  id: string;
  web_id: number;
  parent_campaign_id: string;
  type: string;
  create_time: string;
  archive_url: string;
  long_archive_url: string;
  status: string;
  emails_sent: number;
  send_time: string;
  content_type: string;
  needs_block_refresh: boolean;
  resendable: boolean;
  recipients: {
    list_id: string;
    list_is_active: boolean;
    list_name: string;
    segment_text: string;
    recipient_count: number;
    segment_opts: {
      saved_segment_id: number;
      prebuilt_segment_id: string;
      match: string;
      conditions: Array<any>;
    };
  };
  settings: {
    subject_line: string;
    preview_text: string;
    title: string;
    from_name: string;
    reply_to: string;
    use_conversation: boolean;
    to_name: string;
    folder_id: string;
    authenticate: boolean;
    auto_footer: boolean;
    inline_css: boolean;
    auto_tweet: boolean;
    auto_fb_post: Array<string>;
    fb_comments: boolean;
    timewarp: boolean;
    template_id: number;
    drag_and_drop: boolean;
  };
  variate_settings: {
    winning_combination_id: string;
    winning_campaign_id: string;
    winner_criteria: string;
    wait_time: number;
    test_size: number;
    subject_lines: Array<string>;
    send_times: Array<string>;
    from_names: Array<string>;
    reply_to_addresses: Array<string>;
    contents: Array<string>;
    combinations: Array<{
      id: string;
      subject_line: number;
      send_time: number;
      from_name: number;
      reply_to: number;
      content_description: number;
      recipients: number;
    }>;
  };
  tracking: {
    opens: boolean;
    html_clicks: boolean;
    text_clicks: boolean;
    goal_tracking: boolean;
    ecomm360: boolean;
    google_analytics: string;
    clicktale: string;
    salesforce: {
      campaign: boolean;
      notes: boolean;
    };
    capsule: {
      notes: boolean;
    };
  };
  rss_opts: {
    feed_url: string;
    frequency: string;
    schedule: {
      hour: number;
      daily_send: {
        sunday: boolean;
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
      };
      weekly_send_day: string;
      monthly_send_date: number;
    };
    last_sent: string;
    constrain_rss_img: boolean;
  };
  ab_split_opts: {
    split_test: string;
    pick_winner: string;
    wait_units: string;
    wait_time: number;
    split_size: number;
    from_name_a: string;
    from_name_b: string;
    reply_email_a: string;
    reply_email_b: string;
    subject_a: string;
    subject_b: string;
    send_time_a: string;
    send_time_b: string;
    send_time_winner: string;
  };
  social_card: {
    image_url: string;
    description: string;
    title: string;
  };
  report_summary: {
    opens: number;
    unique_opens: number;
    open_rate: number;
    clicks: number;
    subscriber_clicks: number;
    click_rate: number;
    ecommerce: {
      total_orders: number;
      total_spent: number;
      total_revenue: number;
    };
  };
  delivery_status: {
    enabled: boolean;
    can_cancel: boolean;
    status: string;
    emails_sent: number;
    emails_canceled: number;
  };
  _links: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema: string;
    schema: string;
  }>;
}

export interface Campaigns {
  campaigns: Array<Campaign>;
  total_items: number;
  _links: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema: string;
    schema: string;
  }>;
}

export interface QueryCampaigns {
  fields?: string[];
  exclude_fields?: string[];
  count?: number;
  offset?: number;
  type?: "regular" | "plaintext" | "absplit" | "rss" | "variate";
  status?: "save" | "paused" | "schedule" | "sending" | "sent";
  before_send_time?: string;
  since_send_time?: string;
  before_create_time?: string;
  since_create_time?: string;
  list_id?: string;
  member_id?: string;
  sort_field?: string;
  sort_dir?: "ASC" | "DESC";
}

export interface QueryCampaign {
  fields?: string[];
  exclude_fields?: string[];
}

export interface CampaignContent {
  variate_contents: Array<{
    content_label: string;
    plain_text: string;
    html: string;
  }>;
  plain_text: string;
  html: string;
  archive_html: string;
  _links: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema: string;
    schema: string;
  }>;
}

export interface QueryUpdateCampaignContent {
  archive?: {
    archive_type?: string;
    archive_content: string;
  };
  template?: {};
  plain_text?: string;
  html?: string;
  url?: string;
  variate_contents?: {}[];
}

export interface QueryScheduleCampaign {
  schedule_time: string;
  batch_delivery?: {
    batch_delay: number;
    batch_count: number;
  };
  timewarp?: boolean;
}
