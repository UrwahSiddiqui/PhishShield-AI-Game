# Project Memory

- **Current phase:** Phase 1 - Browser Scaffold and Design System
- **Current task:** Foundation checkpoint approved; prepare the isolated Vite web application scaffold after committing the documentation branch.
- **File currently being worked on:** Foundation documentation set; no application code is being changed yet.
- **Completed work:** Created branch `docs/project-foundation`. Reviewed repository inventory, top-level files, Python modules, assets, dependencies, tracked generated files, and the two visible commits. Confirmed a fixed-size Pygame entry point, duplicated/inconsistent game controllers, missing `AttackSystem`/`DefenseSystem` imports in `game/game.py`, random attack selection presented as AI behavior, minimal educational content, no meaningful automated tests, no `.gitignore`, and unreferenced-looking assets/dependencies. Reconciled the documents with the approved static Vite, GitHub Pages, local-only, no-runtime-AI, and legacy-preservation decisions.
- **Decisions and their reasons:** Propose a static React + TypeScript browser MVP with a pure typed domain layer, curated JSON scenarios, deterministic adaptive selection, local-only progress, and no required AI or paid API. This is testable, privacy-preserving, honest about capability, and aligned with the learning objective.
- **Tests last executed and their results:** `git diff --check` passed and the seven requested documents are present. No application tests exist. The legacy import baseline could not run because this environment has no `python`, `py`, or `python3` command; no application code was changed in Phase 0.
- **Known problems:** Existing prototype is fixed-size and text-heavy; live and orphaned controllers disagree; `game/game.py` imports undefined classes; `transformers` and `spacy` are declared without visible use; attack randomness is not an AI model; educational content is sparse; assets and empty sound files may be unused; tracked `__pycache__` files are present.
- **Blockers:** No implementation blocker. Personal portfolio context, confirmed challenges, solutions, learning, and impact metrics remain unavailable.
- **Exact next step:** Commit and push the foundation documents on `docs/project-foundation`, create `feat/web-foundation` from that commit, then start Phase 1 by scaffolding the isolated Vite web application and adding repository hygiene.
- **Last updated date:** 2026-08-26

## Evidence Boundaries

- Do not attribute challenges, decisions, results, metrics, or lessons to Urwah without confirmation.
- Use `TODO — confirm with Urwah` for personal context in README and portfolio evidence.
- Do not describe the prototype as AI-powered based only on class names, attack labels, or random weighting.
