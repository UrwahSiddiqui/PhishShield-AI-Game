export type CampaignMode = 'timed' | 'untimed'
export type IncidentStatus = 'active' | 'contained' | 'weak' | 'missed' | 'timed-out'
export type CampaignOutcome = 'in-progress' | 'won' | 'lost'
export type ThreatState = 'low' | 'guarded' | 'elevated' | 'high' | 'critical'
export type ImpactLevel = 'low' | 'medium' | 'high' | 'critical'

export type DefensiveAction = 'allow' | 'quarantine' | 'report' | 'verify' | 'block' | 'escalate'
export type Classification = 'safe' | 'suspicious' | 'phishing'

export type IncidentDefinition = {
  id: string
  scenarioId: string
  stage: number
  isBoss?: boolean
  correctClassification: Classification
  containmentActions: DefensiveAction[]
  impact: ImpactLevel
  timeLimitSeconds: number
  threatImpact: number
  threatReduction: number
}

export type CampaignDefinition = {
  id: string
  name: string
  incidents: IncidentDefinition[]
}

export type PlayerResponse = {
  incidentId: string
  classification: Classification
  action: DefensiveAction
  status: IncidentStatus
  healthDelta: number
  threatDelta: number
  timedOut: boolean
}

export type CampaignState = {
  campaignId: string
  currentIncidentIndex: number
  resolvedIncidentIds: string[]
  companyHealth: number
  threatScore: number
  threatState: ThreatState
  incidentStatus: IncidentStatus | 'briefing'
  remainingTimeSeconds: number
  mode: CampaignMode
  containmentStreak: number
  campaignOutcome: CampaignOutcome
  playerResponses: PlayerResponse[]
}

export const IMPACT_HEALTH: Record<ImpactLevel, number> = {
  low: 5,
  medium: 10,
  high: 20,
  critical: 35,
}

export const THREAT_BREACH_THRESHOLD = 100
export const THREAT_WIN_THRESHOLD = 80

export function clamp(value: number, minimum = 0, maximum = 100): number {
  return Math.min(maximum, Math.max(minimum, value))
}

export function getThreatState(threatScore: number): ThreatState {
  const score = clamp(threatScore)
  if (score >= 80) return 'critical'
  if (score >= 60) return 'high'
  if (score >= 40) return 'elevated'
  if (score >= 20) return 'guarded'
  return 'low'
}

export function createCampaignState(campaign: CampaignDefinition, mode: CampaignMode = 'timed'): CampaignState {
  const firstIncident = campaign.incidents[0]
  if (!firstIncident) throw new Error('A campaign must contain at least one incident')

  return {
    campaignId: campaign.id,
    currentIncidentIndex: 0,
    resolvedIncidentIds: [],
    companyHealth: 100,
    threatScore: 0,
    threatState: 'low',
    incidentStatus: 'active',
    remainingTimeSeconds: mode === 'untimed' ? Infinity : firstIncident.timeLimitSeconds,
    mode,
    containmentStreak: 0,
    campaignOutcome: 'in-progress',
    playerResponses: [],
  }
}

export function getCurrentIncident(campaign: CampaignDefinition, state: CampaignState): IncidentDefinition | undefined {
  return campaign.incidents[state.currentIncidentIndex]
}

export function isBossAvailable(campaign: CampaignDefinition, state: CampaignState): boolean {
  const bossIndex = campaign.incidents.findIndex((incident) => incident.isBoss)
  if (bossIndex < 0) return false
  return state.currentIncidentIndex === bossIndex && campaign.incidents
    .slice(0, bossIndex)
    .every((incident) => state.resolvedIncidentIds.includes(incident.id))
}

function isContained(incident: IncidentDefinition, classification: Classification, action: DefensiveAction): boolean {
  return incident.correctClassification === classification && incident.containmentActions.includes(action)
}

function getIncidentStatus(incident: IncidentDefinition, classification: Classification, action: DefensiveAction): IncidentStatus {
  if (isContained(incident, classification, action)) return 'contained'
  if (incident.correctClassification === classification) return 'weak'
  return 'missed'
}

