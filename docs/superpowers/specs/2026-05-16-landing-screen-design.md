# The Healthy Bear Cafe Landing Screen Design

Date: 2026-05-16
Project: The Healthy Bear Cafe
Scope: Integrate the newly created Stitch landing screens into the existing static ordering prototype and keep the experience strong on both mobile and desktop.

## Goal

Use the newest Stitch brochure landing experience as the live root entry for the deployed prototype while preserving the existing working ordering flow:

- landing
- menu
- checkout
- order status

The landing page should introduce the cafe, showcase the brochure-style content, and route users into the existing ordering flow through one clear primary action.

## Approved Flow

The live flow will be:

1. Root entry at `/`
2. Root route serves the newest Stitch home screen from `src/pages/index.html`
3. Primary CTA on that home screen routes into `/menu`
4. Existing ordering flow remains unchanged in responsibility:
   - menu grid
   - menu list
   - checkout
   - order status

The landing screen is informational and promotional. It does not own cart state or checkout behavior.

## Stitch Screen Mapping

Project: `projects/4572700409230072142`

Relevant screens:

- Canonical home screen: `projects/4572700409230072142/screens/79b3f607e2ea4bbd90351b7b82791818`
  - Title: `Home - Brochure & Menu (Desktop)`
- Earlier home screen retained in Stitch but not used as the live prototype entry:
  - `projects/4572700409230072142/screens/8eccd725cc704cf2a53e77001c02ae18`
  - Title: `Home - The Healthy Bear Cafe`
- Existing mobile ordering screens:
  - Menu: `projects/4572700409230072142/screens/ca28e97ade9843a3884c1742d88d8b5f`
  - Menu list: `projects/4572700409230072142/screens/cb3e3321eaab499a82712e1c8cf15ce2`
  - Checkout: `projects/4572700409230072142/screens/9750d15254874b2e9b792e1666969397`
  - Order status: `projects/4572700409230072142/screens/0d612e5419f6414e950f945f3386f6df`

## Recommended Architecture

### Option Chosen

Use the newest Stitch brochure landing screen as the single root experience for the prototype and adapt it so it remains usable on both mobile and desktop.

- Root should open the most recently created Stitch home screen.
- That screen should be lightly adapted for smaller viewports.
- Its navigation and primary CTAs should send users into the same existing menu ordering flow.

### Why This Option

This option best satisfies the project constraints:

- respects the new Stitch assets rather than replacing them
- preserves the current working ordering flow with minimal risk
- uses the newest user-approved Stitch asset as the canonical entry screen
- preserves a stronger brochure presentation while still keeping the primary order path obvious
- reduces routing complexity at the root

## Responsive Contract

### Root Behavior

`/` becomes the canonical landing route instead of a redirect shell.

Responsibilities:

- serve the newest Stitch brochure landing screen directly
- use clean routes in deployment and local file-safe route resolution in the shared runtime

### Landing Screen Responsibilities

The canonical home screen should:

- immediately establish place and brand identity
- offer one obvious primary CTA above the fold
- hand users into the same existing ordering flow
- keep brochure content informational only

The canonical home screen should not:

- create or mutate cart state
- duplicate checkout controls
- split the ordering flow into separate variants by device

## UX Principles Applied

This design follows the referenced skills and plan guidance.

### frontend-design

- keep the Stitch visual direction intact rather than redesigning it
- polish the exported screens with restrained, intentional adjustments only
- preserve Ursine Fresh design tokens and Inter usage
- keep the landing experience visually distinct from the utilitarian ordering flow

### ux-heuristics

The landing experience must meet these usability rules:

- one primary CTA only
- clear page identity on first paint
- no hover-only critical interactions
- obvious handoff from brochure content to ordering
- consistent wording between landing and menu flow
- mobile-safe tap targets
- no dense paragraphs that hide the primary action

## Component-Level Design

### Canonical Home Across Breakpoints

The chosen Stitch brochure screen can carry more editorial depth on desktop while still adapting for smaller screens.

Expected emphasis:

- strong hero and place identity
- atmosphere and venue identity
- richer section layout on large screens
- compressed spacing and readable text sizing on small screens
- featured menu or ordering highlights
- one dominant CTA leading into the ordering flow

Secondary actions are acceptable if they support orientation, but they must not compete visually with the main order path.

## Implementation Plan Boundaries

Implementation should remain minimal and reversible.

### Allowed Changes

- replace the current root redirect so it opens the latest Stitch home screen
- export or sync the canonical Stitch home screen into the workspace
- lightly wire CTAs and navigation on that home screen
- preserve the existing shared ordering runtime and localStorage behavior
- make responsive polish edits that improve mobile and desktop usability

### Avoided Changes

- no rewrite of the working menu, checkout, or order-status logic unless required by integration
- no new backend or data layer
- no redesign of Stitch screens into a custom parallel homepage
- no device-specific duplication of cart or checkout behavior

## Validation Requirements

Validation must be executable and narrow.

### Local Validation

1. Open root and confirm it resolves to the newest Stitch home screen.
2. Confirm the home screen remains readable and navigable on both narrow and wide viewports.
3. Confirm the primary CTA reaches the existing menu page.
4. Confirm menu to checkout to order-status still works end to end.

### UX Validation

Check these heuristics explicitly:

- page identity is obvious
- next step is obvious
- CTA is above the fold or easily discoverable
- labels are consistent
- there are no dead brochure links
- mobile interactions do not rely on hover

### Deployment Validation

After implementation:

1. redeploy to Vercel
2. confirm the root URL works in production
3. confirm the root lands on the new canonical home screen
4. confirm that home screen still works on both mobile and desktop
5. confirm the CTA still hands off to the working ordering flow

## Risks And Controls

### Risk: The newest Stitch home screen is not yet exported into the repo

Control:

- use the confirmed Stitch project and screen IDs to retrieve or target the correct screens

### Risk: brochure CTA wording differs from menu flow wording

Control:

- normalize CTA and label copy during integration so the path remains obvious

### Risk: desktop landing overwhelms the conversion path

Control:

- enforce one dominant CTA and reduce secondary visual competition if necessary

### Risk: the brochure landing becomes too content-heavy on mobile

Control:

- keep brochure sections compressed and protect the first-screen action hierarchy

## Success Criteria

The work is successful when:

- the root URL presents a Stitch landing experience instead of going straight to menu
- the root URL presents the newest Stitch brochure home screen
- that home screen remains usable on both desktop and mobile
- the landing experience routes cleanly into the existing menu flow
- the existing ordering prototype remains functional end to end
- the experience feels clear, polished, and usable on both mobile and desktop

## Notes

- This spec is written for a static HTML prototype deployed on Vercel.
- Cart and order state remain stored in `localStorage`.
- The current implementation already has a functioning menu, checkout, and order-status flow; this work changes the entry experience and landing integration only.