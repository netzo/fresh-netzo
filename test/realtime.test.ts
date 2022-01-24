import { describe, test, expect } from 'vitest'
import { Netzo } from '../src/main'

describe('Netzo.wot', () => {
  test('Netzo.wot.fetchTD()', async () => {
    const wot = await Netzo.wot()
    expect(wot.fetchTD).toBeTruthy()
  })
  test('Netzo.wot.consumeThing()', async () => {
    const wot = await Netzo.wot()
    expect(wot.consumeThing).toBeTruthy()
  })
})
