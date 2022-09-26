import { config } from "https://deno.land/x/dotenv/mod.ts";
import { assertEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { Netzo } from '../../mod.ts'

const netzo = Netzo({ apiKey: config().API_KEY_SENDINBLUE })

Deno.test('sendinblue.companies', async () => {
  const [companies, company] = await Promise.all([
    netzo.sendinblue.companies.find(),
    netzo.sendinblue.companies.get("6331ac1571745f4d52b10b4b")
  ])
  assertEquals(Array.isArray(companies?.items), true)
  assertEquals(company.id, "6331ac1571745f4d52b10b4b")
})

// Deno.test('sendinblue.deals', async () => {
//   const [deals, deal] = await Promise.all([
//     netzo.sendinblue.deals.find(),
//     netzo.sendinblue.deals.get(1)
//   ])
//   assertEquals(Array.isArray(deals?.items), true)
//   assertEquals(deal.id, 1)
// })

Deno.test('sendinblue.tasks', async () => {
  const [tasks, task] = await Promise.all([
    netzo.sendinblue.tasks.find(),
    netzo.sendinblue.tasks.get("6331eec1d17a61000d9f9ef2")
  ])
  assertEquals(Array.isArray(tasks?.items), true)
  assertEquals(task.id, "6331eec1d17a61000d9f9ef2")
})

// Deno.test('sendinblue.notes', async () => {
//   const [notes, note] = await Promise.all([
//     netzo.sendinblue.notes.find(),
//     netzo.sendinblue.notes.get(1)
//   ])
//   assertEquals(Array.isArray(notes?.items), true)
//   assertEquals(note.id, 1)
// })

// Deno.test('sendinblue.files', async () => {
//   const [files, file] = await Promise.all([
//     netzo.sendinblue.files.find(),
//     netzo.sendinblue.files.get(1)
//   ])
//   assertEquals(Array.isArray(files?.items), true)
//   assertEquals(!!file, true)
// })

// Deno.test('sendinblue.conversations', async () => {
//   const [conversations, conversation] = await Promise.all([
//     netzo.sendinblue.conversations.find(),
//     netzo.sendinblue.conversations.get(1)
//   ])
//   assertEquals(Array.isArray(conversations?.items), true)
//   assertEquals(conversation.id, 1)
// })