# Codex Nothing Rules

This repository is an evidence-based, Nothing-inspired design library for Codex workflows.
It is not an official Nothing SDK.

## 1. Visual language
- Black-first canvas or light technical canvas.
- Monochrome surfaces with sparse red accent for active/alert states.
- Widget/tile composition with strong structure and low noise.
- Rounded geometry family: circle, pill, rounded square, soft rectangle.

## 2. Typography
- Display/dot style only for high-signal values: time, counters, short metrics.
- Sans typography for body, labels, navigation, and long-form text.
- Keep hierarchy obvious: one primary focus, supporting secondary, compact tertiary metadata.

## 3. Components
- Build from tokens + primitives first.
- Keep widgets modular and composable.
- No generic one-off card styles when an existing primitive fits.

## 4. Interaction and motion
- Motion should be subtle and utility-first.
- No decorative animation noise.

## 5. Guardrails
- No random gradients.
- No decorative shadows.
- No visual clutter.
- No fake claims of official Nothing affiliation.

## 6. Codex behavior
- Codex should default to this design layer for new UI in this repo.
- If adding UI to other projects, copy `src/design`, `src/styles/globals.css`, and `AGENTS.md`.
- Keep all changes maintainable and production-grade.
