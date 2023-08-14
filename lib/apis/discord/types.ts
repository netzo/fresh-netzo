export interface Channel {
  id: string;
  type: number;
  guild_id: string;
  position: number;
  permission_overwrites: [any];
  name: string;
  topic: string;
  nsfw: boolean;
  last_message_id: string;
  bitrate: number;
  user_limit: number;
  rate_limit_per_user: number;
  recipients: [any];
  icon: string;
  owner_id: string;
  application_id: string;
  managed: boolean;
  parent_id: string;
  last_pin_timestamp: string;
  rtc_region: string;
  video_quality_mode: number;
  message_count: number;
  member_count: number;
  thread_metadata: {};
  member: {};
  default_auto_archive_duration: number;
  permissions: string;
  flags: number;
  total_message_sent: number;
  available_tags: {}[];
  applied_tags: string[];
  default_reaction_emoji: {};
  default_thread_rate_limit_per_user: number;
  default_sort_order: number;
  default_forum_layout: number;
}

export interface Message {
  id: string;
  channel_id: string;
  author: {};
  content: string;
  timestamp: string;
  edited_timestamp: string;
  tts: boolean;
  mention_everyone: boolean;
  mentions: {}[];
  mention_roles: string[];
  mention_channels: {}[];
  attachments: {}[];
  embeds: {}[];
  reactions: {}[];
  nonce: any;
  pinned: boolean;
  webhook_id: string;
  type: number;
  activity: {};
  application: {};
  application_id: string;
  message_reference: {};
  flags: number;
  referenced_message: {};
  interaction: {};
  thread: {};
  components: [];
  sticker_items: {}[];
  stickers: {}[];
  position: number;
  role_subscription_data: {};
}

export interface QueryMessages {
  around?: string;
  before?: string;
  after?: string;
  limit?: number;
}

export interface QueryAddOrUpdateMessage {
  content?: string;
  nonce?: any;
  tts?: boolean;
  embeds?: {}[];
  allowed_mentions?: {};
  message_reference?: {};
  components?: {}[];
  sticker_ids?: string[];
  flags?: number;
}
