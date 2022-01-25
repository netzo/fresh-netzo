import { describe, test, expect } from 'vitest'
import { createApp } from '../src/modules/app'

describe('Netzo.app', () => {
  test('Netzo.app.createApp()', async () => {
    const app = createApp({ key: '123', url: 'http://localhost:4321' })
    expect(app).toBeTruthy()
  })
})
