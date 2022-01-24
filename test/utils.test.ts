import { describe, test, expect } from 'vitest'
import { getApiUrl, getToken } from '../src/modules/utils'

describe('Utils', () => {
  test('getApiUrl()', async () => {
    expect(getApiUrl).toBeTruthy()
  })
  test('getToken()', async () => {
    expect(getToken).toBeTruthy()
  })
})
