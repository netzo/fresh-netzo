import { assertExists } from 'https://deno.land/std@0.97.0/testing/asserts.ts'
import { deployItems } from './deploy-items.ts'

Deno.test('deployItems', () => {
  assertExists(deployItems)
})
