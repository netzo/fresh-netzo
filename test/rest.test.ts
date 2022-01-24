import { describe, test, expect } from 'vitest'
import { Netzo } from '../src/main'

describe('Netzo.api', () => {
  test('Netzo.api.fetchDoc()', async () => {
    const api = await Netzo.api()
    expect(api.fetchDoc).toBeTruthy()
  })
  test('Netzo.api.consumeApi()', async () => {
    const api = await Netzo.api()
    expect(api.consumeApi).toBeTruthy()
  })
})
