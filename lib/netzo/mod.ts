import { createClient } from '../http/mod.ts';
// FIXME: pass in type like so .get<Workflow[]>() and .get<Workflow>(), breaking tests
import type { Service, Worker, Workflow, Function } from './types.ts';

const baseURL = 'https://api.netzo.io'

export const netzo = createClient({ baseURL })

export const getServices = async (): Promise<Service[]> => {
  const api = createClient({ baseURL })
  return await api.services.get()
}

export const getService = async (id: number): Promise<Service> => {
  const api = createClient({ baseURL })
  return await api.services[id].get()
}

export const getWorkers = async (): Promise<Worker[]> => {
  const api = createClient({ baseURL })
  return await api.workers.get()
}

export const getWorker = async (id: number): Promise<Worker> => {
  const api = createClient({ baseURL })
  return await api.workers[id].get()
}

export const getWorkflows = async (): Promise<Workflow[]> => {
  const api = createClient({ baseURL })
  return await api.workflows.get()
}

export const getWorkflow = async (id: number): Promise<Workflow> => {
  const api = createClient({ baseURL })
  return await api.workflows[id].get()
}

export const getFunctions = async (): Promise<Function[]> => {
  const api = createClient({ baseURL })
  return await api.functions.get()
}

export const getFunction = async (id: number): Promise<Function> => {
  const api = createClient({ baseURL })
  return await api.functions[id].get()
}

export default {
  getServices,
  getService,
  getWorkers,
  getWorker,
  getWorkflows,
  getWorkflow,
  getFunctions,
  getFunction,
}
