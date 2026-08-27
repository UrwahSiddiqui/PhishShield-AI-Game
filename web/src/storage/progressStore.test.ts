import { describe, expect, it } from 'vitest'
import { createCampaignState } from '../domain/campaignEngine'
import { clearCampaignState, readCampaignState, STORAGE_KEY, writeCampaignState } from './progressStore'
import type { CampaignDefinition } from '../domain/campaignEngine'

const campaign: CampaignDefinition = { id: 'test', name: 'Test', incidents: [{ id: 'one', scenarioId: 'one', stage: 1, correctClassification: 'phishing', containmentActions: ['report'], impact: 'low', timeLimitSeconds: 30, threatImpact: 10, threatReduction: 5 }] }

function storage(seed?: string): Storage {
  const values = new Map(seed ? [[STORAGE_KEY, seed]] : [])
  return {
    get length() { return values.size },
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    key: (index) => [...values.keys()][index] ?? null,
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, value),
  }
}

describe('progressStore', () => {
  it('round-trips a campaign state and preserves untimed mode', () => {
    const store = storage()
    const state = createCampaignState(campaign, 'untimed')
    expect(writeCampaignState(state, store)).toBe(true)
    expect(readCampaignState(store)).toEqual(state)
  })

  it('recovers from malformed saved data', () => {
    expect(readCampaignState(storage('{not-json'))).toBeUndefined()
    expect(readCampaignState(storage(JSON.stringify({ campaignId: 'wrong' })))).toBeUndefined()
  })

  it('clears saved progress', () => {
    const store = storage()
    writeCampaignState(createCampaignState(campaign), store)
    clearCampaignState(store)
    expect(readCampaignState(store)).toBeUndefined()
  })
})
