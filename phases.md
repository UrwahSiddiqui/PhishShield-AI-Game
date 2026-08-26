# Delivery Phases

Phases are sequential. Do not start the next phase until the current phase's exit criteria pass and `memory.md` is updated.

## Phase 0: Foundation and Audit

**Goal:** Establish an agreed product, architecture, design, engineering, and delivery baseline without changing application code.

**Tasks:** Create and review PRD.md, Architecture.md, rules.md, phases.md, design.md, memory.md, and AGENTS.md. Audit the existing source, dependencies, assets, generated files, history, and claims.

**Deliverables:** Foundation documents, audit findings, branch `docs/project-foundation`.

**Tests/checks:** Clean starting worktree recorded; branch exists; repository inventory and history reviewed; current import/runtime risks documented.

**Exit criteria:** Documents reviewed and approved by Urwah; implementation remains untouched; approved decisions and genuine open questions are recorded. This criterion is satisfied by the current brief, pending the documentation commit.

**Dependencies/risks:** Personal portfolio context is unavailable and must not be guessed. A scope-changing request after this checkpoint requires an explicit architecture or PRD update.

## Phase 1: Browser Scaffold and Design System

**Goal:** Create the smallest runnable responsive browser shell with the approved visual direction and accessible navigation.

**Tasks:** Establish the Vite React/TypeScript toolchain selected for GitHub Pages; add `.gitignore`, isolate the web app from the legacy Python/Pygame tree, establish tokens, typography, layout, semantic shell, start screen, and responsive behavior. Add test and lint/build commands.

**Deliverables:** Browser scaffold, design tokens, start screen, baseline CI checks.

**Tests:** Typecheck, lint, unit test setup, responsive smoke check, keyboard navigation check, accessibility scan.

**Exit criteria:** App runs locally and builds for static hosting; start flow works at desktop and mobile widths; no critical accessibility findings; dependency decisions are documented.

**Dependencies/risks:** GitHub Pages base-path configuration affects deployment. Typography or media assets may affect performance.

## Phase 2: Campaign Engine and Simulation Rules

**Goal:** Replace the flat quiz loop with a pure, testable corporate campaign engine before expanding scenario content.

**Tasks:** Define campaign state and incident-response models; centralize company health, threat score/state, impact values, timer outcomes, stage progression, boss unlock, win/loss, summary, and idempotent resolution. Extend the scenario schema only where the first connected campaign needs it.

**Deliverables:** Campaign engine, typed incident-response model, initial campaign definition, engine tests, and updated rules documentation.

**Tests:** Health/threat boundaries, threat-state mapping, correct containment, incorrect allow, false-positive blocking, timeout once, advancement, boss unlock, win/loss, recovery, deterministic replay, duplicate resolution, untimed mode, and existing scenario tests.

**Exit criteria:** A deterministic fixture campaign can progress through incidents, produce visible health/threat consequences, unlock a boss, and reach both win and loss outcomes in tests. No UI timer or scenario expansion is required for this exit criterion.

**Dependencies/risks:** Poor tuning can make one mistake fatal or make the meters decorative. Keep values centralized and test recovery paths.

## Phase 3: Content Schema and Connected Campaign

**Goal:** Establish safe, reviewable content for one connected campaign without broad expansion to 20 standalone scenarios.

**Tasks:** Extend typed models and runtime schema with campaign stage, impact, response window, available actions, operational outcomes, and boss metadata where needed. Reorder/adapt the existing six scenarios into 4-6 connected incidents and add only the minimum new content for one coherent boss.

**Deliverables:** Versioned campaign JSON, schema validator, content tests, authoring checklist, and campaign review notes.

**Tests:** Schema validation, unique IDs, supported types/categories, exactly one correct action, evidence-to-rationale coverage, inert URL/QR checks.

**Exit criteria:** The complete first campaign passes validation and content review; its connection is clearly fictional; no scenario contains real credential collection or an actionable harmful payload. Expansion to 20 scenarios remains deferred until manual gameplay review.

**Dependencies/risks:** Educational quality needs subject-matter review. Do not claim expert review until confirmed.

## Phase 4: Operations Workspace and Core Decision Loop

**Goal:** Implement the cyber-defence workspace around the campaign engine.

**Tasks:** Build campaign briefing, company health and threat displays, incident queue/timeline, scenario renderer, evidence inspection, context-relevant defensive actions, operational incident report, and campaign progression. Keep resolution pure and deterministic.

**Deliverables:** Playable campaign flow from briefing through incident reports and boss entry.

**Tests:** Domain rules, duplicate submission, keyboard inspection, feedback completeness, health/threat announcements, component behavior, one end-to-end campaign journey.

**Exit criteria:** A learner can complete scenarios with keyboard or touch, every answer receives a rationale, and no essential evidence depends on hover or colour.

**Dependencies/risks:** Content and UI language may expose ambiguity in action labels. Resolve through usability checks.

## Phase 5: Timers, Progression, Adaptation, and Persistence

**Goal:** Add timed incidents and persistent campaign practice while preserving transparent, local-only state.

**Tasks:** Add data-driven timers, hidden-tab pause, feedback pause, timeout consequences, untimed mode, difficulty progression, score/streak/accuracy/category metrics, deterministic adaptive selection, versioned localStorage, corruption recovery, resume, replay, and reset.

**Deliverables:** Full campaign model, timer boundary, adaptive engine, campaign summary, persistence adapter.

**Tests:** Timer boundary and pause/resume, timeout once, untimed mode, boundary scoring, streak resets, category aggregation, deterministic selector fixtures, malformed storage, migration/version handling, reset confirmation, Playwright replay and summary journeys.

**Exit criteria:** Metrics are reproducible, weak categories receive bounded extra practice, corrupted state cannot break the app, and UI describes adaptation honestly.

**Dependencies/risks:** Poor weighting can over-repeat one topic. Cap repetition and test distribution.

## Phase 6: Polish, Accessibility, and Portfolio Evidence

**Goal:** Prepare a credible public demonstration and record verified improvements.

**Tasks:** Tune responsive layouts, contrast, focus, reduced motion, loading/error states, and scenario readability. Capture before/after screenshots or GIF, run final checks, update README, and document known limitations and roadmap.

**Deliverables:** Portfolio-ready browser experience, verified demo link if deployed, updated README, test report, evidence log.

**Tests:** Full unit/component suite, Playwright desktop/mobile journeys, keyboard pass, accessibility scan, production build, manual content review.

**Exit criteria:** README contains all requested sections; live demo is verified if claimed; all limitations and personal TODOs are explicit; no unsupported AI or impact claim remains.

**Dependencies/risks:** Deployment configuration and screenshot capture can expose unresolved polish issues. Keep a short fix list and avoid feature expansion.

## Phase 7: Optional Extensions

**Goal:** Add only extensions that have a demonstrated learning or trainer value.

**Tasks:** Evaluate PWA offline support, trainer export, localization, or optional local Ollama draft generation. Each proposal requires a separate threat model, content review, and privacy decision.

**Deliverables:** Only the approved extension, with updated architecture and tests.

**Tests:** Extension-specific security, accessibility, offline/update, or content validation tests.

**Exit criteria:** Extension has a measurable purpose, no paid runtime dependency, and does not weaken curated content or privacy boundaries.

**Dependencies/risks:** Extension work can distract from the MVP. It stays deferred unless Phase 5 evidence supports it.
