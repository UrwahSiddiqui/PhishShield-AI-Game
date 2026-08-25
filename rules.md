# Project Rules

## Engineering Conventions

- Prefer small, typed modules with one clear responsibility.
- Keep domain rules pure and independent of React, the DOM, network calls, and localStorage.
- Use descriptive names; avoid one-letter variables except for conventional indexes in very small scopes.
- Preserve public behavior unless the relevant phase documents a replacement.
- Keep changes scoped to the active phase and update documentation when a decision changes.
- Use ASCII by default in source and documentation unless content requires otherwise.
- Do not add comments that merely narrate obvious code. Explain only non-obvious constraints.

## Security Requirements

- Never add secrets, tokens, credentials, personal information, or proprietary material.
- Treat scenario content and localStorage as untrusted input at runtime.
- Render scenario content safely; never inject authored HTML.
- Make example links and QR destinations inert and clearly educational.
- Do not include real credential collection, malware, exploit code, or instructions that enable abuse.
- No paid API or remote model may be required for a working build.
- Review new dependencies, licenses, update posture, bundle impact, and security purpose before adding them.
- Do not claim formal compliance, production readiness, measured impact, or AI capabilities without evidence.

## UI and Accessibility Rules

- Use semantic HTML and native controls before custom interaction primitives.
- Every action must work with keyboard, have a visible focus state, and have an accessible name.
- Never use colour alone for correctness, danger, or category meaning.
- Keep body text readable, line lengths controlled, and contrast at WCAG 2.2 AA targets where applicable.
- Support narrow mobile widths without horizontal scrolling.
- Respect reduced-motion preferences and keep motion subordinate to comprehension.
- Do not make hover the only way to inspect evidence.
- Use icons only as reinforcement; use text for unfamiliar actions.
- Avoid generic dark hacker dashboards, neon-green palettes, and decorative UI that competes with the scenario.

## Testing Requirements

- Add unit tests for every new rule or state transition.
- Test valid, invalid, empty, boundary, and repeated-action cases where relevant.
- Add component tests for decision, evidence inspection, feedback, persistence recovery, and reset behavior.
- Maintain at least one Playwright journey for start, inspect, answer, feedback, and summary.
- Run keyboard and responsive checks for the primary journey.
- Validate all bundled scenario content against its schema in tests or build validation.
- A phase is not complete until its documented tests and exit criteria pass.

## Git and Commit Conventions

- Work on a task branch; never push directly to `main`.
- Use focused commits with imperative subjects, such as `Add scenario schema validation`.
- Keep documentation and implementation changes logically grouped.
- Do not commit generated build output, caches, `__pycache__`, `.pyc`, local environment files, or secrets.
- Review `git diff` and `git status` before committing.
- Do not rewrite history or discard unrelated user changes.

## Dependency Rules

- Prefer the existing toolchain when it meets the requirement.
- Add the smallest well-maintained free/open-source dependency that solves a real problem.
- Record the purpose and trade-off in Architecture.md or the relevant decision record.
- Keep lockfiles committed for the selected JavaScript package manager.
- Remove unused dependencies; the legacy Python requirements are evidence to assess, not a reason to carry unused packages into the browser build.

## What Must Not Be Used

- Paid LLM APIs as a runtime requirement.
- Unverified claims of AI-generated or AI-powered gameplay.
- Real phishing links, credential forms, malware, or harmful payloads.
- Colour-only alerts, keyboard traps, inaccessible custom controls, or hover-only evidence.
- Autoplay audio as an essential signal.
- Analytics or tracking without an explicit privacy decision and consent design.
- A server or database in the MVP without a documented need.
- Large rewrites outside the active phase.

## Scope Control

- Do not begin implementation until the foundation documents are reviewed and approved.
- Complete phases in order; do not start a dependent phase while the previous exit criteria fail.
- Resolve the smallest user-facing learning problem that meets the current phase.
- Record deferred ideas in the roadmap instead of quietly expanding scope.
- Preserve the old prototype until the replacement has documented value and a migration or archival decision.
- Keep the new web application in its own web-app directory or clearly separated source tree; do not make Python runtime dependencies part of the web build.

## Documentation-Writing Rules

- State whether a claim is verified from code, history, a test, or a proposal.
- Never invent Urwah's experiences, challenges, results, metrics, or lessons. Use `TODO — confirm with Urwah` where personal context is missing.
- Avoid marketing filler including `cutting-edge`, `revolutionary`, `seamless`, and `robust solution`.
- Explain learning purpose, security boundaries, accessibility choices, and known limitations plainly.
- Add screenshots, demo links, and measured results only when they exist and are verified.

## Manual Testing

Before reporting a phase complete, perform a short manual pass in a current desktop browser and a narrow mobile viewport. Use the checklist in README.md when it exists, or record the exact temporary steps in memory.md. At minimum, manually verify start/setup, scenario inspection, decision submission, feedback, summary, replay/reset, keyboard-only operation, visible focus, reduced motion, narrow-width layout, and behavior when localStorage is unavailable or contains invalid data.
