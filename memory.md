# Project Memory

- **Current phase:** Phase 2 - Campaign Engine and Simulation Rules
- **Current task:** Replace the flat scenario loop with a deterministic corporate campaign engine before expanding content.
- **File currently being worked on:** Foundation docs plus the next planned `web/src/domain/campaignEngine.ts` and its tests; no broad content expansion is approved.
- **Completed work:** Created branch `docs/project-foundation`, committed and pushed foundation docs as `e8543d5`, then created and pushed `feat/web-foundation` as `bf7bc41`. Added an isolated Vite React TypeScript app, responsive landing/setup screen, GitHub Pages base path, repository hygiene, manual-testing instructions, Zod-backed typed scenario content, six initial scenarios across five channels including a legitimate message, pure scoring/selection rules, unit tests, and a playable inspect/decide/debrief loop. Urwah's manual review approved redesigning this into a connected corporate phishing campaign with company health, threat, timers, incident consequences, and a boss incident. Updated PRD, Architecture, rules, phases, and design to record that decision.
- **Decisions and their reasons:** Propose a static React + TypeScript browser MVP with a pure typed domain layer, curated JSON scenarios, deterministic adaptive selection, local-only progress, and no required AI or paid API. This is testable, privacy-preserving, honest about capability, and aligned with the learning objective.
- **Tests last executed and their results:** `Push-Location web; npm.cmd test; Pop-Location` passed: 1 test file and 6 tests, including unique IDs, all five channels, and explainable evidence coverage. `Push-Location web; npm.cmd run build; Pop-Location` passed with TypeScript compilation and Vite production output. `Push-Location web; npm.cmd run lint; Pop-Location` passed with no Oxlint findings. `git diff --check` passed with `core.whitespace=cr-at-eol`. Local HTTP smoke test returned 200 for `/PhishShield-AI-Game/`. Full browser manual review and Playwright coverage are pending.
- **Known problems:** Existing prototype is fixed-size and text-heavy; live and orphaned controllers disagree; `game/game.py` imports undefined classes; `transformers` and `spacy` are declared without visible use; attack randomness is not an AI model; legacy assets and empty sound files may be unused. The current web loop still feels like a tutorial: it has no campaign state, company health, threat meter, timer, incident queue, operational actions, boss, or win/loss. The dataset remains at six scenarios by explicit decision; no expansion to 20 until the new loop is manually reviewed.
- **Blockers:** No implementation blocker. Personal portfolio context, confirmed challenges, solutions, learning, and impact metrics remain unavailable.
- **Exact next step:** Validate and commit the documentation redesign checkpoint, then implement and test the pure campaign engine before changing the UI or adding scenarios.
- **Last updated date:** 2026-08-26

## Evidence Boundaries

- Do not attribute challenges, decisions, results, metrics, or lessons to Urwah without confirmation.
- Use `TODO — confirm with Urwah` for personal context in README and portfolio evidence.
- Do not describe the prototype as AI-powered based only on class names, attack labels, or random weighting.
