# Project Memory

- **Current phase:** Phase 2 - Content Schema and Curated Dataset
- **Current task:** Expand and review the validated scenario dataset; the first playable slice is available for manual review.
- **File currently being worked on:** `web/src/content/`, `web/src/domain/`, `web/src/App.tsx`, and `web/src/App.css`.
- **Completed work:** Created branch `docs/project-foundation`, committed and pushed foundation docs as `e8543d5`, then created and pushed `feat/web-foundation` as `bf7bc41`. Reviewed the legacy repository and reconciled the documentation with the approved static Vite, GitHub Pages, local-only, no-runtime-AI, and legacy-preservation decisions. Added an isolated Vite React TypeScript app, replaced the starter UI with a responsive landing/setup screen, configured the GitHub Pages base path, added repository hygiene rules, removed tracked Python cache files without deleting source, and added reproducible setup plus manual-testing instructions. Added Zod-backed typed scenario content, six initial scenarios across five channels including a legitimate message, pure scoring/selection rules, unit tests, and a playable inspect/decide/debrief loop. The start button enters a scenario and answer submission is locked to one response.
- **Decisions and their reasons:** Propose a static React + TypeScript browser MVP with a pure typed domain layer, curated JSON scenarios, deterministic adaptive selection, local-only progress, and no required AI or paid API. This is testable, privacy-preserving, honest about capability, and aligned with the learning objective.
- **Tests last executed and their results:** `Push-Location web; npm.cmd test; Pop-Location` passed: 1 test file and 6 tests, including unique IDs, all five channels, and explainable evidence coverage. `Push-Location web; npm.cmd run build; Pop-Location` passed with TypeScript compilation and Vite production output. `Push-Location web; npm.cmd run lint; Pop-Location` passed with no Oxlint findings. `git diff --check` passed with `core.whitespace=cr-at-eol`. Local HTTP smoke test returned 200 for `/PhishShield-AI-Game/`. Full browser manual review and Playwright coverage are pending.
- **Known problems:** Existing prototype is fixed-size and text-heavy; live and orphaned controllers disagree; `game/game.py` imports undefined classes; `transformers` and `spacy` are declared without visible use; attack randomness is not an AI model; legacy assets and empty sound files may be unused. The web dataset has six scenarios rather than the MVP target of 20; there is no summary, local persistence, bounded adaptive weighting, or end-to-end test yet.
- **Blockers:** No implementation blocker. Personal portfolio context, confirmed challenges, solutions, learning, and impact metrics remain unavailable.
- **Exact next step:** Commit the current typed content and playable-loop slice, then expand the dataset to the Phase 2 target and add stronger content validation before completing persistence and end-to-end phases.
- **Last updated date:** 2026-08-26

## Evidence Boundaries

- Do not attribute challenges, decisions, results, metrics, or lessons to Urwah without confirmation.
- Use `TODO — confirm with Urwah` for personal context in README and portfolio evidence.
- Do not describe the prototype as AI-powered based only on class names, attack labels, or random weighting.
