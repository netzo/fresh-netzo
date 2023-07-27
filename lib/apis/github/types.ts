interface UserBasics {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface User extends UserBasics {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name: string
  company: string
  blog: string
  location: string
  email: string
  hireable: boolean
  bio: string
  twitter_username: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

interface RepoBasics {
  id: number
  node_id: string
  name: string
  full_name: string
  owner: UserBasics
  private: boolean
  html_url: string
  description: string
  fork: boolean
  url: string
  archive_url: string
  assignees_url: string
  blobs_url: string
  branches_url: string
  collaborators_url: string
  comments_url: string
  commits_url: string
  compare_url: string
  contents_url: string
  contributors_url: string
  deployments_url: string
  downloads_url: string
  events_url: string
  forks_url: string
  git_commits_url: string
  git_refs_url: string
  git_tags_url: string
  git_url: string
  issue_comment_url: string
  issue_events_url: string
  issues_url: string
  keys_url: string
  labels_url: string
  languages_url: string
  merges_url: string
  milestones_url: string
  notifications_url: string
  pulls_url: string
  releases_url: string
  ssh_url: string
  stargazers_url: string
  statuses_url: string
  subscribers_url: string
  subscription_url: string
  tags_url: string
  teams_url: string
  trees_url: string
  clone_url: string
  mirror_url: string
  hooks_url: string
  svn_url: string
  homepage: string
  language: any
  forks_count: number
  stargazers_count: number
  watchers_count: number
  size: number
  default_branch: string
  open_issues_count: number
  is_template: boolean
  topics: Array<string>
  has_issues: boolean
  has_projects: boolean
  has_wiki: boolean
  has_pages: boolean
  has_downloads: boolean
  has_discussions: boolean
  archived: boolean
  disabled: boolean
  visibility: string
  pushed_at: string
  created_at: string
  updated_at: string
  permissions: {
    admin: boolean
    push: boolean
    pull: boolean
  }
}

export interface Repository extends RepoBasics {
    security_and_analysis: {
    advanced_security: {
      status: string
    }
    secret_scanning: {
      status: string
    }
    secret_scanning_push_protection: {
      status: string
    }
  }
}

export interface QueryRepositories {
  type?: 'owner' | 'member' | 'all'
  sort?: 'full_name' | 'created' | 'updated' | 'pushed'
  direction?: 'asc' | 'desc'
  page?: number
  per_page?: number
  visibility?: 'public' | 'private' | 'all' //from here on, only for authenticated user's repos
  affiliation?: string
  since?: string
  before?: string
}

export interface Issue {
  id: number
  node_id: string
  url: string
  repository_url: string
  labels_url: string
  comments_url: string
  events_url: string
  html_url: string
  number: number
  state: string
  title: string
  body: string
  user: UserBasics
  labels: Array<{
    id: number
    node_id: string
    url: string
    name: string
    description: string
    color: string
    default: boolean
  }>
  assignee: UserBasics
  assignees: UserBasics[]
  milestone: {
    url: string
    html_url: string
    labels_url: string
    id: number
    node_id: string
    number: number
    state: string
    title: string
    description: string
    creator: UserBasics
    open_issues: number
    closed_issues: number
    created_at: string
    updated_at: string
    closed_at: string
    due_on: string
  }
  locked: boolean
  active_lock_reason: string
  comments: number
  pull_request: {
    url: string
    html_url: string
    diff_url: string
    patch_url: string
  }
  closed_at: any
  created_at: string
  updated_at: string
  repository: RepoBasics & {
    allow_rebase_merge: boolean
    template_repository: any
    temp_clone_token: string
    allow_squash_merge: boolean
    allow_auto_merge: boolean
    delete_branch_on_merge: boolean
    allow_merge_commit: boolean
    subscribers_count: number
    network_count: number
    license: {
      key: string
      name: string
      url: string
      spdx_id: string
      node_id: string
      html_url: string
    }
    forks: number
    open_issues: number
    watchers: number
  }
  author_association: string
}

export interface QueryIssues {
  filter?: 'assigned' | 'created' | 'mentioned' | 'subscribed' | 'repos' | 'all'
  state?: 'open' | 'closed' | 'all'
  labels?: string
  sort?: 'created' | 'updated' | 'comments'
  direction?: 'asc' | 'desc'
  since?: string
  collab?: boolean
  orgs?: boolean
  owned?: boolean
  pulls?: boolean
  per_page?: number
  page?: number
}

export interface SearchResult {
  total_count: number
  incomplete_results: boolean
  items: [] 
}

export interface SearchTarget {
  target:
    | 'code'
    | 'commits'
    | 'issues'
    | 'labels'
    | 'repositories'
    | 'topics'
    | 'users'
}

export interface QuerySearch {
  q: string
  per_page?: number
  page?: number
}