export function resolveIncident(
  campaign: CampaignDefinition,
  state: CampaignState,
  response: Omit<PlayerResponse, 'incidentId' | 'status' | 'healthDelta' | 'threatDelta' | 'timedOut'>,
): CampaignState {
  const incident = getCurrentIncident(campaign, state)
  if (!incident || state.campaignOutcome !== 'in-progress' || state.incidentStatus !== 'active') return state
  if (state.resolvedIncidentIds.includes(incident.id)) return state

  const status = getIncidentStatus(incident, response.classification, response.action)
  const healthDelta = status === 'missed' || (incident.isBoss && status !== 'contained') ? -IMPACT_HEALTH[incident.impact] : 0
  const threatDelta = status === 'contained' ? -incident.threatReduction : status === 'weak' ? 5 : incident.threatImpact
  return applyResolution(campaign, state, incident, {
    ...response,
    incidentId: incident.id,
    status,
    healthDelta,
    threatDelta,
    timedOut: false,
  })
}

export function timeoutIncident(campaign: CampaignDefinition, state: CampaignState): CampaignState {
  const incident = getCurrentIncident(campaign, state)
  if (!incident || state.campaignOutcome !== 'in-progress' || state.incidentStatus !== 'active') return state
  if (state.resolvedIncidentIds.includes(incident.id)) return state

  return applyResolution(campaign, state, incident, {
    incidentId: incident.id,
    classification: incident.correctClassification,
    action: 'allow',
    status: 'timed-out',
    healthDelta: -IMPACT_HEALTH[incident.impact],
    threatDelta: incident.threatImpact,
    timedOut: true,
  })
}

function applyResolution(campaign: CampaignDefinition, state: CampaignState, incident: IncidentDefinition, response: PlayerResponse): CampaignState {
  const companyHealth = clamp(state.companyHealth + response.healthDelta)
  const threatScore = clamp(state.threatScore + response.threatDelta)
  const resolvedIncidentIds = [...state.resolvedIncidentIds, incident.id]
  const playerResponses = [...state.playerResponses, response]
  const lost = companyHealth <= 0 || threatScore >= THREAT_BREACH_THRESHOLD || (incident.isBoss && response.status !== 'contained')
  const lastIncident = state.currentIncidentIndex >= campaign.incidents.length - 1
  const won = !lost && lastIncident && incident.isBoss && threatScore < THREAT_WIN_THRESHOLD
  const campaignOutcome: CampaignOutcome = lost ? 'lost' : won ? 'won' : 'in-progress'
  const nextIndex = lastIncident ? state.currentIncidentIndex : state.currentIncidentIndex + 1
  const nextIncident = campaign.incidents[nextIndex]

  return {
    ...state,
    currentIncidentIndex: nextIndex,
    resolvedIncidentIds,
    companyHealth,
    threatScore,
    threatState: getThreatState(threatScore),
    incidentStatus: campaignOutcome === 'in-progress' ? 'active' : response.status,
    remainingTimeSeconds: campaignOutcome === 'in-progress' && nextIncident
      ? state.mode === 'untimed' ? Infinity : nextIncident.timeLimitSeconds
      : 0,
    containmentStreak: response.status === 'contained' ? state.containmentStreak + 1 : 0,
    campaignOutcome,
    playerResponses,
  }
}

export function getCampaignSummary(state: CampaignState) {
  const contained = state.playerResponses.filter((response) => response.status === 'contained').length
  const missed = state.playerResponses.filter((response) => response.status === 'missed' || response.status === 'timed-out').length
  return {
    outcome: state.campaignOutcome,
    companyHealth: state.companyHealth,
    threatScore: state.threatScore,
    threatState: state.threatState,
    incidentsContained: contained,
    incidentsMissed: missed,
    responseAccuracy: state.playerResponses.length === 0 ? 0 : Math.round((contained / state.playerResponses.length) * 100),
  }
}
