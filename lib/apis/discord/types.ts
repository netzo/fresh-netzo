import { z } from "https://deno.land/x/zod/mod.ts";

export const channelSchema = z.object({
  id: z.string(),
  type: z.number(),
  guild_id: z.string(),
  position: z.number(),
  permission_overwrites: z.tuple([z.any()]),
  name: z.string(),
  topic: z.string(),
  nsfw: z.boolean(),
  last_message_id: z.string(),
  bitrate: z.number(),
  user_limit: z.number(),
  rate_limit_per_user: z.number(),
  recipients: z.tuple([z.any()]),
  icon: z.string(),
  owner_id: z.string(),
  application_id: z.string(),
  managed: z.boolean(),
  parent_id: z.string(),
  last_pin_timestamp: z.string(),
  rtc_region: z.string(),
  video_quality_mode: z.number(),
  message_count: z.number(),
  member_count: z.number(),
  thread_metadata: z.object({}),
  member: z.object({}),
  default_auto_archive_duration: z.number(),
  permissions: z.string(),
  flags: z.number(),
  total_message_sent: z.number(),
  available_tags: z.array(z.object({})),
  applied_tags: z.array(z.string()),
  default_reaction_emoji: z.object({}),
  default_thread_rate_limit_per_user: z.number(),
  default_sort_order: z.number(),
  default_forum_layout: z.number()
}).deepPartial()

export const messageSchema = z.object({
  id: z.string(),
  channel_id: z.string(),
  author: z.object({}),
  content: z.string(),
  timestamp: z.string(),
  edited_timestamp: z.string(),
  tts: z.boolean(),
  mention_everyone: z.boolean(),
  mentions: z.array(z.object({})),
  mention_roles: z.array(z.string()),
  mention_channels: z.array(z.object({})),
  attachments: z.array(z.object({})),
  embeds: z.array(z.object({})),
  reactions: z.array(z.object({})),
  nonce: z.any(),
  pinned: z.boolean(),
  webhook_id: z.string(),
  type: z.number(),
  activity: z.object({}),
  application: z.object({}),
  application_id: z.string(),
  message_reference: z.object({}),
  flags: z.number(),
  referenced_message: z.object({}),
  interaction: z.object({}),
  thread: z.object({}),
  components: z.tuple([]),
  sticker_items: z.array(z.object({})),
  stickers: z.array(z.object({})),
  position: z.number(),
  role_subscription_data: z.object({})
}).deepPartial()

export const queryMessagesSchema = z.object({
  around: z.string().optional(),
  before: z.string().optional(),
  after: z.string().optional(),
  limit: z.number().optional()
})

export const queryAddOrUpdateMessageSchema = z.object({
  content: z.string().optional(),
  nonce: z.any().optional(),
  tts: z.boolean().optional(),
  embeds: z.array(z.object({})).optional(),
  allowed_mentions: z.object({}).optional(),
  message_reference: z.object({}).optional(),
  components: z.array(z.object({})).optional(),
  sticker_ids: z.array(z.string()).optional(),
  flags: z.number().optional()
})

//types:

export type Channel = z.infer<typeof channelSchema>
export type Message = z.infer<typeof messageSchema>
export type QueryMessages = z.infer<typeof queryMessagesSchema>
export type QueryAddOrUpdateMessage = z.infer<typeof queryAddOrUpdateMessageSchema>
