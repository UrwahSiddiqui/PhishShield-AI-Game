import { useEffect, useState } from 'react'
import './App.css'
import { scenarios, type Scenario } from './content/scenarioSchema'
import { northstarCampaign } from './domain/campaign'
import {
  advanceIncidentTime,
  createCampaignState,
  getCampaignSummary,
  getCurrentIncident,
  resolveIncident,
  type CampaignMode,
  type CampaignState,
  type Classification,
  type DefensiveAction,
} from './domain/campaignEngine'
import { clearCampaignState, readCampaignState, writeCampaignState } from './storage/progressStore'

const classificationLabels: Record<Classification, string> = {
  safe: 'Safe',
  suspicious: 'Suspicious',
  phishing: 'Phishing',
}

const actionLabels: Record<DefensiveAction, string> = {
  allow: 'Allow message',
  quarantine: 'Quarantine',
  report: 'Report phishing',
  verify: 'Verify through trusted channel',
  block: 'Block sender / domain',
  escalate: 'Escalate to security',
}

function App() {
  const [mode, setMode] = useState<CampaignMode>('untimed')
  const [campaignState, setCampaignState] = useState<CampaignState | undefined>(() => readCampaignState())
  const [expandedEvidence, setExpandedEvidence] = useState<string[]>([])
  const [lastResponse, setLastResponse] = useState<CampaignState>()

  useEffect(() => {
    if (campaignState) writeCampaignState(campaignState)
  }, [campaignState])

  useEffect(() => {
    if (!campaignState || campaignState.mode === 'untimed' || campaignState.incidentStatus !== 'active' || lastResponse) return
    const interval = window.setInterval(() => {
      if (document.hidden) return
      setCampaignState((state) => {
        if (!state) return state
        const nextState = advanceIncidentTime(northstarCampaign, state, 1)
        if (nextState.playerResponses.length > state.playerResponses.length) setLastResponse(nextState)
        return nextState
      })
    }, 1000)
    return () => window.clearInterval(interval)
  }, [campaignState, lastResponse])

  const startCampaign = () => {
    clearCampaignState()
    setCampaignState(createCampaignState(northstarCampaign, mode))
    setLastResponse(undefined)
    setExpandedEvidence([])
  }

  const resolve = (classification: Classification, action: DefensiveAction) => {
    if (!campaignState || campaignState.incidentStatus !== 'active') return
    const nextState = resolveIncident(northstarCampaign, campaignState, { classification, action })
    setCampaignState(nextState)
    setLastResponse(nextState)
    setExpandedEvidence([])
  }

  if (!campaignState) return <Briefing mode={mode} setMode={setMode} onStart={startCampaign} />
  if (lastResponse) return <IncidentReport state={lastResponse} onContinue={() => setLastResponse(undefined)} />
  if (campaignState.campaignOutcome !== 'in-progress') return <CampaignSummary state={campaignState} onReplay={startCampaign} />

  const incident = getCurrentIncident(northstarCampaign, campaignState)
  const scenario = scenarios.find((item) => item.id === incident?.scenarioId)
  if (!incident || !scenario) return <main className="error-state"><h1>Campaign unavailable</h1><p>The training campaign could not load its current incident.</p></main>

  return <Workspace state={campaignState} scenario={scenario} incidentId={incident.id} expandedEvidence={expandedEvidence} setExpandedEvidence={setExpandedEvidence} onResolve={resolve} />
}

type BriefingProps = { mode: CampaignMode; setMode: (mode: CampaignMode) => void; onStart: () => void }
function Briefing({ mode, setMode, onStart }: BriefingProps) {
  return <div className="app-shell"><header className="topbar"><a className="wordmark" href="/" aria-label="PhishShield home"><span className="wordmark-mark" aria-hidden="true">PS</span><span>PhishShield</span></a><span className="status-label"><span aria-hidden="true" /> Defender station / local only</span></header><main className="briefing"><div className="briefing-copy"><p className="eyebrow">Northstar Systems / shift handoff</p><h1>Monday morning.<br /><em>Campaign active.</em></h1><p className="lede">At 08:42, suspicious messages began reaching employees across the company. You are the defender on duty. Investigate the incidents, contain the campaign, and keep operations moving.</p><div className="briefing-facts"><span><strong>05</strong> connected incidents</span><span><strong>01</strong> boss incident</span><span><strong>100</strong> starting health</span></div></div><section className="briefing-panel" aria-labelledby="briefing-title"><p className="panel-kicker">Campaign briefing <span>01</span></p><h2 id="briefing-title">Choose your response mode</h2><p className="panel-description">The campaign is designed for careful investigation. Untimed mode is available for accessibility and training.</p><div className="mode-list"><label className={mode === 'untimed' ? 'mode selected' : 'mode'}><input type="radio" name="mode" checked={mode === 'untimed'} onChange={() => setMode('untimed')} /><span className="mode-copy"><strong>Untimed investigation</strong><small>Study each incident without timeout pressure</small></span><span className="mode-mark" aria-hidden="true">{mode === 'untimed' ? '●' : '○'}</span></label><label className={mode === 'timed' ? 'mode selected' : 'mode'}><input type="radio" name="mode" checked={mode === 'timed'} onChange={() => setMode('timed')} /><span className="mode-copy"><strong>Live response</strong><small>Incident clocks create realistic operational pressure</small></span><span className="mode-mark" aria-hidden="true">{mode === 'timed' ? '●' : '○'}</span></label></div><button className="primary-button" type="button" onClick={onStart}>Take the shift <span aria-hidden="true">↗</span></button><p className="privacy-note">Training data stays in this browser. No account or live links required.</p></section></main><footer><span>PhishShield Cyber Awareness Game</span><span>Fictional company / educational simulation</span></footer></div>
}

