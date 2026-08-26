import { useState } from 'react'
import { scenarios, type Scenario } from './content/scenarioSchema'
import { scoreAnswer, selectScenario, type Classification } from './domain/gameRules'
import './App.css'

function App() {
  const [difficulty, setDifficulty] = useState('guided')
  const [currentScenario, setCurrentScenario] = useState<Scenario>()
  const [expandedEvidence, setExpandedEvidence] = useState<string[]>([])
  const [answer, setAnswer] = useState<Classification>()
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [completedIds, setCompletedIds] = useState<string[]>([])

  const startTraining = () => {
    setCurrentScenario(selectScenario(scenarios, [], difficulty))
    setExpandedEvidence([])
    setAnswer(undefined)
    setScore(0)
    setStreak(0)
    setCompletedIds([])
  }

  const submitAnswer = (classification: Classification) => {
    if (!currentScenario || answer) return
    const result = scoreAnswer(currentScenario, classification, streak)
    setAnswer(classification)
    setScore((currentScore) => currentScore + result.score)
    setStreak(result.nextStreak)
    setCompletedIds((ids) => [...ids, currentScenario.id])
  }

  const continueTraining = () => {
    const nextScenario = selectScenario(scenarios, completedIds, difficulty)
    setCurrentScenario(nextScenario)
    setExpandedEvidence([])
    setAnswer(undefined)
  }

  if (currentScenario) {
    const result = answer ? scoreAnswer(currentScenario, answer, Math.max(0, streak - (answer === currentScenario.correctClassification ? 1 : 0))) : undefined
    return (
      <div className="app-shell">
        <header className="topbar"><a className="wordmark" href="/" onClick={(event) => { event.preventDefault(); setCurrentScenario(undefined) }}><span className="wordmark-mark" aria-hidden="true">PS</span><span>PhishShield</span></a><span className="status-label"><span aria-hidden="true" /> Training session / {difficulty}</span></header>
        <main className="training-main">
          <div className="training-header"><p className="eyebrow">Scenario {completedIds.length} of 6 <span>{score} points</span></p><p className="streak-label">{streak > 0 ? `${streak} in a row` : 'Build your streak'}</p></div>
          <section className="scenario-layout" aria-labelledby="scenario-title">
            <article className="message-card">
              <div className="message-topline"><span>{currentScenario.channel.replace('-', ' ')}</span><span className="message-dot" aria-hidden="true">•</span><span>Training example</span></div>
              <h1 id="scenario-title">{currentScenario.title}</h1>
              <dl className="message-meta"><div><dt>From</dt><dd>{currentScenario.sender}</dd></div>{currentScenario.subject && <div><dt>Subject</dt><dd>{currentScenario.subject}</dd></div>}</dl>
              <p className="message-body">{currentScenario.content}</p>
              <p className="message-safe-note">This is a fictional training message. Do not follow links or scan codes from scenarios.</p>
            </article>
            <aside className="evidence-panel" aria-labelledby="evidence-title">
              <p className="eyebrow">Investigation desk</p><h2 id="evidence-title">Inspect the evidence</h2><p className="evidence-intro">Open the details that help you decide. A clue is not always proof on its own.</p>
              <div className="evidence-list">{currentScenario.evidence.map((evidence) => { const open = expandedEvidence.includes(evidence.label); return <div className={`evidence-item ${open ? 'open' : ''}`} key={evidence.label}><button type="button" aria-expanded={open} onClick={() => setExpandedEvidence((items) => open ? items.filter((item) => item !== evidence.label) : [...items, evidence.label])}><span>{evidence.label}</span><span aria-hidden="true">{open ? '−' : '+'}</span></button>{open && <div className="evidence-detail"><strong>{evidence.value}</strong><p>{evidence.explanation}</p></div>}</div> })}</div>
            </aside>
          </section>
          {!answer ? <section className="decision-area" aria-labelledby="decision-title"><p className="eyebrow">Your call</p><h2 id="decision-title">What would you do next?</h2><div className="decision-buttons"><button type="button" onClick={() => submitAnswer('safe')}>Trust / safe</button><button type="button" onClick={() => submitAnswer('suspicious')}>Pause / suspicious</button><button type="button" onClick={() => submitAnswer('phishing')}>Report / phishing</button></div></section> : <section className={`feedback-panel ${result?.correct ? 'correct' : 'incorrect'}`} aria-live="polite" aria-labelledby="feedback-title"><p className="eyebrow">Debrief</p><h2 id="feedback-title">{result?.correct ? 'Good call.' : 'Worth a closer look.'}</h2><p className="feedback-verdict">The safest classification was <strong>{currentScenario.correctClassification}</strong>.</p><p>{currentScenario.explanation}</p><div className="feedback-columns"><div><span>Next best action</span><p>{currentScenario.safeAction}</p></div><div><span>Learning objective</span><p>{currentScenario.objective}</p></div></div><button className="start-button next-button" type="button" onClick={continueTraining}>Next scenario <span aria-hidden="true">→</span></button></section>}
        </main>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="/" aria-label="PhishShield home">
          <span className="wordmark-mark" aria-hidden="true">PS</span>
          <span>PhishShield</span>
        </a>
        <span className="status-label"><span aria-hidden="true" /> Training room / local only</span>
      </header>

      <main>
        <section className="intro" aria-labelledby="page-title">
          <div className="intro-copy">
            <p className="eyebrow">Cyber awareness practice <span>01 / 04</span></p>
            <h1 id="page-title">Pause. Inspect.<br /><em>Then decide.</em></h1>
            <p className="lede">PhishShield helps you build the habit of reading messages with care. Study the evidence, spot the pressure tactics, and choose the safest next step.</p>
            <div className="intro-meta">
              <span><strong>12</strong> scenarios</span>
              <span><strong>5</strong> channels</span>
              <span><strong>10 min</strong> average session</span>
            </div>
          </div>

          <aside className="setup-panel" aria-labelledby="setup-title">
            <div className="panel-kicker"><span>Start a session</span><span className="panel-number">A</span></div>
            <h2 id="setup-title">Choose your pace</h2>
            <p className="panel-description">You can change this later. Every mode explains the evidence after each decision.</p>
            <fieldset className="mode-list">
              <legend className="sr-only">Training difficulty</legend>
              <label className={difficulty === 'guided' ? 'mode selected' : 'mode'}>
                <input type="radio" name="difficulty" value="guided" checked={difficulty === 'guided'} onChange={(event) => setDifficulty(event.target.value)} />
                <span className="mode-copy"><strong>Guided review</strong><small>Clear signals and helpful prompts</small></span>
                <span className="mode-mark" aria-hidden="true">{difficulty === 'guided' ? '●' : '○'}</span>
              </label>
              <label className={difficulty === 'practice' ? 'mode selected' : 'mode'}>
                <input type="radio" name="difficulty" value="practice" checked={difficulty === 'practice'} onChange={(event) => setDifficulty(event.target.value)} />
                <span className="mode-copy"><strong>Independent practice</strong><small>Fewer prompts, more context to weigh</small></span>
                <span className="mode-mark" aria-hidden="true">{difficulty === 'practice' ? '●' : '○'}</span>
              </label>
              <label className={difficulty === 'challenge' ? 'mode selected' : 'mode'}>
                <input type="radio" name="difficulty" value="challenge" checked={difficulty === 'challenge'} onChange={(event) => setDifficulty(event.target.value)} />
                <span className="mode-copy"><strong>Challenge desk</strong><small>Subtle signals and ambiguous situations</small></span>
                <span className="mode-mark" aria-hidden="true">{difficulty === 'challenge' ? '●' : '○'}</span>
              </label>
            </fieldset>
            <button className="start-button" type="button" onClick={startTraining}>Start training <span aria-hidden="true">↗</span></button>
            <p className="privacy-note"><span aria-hidden="true">◌</span> Progress stays in this browser. No account required.</p>
          </aside>
        </section>

        <section className="principles" aria-labelledby="principles-title">
          <div className="section-heading"><p className="eyebrow">The method</p><h2 id="principles-title">Good instincts are built<br />one message at a time.</h2></div>
          <div className="principle-grid">
            <article><span className="principle-number">01</span><h3>Look past the display name</h3><p>A familiar logo or name can be copied. The real sender and destination tell you more.</p></article>
            <article><span className="principle-number">02</span><h3>Notice the pressure</h3><p>Urgency, authority, and fear are often used to rush a decision before you can verify it.</p></article>
            <article><span className="principle-number">03</span><h3>Verify out of band</h3><p>When a request matters, use a trusted channel you find yourself instead of the message link.</p></article>
          </div>
        </section>
      </main>

      <footer><span>PhishShield Cyber Awareness Game</span><span>Built for careful decisions, not perfect guesses.</span></footer>
    </div>
  )
}

export default App
