import { describe, test, expect } from 'vitest'
import Netzo from '../src/main'

describe('Netzo', () => {
  test('Netzo', async () => {
    expect(Netzo).toBeTruthy()
  })
  test('Netzo', async () => {
    const netzo = Netzo({ key: '123', url: 'http://localhost:4321' })
    expect(netzo).toBeTruthy()
    expect(netzo.configure).toBeTruthy()
    expect(netzo.get).toBeTruthy()
    expect(netzo.set).toBeTruthy()
    expect(netzo.service).toBeTruthy()
    expect(netzo.services).toBeTruthy()
  })
})
