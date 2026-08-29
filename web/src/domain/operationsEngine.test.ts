import { describe, expect, it } from 'vitest'
import { advanceIncident, createOpsState, incidents, inspectTool, resolveAction, tick } from './operationsEngine'

describe('operations simulation', () => {
  it('contains legitimate load, operational failure, and compromise in deterministic order', () => {
    expect(incidents.map((item) => item.rootCause)).toEqual(['legitimate-load', 'bad-deployment', 'endpoint-compromise'])
  })
  it('rewards evidence-backed optimal action without exposing root cause in findings', () => {
    let state = inspectTool(createOpsState(), 'metrics')
    state = inspectTool(state, 'network')
    const resolved = resolveAction(state, 'scale')
    expect(resolved.resolvedIncidents[0].evidenceBonus).toBe(150)
    expect(resolved.score).toBeGreaterThan(700)
    expect(incidents[0].tools.some((tool) => tool.finding.detail.includes('legitimate-load'))).toBe(false)
  })
  it('damages health when legitimate traffic is blocked', () => {
    const result = resolveAction(createOpsState(), 'block')
    expect(result.companyHealth).toBeLessThan(100)
    expect(result.resolvedIncidents[0].outcome).toBe('harmful')
  })
  it('distinguishes a failed deployment from compromise and rewards rollback', () => {
    let state = advanceIncident(resolveAction(createOpsState('untimed'), 'scale'))
    expect(incidents[state.incidentIndex].rootCause).toBe('bad-deployment')
    state = resolveAction(inspectTool(state, 'deployments'), 'rollback')
    expect(state.resolvedIncidents[1].outcome).toBe('optimal')
  })
  it('bounds health and keeps scoring deterministic', () => {
    const first = resolveAction(createOpsState(), 'scale')
    expect(first.companyHealth).toBe(100)
    expect(resolveAction(createOpsState(), 'scale').score).toBe(first.score)
  })
  it('expires once and duplicate actions cannot resolve twice', () => {
    const expired = tick(createOpsState(), 90)
    expect(expired.resolvedIncidents).toHaveLength(1)
    expect(tick(expired, 1)).toEqual(expired)
    expect(resolveAction(expired, 'scale')).toEqual(expired)
  })
  it('advances through all incidents to final shift completion', () => {
    let state = resolveAction(createOpsState('untimed'), 'scale')
    state = resolveAction(advanceIncident(state), 'rollback')
    state = resolveAction(advanceIncident(state), 'isolate')
    state = advanceIncident(state)
    expect(state.shiftOutcome).toBe('complete')
    expect(state.resolvedIncidents).toHaveLength(3)
  })
})
