# Architecture

## Existing Architecture Assessment

The statements in this section are verified from repository source, tracked files, and visible commit history reviewed on 2026-08-26. They describe the legacy prototype only.

The repository is a Python/Pygame prototype with a top-level event loop in `main.py`. That path creates a fixed `800x600` window, instantiates `game.game_logic.GameLogic`, and renders through `ui.game_screen.GameScreen`. `GameLogic` owns a dataclass named `GameState`, attack generation, damage calculation, resource changes, and a defense list.

There is a second controller in `game/game.py` named `PhishShieldGame`. It imports `AttackSystem` and `DefenseSystem`, but the visible source defines neither class; it is therefore not a runnable alternative path. It also carries a separate node-based state model. The repository consequently has duplicated concepts and unclear ownership.

The current attack path uses `random.choices`, random damage, and random evasion. `AIPoweredAttack` is a label and a different attack type, not evidence of a trained or adaptive model. `transformers` and `spacy` appear in `requirements.txt` but are not imported by the visible Python source. `EducationSystem`, `HintSystem`, `CardDeck`, and most assets are not connected to the live `main.py` path. The UI uses text-heavy fixed coordinates and mouse/keyboard shortcuts rather than semantic controls. There is no test suite, no `.gitignore`, and generated `__pycache__` files are tracked.

## Proposed Architecture

Use a static Vite React + TypeScript application with a small typed domain layer. GitHub Pages is the approved deployment target. Keep presentation, content, rules, persistence, and adaptive selection separate:

```text
Browser UI
  -> React screens and accessible components
  -> application session controller
  -> typed domain rules and adaptive selector
  -> curated JSON content + runtime schema validation
  -> versioned localStorage adapter
```

The MVP has no application server and no database server. The browser owns a session and stores only local progress. This makes the demo easy to deploy and keeps privacy risk small.

## Application and User Flows

### First visit

1. Load the app shell and validate the bundled scenario dataset.
2. Show the purpose, privacy note, and start action.
3. Create a new session or restore valid local progress.

### Scenario loop

1. Select a scenario using difficulty, unseen content, and adaptive category weights.
2. Render a communication artifact and its available evidence.
3. Let the player inspect evidence and choose an action.
4. Score the answer exactly once.
5. Show red flags, rationale, safer action, and an optional related lesson.
6. Update streak, category outcomes, and local progress.
7. Continue, or open the session summary at the configured end point.

### Summary flow

Show score, accuracy, streak, category strengths and practice areas, takeaways, and a replay/reset action. Avoid language that presents the result as a professional security certification.

## Components and Responsibilities

- `AppShell`: route-level layout, skip link, landmarks, global status handling.
- `StartScreen`: purpose, privacy note, new/resume controls.
- `ScenarioScreen`: current artifact, decision actions, progress, and evidence controls.
- `EvidencePanel`: keyboard-accessible disclosure for sender, domain, links, urgency, and attachments.
- `FeedbackPanel`: correctness, red-flag explanations, safer next step, and hint context.
- `SummaryScreen`: aggregate session results and takeaways.
- `ProgressHeader`: step, score, streak, and accuracy in text plus accessible status.
- `ScenarioRenderer`: type-specific presentation for email, SMS, QR, login, and social engineering.
- `gameRules`: pure scoring, streak, category, and progression functions.
- `adaptiveSelector`: deterministic selection using documented mistake weights and a seeded/random source boundary.
- `scenarioSchema`: runtime validation for JSON content.
- `progressStore`: versioned localStorage read/write/reset with corruption recovery.

## Data Model

The MVP uses no remote database. The conceptual records are:

- `Scenario`: `id`, `version`, `type`, `difficulty`, `category`, `context`, `artifact`, `evidence[]`, `actions[]`, `correctAction`, `redFlags[]`, `debrief`, and `reviewStatus`.
- `Evidence`: stable `id`, label, value, risk category, and explanation. Values are rendered as inert text or safe links.
- `SessionState`: dataset version, current index, selected scenario IDs, answers, score, streak, category outcomes, and timestamps.
- `ProgressSnapshot`: schema version, aggregate attempts, category history, best streak, and last session summary. No identity fields.

Do not store answer keys in a separate remotely fetched endpoint in the MVP. The bundled content is educational material, not a security secret.

## API Design

There is no required API in the MVP. A static host serves the application bundle and JSON content. The domain layer exposes TypeScript functions rather than HTTP endpoints.

If future trainer features need a service, define it as an explicit versioned API boundary with authentication, rate limits, input validation, retention rules, and a privacy review. Do not add an API merely to move local progress off-device.

## Authentication and Authorization

No authentication is required for MVP play. There are no protected resources, roles, or accounts. Trainer exports in a later phase must be opt-in and should avoid learner identity by default. Any multi-user service would require a separate threat model and authorization design before implementation.

## Security Boundaries

- Bundled scenario JSON is trusted only after schema validation; invalid data blocks that scenario from play.
- Scenario values are untrusted display data and must be rendered through React text/content APIs, never injected as HTML.
- URLs and QR destinations are inert training evidence. Do not navigate to or fetch them from the player flow.
- localStorage is user-controlled and untrusted; parse, validate, version, and recover to a clean state on failure.
- Build dependencies and deployment configuration are outside the player runtime and must be reviewed separately.
- No secrets belong in source, scenario data, static assets, or client storage.

## Proposed Folder and File Structure

