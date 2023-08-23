import { z } from "https://deno.land/x/zod/mod.ts";

// Zod schemas
const userBasicsSchema = z.object({
  login: z.string(),
  id: z.number(),
  node_id: z.string(),
  avatar_url: z.string(),
  gravatar_id: z.string(),
  url: z.string(),
  html_url: z.string(),
  followers_url: z.string(),
  following_url: z.string(),
  gists_url: z.string(),
  starred_url: z.string(),
  subscriptions_url: z.string(),
  organizations_url: z.string(),
  repos_url: z.string(),
  events_url: z.string(),
  received_events_url: z.string(),
  type: z.string(),
  site_admin: z.boolean()
})

const repoBasicsSchema = z.object({
  id: z.number(),
  node_id: z.string(),
  name: z.string(),
  full_name: z.string(),
  owner: userBasicsSchema,
  private: z.boolean(),
  html_url: z.string(),
  description: z.string(),
  fork: z.boolean(),
  url: z.string(),
  archive_url: z.string(),
  assignees_url: z.string(),
  blobs_url: z.string(),
  branches_url: z.string(),
  collaborators_url: z.string(),
  comments_url: z.string(),
  commits_url: z.string(),
  compare_url: z.string(),
  contents_url: z.string(),
  contributors_url: z.string(),
  deployments_url: z.string(),
  downloads_url: z.string(),
  events_url: z.string(),
  forks_url: z.string(),
  git_commits_url: z.string(),
  git_refs_url: z.string(),
  git_tags_url: z.string(),
  git_url: z.string(),
  issue_comment_url: z.string(),
  issue_events_url: z.string(),
  issues_url: z.string(),
  keys_url: z.string(),
  labels_url: z.string(),
  languages_url: z.string(),
  merges_url: z.string(),
  milestones_url: z.string(),
  notifications_url: z.string(),
  pulls_url: z.string(),
  releases_url: z.string(),
  ssh_url: z.string(),
  stargazers_url: z.string(),
  statuses_url: z.string(),
  subscribers_url: z.string(),
  subscription_url: z.string(),
  tags_url: z.string(),
  teams_url: z.string(),
  trees_url: z.string(),
  clone_url: z.string(),
  mirror_url: z.string(),
  hooks_url: z.string(),
  svn_url: z.string(),
  homepage: z.string(),
  language: z.any(),
  forks_count: z.number(),
  stargazers_count: z.number(),
  watchers_count: z.number(),
  size: z.number(),
  default_branch: z.string(),
  open_issues_count: z.number(),
  is_template: z.boolean(),
  topics: z.array(z.string()),
  has_issues: z.boolean(),
  has_projects: z.boolean(),
  has_wiki: z.boolean(),
  has_pages: z.boolean(),
  has_downloads: z.boolean(),
  has_discussions: z.boolean(),
  archived: z.boolean(),
  disabled: z.boolean(),
  visibility: z.string(),
  pushed_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  permissions: z.object({
    admin: z.boolean(),
    push: z.boolean(),
    pull: z.boolean()
  })
})

export const userSchema = userBasicsSchema.extend({
  name: z.string(),
  company: z.string(),
  blog: z.string(),
  location: z.string(),
  email: z.string(),
  hireable: z.boolean(),
  bio: z.string(),
  twitter_username: z.string(),
  public_repos: z.number(),
  public_gists: z.number(),
  followers: z.number(),
  following: z.number(),
  created_at: z.string(),
  updated_at: z.string()
}).deepPartial()

export const queryUsersSchema = z.object({
  since: z.number().optional(),
  per_page: z.number().optional()
})

export const repositorySchema = repoBasicsSchema.extend({
  security_and_analysis: z.object({
    advanced_security: z.object({
      status: z.string()
    }),
    secret_scanning: z.object({
      status: z.string()
    }),
    secret_scanning_push_protection: z.object({
      status: z.string()
    })
  })
}).deepPartial()

