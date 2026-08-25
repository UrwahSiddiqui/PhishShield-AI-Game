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

## Phase 2: Content Schema and Curated Dataset

**Goal:** Establish safe, reviewable scenario content before building complex play behavior.

**Tasks:** Define typed models and runtime schema; create authoring checklist; write and review at least 20 scenarios across email, SMS, QR, login-page, and social-engineering types; include evidence, answer, red flags, rationale, and difficulty.

**Deliverables:** Versioned JSON dataset, schema validator, content tests, review notes.

**Tests:** Schema validation, unique IDs, supported types/categories, exactly one correct action, evidence-to-rationale coverage, inert URL/QR checks.

**Exit criteria:** All scenarios pass validation and content review; no scenario contains real credential collection or an actionable harmful payload.

**Dependencies/risks:** Educational quality needs subject-matter review. Do not claim expert review until confirmed.

## Phase 3: Core Decision Loop

**Goal:** Implement the scenario experience and learning feedback.

**Tasks:** Build scenario renderer, evidence inspection, Trust/Report/Inspect-style actions, immediate debrief, hint behavior, and progress state. Keep scoring pure and deterministic.

**Deliverables:** Playable scenario flow from start through feedback.

**Tests:** Domain rules, duplicate submission, keyboard inspection, feedback completeness, component behavior, one end-to-end journey.

**Exit criteria:** A learner can complete scenarios with keyboard or touch, every answer receives a rationale, and no essential evidence depends on hover or colour.

**Dependencies/risks:** Content and UI language may expose ambiguity in action labels. Resolve through usability checks.

## Phase 4: Progression, Adaptation, and Persistence

**Goal:** Make practice responsive to mistakes while preserving transparent, local-only state.

**Tasks:** Add difficulty progression, score/streak/accuracy/category metrics, deterministic adaptive selection, versioned localStorage, corruption recovery, resume, and reset.

**Deliverables:** Full session model, adaptive engine, summary screen, persistence adapter.

**Tests:** Boundary scoring, streak resets, category aggregation, deterministic selector fixtures, malformed storage, migration/version handling, reset confirmation, Playwright resume and summary journeys.

**Exit criteria:** Metrics are reproducible, weak categories receive bounded extra practice, corrupted state cannot break the app, and UI describes adaptation honestly.

**Dependencies/risks:** Poor weighting can over-repeat one topic. Cap repetition and test distribution.

## Phase 5: Polish, Accessibility, and Portfolio Evidence

**Goal:** Prepare a credible public demonstration and record verified improvements.

**Tasks:** Tune responsive layouts, contrast, focus, reduced motion, loading/error states, and scenario readability. Capture before/after screenshots or GIF, run final checks, update README, and document known limitations and roadmap.

**Deliverables:** Portfolio-ready browser experience, verified demo link if deployed, updated README, test report, evidence log.

**Tests:** Full unit/component suite, Playwright desktop/mobile journeys, keyboard pass, accessibility scan, production build, manual content review.

**Exit criteria:** README contains all requested sections; live demo is verified if claimed; all limitations and personal TODOs are explicit; no unsupported AI or impact claim remains.

**Dependencies/risks:** Deployment configuration and screenshot capture can expose unresolved polish issues. Keep a short fix list and avoid feature expansion.

## Phase 6: Optional Extensions

**Goal:** Add only extensions that have a demonstrated learning or trainer value.

**Tasks:** Evaluate PWA offline support, trainer export, localization, or optional local Ollama draft generation. Each proposal requires a separate threat model, content review, and privacy decision.

**Deliverables:** Only the approved extension, with updated architecture and tests.

**Tests:** Extension-specific security, accessibility, offline/update, or content validation tests.

**Exit criteria:** Extension has a measurable purpose, no paid runtime dependency, and does not weaken curated content or privacy boundaries.

**Dependencies/risks:** Extension work can distract from the MVP. It stays deferred unless Phase 5 evidence supports it.
