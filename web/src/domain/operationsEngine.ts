export type ServiceId = 'edge' | 'api' | 'payments' | 'database' | 'identity' | 'endpoints'
export type ToolId = 'metrics' | 'logs' | 'deployments' | 'identity' | 'processes' | 'network' | 'email'
export type ActionId = 'monitor' | 'scale' | 'restart' | 'block' | 'rollback' | 'isolate' | 'revoke'
export type RootCause = 'legitimate-load' | 'bad-deployment' | 'endpoint-compromise'
export type AlertSeverity = 'info' | 'warning' | 'critical'
export type OutcomeKind = 'optimal' | 'acceptable' | 'harmful' | 'timeout'

export type Finding = { id: string; label: string; value: string; detail: string }
export type InvestigationTool = { id: ToolId; label: string; finding: Finding }
export type TelemetrySeries = { label: string; value: string; tone: AlertSeverity; points: number[] }
export type OpsAction = { id: ActionId; label: string; consequence: string }
export type OpsIncident = {
  id: string
  title: string
  alert: string
  source: string
  affectedAsset: ServiceId
  severity: AlertSeverity
  rootCause: RootCause
  timeLimitSeconds: number
  telemetry: TelemetrySeries[]
  tools: InvestigationTool[]
  actions: OpsAction[]
  optimalAction: ActionId
  acceptableActions: ActionId[]
  harmfulActions: ActionId[]
  review: string
  events: string[]
}

export type ResolvedIncident = {
  incidentId: string
  action: ActionId
  outcome: OutcomeKind
  healthDelta: number
  scoreDelta: number
  evidenceBonus: number
  consequence: string
}

export type OpsState = {
  incidentIndex: number
  companyHealth: number
  score: number
  remainingSeconds: number
  inspectedTools: ToolId[]
  selectedAsset: ServiceId
  resolvedIncidents: ResolvedIncident[]
  incidentStatus: 'active' | 'review'
  shiftOutcome: 'in-progress' | 'complete' | 'failed'
  mode: 'timed' | 'untimed'
}

export const RULES = {
  startingHealth: 100,
  optimalScore: 700,
  acceptableScore: 350,
  evidencePoint: 75,
  maxEvidenceBonus: 225,
  fastResponseBonus: 100,
  optimalHealth: 4,
  acceptableHealth: -3,
  harmfulHealth: -22,
  timeoutHealth: -18,
  harmfulScore: -250,
  timeoutScore: -200,
} as const