```text
src/
  app/
    App.tsx
    routes.ts
  components/
    AppShell.tsx
    EvidencePanel.tsx
    FeedbackPanel.tsx
    ProgressHeader.tsx
    ScenarioRenderer.tsx
  content/
    scenarios.json
    schema.ts
    validateScenarios.ts
  domain/
    adaptiveSelector.ts
    gameRules.ts
    models.ts
    progression.ts
  screens/
    StartScreen.tsx
    ScenarioScreen.tsx
    SummaryScreen.tsx
  storage/
    progressStore.ts
  styles/
    tokens.css
    global.css
  test/
    setup.ts
public/
  media/
  manifest.webmanifest (only if PWA is approved)
tests/
  e2e/
```

The exact structure may change with the selected build tool, but domain rules must remain importable without React or browser globals.

## Technology Stack and Justification

- React with TypeScript: componentized responsive UI and a typed domain boundary.
- Vite: selected for the MVP because the app is static, has no server requirement, and should deploy simply to GitHub Pages.
- Zod or an equivalent small schema validator: runtime validation for authored JSON; justify the final dependency in the lockfile and rules.
- Vitest: fast deterministic domain and component-adjacent tests.
- React Testing Library: behavior-focused UI tests.
- Playwright: essential keyboard and responsive journey checks.
- A small accessible icon package only if needed; icons never replace text labels.
- Optional PWA plugin only after offline value and cache-update behavior are tested.

Python/Pygame remains historical prototype material during the foundation phase. It is not changed or silently removed here.

## Deployment Architecture

Build a static asset bundle and deploy it to GitHub Pages after the local MVP is reviewed. Configure the Vite base path for the repository name, use HTTPS, apply a restrictive content security policy where the host permits it, and use no analytics by default. A live demo link is added only after a real deployment is verified.

## Architectural Decisions and Trade-offs

- **Deterministic adaptive rules instead of AI (approved MVP decision):** directly supports the learning goal, is testable offline, and avoids overstating capability. The product language will say adaptive practice, not AI-powered.
- **Curated JSON instead of generated runtime content:** enables review, reproducibility, and safe educational copy. Optional local generation can produce drafts later, never authoritative scenarios.
- **Local progress instead of accounts:** reduces privacy and infrastructure burden, but means progress is device/browser-specific and cannot be recovered automatically.
- **Static app instead of an API (approved MVP decision):** simple GitHub Pages deployment and fewer attack surfaces, at the cost of no shared trainer analytics in MVP.
- **Scenario evidence as explicit data:** makes explanations, keyboard access, and category reporting testable, at the cost of more authoring work per scenario.
- **New responsive UX instead of porting Pygame:** meets the educational and browser goals, while requiring a deliberate redesign rather than preserving the old board metaphor.

## Decision Status

- **Approved rebuild decisions:** static client-side Vite/React/TypeScript app; GitHub Pages target; local-only progress; no authentication, database, backend, paid API, cloud AI, or runtime Ollama dependency; legacy Python/Pygame preserved as historical evidence; deterministic adaptation described without AI language.
- **Future possibilities:** local Ollama-assisted draft authoring, PWA support, trainer export, localization, and optional privacy-reviewed aggregate research. None is part of the MVP.
- **Still requiring confirmation:** Urwah's personal challenges, solutions, learning, and portfolio outcomes; these remain marked `TODO — confirm with Urwah` until supplied.

## Campaign Simulation Boundary

The campaign engine below is preserved for replacement review but is no longer used by the active screen. It must not be deleted silently.

The approved simulation engine sits between React and scenario content. React owns presentation and timer orchestration; pure domain functions own campaign initialization, response resolution, health and threat changes, timeout consequences, stage advancement, boss unlock, summary statistics, and win/loss evaluation.

The campaign state includes `campaignId`, `currentIncidentIndex`, `resolvedIncidentIds`, `companyHealth`, `threatScore`, `threatState`, `incidentStatus`, `remainingTime`, `containmentStreak`, `campaignOutcome`, `playerResponses`, and `mode`. A response records incident ID, classification, operational action, selected evidence IDs, result, and timestamp. Derived values should not be duplicated in React state.

Rules:

- Health and threat are clamped at 0-100 and all tuning constants live in the domain layer.
- Incident resolution is idempotent; an incident ID can resolve once, and timeout cannot also resolve through a click.
- Strong evidence is an observable fact, not a conclusion announced before the response.
- Defensive actions are scenario-specific and may be partially correct.
- Boss incidents combine previously taught techniques, refer to earlier campaign events, and remain solvable through evidence rather than obscure knowledge or real-time typing.
- A stable campaign definition and seed produce a deterministic replay. Ordering must never change scoring or evidence.

## New Component Responsibilities

- `CampaignBriefing`: establishes the defender role, fictional company, campaign objective, and timed/untimed mode.
- `OperationsWorkspace`: composes command bar, incident queue, message investigation, evidence, and response controls.
- `CommandBar`: presents company health, threat state, campaign stage, and timer with accessible text labels.
- `IncidentQueue`: presents queued, active, contained, missed, escalated, and boss statuses.
- `IncidentReport`: explains operational outcome, health delta, threat delta, evidence, and learning takeaway.
- `campaignEngine`: pure campaign state transitions and summary functions.
- `timerController`: hidden-tab pause, debrief pause, timeout dispatch, and untimed behavior without direct state mutation.

## Operations Simulation Boundary

`web/src/domain/operationsEngine.ts` is the active pure TypeScript domain boundary. It owns the three incident definitions, evidence findings, central scoring and health constants, tool inspection, action resolution, timeout idempotency, incident advancement, and shift completion. It has no React, DOM, storage, or network dependency. React owns timer orchestration, visibility pause, layout, topology selection, and rendering only.

The network map communicates asset relationships, selection, health, and the affected system with text as well as colour. Telemetry series are incident evidence: their correlations must support diagnosis rather than decorate the view. React receives root-cause data as part of the bundled incident definition but renders it only in the post-resolution review.
