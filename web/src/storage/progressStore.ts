import { z } from 'zod'
import type { CampaignMode, CampaignState } from '../domain/campaignEngine'

const STORAGE_KEY = 'phishshield:campaign:v1'

const storedStateSchema = z.object({
  campaignId: z.string(),
  currentIncidentIndex: z.number().int().nonnegative(),
  resolvedIncidentIds: z.array(z.string()),
  companyHealth: z.number().min(0).max(100),
  threatScore: z.number().min(0).max(100),
  threatState: z.enum(['low', 'guarded', 'elevated', 'high', 'critical']),
  incidentStatus: z.enum(['active', 'contained', 'weak', 'missed', 'timed-out', 'briefing']),
  remainingTimeSeconds: z.union([z.number().nonnegative(), z.null()]),
  mode: z.enum(['timed', 'untimed']),
  containmentStreak: z.number().int().nonnegative(),
  campaignOutcome: z.enum(['in-progress', 'won', 'lost']),
  playerResponses: z.array(z.object({
    incidentId: z.string(),
    classification: z.enum(['safe', 'suspicious', 'phishing']),
    action: z.enum(['allow', 'quarantine', 'report', 'verify', 'block', 'escalate']),
    status: z.enum(['active', 'contained', 'weak', 'missed', 'timed-out']),
    healthDelta: z.number(),
    threatDelta: z.number(),
    timedOut: z.boolean(),
  })),
})

export function readCampaignState(storage: Storage | undefined = getStorage()): CampaignState | undefined {
  if (!storage) return undefined
  try {
    const raw = storage.getItem(STORAGE_KEY)
    if (!raw) return undefined
    const parsed = storedStateSchema.parse(JSON.parse(raw))
    return { ...parsed, remainingTimeSeconds: parsed.remainingTimeSeconds ?? (parsed.mode === 'untimed' ? Infinity : 0) }
  } catch {
    return undefined
  }
}

export function writeCampaignState(state: CampaignState, storage: Storage | undefined = getStorage()): boolean {
  if (!storage) return false
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify({ ...state, remainingTimeSeconds: Number.isFinite(state.remainingTimeSeconds) ? state.remainingTimeSeconds : null }))
    return true
  } catch {
    return false
  }
}

export function clearCampaignState(storage: Storage | undefined = getStorage()): void {
  try {
    storage?.removeItem(STORAGE_KEY)
  } catch {
    // Storage can be blocked by browser privacy settings.
  }
}

function getStorage(): Storage | undefined {
  try {
    return window.localStorage
  } catch {
    return undefined
  }
}

export { STORAGE_KEY }
export type PersistedCampaignMode = CampaignMode