export const incidents: OpsIncident[] = [
  {
    id: 'api-saturation', title: 'CPU saturation on API-02', alert: 'CPU 94% / checkout latency 780 ms', source: 'APM', affectedAsset: 'api', severity: 'warning', rootCause: 'legitimate-load', timeLimitSeconds: 90,
    telemetry: [
      { label: 'CPU / API-02', value: '94%', tone: 'critical', points: [34, 41, 53, 66, 82, 94] },
      { label: 'Requests / min', value: '8,420', tone: 'warning', points: [2100, 2800, 3900, 5100, 6900, 8420] },
      { label: 'Checkout success', value: '98.7%', tone: 'info', points: [98, 98, 99, 99, 98, 99] },
    ],
    tools: [
      { id: 'metrics', label: 'Metrics', finding: { id: 'load-correlation', label: 'Volume correlation', value: '+301% requests / +287% sales', detail: 'CPU rose with successful customer requests. Error rate remains 1.3%.' } },
      { id: 'deployments', label: 'Deployments', finding: { id: 'no-release', label: 'Release history', value: 'No deployment in 18 hours', detail: 'API-02 is running the same release as healthy peers.' } },
      { id: 'network', label: 'Network', finding: { id: 'clean-traffic', label: 'Traffic profile', value: 'Campaign referrals / broad customer mix', detail: 'No exploit signature or concentrated source. Marketing campaign began at 09:00.' } },
    ],
    actions: [
      { id: 'monitor', label: 'Continue monitoring', consequence: 'Keep current capacity while collecting another sample.' },
      { id: 'scale', label: 'Scale API capacity', consequence: 'Add two API workers behind the load balancer.' },
      { id: 'restart', label: 'Restart API-02', consequence: 'Remove one worker temporarily and clear volatile state.' },
      { id: 'block', label: 'Block source ranges', consequence: 'Drop the highest-volume customer networks.' },
    ], optimalAction: 'scale', acceptableActions: ['monitor'], harmfulActions: ['restart', 'block'],
    review: 'A marketing-driven traffic surge saturated capacity. Successful checkouts rose with request volume; scaling protected availability without blocking customers.',
    events: ['09:04 Backup completed / DB-01', '09:06 Campaign referrals rising', '09:07 API-02 CPU above threshold', '09:08 Checkout latency increasing'],
  },
  {
    id: 'payment-failure', title: 'Payment health check failed', alert: 'HTTP 503 increasing / 12 checkouts failed', source: 'Service monitor', affectedAsset: 'payments', severity: 'critical', rootCause: 'bad-deployment', timeLimitSeconds: 90,
    telemetry: [
      { label: 'HTTP 503 rate', value: '67%', tone: 'critical', points: [1, 1, 2, 4, 41, 67] },
      { label: 'Payment latency', value: '2.8 s', tone: 'critical', points: [220, 230, 215, 240, 1700, 2800] },
      { label: 'Host reachability', value: '100%', tone: 'info', points: [100, 100, 100, 100, 100, 100] },
    ],
    tools: [
      { id: 'logs', label: 'Logs', finding: { id: 'config-error', label: 'Application exception', value: 'PAYMENTS_REGION is undefined', detail: 'Health checks fail during configuration initialization.' } },
      { id: 'deployments', label: 'Deployments', finding: { id: 'release-time', label: 'payments-v2.14.1', value: 'Completed 6 seconds before failure', detail: 'The previous release used a different production configuration key.' } },
      { id: 'identity', label: 'Identity', finding: { id: 'normal-admin', label: 'Administrative access', value: 'No unusual authentication', detail: 'Release used the expected CI service identity from the normal network.' } },
    ],
    actions: [
      { id: 'monitor', label: 'Continue monitoring', consequence: 'Leave the failing release serving requests.' },
      { id: 'restart', label: 'Restart payment service', consequence: 'Restart the same release and configuration.' },
      { id: 'rollback', label: 'Roll back deployment', consequence: 'Restore the last known-good release.' },
      { id: 'isolate', label: 'Isolate payment service', consequence: 'Remove payments from the production network.' },
    ], optimalAction: 'rollback', acceptableActions: ['restart'], harmfulActions: ['monitor', 'isolate'],
    review: 'Release v2.14.1 referenced a missing production configuration value. Rolling back restored checkout; a restart alone would reload the same faulty configuration.',
    events: ['10:21 Certificate check passed', '10:23 Deployment payments-v2.14.1 completed', '10:23 Health check failed / PAY-01', '10:24 Checkout failures increasing'],
  },
  {
    id: 'finance-compromise', title: 'Identity and endpoint anomaly', alert: 'Impossible travel / encoded PowerShell', source: 'Identity + EDR', affectedAsset: 'endpoints', severity: 'critical', rootCause: 'endpoint-compromise', timeLimitSeconds: 75,
    telemetry: [
      { label: 'New sessions', value: '2', tone: 'warning', points: [0, 0, 1, 1, 1, 2] },
      { label: 'Endpoint detections', value: '3', tone: 'critical', points: [0, 0, 0, 1, 2, 3] },
      { label: 'Core service health', value: '99.9%', tone: 'info', points: [100, 100, 100, 99, 100, 100] },
    ],
    tools: [
      { id: 'identity', label: 'Identity', finding: { id: 'travel', label: 'New session / Frankfurt', value: '4 minutes after local MFA approval', detail: 'The finance user remains active from Karachi. Session geography is impossible in the interval.' } },
      { id: 'processes', label: 'Processes', finding: { id: 'powershell', label: 'Encoded PowerShell / FIN-WS-14', value: 'OUTLOOK.EXE -> powershell.exe -enc', detail: 'The process opened an outbound connection immediately after launch.' } },
      { id: 'email', label: 'Email trace', finding: { id: 'payroll-mail', label: 'Payroll adjustment message', value: 'Attachment opened at 11:42', detail: 'Fictional external sender used a look-alike payroll display name.' } },
      { id: 'network', label: 'Network', finding: { id: 'endpoint-only', label: 'Activity scope', value: 'Concentrated on FIN-WS-14', detail: 'Application and database telemetry remain within baseline.' } },
    ],
    actions: [
      { id: 'monitor', label: 'Continue monitoring', consequence: 'Leave the endpoint and identity session active.' },
      { id: 'restart', label: 'Restart workstation', consequence: 'Interrupt activity but lose volatile evidence.' },
      { id: 'isolate', label: 'Isolate FIN-WS-14', consequence: 'Cut endpoint network access while retaining evidence.' },
      { id: 'revoke', label: 'Revoke identity sessions', consequence: 'End active sessions without containing the endpoint.' },
      { id: 'block', label: 'Block source IP', consequence: 'Block one observed address; other access paths remain.' },
    ], optimalAction: 'isolate', acceptableActions: ['revoke'], harmfulActions: ['monitor', 'restart', 'block'],
    review: 'A payroll-themed message led to execution on FIN-WS-14 and a stolen session. Endpoint isolation was the best immediate containment; session revocation is useful but incomplete alone.',
    events: ['11:38 Two failed VPN logins / within baseline', '11:41 MFA approved / finance user', '11:42 New session / Frankfurt', '11:43 Encoded PowerShell / FIN-WS-14'],
  },
]

