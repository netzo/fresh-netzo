export interface Paginated<T> {
  total: number
  limit: number
  skip: number
  data: T[]
}

export interface Service {
  _id: string
  _type: 'service'
  name: string
  [k: string]: any
}
export interface Worker {
  _id: string
  _type: 'worker'
  name: string
  [k: string]: any
}

export interface Workflow {
  _id: string
  _type: 'workflow'
  name: string
  [k: string]: any
}