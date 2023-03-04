import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

async function handler(_req: Request): Promise<Response> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos')

  const todos = await response.json()

  const pendingTodos = todos.filter((todo: Todo) => !todo.completed)

  const body = JSON.stringify(pendingTodos, null, 2)

  return new Response(body, {
    headers: { 'content-type': 'application/json' },
  })
}

serve(handler)