type WorkspaceProps = { state: CampaignState; scenario: Scenario; incidentId: string; expandedEvidence: string[]; setExpandedEvidence: (items: string[]) => void; onResolve: (classification: Classification, action: DefensiveAction) => void }
function Workspace({ state, scenario, incidentId, expandedEvidence, setExpandedEvidence, onResolve }: WorkspaceProps) {
  const incident = northstarCampaign.incidents.find((item) => item.id === incidentId)!
  const [classification, setClassification] = useState<Classification>()
  const chooseAction = (action: DefensiveAction) => { if (classification) onResolve(classification, action) }
  return <div className="app-shell"><header className="command-bar"><a className="wordmark" href="/" aria-label="Return to briefing"><span className="wordmark-mark" aria-hidden="true">PS</span><span>PhishShield</span></a><div className="campaign-name"><span>Active campaign</span><strong>{northstarCampaign.name}</strong></div><Metric label="Company health" value={`${state.companyHealth}%`} tone={state.companyHealth < 50 ? 'danger' : 'safe'} /><Metric label={`Threat / ${state.threatState}`} value={`${state.threatScore}%`} tone={state.threatScore >= 60 ? 'danger' : 'warn'} /><div className={`timer-metric ${state.mode === 'timed' && state.remainingTimeSeconds <= 15 ? 'timer-warning' : ''}`} aria-live="polite"><span>Response window</span><strong>{state.mode === 'untimed' ? 'No timeout' : `${state.remainingTimeSeconds}s`}</strong></div></header><main className="operations"><div className="operations-heading"><div><p className="eyebrow">Defender station / incident {state.currentIncidentIndex + 1}</p><h1>Investigate and contain.</h1></div><span className="mode-chip">{state.mode === 'untimed' ? 'Untimed training' : 'Live response'}</span></div><div className="queue" aria-label="Campaign incident queue">{northstarCampaign.incidents.map((item, index) => <div className={`queue-item ${index === state.currentIncidentIndex ? 'active' : ''} ${item.isBoss ? 'boss' : ''}`} key={item.id}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.isBoss ? 'Boss incident' : `Stage ${item.stage}`}</strong><small>{state.resolvedIncidentIds.includes(item.id) ? 'Resolved' : index === state.currentIncidentIndex ? 'In review' : 'Queued'}</small></div>)}</div><section className="incident-layout" aria-labelledby="incident-title"><article className="message-card"><div className="message-topline"><span>{scenario.channel.replace('-', ' ')}</span><span className="message-dot" aria-hidden="true">•</span><span>{incident.isBoss ? 'High-impact incident' : 'Inbound report'}</span></div><h2 id="incident-title">{scenario.title}</h2><dl className="message-meta"><div><dt>From</dt><dd>{scenario.sender}</dd></div>{scenario.subject && <div><dt>Subject</dt><dd>{scenario.subject}</dd></div>}</dl><p className="message-body">{scenario.content}</p><p className="message-safe-note">Fictional training message. Do not follow links or scan codes from scenarios.</p></article><aside className="evidence-panel" aria-labelledby="evidence-title"><p className="eyebrow">Evidence tools</p><h2 id="evidence-title">Inspect before responding</h2><p className="evidence-intro">Observable details inform your response. Inspection has no operational cost.</p><div className="evidence-list">{scenario.evidence.map((evidence) => { const open = expandedEvidence.includes(evidence.label); return <div className="evidence-item" key={evidence.label}><button type="button" aria-expanded={open} onClick={() => setExpandedEvidence(open ? expandedEvidence.filter((item) => item !== evidence.label) : [...expandedEvidence, evidence.label])}><span>{evidence.label}</span><span aria-hidden="true">{open ? '−' : '+'}</span></button>{open && <div className="evidence-detail"><strong>{evidence.value}</strong><p>{evidence.explanation}</p></div>}</div> })}</div></aside></section><section className="response-area" aria-labelledby="response-title"><div><p className="eyebrow">Operational response</p><h2 id="response-title">Classify, then contain.</h2><p className="response-help">First classify the message. Then choose the action that best limits its impact.</p><div className="classification-list">{(['safe', 'suspicious', 'phishing'] as Classification[]).map((item) => <button type="button" className={`classification-button ${classification === item ? 'selected' : ''}`} aria-pressed={classification === item} key={item} onClick={() => setClassification(item)}>{classificationLabels[item]}</button>)}</div></div><div className="response-grid">{incident.containmentActions.map((action) => <button type="button" className="response-button" disabled={!classification} key={action} onClick={() => chooseAction(action)}><strong>{actionLabels[action]}</strong><small>{action === 'verify' ? 'Use a known channel to confirm the request' : action === 'report' ? 'Send the message to the security team' : action === 'block' ? 'Stop further messages from this source' : 'Escalate the risk for coordinated response'}</small></button>)}<button type="button" className="response-button secondary" onClick={() => onResolve('safe', 'allow')}><strong>Allow / no action</strong><small>Leave the message available to the recipient</small></button></div></section></main></div>
}

