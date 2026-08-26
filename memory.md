# Project Memory

- **Current phase:** Phase 2 - Campaign Engine and Simulation Rules
- **Current task:** Integrate the deterministic campaign engine into a cyber-defence operations workspace before expanding content.
- **File currently being worked on:** `web/src/domain/campaignEngine.ts`, `web/src/domain/campaignEngine.test.ts`, and next `web/src/App.tsx`/styles; no broad content expansion is approved.
- **Completed work:** Created branch `docs/project-foundation`, committed and pushed foundation docs as `e8543d5`, then created and pushed `feat/web-foundation` as `bf7bc41`. Added an isolated Vite React TypeScript app, responsive landing/setup screen, GitHub Pages base path, repository hygiene, manual-testing instructions, Zod-backed typed scenario content, six initial scenarios across five channels including a legitimate message, pure scoring/selection rules, unit tests, and a playable inspect/decide/debrief loop. Urwah's manual review approved redesigning this into a connected corporate phishing campaign with company health, threat, timers, incident consequences, and a boss incident. Updated PRD, Architecture, rules, phases, and design to record that decision. Implemented a pure campaign engine with bounded health/threat rules, threat-state mapping, response resolution, boss availability, timeout behavior, idempotency, summary statistics, win/loss, recovery, and untimed mode.
- **Decisions and their reasons:** Propose a static React + TypeScript browser MVP with a pure typed domain layer, curated JSON scenarios, deterministic adaptive selection, local-only progress, and no required AI or paid API. This is testable, privacy-preserving, honest about capability, and aligned with the learning objective.
- **Tests last executed and their results:** `Push-Location web; npm.cmd test; Pop-Location` passed: 2 test files and 16 tests, including health/threat boundaries, containment, recovery, timeout once, duplicate-resolution prevention, boss unlock, win, loss, unique IDs, all five channels, and explainable evidence coverage. Build and lint passed before the latest engine-only edit; the full suite will be rerun after workspace integration. Full browser manual review and Playwright coverage are pending.
- **Known problems:** Existing prototype is fixed-size and text-heavy; live and orphaned controllers disagree; `game/game.py` imports undefined classes; `transformers` and `spacy` are declared without visible use; attack randomness is not an AI model; legacy assets and empty sound files may be unused. The campaign engine is not yet wired into the React UI; timers, queue/timeline, operational actions, campaign briefing, boss presentation, summary, and persistence remain. The dataset remains at six scenarios by explicit decision; no expansion to 20 until the new loop is manually reviewed.
- **Blockers:** No implementation blocker. Personal portfolio context, confirmed challenges, solutions, learning, and impact metrics remain unavailable.
- **Exact next step:** Commit the tested campaign engine, then replace the tutorial-style scenario screen with the operations workspace and connect its response controls to engine state.
- **Last updated date:** 2026-08-26

## Evidence Boundaries

- Do not attribute challenges, decisions, results, metrics, or lessons to Urwah without confirmation.
- Use `TODO — confirm with Urwah` for personal context in README and portfolio evidence.
- Do not describe the prototype as AI-powered based only on class names, attack labels, or random weighting.
