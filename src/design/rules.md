# Design Rules: Nothing-Inspired Web Layer

## 1. Visual foundation
- The default canvas is black or near-black.
- Surfaces should use a narrow range of dark neutrals.
- White cards are used selectively to create emphasis and rhythm.
- Red is reserved for active, alert, recording, limit, or destructive states.

## 2. Geometry
Use a small family of shapes consistently:
- circle
- pill
- rounded square
- soft rectangle

Avoid sharp-cornered generic admin panels.

## 3. Typography
Typography must be split into two roles:

### Display typography
Use dot-style or display-style treatment only for:
- clocks
- counters
- dates
- timers
- progress numbers
- short metric readouts

### Interface typography
Use a clean sans-serif for:
- labels
- paragraphs
- menus
- metadata
- descriptions
- settings
- longer card content

## 4. Information hierarchy
Everything should feel glanceable:
- large primary number or status
- small utility label
- compact supporting metadata
- minimal visual clutter

## 5. Motion
Motion should be:
- sparse
- deliberate
- low-amplitude
- utility-focused

No decorative animation noise.

## 6. Iconography
Icons should be:
- monochrome
- thin or medium stroke
- low-noise
- simple
- functional

## 7. Composition
Build UI out of reusable tiles:
- small tile
- medium tile
- large tile
- wide tile
- circular tile
- pill tile

Prefer modular composition over large monolithic panels.

## 8. Color behavior
- black-first
- white sparingly
- red rarely but decisively
- no random accent colors
- avoid blue-heavy SaaS styling
- avoid colorful gradients

## 9. Web adaptation constraints
This is a web adaptation of an evidence-based design direction, not an official SDK.
Do not describe implementation details as official Nothing standards.

## 10. Engineering rules
- reuse primitives
- keep files small
- desktop-first
- responsive
- accessible
- avoid over-abstraction
- no unnecessary dependencies