function Metric({ label, value, tone }: { label: string; value: string; tone: string }) { return <div className={`metric ${tone}`}><span>{label}</span><strong>{value}</strong></div> }
function IncidentReport({ state, onContinue }: { state: CampaignState; onContinue: () => void }) { const response = state.playerResponses[state.playerResponses.length - 1]; const incident = northstarCampaign.incidents.find((item) => item.id === response.incidentId)!; const scenario = scenarios.find((item) => item.id === incident.scenarioId)!; const contained = response.status === 'contained'; return <div className="app-shell"><header className="command-bar"><a className="wordmark" href="/" aria-label="Return to briefing"><span className="wordmark-mark" aria-hidden="true">PS</span><span>PhishShield</span></a><div className="campaign-name"><span>Incident report</span><strong>{incident.isBoss ? 'Boss incident' : `Stage ${incident.stage} resolved`}</strong></div><Metric label="Company health" value={`${state.companyHealth}%`} tone={state.companyHealth < 50 ? 'danger' : 'safe'} /><Metric label={`Threat / ${state.threatState}`} value={`${state.threatScore}%`} tone={state.threatScore >= 60 ? 'danger' : 'warn'} /></header><main className="report-page"><p className="eyebrow">Operational debrief / {response.status}</p><h1>{contained ? 'Incident contained.' : 'Campaign pressure increased.'}</h1><p className="report-lede">{contained ? 'Your response disrupted this stage of the campaign.' : 'The response left an opening for the campaign to continue.'}</p><div className="impact-row"><div><span>Company health change</span><strong>{response.healthDelta > 0 ? '+' : ''}{response.healthDelta}%</strong></div><div><span>Threat momentum change</span><strong>{response.threatDelta > 0 ? '+' : ''}{response.threatDelta}%</strong></div><div><span>Evidence that mattered</span><strong>{scenario.tags[0]}</strong></div></div><section className="report-copy"><div><p className="eyebrow">Why this mattered</p><p>{scenario.explanation}</p></div><div><p className="eyebrow">Safest real-world action</p><p>{scenario.safeAction}</p></div></section><button className="primary-button next-button" type="button" onClick={onContinue}>{state.currentIncidentIndex >= northstarCampaign.incidents.length ? 'View campaign result' : 'Return to queue'} <span aria-hidden="true">→</span></button></main></div> }
function CampaignSummary({ state, onReplay }: { state: CampaignState; onReplay: () => void }) { const summary = getCampaignSummary(state); return <div className="app-shell"><header className="topbar"><a className="wordmark" href="/" aria-label="PhishShield home"><span className="wordmark-mark" aria-hidden="true">PS</span><span>PhishShield</span></a><span className="status-label"><span aria-hidden="true" /> Campaign closed</span></header><main className="summary-page"><p className="eyebrow">Northstar Systems / campaign result</p><h1>{summary.outcome === 'won' ? 'Operations held.' : 'The campaign broke through.'}</h1><p className="report-lede">{summary.outcome === 'won' ? 'You contained the final incident and kept the campaign below breach level.' : 'Review where the campaign gained momentum, then replay to practise the weak point.'}</p><div className="summary-grid"><Metric label="Company health" value={`${summary.companyHealth}%`} tone={summary.companyHealth < 50 ? 'danger' : 'safe'} /><Metric label="Final threat" value={`${summary.threatScore}%`} tone={summary.threatScore >= 60 ? 'danger' : 'warn'} /><Metric label="Incidents contained" value={`${summary.incidentsContained}`} tone="safe" /><Metric label="Response accuracy" value={`${summary.responseAccuracy}%`} tone="safe" /></div><section className="summary-lessons"><p className="eyebrow">Defender notes</p><h2>Every decision leaves a trace.</h2><p>Strong phishing defence combines evidence, context, and verification. A familiar name is not identity, urgency is not authority, and a safe response protects the wider company.</p></section><button className="primary-button next-button" type="button" onClick={onReplay}>Replay campaign <span aria-hidden="true">↗</span></button></main></div> }

export default App
