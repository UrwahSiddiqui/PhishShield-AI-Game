# Product Requirements Document

## Product Problem

The legacy findings in this section were verified from repository source and history reviewed on 2026-08-26. Proposed rebuild behavior is described separately as requirements.

PhishShield is currently a small, fixed-size Pygame prototype. Its primary loop is a network-defense simulation driven by attack damage and defense purchases, while the learning objective of recognizing phishing is represented by one hard-coded email and a few generic tips. The repository does not yet provide a browser experience, a curated scenario curriculum, meaningful feedback, or evidence that its claimed AI behavior uses a model.

The product should become a focused cyber-awareness game that gives a learner repeated, realistic decisions about suspicious communications and explains the evidence behind each decision. The game is an educational exercise, not a detector that promises to protect a real inbox.

## Target Users

- Students learning basic online safety.
- Early-career professionals and non-technical employees.
- Teachers and cybersecurity awareness trainers running short exercises.
- Small organizations conducting informal awareness activities.

## User Needs

Users need to:

- Make a clear decision about a realistic email, SMS, QR-code, login-page, or social-engineering scenario.
- Inspect senders, domains, links, urgency, requests, attachments, and context before deciding.
- Understand every important red flag immediately after answering.
- See progress without being shamed for mistakes.
- Use the game with a keyboard, on a phone, and with readable contrast.
- Resume local progress without creating an account or sharing personal data.
- Receive a final summary that identifies strengths and the next topics to practise.

## Goals

1. Teach transferable phishing-recognition habits through scenario decisions.
2. Deliver a responsive browser-first experience suitable for a portfolio demo and classroom sharing.
3. Make the rules, scenario content, and feedback deterministic, typed, testable, and version-controlled.
4. Use honest product language: the MVP is adaptive through explicit rules, not generative AI.
5. Document the original limitations and verified improvements.

## Non-goals

- Real email scanning, browser monitoring, or security enforcement.
- Collection of names, emails, telemetry, or organization data in the MVP.
- A competitive leaderboard or social ranking.
- A paid API, hosted model, or account system as a prerequisite.
- A claim of formal compliance, production readiness, or measured reduction in phishing incidents.
- Recreating the existing Pygame board as a website.

## Functional Requirements

### Scenario play

- Present a sequence of curated scenarios with a communication type, sender/context, body or visual content, and relevant evidence.
- Support at least email, SMS, QR-code, login-page, and social-engineering scenarios in the MVP dataset.
- Offer `Trust`, `Report`, and `Inspect` actions, with `Inspect` opening evidence rather than submitting an answer.
- Let users inspect sender identity, domains, links, urgency language, attachment details, and other available evidence without relying on hover alone.
- Prevent accidental double submission and make the current step obvious.

### Feedback and learning

- Explain whether the decision was appropriate.
- Explain each red flag and why it matters in plain language.
- Explain a safer next action, such as verifying through a known channel or reporting the message.
- Offer an optional hint without revealing the answer too early.
- Show a short debrief after every scenario and a final learning summary.

### Progression and results

- Include explicit difficulty levels that increase ambiguity, context switching, and evidence subtlety.
- Track score, streak, accuracy, scenario count, and performance by category.
- Use a deterministic adaptive selector that gives more practice to categories where the player is making mistakes.
- Persist progress locally, with a visible reset option.
- Make progress understandable without implying that a game score is a real-world security rating.

### Content and operations

- Store scenarios in curated, version-controlled JSON with a schema and validation tests.
- Keep answer keys and rationales separate from any presentation-only rendering concerns.
- Provide a documented authoring and review checklist for new scenarios.

## Non-functional Requirements

- Browser-based and responsive at mobile and desktop widths, with a static Vite build suitable for GitHub Pages.
- TypeScript domain logic with no required server for the MVP.
- Fast initial load on a normal consumer connection and usable without a network after the app has loaded, where the selected build tooling supports it.
- Deterministic tests for scoring, selection, persistence, validation, and core player journeys.
- No paid service required to install, run, test, or deploy.
- Errors must fail safely: invalid scenario content must not silently enter play.

## Security and Privacy Requirements

- Treat scenario text, links, and QR imagery as educational fixtures; never make links actionable by default.
- Do not ask users to enter credentials, upload personal messages, or provide real organizational data.
- Do not store personal identifiers. Local progress must use a namespaced, versioned storage key and tolerate corruption.
- Sanitize or safely render all scenario content; no raw HTML injection from JSON.
- Do not include working credential-harvesting pages or malware payloads in the dataset.
- Label fictional domains and training content clearly where confusion is possible.
- Keep dependencies minimal, pinned or lockfile-controlled, and reviewed for license and security concerns.

