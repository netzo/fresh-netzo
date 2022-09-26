export interface Paginated<T> {
  items: T[]
  pager: {
    current: number
    limit: number
    from: number
    to: number
    count: number
    total: number
    max: number
  }
  refs?: Record<string, unknown>
}

export interface Company {
  id: number
  attributes: Record<string, unknown>
  linkedContactsIds: number[]
  linkedDealsIds: string[]
}

export interface Deal {
  id: number
  attributes: Record<string, unknown>
  linkedContactsIds: number[]
  linkedCompaniesIds: string[]
}

export interface Task {
  id: number
  taskTypeId: string
  name: string
  contactIds: number[]
}

export interface Note {
  id: number
  text: string
  contactIds: number[]
  dealIds: string[]
  authorId: Record<string, unknown>
  createdAt: string // date-time
  updatedAt: string // date-time
}

export interface File {
  name: string
  authorId: string
  contactId: number // int64
  dealId: string
  companyId: string
  size: number // int64
  createdAt: string // date-time
}

export interface Conversation {
  id: number
  type: string
  text: string
  visitorId: string
  agentId: string
  agentName: string
  createdAt: number // int64
}