export const queryRepositoriesSchema = z.object({
  type: z
    .union([z.literal("owner"), z.literal("member"), z.literal("all")])
    .optional(),
  sort: z
    .union([
      z.literal("full_name"),
      z.literal("created"),
      z.literal("updated"),
      z.literal("pushed")
    ])
    .optional(),
  direction: z.union([z.literal("asc"), z.literal("desc")]).optional(),
  page: z.number().optional(),
  per_page: z.number().optional(),
  visibility: z
    .union([z.literal("public"), z.literal("private"), z.literal("all")])
    .optional(),
  affiliation: z.string().optional(),
  since: z.string().optional(),
  before: z.string().optional()
})

export const issueSchema = z.object({
  id: z.number(),
  node_id: z.string(),
  url: z.string(),
  repository_url: z.string(),
  labels_url: z.string(),
  comments_url: z.string(),
  events_url: z.string(),
  html_url: z.string(),
  number: z.number(),
  state: z.string(),
  title: z.string(),
  body: z.string(),
  user: userBasicsSchema,
  labels: z.array(
    z.object({
      id: z.number(),
      node_id: z.string(),
      url: z.string(),
      name: z.string(),
      description: z.string(),
      color: z.string(),
      default: z.boolean()
    })
  ),
  assignee: userBasicsSchema,
  assignees: z.array(userBasicsSchema),
  milestone: z.object({
    url: z.string(),
    html_url: z.string(),
    labels_url: z.string(),
    id: z.number(),
    node_id: z.string(),
    number: z.number(),
    state: z.string(),
    title: z.string(),
    description: z.string(),
    open_issues: z.number(),
    closed_issues: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    closed_at: z.string(),
    due_on: z.string()
  }),
  locked: z.boolean(),
  active_lock_reason: z.string(),
  comments: z.number(),
  pull_request: z.object({
    url: z.string(),
    html_url: z.string(),
    diff_url: z.string(),
    patch_url: z.string()
  }),
  closed_at: z.any(),
  created_at: z.string(),
  updated_at: z.string(),
  repository: repoBasicsSchema.merge(
    z.object({
    allow_rebase_merge: z.boolean(),
    template_repository: z.any(),
    temp_clone_token: z.string(),
    allow_squash_merge: z.boolean(),
    allow_auto_merge: z.boolean(),
    delete_branch_on_merge: z.boolean(),
    allow_merge_commit: z.boolean(),
    subscribers_count: z.number(),
    network_count: z.number(),
    license: z.object({
      key: z.string(),
      name: z.string(),
      url: z.string(),
      spdx_id: z.string(),
      node_id: z.string(),
      html_url: z.string()
    }),
    forks: z.number(),
    open_issues: z.number(),
    watchers: z.number()
  }),
  ),
  author_association: z.string()
}).deepPartial()

export const queryIssuesSchema = z.object({
  filter: z
    .union([
      z.literal("assigned"),
      z.literal("created"),
      z.literal("mentioned"),
      z.literal("subscribed"),
      z.literal("repos"),
      z.literal("all")
    ])
    .optional(),
  state: z
    .union([z.literal("open"), z.literal("closed"), z.literal("all")])
    .optional(),
  labels: z.string().optional(),
  sort: z
    .union([z.literal("created"), z.literal("updated"), z.literal("comments")])
    .optional(),
  direction: z.union([z.literal("asc"), z.literal("desc")]).optional(),
  since: z.string().optional(),
  collab: z.boolean().optional(),
  orgs: z.boolean().optional(),
  owned: z.boolean().optional(),
  pulls: z.boolean().optional(),
  per_page: z.number().optional(),
  page: z.number().optional()
})

// Types
export type User = z.infer<typeof userSchema>;
export type Repository = z.infer<typeof repositorySchema>
export type QueryUsers = z.infer<typeof queryUsersSchema> 
export type QueryRepositories = z.infer<typeof queryRepositoriesSchema>
export type Issue = z.infer<typeof issueSchema>
export type QueryIssues = z.infer<typeof queryIssuesSchema> 