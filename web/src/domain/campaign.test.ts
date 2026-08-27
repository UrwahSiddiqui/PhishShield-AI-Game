import { describe, expect, it } from 'vitest'
import { northstarCampaign } from './campaign'

describe('northstar campaign definition', () => {
  it('has five connected incidents and one final boss', () => {
    expect(northstarCampaign.incidents).toHaveLength(5)
    expect(new Set(northstarCampaign.incidents.map((incident) => incident.id)).size).toBe(5)
    expect(northstarCampaign.incidents.at(-1)?.isBoss).toBe(true)
  })

  it('uses scenarios that exist in the curated content set', () => {
    expect(northstarCampaign.incidents.map((incident) => incident.scenarioId)).toEqual([
      'email-invoice-domain',
      'sms-password-reset',
      'qr-parking-payment',
      'login-mfa-fatigue',
      'ceo-travel-transfer',
    ])
  })
})
