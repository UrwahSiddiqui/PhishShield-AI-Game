# PhishShield Cyber Awareness Game

PhishShield is a browser-based phishing-awareness game for practising careful decisions about suspicious communications. It teaches players to inspect sender identity, domains, links, requests, urgency, attachments, and context before choosing a safe response.

The current web application is an approved rebuild of the original university Pygame prototype. It uses curated scenarios and deterministic adaptive practice. It does not use a runtime AI model and does not claim to prevent phishing attacks.

## Project Status

The campaign simulation is in progress on `feat/web-foundation`. The responsive web app in `web/` now includes a campaign briefing, operations workspace, incident queue, company health, threat momentum, timed and untimed modes, evidence inspection, operational responses, incident reports, boss escalation, campaign win/loss, and local campaign persistence. The legacy Python/Pygame prototype remains in the repository as historical evidence and has not been deleted.

## Run Locally

Requirements: Node.js 20 or newer and npm. The legacy Python prototype has separate dependencies in `requirements.txt`; Python is not required for the web application.

```powershell
Set-Location web
npm.cmd install
npm.cmd run dev
```

Open the local URL printed by Vite. To create a production build:

```powershell
Set-Location web
npm.cmd run build
npm.cmd run lint
```

The production build is configured for GitHub Pages at `/PhishShield-AI-Game/`. A live demo link will be added only after deployment is reviewed and verified.

## Manual Testing

Use this checklist for the current campaign build and repeat it as each phase adds coverage:

1. Start the dev server with `Set-Location web; npm.cmd run dev` and open the printed URL.
2. At a desktop width, confirm the briefing explains the defender role, fictional company, campaign, and timed/untimed modes without overlap.
3. Select both response modes with a mouse and keyboard. Confirm the selected state changes and `Take the shift` starts the campaign.
4. In untimed mode, inspect evidence with `Tab` and `Enter`, choose a context-relevant response, read the incident report, and return to the queue.
5. Confirm the queue marks resolved stages, the next incident becomes active, and company health/threat values remain visible.
6. Complete the untimed campaign using report/report/verify. Confirm the boss report appears before the campaign result and the result shows a win.
7. Replay and complete the campaign using allow/allow/allow. Confirm health and threat consequences are visible and the result shows a loss.
8. Select live response and confirm the first incident timer counts down. Verify that no answer can be submitted twice.
9. Resize to approximately 375px. Confirm there is no horizontal scrolling, the message remains readable, the queue stacks, and response controls remain usable.
10. Use `Tab` only to inspect evidence and submit responses. Confirm every control has a visible focus indicator and status text is understandable without colour.
11. Enable `prefers-reduced-motion` and confirm no essential information depends on animation. Hide the tab during live response and verify the timer pauses when you return.
12. Reload during an active campaign and confirm the operations workspace resumes. Test malformed or blocked localStorage and confirm the app still loads without saved progress.
13. Repeat the checks in a current Chromium-based browser and Firefox. Record browser, viewport, result, and any issue in the relevant phase notes.

## Legacy Audit

The original repository contains a fixed `800x600` Pygame loop, inconsistent controllers, missing `AttackSystem` and `DefenseSystem` imports in `game/game.py`, declared but apparently unused `transformers` and spaCy dependencies, random attack behavior labelled as AI, sparse educational content, tracked `__pycache__` files, and assets that are not referenced by the live entry point. These are verified repository findings, not claims about the rebuilt app.

## Rebuild Direction

- Static Vite, React, and TypeScript application.
- Curated, typed, validated scenario data.
- Inspectable email, SMS, QR-code, login-page, and social-engineering examples.
- Immediate feedback that explains strong evidence, weaker context clues, and safer next actions.
- Deterministic adaptive practice described without AI language.
- Local-only progress with no authentication, database, backend, analytics, paid API, or cloud model requirement.
- Semantic HTML, keyboard access, visible focus, readable contrast, responsive layouts, and reduced-motion support.

See [PRD.md](PRD.md), [Architecture.md](Architecture.md), [rules.md](rules.md), [phases.md](phases.md), and [design.md](design.md) for the current product and engineering decisions.

## Testing

The web project currently has TypeScript/build, lint, campaign-engine, content-validation, and persistence checks. Component tests, timer lifecycle tests with fake browser visibility, and a committed Playwright suite will be added before the MVP is described as complete.

## Honest Limitations

The MVP is an awareness and decision-practice tool, not a security product, email filter, certification, or measurement of workplace readiness. No user-testing evidence, impact metrics, or personal project reflections are included until verified.

Portfolio reflection placeholders: `TODO — confirm with Urwah`.

## Roadmap

1. Finish the responsive browser scaffold and design system.
2. Add the validated scenario schema and diverse curated dataset.
3. Build the evidence inspection, decision, feedback, and summary flows.
4. Add deterministic adaptation, metrics, local persistence, and tests.
5. Review accessibility, capture before/after evidence, and deploy to GitHub Pages after approval.
6. Evaluate optional trainer export, PWA support, localization, or local draft authoring only if each earns a separate privacy and security review.
