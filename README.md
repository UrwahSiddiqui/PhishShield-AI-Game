# PhishShield Cyber Awareness Game

PhishShield is a browser-based phishing-awareness game for practising careful decisions about suspicious communications. It teaches players to inspect sender identity, domains, links, requests, urgency, attachments, and context before choosing a safe response.

The current web application is an approved rebuild of the original university Pygame prototype. It uses curated scenarios and deterministic adaptive practice. It does not use a runtime AI model and does not claim to prevent phishing attacks.

## Project Status

Phase 1 is in progress on `feat/web-foundation`. The responsive landing and training-setup screen is available in `web/`; the legacy Python/Pygame prototype remains in the repository as historical evidence and has not been deleted.

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

Use this checklist for the current landing/setup screen and repeat it as each phase adds gameplay:

1. Start the dev server with `Set-Location web; npm.cmd run dev` and open the printed URL.
2. At a desktop width, confirm the PhishShield title, learning purpose, session facts, training modes, and privacy note are visible without overlap.
3. Select each of the three training modes with a mouse and confirm only the selected mode shows the selected state.
4. Press `Tab` from the address bar through the page. Confirm the home link, each mode, and Start training button receive a clear visible focus indicator.
5. Use arrow keys or `Tab` and `Space` to change the radio selection. Confirm the selected mode updates without a page reload.
6. Resize the browser to a narrow mobile width, such as 375px. Confirm there is no horizontal scrolling, text is readable, and the setup panel remains usable.
7. Enable `prefers-reduced-motion` in browser accessibility or dev tools and confirm the interface does not depend on motion to communicate information.
8. Open browser dev tools and set localStorage access to blocked, when supported. Confirm the landing screen still loads; future progress features must remain usable without storage.
9. Repeat the checks in a current Chromium-based browser and Firefox. Record browser, viewport, result, and any issue in the relevant phase notes.

When scenario play is available, extend the checklist with: inspect evidence by keyboard, submit exactly one decision, read the complete rationale, continue to the next scenario, finish the summary, replay, reset progress, and reload with malformed localStorage data.

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

The web project currently has TypeScript/build and lint checks. Scenario rules, content validation, component tests, and Playwright journeys will be added in later phases before the MVP is described as complete.

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
