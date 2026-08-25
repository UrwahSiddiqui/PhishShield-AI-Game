import { useState } from 'react'
import './App.css'

function App() {
  const [difficulty, setDifficulty] = useState('guided')

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
            <button className="start-button" type="button">Start training <span aria-hidden="true">↗</span></button>
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