export function createOpsState(mode: OpsState['mode'] = 'timed'): OpsState {
  return { incidentIndex: 0, companyHealth: RULES.startingHealth, score: 0, remainingSeconds: mode === 'timed' ? incidents[0].timeLimitSeconds : Infinity, inspectedTools: [], selectedAsset: incidents[0].affectedAsset, resolvedIncidents: [], incidentStatus: 'active', shiftOutcome: 'in-progress', mode }
}

export function inspectTool(state: OpsState, tool: ToolId): OpsState {
  if (state.incidentStatus !== 'active' || state.inspectedTools.includes(tool)) return state
  if (!incidents[state.incidentIndex]?.tools.some((item) => item.id === tool)) return state
  return { ...state, inspectedTools: [...state.inspectedTools, tool] }
}

export function selectAsset(state: OpsState, asset: ServiceId): OpsState { return { ...state, selectedAsset: asset } }
const clamp = (value: number) => Math.max(0, Math.min(100, value))

export function resolveAction(state: OpsState, action: ActionId, timedOut = false): OpsState {
  const incident = incidents[state.incidentIndex]
  if (!incident || state.incidentStatus !== 'active' || state.shiftOutcome !== 'in-progress' || state.resolvedIncidents.some((item) => item.incidentId === incident.id)) return state
  const outcome: OutcomeKind = timedOut ? 'timeout' : action === incident.optimalAction ? 'optimal' : incident.acceptableActions.includes(action) ? 'acceptable' : 'harmful'
  const evidenceBonus = Math.min(state.inspectedTools.length * RULES.evidencePoint, RULES.maxEvidenceBonus)
  const fastBonus = state.mode === 'timed' && state.remainingSeconds >= incident.timeLimitSeconds / 2 && outcome === 'optimal' ? RULES.fastResponseBonus : 0
  const healthDelta = outcome === 'optimal' ? RULES.optimalHealth : outcome === 'acceptable' ? RULES.acceptableHealth : outcome === 'timeout' ? RULES.timeoutHealth : RULES.harmfulHealth
  const scoreDelta = (outcome === 'optimal' ? RULES.optimalScore : outcome === 'acceptable' ? RULES.acceptableScore : outcome === 'timeout' ? RULES.timeoutScore : RULES.harmfulScore) + evidenceBonus + fastBonus
  const selected = incident.actions.find((item) => item.id === action)
  const resolution: ResolvedIncident = { incidentId: incident.id, action, outcome, healthDelta, scoreDelta, evidenceBonus, consequence: timedOut ? 'Decision window expired. The condition continued without intervention.' : selected?.consequence ?? 'No action recorded.' }
  return { ...state, companyHealth: clamp(state.companyHealth + healthDelta), score: state.score + scoreDelta, resolvedIncidents: [...state.resolvedIncidents, resolution], incidentStatus: 'review', remainingSeconds: 0 }
}

export function advanceIncident(state: OpsState): OpsState {
  if (state.incidentStatus !== 'review') return state
  const nextIndex = state.incidentIndex + 1
  if (nextIndex >= incidents.length) return { ...state, shiftOutcome: state.companyHealth > 0 ? 'complete' : 'failed' }
  const next = incidents[nextIndex]
  return { ...state, incidentIndex: nextIndex, remainingSeconds: state.mode === 'timed' ? next.timeLimitSeconds : Infinity, inspectedTools: [], selectedAsset: next.affectedAsset, incidentStatus: 'active', shiftOutcome: state.companyHealth > 0 ? 'in-progress' : 'failed' }
}

export function tick(state: OpsState, seconds = 1): OpsState {
  if (state.mode === 'untimed' || state.incidentStatus !== 'active' || seconds <= 0) return state
  if (state.remainingSeconds <= seconds) return resolveAction(state, 'monitor', true)
  return { ...state, remainingSeconds: state.remainingSeconds - seconds }
}
