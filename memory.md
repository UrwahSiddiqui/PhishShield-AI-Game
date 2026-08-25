# Project Memory

- **Current phase:** Phase 1 - Browser Scaffold and Design System
- **Current task:** Build the isolated Vite web application scaffold and approved landing/setup experience.
- **File currently being worked on:** `web/src/App.tsx`, `web/src/App.css`, `web/src/index.css`, `web/vite.config.ts`, root `.gitignore`, and `README.md`.
- **Completed work:** Created branch `docs/project-foundation`, committed and pushed foundation docs as `e8543d5`, then created `feat/web-foundation`. Reviewed the legacy repository and reconciled the documentation with the approved static Vite, GitHub Pages, local-only, no-runtime-AI, and legacy-preservation decisions. Added an isolated Vite React TypeScript app, replaced the starter UI with a responsive landing/setup screen, configured the GitHub Pages base path, added repository hygiene rules, removed tracked Python cache files without deleting source, and added reproducible setup plus manual-testing instructions.
- **Decisions and their reasons:** Propose a static React + TypeScript browser MVP with a pure typed domain layer, curated JSON scenarios, deterministic adaptive selection, local-only progress, and no required AI or paid API. This is testable, privacy-preserving, honest about capability, and aligned with the learning objective.
- **Tests last executed and their results:** `Push-Location web; npm.cmd run build; Pop-Location` passed with TypeScript compilation and Vite production output. `Push-Location web; npm.cmd run lint; Pop-Location` passed with no Oxlint findings. Staged `git diff --check` is clean when treating normal Windows CRLF as line-ending whitespace; the repository uses `core.autocrlf=true`. No browser manual check has been completed yet.
- **Known problems:** Existing prototype is fixed-size and text-heavy; live and orphaned controllers disagree; `game/game.py` imports undefined classes; `transformers` and `spacy` are declared without visible use; attack randomness is not an AI model; educational content is sparse; assets and empty sound files may be unused. The web start button does not yet enter scenario play; content, rules, persistence, and automated interaction tests are later phases.
- **Blockers:** No implementation blocker. Personal portfolio context, confirmed challenges, solutions, learning, and impact metrics remain unavailable.
- **Exact next step:** Commit and push the foundation documents on `docs/project-foundation`, create `feat/web-foundation` from that commit, then start Phase 1 by scaffolding the isolated Vite web application and adding repository hygiene.
- **Last updated date:** 2026-08-26

## Evidence Boundaries

- Do not attribute challenges, decisions, results, metrics, or lessons to Urwah without confirmation.
- Use `TODO — confirm with Urwah` for personal context in README and portfolio evidence.
- Do not describe the prototype as AI-powered based only on class names, attack labels, or random weighting.
