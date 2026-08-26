import { describe, expect, it } from 'vitest'
import {
  createCampaignState,
  getCampaignSummary,
  getThreatState,
  isBossAvailable,
  resolveIncident,
  timeoutIncident,
  type CampaignDefinition,
} from './campaignEngine'

const campaign: CampaignDefinition = {
  id: 'northstar-monday',
  name: 'Monday Morning Surge',
  incidents: [
    { id: 'recon', scenarioId: 'email-invoice-domain', stage: 1, correctClassification: 'suspicious', containmentActions: ['report', 'verify'], impact: 'low', timeLimitSeconds: 90, threatImpact: 12, threatReduction: 8 },
    { id: 'mfa', scenarioId: 'login-mfa-fatigue', stage: 2, correctClassification: 'phishing', containmentActions: ['report', 'block'], impact: 'high', timeLimitSeconds: 75, threatImpact: 20, threatReduction: 12 },
    { id: 'boss', scenarioId: 'ceo-travel-transfer', stage: 3, isBoss: true, correctClassification: 'phishing', containmentActions: ['verify', 'escalate'], impact: 'critical', timeLimitSeconds: 60, threatImpact: 40, threatReduction: 25 },
  ],
}

const containedResponse = { classification: 'suspicious' as const, action: 'report' as const }

describe('campaign boundaries', () => {
  it('maps every threat boundary to a named state', () => {
    expect(getThreatState(0)).toBe('low')
    expect(getThreatState(20)).toBe('guarded')
    expect(getThreatState(40)).toBe('elevated')
    expect(getThreatState(60)).toBe('high')
    expect(getThreatState(80)).toBe('critical')
    expect(getThreatState(130)).toBe('critical')
  })

  it('starts a timed or untimed campaign with the right response window', () => {
    expect(createCampaignState(campaign).remainingTimeSeconds).toBe(90)
    expect(createCampaignState(campaign, 'untimed').remainingTimeSeconds).toBe(Infinity)
  })
})

describe('incident resolution', () => {
  it('contains a correct response and advances the campaign', () => {
    const state = resolveIncident(campaign, createCampaignState(campaign), containedResponse)
    expect(state.incidentStatus).toBe('active')
    expect(state.currentIncidentIndex).toBe(1)
    expect(state.companyHealth).toBe(100)
    expect(state.threatScore).toBe(0)
    expect(state.containmentStreak).toBe(1)
  })

  it('damages health and raises threat for an incorrect allow decision', () => {
    const state = resolveIncident(campaign, createCampaignState(campaign), { classification: 'safe', action: 'allow' })
    expect(state.companyHealth).toBe(95)
    expect(state.threatScore).toBe(12)
    expect(state.playerResponses[0].status).toBe('missed')
  })

  it('allows recovery after a non-critical mistake', () => {
    const missed = resolveIncident(campaign, createCampaignState(campaign), { classification: 'safe', action: 'allow' })
    const recovered = resolveIncident(campaign, missed, { classification: 'phishing', action: 'report' })
    expect(recovered.companyHealth).toBe(95)
    expect(recovered.threatScore).toBe(0)
    expect(recovered.campaignOutcome).toBe('in-progress')
  })

  it('does not resolve the same incident twice', () => {
    const state = createCampaignState(campaign)
    const first = resolveIncident(campaign, state, containedResponse)
    const duplicate = resolveIncident(campaign, state, containedResponse)
    expect(duplicate.playerResponses).toHaveLength(1)
    expect(duplicate).toEqual(first)
  })

  it('resolves a timeout once with deterministic impact', () => {
    const state = createCampaignState(campaign)
    const timedOut = timeoutIncident(campaign, state)
    const duplicate = timeoutIncident(campaign, state)
    expect(timedOut.playerResponses[0].status).toBe('timed-out')
    expect(timedOut.companyHealth).toBe(95)
    expect(timedOut.threatScore).toBe(12)
    expect(duplicate).toEqual(timedOut)
  })
})

describe('boss and campaign outcomes', () => {
  it('unlocks the boss only after earlier incidents resolve', () => {
    let state = createCampaignState(campaign)
    expect(isBossAvailable(campaign, state)).toBe(false)
    state = resolveIncident(campaign, state, containedResponse)
    expect(isBossAvailable(campaign, state)).toBe(false)
    state = resolveIncident(campaign, state, { classification: 'phishing', action: 'report' })
    expect(isBossAvailable(campaign, state)).toBe(true)
  })

  it('wins when the boss is contained below the critical threat threshold', () => {
    let state = createCampaignState(campaign, 'untimed')
    state = resolveIncident(campaign, state, containedResponse)
    state = resolveIncident(campaign, state, { classification: 'phishing', action: 'report' })
    state = resolveIncident(campaign, state, { classification: 'phishing', action: 'verify' })
    expect(state.campaignOutcome).toBe('won')
    expect(getCampaignSummary(state)).toMatchObject({ outcome: 'won', incidentsContained: 3, incidentsMissed: 0, responseAccuracy: 100 })
  })

  it('loses when the critical boss is mishandled', () => {
    let state = createCampaignState(campaign)
    state = resolveIncident(campaign, state, containedResponse)
    state = resolveIncident(campaign, state, { classification: 'phishing', action: 'report' })
    state = resolveIncident(campaign, state, { classification: 'phishing', action: 'allow' })
    expect(state.campaignOutcome).toBe('lost')
    expect(state.companyHealth).toBe(65)
  })
})