## Accessibility Requirements

- Full keyboard operation with a visible focus indicator and logical tab order.
- Semantic headings, landmarks, buttons, and status regions.
- Every action must have an accessible name; icons cannot be the sole label.
- Do not depend on colour alone to communicate risk or correctness.
- Meet WCAG 2.2 AA contrast targets for text and controls where applicable.
- Respect `prefers-reduced-motion` and provide no essential information only through animation.
- Reflow without horizontal scrolling at common mobile widths.
- Use readable line lengths, scalable text, and concise plain-language feedback.
- Make inspection evidence available to screen readers and keyboard users.

## User Stories and Acceptance Criteria

### Scenario decision

As a learner, I want to classify a communication so that I can practise a real-world response.

- A scenario presents one primary decision and a clearly defined set of actions.
- Selecting an action records one answer and moves to feedback without duplicate scoring.
- The result remains understandable with keyboard navigation and a narrow viewport.

### Evidence inspection

As a learner, I want to inspect details so that I can justify my decision.

- Inspection controls expose the sender, domain, destination, urgency, request, and attachment evidence available for that scenario.
- Evidence can be opened and closed by keyboard and has an accessible state.
- Each relevant evidence item is linked to a plain-language explanation after submission.

### Targeted practice

As a learner, I want more practice in weak areas so that the game responds to what I need to learn.

- The selector records category outcomes locally during a run.
- Mistake-heavy categories receive increased selection weight within documented bounds.
- The UI describes this as adaptive practice and makes no generative-AI claim.

### Learning summary

As a learner or trainer, I want a useful summary so that the session leads to a next step.

- The summary includes accuracy, streak, category performance, and at least three concrete learning takeaways when enough scenarios were completed.
- A reset action is available and confirms before deleting local progress.
- The summary does not claim that the score measures workplace readiness.

### Teacher or trainer

As a trainer, I want a self-contained exercise so that I can share it without account setup.

- A fresh session can start without login or network APIs.
- Scenario content has a documented version and source/review status.
- The local setup and test commands are documented.

## Approved Product Decisions

- The MVP is a static client-side web application built with React and TypeScript.
- The MVP requires no authentication, database, backend, paid API, cloud AI service, or runtime Ollama integration.
- The legacy Python/Pygame implementation remains in the repository as historical evidence and is not silently deleted.
- Deterministic adaptive selection is described as adaptive practice, never as AI or intelligence.
- Local browser storage is optional persistence; the game remains usable when storage is unavailable.

## MVP and Future Scope

### MVP

- Browser application with responsive scenario flow.
- Five scenario types and a curated starter dataset.
- Trust/report/inspect-style actions, inspectable evidence, hints, immediate debriefs, and final summary.
- Difficulty progression, deterministic adaptive selection, score/streak/accuracy/category results.
- Local persistence, keyboard support, contrast checks, unit/component tests, and one Playwright journey.
- Portfolio documentation with before-and-after evidence and honest limitations.

### Future scope

- Trainer mode with a locally generated session link or export, without collecting learner identity.
- Additional reviewed scenario packs and localization.
- Optional local Ollama-assisted draft generation behind strict schema validation and human review; this is a future authoring tool only and never a runtime dependency or default content source.
- Installable PWA support if offline use and update behavior are verified to justify it.
- Anonymous, opt-in aggregate research only after a separate privacy and consent design.

## Measurable Success Criteria

These are product acceptance targets, not claims about social impact:

- At least 20 reviewed MVP scenarios cover all five required scenario types and at least four red-flag categories.
- 100% of authored scenarios pass schema and answer/rationale validation in CI.
- Core domain tests cover scoring, streaks, category tracking, adaptive selection, and corrupted local data.
- The essential Playwright journey completes on desktop and mobile viewport configurations.
- Keyboard-only play can complete a scenario and open evidence without a mouse.
- Automated accessibility checks report no critical violations on the main play and summary views.
- No runtime path requires a paid API, account, or remote model.
- README includes screenshots or a GIF, a live demo link when deployed, setup, tests, limitations, and verified before/after evidence.
- Any personal challenge, result, metric, or lesson attributed to Urwah is marked `TODO — confirm with Urwah` until confirmed.

## Verification Status

- **Verified legacy facts:** fixed-size Pygame entry point, duplicate/inconsistent controllers, missing imports, unused-looking dependencies/assets, random attack behavior, sparse education content, tracked generated files, and no meaningful automated tests.
- **Approved rebuild decisions:** the static browser MVP and its constraints listed above.
- **Future possibilities:** optional trainer features, PWA support, localization, and local draft authoring.
- **Requires confirmation:** Urwah's personal project story, measured outcomes, user-testing evidence, and learning reflections.
