export interface Service {
  _id: string
  _type: 'service'
  name: string
}
export interface Worker {
  _id: string
  _type: 'worker'
  name: string
}

export interface Workflow {
  _id: string
  _type: 'workflow'
  name: string
}

export interface Function {
  _id: string
  _type: 'function'
  name: string
}