import { z } from "../../../deps/zod/mod.ts";

export const listSchema = z.object({
  id: z.string(),
  name: z.string(),
  orderindex: z.number(),
  content: z.string(),
  status: z.object({
    status: z.string(),
    color: z.string(),
    hide_label: z.boolean(),
  }),
  priority: z.object({
    priority: z.string(),
    color: z.string(),
  }),
  assignee: z.any(),
  due_date: z.string(),
  due_date_time: z.boolean(),
  start_date: z.any(),
  start_date_time: z.any(),
  folder: z.object({
    id: z.string(),
    name: z.string(),
    hidden: z.boolean(),
    access: z.boolean(),
  }),
  space: z.object({
    id: z.string(),
    name: z.string(),
    access: z.boolean(),
  }),
  inbound_address: z.string(),
  archived: z.boolean(),
  override_statuses: z.boolean(),
  statuses: z.array(
    z.object({
      status: z.string(),
      orderindex: z.number(),
      color: z.string(),
      type: z.string(),
    }),
  ),
  permission_level: z.string(),
}).deepPartial();

export const listsSchema = z.object({
  lists: z.array(listSchema),
}).deepPartial();

export const queryListsSchema = z.object({
  archived: z.boolean().optional(),
});

export const taskSchema = z.object({
  id: z.string(),
  custom_id: z.string(),
  name: z.string(),
  text_content: z.string(),
  description: z.string(),
  status: z.object({
    status: z.string(),
    color: z.string(),
    orderindex: z.number(),
    type: z.string(),
  }),
  orderindex: z.string(),
  date_created: z.string(),
  date_updated: z.string(),
  date_closed: z.string(),
  creator: z.object({
    id: z.number(),
    username: z.string(),
    color: z.string(),
    profilePicture: z.string(),
  }),
  assignees: z.array(z.string()),
  checklists: z.array(z.string()),
  tags: z.array(z.string()),
  parent: z.string(),
  priority: z.string(),
  due_date: z.string(),
  start_date: z.string(),
  time_estimate: z.string(),
  time_spent: z.string(),
  custom_fields: z.array(z.object({})),
  list: z.object({
    id: z.string(),
  }),
  folder: z.object({
    id: z.string(),
  }),
  space: z.object({
    id: z.string(),
  }),
  url: z.string(),
}).deepPartial();

export const tasksSchema = z.object({
  tasks: z.array(taskSchema),
}).deepPartial();

export const queryTasksSchema = z.object({
  archived: z.literal(false).optional(),
  page: z.number().optional(),
  order_by: z.string().optional(),
  reverse: z.literal(true).optional(),
  subtasks: z.literal(true).optional(),
  statuses: z.array(z.string()).optional(),
  include_closed: z.literal(true).optional(),
  assignees: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  due_date_gt: z.number().optional(),
  due_date_lt: z.number().optional(),
  date_created_gt: z.number().optional(),
  date_created_lt: z.number().optional(),
  date_updated_gt: z.number().optional(),
  date_updated_lt: z.number().optional(),
  date_done_gt: z.number().optional(),
  date_done_lt: z.number().optional(),
  custom_fields: z.array(z.string()).optional(),
});

export const dataAddTaskSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  assignees: z.array(z.number()).optional(),
  tags: z.array(z.string()).optional(),
  status: z.string().optional(),
  priority: z.number().optional(),
  due_date: z.number().optional(),
  due_date_time: z.boolean().optional(),
  time_estimate: z.number().optional(),
  start_date: z.number().optional(),
  start_date_time: z.boolean().optional(),
  notify_all: z.boolean().optional(),
  parent: z.any().optional(),
  links_to: z.any().optional(),
  check_required_custom_fields: z.boolean().optional(),
  custom_fields: z
    .array(
      z.object({
        id: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
});

export const dataUpdateTaskSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
  priority: z.number().optional(),
  due_date: z.number().optional(),
  due_date_time: z.boolean().optional(),
  parent: z.string().optional(),
  time_estimate: z.number().optional(),
  start_date: z.number().optional(),
  start_date_time: z.boolean().optional(),
  assignees: z
    .object({
      add: z.array(z.any()),
      rem: z.array(z.any()),
    })
    .optional(),
  archived: z.boolean().optional(),
});

//types:

export type List = z.infer<typeof listSchema>;
export type Lists = z.infer<typeof listsSchema>;
export type QueryLists = z.infer<typeof queryListsSchema>;
export type Task = z.infer<typeof taskSchema>;
export type Tasks = z.infer<typeof tasksSchema>;
export type QueryTasks = z.infer<typeof queryTasksSchema>;
export type DataAddTask = z.infer<typeof dataAddTaskSchema>;
export type DataUpdateTask = z.infer<typeof dataUpdateTaskSchema>;
