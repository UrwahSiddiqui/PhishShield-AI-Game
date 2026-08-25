# Product Design Direction

## Visual Direction and Personality

PhishShield should feel like a modern editorial investigation desk: calm, observant, direct, and a little tactile. Use a deep-neutral foundation with warm paper-like surfaces for the communication artifact. The player studies a communication, opens evidence, forms a judgment, and learns why that judgment matters. The visual language should make the message artifact feel real enough to examine without imitating a live service or creating panic.

Use charcoal and deep navy-neutral framing, warm off-white and soft stone surfaces for readable content, cobalt or aubergine for primary actions, amber for suspicious indicators, and coral/red only for a genuine danger or incorrect outcome. Avoid neon-green hacker styling, generic dark cybersecurity dashboards, glossy gradients, and decorative noise. The scenario itself is the visual focus.

## Colour Palette

- `--canvas: #151922` deep-neutral page foundation.
- `--panel: #202631` deep-neutral secondary surface.
- `--paper: #F5F1E8` warm off-white communication surface.
- `--stone: #E5DED1` light surface and dividers.
- `--ink: #172033` primary text on light surfaces.
- `--muted-ink: #536071` secondary text on light surfaces; verify contrast in use.
- `--on-dark: #F5F1E8` text on deep-neutral surfaces.
- `--cobalt: #2457C5` primary action and links.
- `--aubergine: #5A315D` secondary accent and selected states.
- `--amber: #B56B00` suspicious evidence and caution.
- `--coral: #B9433E` danger, error, and incorrect outcome only.
- `--sage: #2E6B56` correct or safe confirmation where contrast permits.
- `--white: #FFFCF6` communication card interior.

Colour is always paired with text, iconography, borders, or patterns. Validate all text and control combinations with an automated contrast check and manual review.

## Typography Hierarchy

Use a distinctive, readable editorial pairing available under a compatible open-source license. Proposed direction: `Source Serif 4` for display headings and `Public Sans` for interface text, loaded locally or through the chosen deployment-safe asset strategy. The final font loading approach and bundle impact are Phase 1 implementation checks.

- Display title: large serif, confident but not oversized.
- Screen heading: medium serif, concise.
- Scenario metadata: small sans, uppercase only when still readable.
- Body and evidence: comfortable sans with generous line height.
- Feedback: short paragraphs and labelled lists, not dense walls of prose.

Do not use viewport-scaled font sizes or tight negative letter spacing. Allow text to wrap naturally.

## Spacing System

Use a 4px base with named steps: `4, 8, 12, 16, 24, 32, 48, 64`. Keep repeated controls at stable dimensions. Use a constrained reading width for message content and a wider shell for progress and navigation. Reserve enough space for long labels and translated text.

## Components and States

- **Primary button:** cobalt fill, paper/white text, clear focus ring, disabled state with text and contrast preserved.
- **Secondary button:** transparent or stone surface with ink border; never visually mistaken for a link.
- **Evidence disclosure:** labelled button with open/closed state, amber marker, and content that remains in document order.
- **Scenario card:** framed communication artifact on a white surface, restrained border, sender/context metadata, and realistic but fictional content.
- **Red-flag marker:** amber or coral accent plus a text label and explanation.
- **Feedback panel:** a clear status heading, answer outcome, rationale, safer action, and next control.
- **Progress strip:** text-readable step count, score, streak, and accuracy; no progress meaning conveyed only by a bar colour.
- **Summary list:** category outcomes with numbers and plain-language interpretation, not a decorative dashboard.

States to design and test: default, hover, keyboard focus, pressed, disabled, loading, empty, invalid content, correct answer, incorrect answer, no-network after load, and corrupted saved progress.

## Responsive Behaviour

At desktop widths, use a two-column investigation layout when it improves comparison: communication artifact as the main column and evidence/progress as a supporting column. At mobile widths, stack the artifact, evidence controls, decision actions, and feedback in a single reading order. Keep primary actions reachable near the thumb and avoid sticky elements that obscure content.

The layout must work without horizontal scrolling at common phone widths. Scenario text, domains, and long URLs must wrap or use a deliberate safe presentation. Test at a narrow mobile viewport and a wide desktop viewport before release.

## Accessibility and Contrast

Use semantic headings and landmarks. Provide a skip link, visible focus treatment, sufficient target size, and logical tab order. The player must be able to inspect evidence, decide, read feedback, and continue using a keyboard alone. Screen readers should hear scenario type, progress, action result, and status changes without unnecessary repetition.

Meet WCAG 2.2 AA contrast targets where applicable, and pair every danger/safety colour with a label. Respect reduced motion; page-load reveals should be short and non-essential. Avoid autoplay sound and do not make audio a required learning signal.

## Interaction and Animation Rules

Use controlled motion to establish hierarchy: a short page-load reveal, a restrained evidence-panel transition, and a quiet feedback entrance. Do not animate score changes in a way that delays reading or suggests arcade rewards. Disable or reduce transitions under `prefers-reduced-motion`. Never use motion to hide, reveal, or communicate essential information by itself.

## Screen Descriptions

### Start

A concise purpose statement, privacy note explaining local-only progress, session length, and a clear start/resume action. The first viewport should feel like the beginning of an investigation, not a marketing hero.

### Scenario

A progress header, communication artifact, inspectable evidence, decision actions, and optional hint. The message is the primary object. Evidence should feel like annotations a learner can deliberately open.

### Feedback

A focused debrief immediately below or replacing the decision area. Explain the verdict, specific red flags, why they matter, and what the learner should do in real life. Keep the next action obvious.

### Summary

A calm report of accuracy, streak, category performance, and practical takeaways. Include replay and reset controls. Do not use badges or rankings as the main learning signal.

## Explicitly Avoid

- Generic AI-dashboard layouts with floating metric cards everywhere.
- Dark backgrounds with neon-green code motifs.
- Purple-on-white gradients as the only visual identity.
- Card nested inside card compositions.
- Oversized hero copy that delays the first exercise.
- Decorative diagrams that compete with communication evidence.
- Tiny text, hover-only interactions, and red/green-only feedback.
