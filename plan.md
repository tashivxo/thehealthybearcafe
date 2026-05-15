## 0. Agent Skills Reference

> **Read this section first.** Any agent implementing this plan must follow both skills below.

### 0.1 `frontend-design` — Design Constraints for This Project

This skill normally recommends avoiding Inter and generic fonts. **Exception here:** Inter is mandated by the Ursine Fresh design system — use it. All other guidance applies:

- Honour every Ursine Fresh token (§2) exactly — no approximations, no new colours
- CSS-first animations for all micro-interactions (§8); JS only where state is required
- Production-grade, fully functional code — no placeholders, no lorem ipsum
- When adapting Stitch exports: keep their Tailwind config block intact; only add/modify JS and wire-up logic
- Bold, intentional aesthetic already established by Stitch — do not redesign, only polish and wire

### 0.2 `preview-dev` — Static HTML Preview Workflow

For this project the stack is **plain HTML + Tailwind CDN**. No server, no build step.

- Serve from the `thehealthybearcafe/` directory: `preview_serve(dir="thehealthybearcafe")` — no `command` or `port` needed for static HTML
- After `preview_serve` resolves: **check `health_check.ok` before reporting success**
  - `directory_listing` → `index.html` missing; create it
  - `blank_page` → JS error or CDN blocked; read the file, fix in place
  - `404` on resources → path is absolute; change `/path` → `./path`
- Fix bugs **in the existing file** (`edit_file`) — never create a parallel replacement file
- Restart: `preview_stop(old_id)` then `preview_serve` with the same dir
- Use relative paths everywhere (`./js/cart.js`, `./images/bear-logo.svg`) — absolute paths break `file://` opens too

---

# The Healthy Bear Cafe — Frontend Implementation Plan

> **Design system:** Ursine Fresh  
> **Project:** Modern Canteen Ordering Platform  
> **Target platform:** Mobile-first web (primary viewport 780px)  
> **Tech stack:** Plain HTML + Tailwind CSS (CDN) + Vanilla JS  
> **Date drafted:** 2026-05-15

---

## 1. Project Overview

The Healthy Bear Cafe is a South African campus canteen ordering app. Students browse a menu, add items to a cart, check out, and track their order status in real time. The experience is entirely mobile-first — fast, tap-friendly, zero friction.

### Goals
- Faithfully recreate the four functional screens exported from Stitch Design
- Keep every design token from the **Ursine Fresh** design system intact
- Ship zero-build-step HTML/CSS/JS that opens in any browser
- Layer in tasteful micro-interactions that elevate the static designs
- Persist cart state in `localStorage` so a page refresh doesn't wipe the order

### Audience
University / college students on campus during lunch rush. They need to order quickly, ideally in under 60 seconds from menu open to order confirmed.

---

## 2. Design System — Ursine Fresh

All values come directly from `DESIGN.md` and the Tailwind config embedded in `code.html`.

### 2.1 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#006d37` | Header text, brand mark, icon accents |
| `primary-container` | `#2ecc71` | CTA hover fill, badges, availability chip |
| `on-primary` | `#ffffff` | Text on solid primary buttons |
| `on-primary-container` | `#005027` | Text on light-green surfaces |
| `background` / `surface` | `#fbf9f8` | Page background (warm white, not pure white) |
| `surface-container-lowest` | `#ffffff` | Cards — purest white to create lift |
| `surface-container-low` | `#f5f3f3` | Subtle inset sections |
| `surface-container` | `#efeded` | Skeleton loaders, pressed states |
| `on-surface` | `#1b1c1c` | Primary body text |
| `on-surface-variant` | `#3d4a3e` | Secondary/helper text |
| `outline-variant` | `#bbcbbb` | Card borders, dividers |
| `outline` | `#6c7b6d` | Input borders, prominent dividers |
| `error` | `#ba1a1a` | Validation errors |
| `inverse-surface` | `#303031` | Dark chip selected state (black pill) |
| `inverse-on-surface` | `#f2f0f0` | Text on dark chips |

### 2.2 Typography Scale

All fonts: **Inter** (Google Fonts, weights 400/500/600/700).  
Icon font: **Material Symbols Outlined** (variable, wght + FILL axes).

| Token | Size | Weight | Line-Height | Letter-Spacing | Usage |
|---|---|---|---|---|---|
| `display-lg` | 32px | 700 | 40px | -0.02em | Hero headings (desktop) |
| `display-lg-mobile` | 28px | 700 | 34px | — | Hero headings (mobile) |
| `headline-md` | 24px | 600 | 32px | -0.01em | Section headers |
| `headline-sm` | 18px | 600 | 24px | — | Card titles, screen titles |
| `body-lg` | 16px | 400 | 24px | — | Menu descriptions, body copy |
| `body-sm` | 14px | 400 | 20px | — | Secondary copy, timestamps |
| `label-bold` | 12px | 700 | 16px | — | Prices, status labels |
| `label-sm` | 12px | 500 | 16px | — | Meta info, sub-labels |

### 2.3 Spacing Scale

Base unit = **4px**.

| Token | Value | Typical use |
|---|---|---|
| `xs` | 4px | Icon padding, tight gaps |
| `sm` | 8px | Inter-element gap within a component |
| `md` | 16px | Card internal padding; gap between card fields |
| `lg` | 24px | Section internal gap |
| `xl` | 32px | Between major sections on a page |
| `margin-mobile` | 16px | Horizontal page gutter (mobile) |
| `margin-desktop` | 48px | Horizontal page gutter (desktop) |

### 2.4 Border Radius

| Token | Value | Usage |
|---|---|---|
| `sm` | 4px | Chips text tags, small badges |
| `DEFAULT` | 8px | Buttons, input fields |
| `md` | 12px | Standard card corners |
| `lg` | 16px | Large product image cards |
| `xl` | 24px | Bottom sheet modals |
| `full` | 9999px | Pills (CTA buttons, filter chips) |

### 2.5 Elevation & Shadow

The design system avoids heavy shadows. Only two shadow levels are used:

| Level | CSS Value | Used on |
|---|---|---|
| Level 0 | none | Background, non-interactive surfaces |
| Level 1 | `1px solid #bbcbbb` (border) | Cards, input fields |
| Interaction | `0px 4px 12px rgba(0,0,0,0.05)` | Hovered / active card, bottom bar |
| Modal backdrop | `backdrop-blur: 12px` | Overlays / bottom sheets |

---

## 3. Screen Inventory & User Flow

### 3.1 Screen List

> **Stitch export base folder:**
> `c:\Users\tashi\Downloads\stitch_modern_canteen_ordering_platform (1)\stitch_modern_canteen_ordering_platform\`

| # | Screen Name | File | Dimensions | Status |
|---|---|---|---|---|
| 1 | Menu — Card View | `menu-card.html` | 780×3710 | ✅ Exported — adapt `stitch.../menu_the_healthy_bear_cafe/code.html` |
| 2 | Menu — List View | `menu-list.html` | 780×2856 | 🔲 Build from scratch — `stitch.../menu_list_view/screen.png` reference only |
| 3 | Checkout — Order Summary | `checkout.html` | 780×1768 | ✅ Exported — already in repo as `code.html` |
| 4 | Order Status — Track Your Meal | `order-status.html` | 780×1768 | ✅ Exported — adapt `stitch.../order_status_track_your_meal/code.html` |

> Reference images (WhatsApp screenshots, 1200×1600) are in `stitch.../whatsapp_image_2026_05_15_at_10.21.25.jpeg/` and `stitch.../whatsapp_image_2026_05_15_at_10.21.26.jpeg/` — use for Screen 2 and any ambiguous detail.

### 3.2 User Flow

```
[Menu — Card View]
        │  tap item card → quick-add or detail modal
        │  tap list icon (top-right) →
        ▼
[Menu — List View]
        │  tap item →  add to cart
        │  tap cart FAB / "View Order" →
        ▼
[Checkout — Order Summary]
        │  select pickup time → select payment → Place Order →
        ▼
[Order Status — Track Your Meal]
        │  real-time (simulated) status steps
        ▼
   [Order Complete / Home]
```

### 3.3 Screen Descriptions

#### Screen 1 — Menu: Card View (`menu-card.html`)
- **Purpose:** Primary menu discovery. Hero screen. First thing a student sees.
- **Key sections:**
  - Fixed header: back arrow + "The Healthy Bear Cafe" (primary green) + cart icon with badge counter
  - Horizontal scrolling category filter chips: All · Breakfast · Mains · Sides · Drinks · Snacks
  - Scrollable masonry/grid of **Product Cards** (2-column on 780px)
  - Each card: full-width food image top, item name (headline-sm), brief description (body-sm, 2-line clamp), price (label-bold, primary green)
  - Floating cart summary bar at bottom (shows "N items · RXX.XX · View Order")
- **South African menu items:** Boerewors, Tramazeni, Chip Roll, Panini, Wings + Chips, Prego Roll, Vetkoek, Chicken Mayo, Gatsby, Bunny Chow (portions thereof)
- **Interactions:** Category chip tap filters grid; "+" taps increment quantity and animate badge; list-view toggle in header

#### Screen 2 — Menu: List View (`menu-list.html`)
- **Purpose:** Alternative dense view for users who prefer scanning by name/price.
- **Key sections:**
  - Same fixed header as Card View (active state on list icon)
  - Category section headers (headline-sm, sticky on scroll)
  - List rows: small square thumbnail (left) · name + description · price + "+" button
  - Each row: 72px height, 1px bottom divider, chevron icon on right
  - Same floating cart bar at bottom
- **Interactions:** Tap row navigates to item detail; "+" inline adds to cart

#### Screen 3 — Checkout: Order Summary (`checkout.html` ← `code.html`)
- **Purpose:** Review, time-select, pay, confirm.
- **Key sections:**
  - Fixed header: back arrow + "Checkout" (primary green)
  - **Order Summary card** — line items with quantities + individual prices + subtotal
  - **Pickup Time selector** — 2-option toggle (ASAP ~15 min / Schedule); reveals horizontal time-slot scroll when Schedule selected
  - **Payment Method** — three radio options: Credit/Debit Card · Apple Pay · Cash on Pickup
  - Fixed bottom action bar: Total (headline-md, primary) + "Place Order" pill CTA (primary green)
- **Already exported.** Rename `code.html` → `checkout.html`

#### Screen 4 — Order Status: Track Your Meal (`order-status.html`)
- **Purpose:** Post-order confirmation and live status tracking.
- **Key sections:**
  - Fixed header: close/home icon + "Order #XYZ" + share icon
  - Large status hero: animated bear icon or checkmark + status headline (e.g., "Being Prepared")
  - **Progress stepper** (vertical): Order Placed → Being Prepared → Ready for Pickup — with timestamps and active step highlighted in primary green
  - **Order details summary** collapsible card (items ordered, total)
  - Estimated ready time callout ("Ready at 12:45 PM")
  - "Back to Menu" secondary action at bottom
- **Interactions:** Stepper animates to next state after simulated delay (setTimeout); progress bar pulses on active step

---

## 4. Technical Architecture

### 4.1 Tech Stack Decision

| Concern | Choice | Rationale |
|---|---|---|
| HTML framework | **None — plain HTML** | Stitch exports vanilla HTML; zero build pipeline needed; works by opening file:// |
| CSS framework | **Tailwind CSS v3 via CDN** | Already used in the exported code; full design token support via `tailwind.config` |
| Icons | **Material Symbols Outlined** | Already embedded in Stitch export |
| Font | **Inter** via Google Fonts | Design system mandates Inter only |
| State | **localStorage** (vanilla JS) | Cart persistence without a backend |
| Routing | **href links** between HTML files | No SPA needed for 4 pages |
| Animation | **CSS transitions + `@keyframes`** | No extra JS library needed for the interaction level required |
| Images | **Placeholder images → Unsplash CDN** | Until real food photography is provided |

> **No build step. No npm. No bundler.** Every file opens directly in a browser.

### 4.2 Cart State Schema (localStorage)

```json
{
  "cart": [
    {
      "id": "panini",
      "name": "Panini",
      "price": 30.00,
      "quantity": 1,
      "image": "images/panini.jpg"
    }
  ],
  "lastUpdated": "2026-05-15T12:00:00Z"
}
```

Helper functions in `js/cart.js`:
- `getCart()` — read from localStorage
- `addItem(item)` — add or increment
- `removeItem(id)` — decrement or remove
- `clearCart()` — on order confirmed
- `getTotal()` — sum of price × quantity
- `getCount()` — sum of quantities (for badge)

### 4.3 Shared Tailwind Config

A single `tailwind.config` object defined in `js/tailwind-config.js` will be injected into every page's `<script id="tailwind-config">` tag. This is the single source of truth for all design tokens.

---

## 5. File & Folder Structure

```
thehealthybearcafe/
├── plan.md                       ← This document
├── DESIGN.md                     ← Ursine Fresh design system spec (from Stitch)
├── code.html                     ← Original Stitch checkout export (rename → checkout.html)
│
├── index.html                    ← Redirects to menu-card.html (entry point)
├── menu-card.html                ← Screen 1: Menu card grid view  (adapted from Stitch export)
├── menu-list.html                ← Screen 2: Menu list view       (built from scratch)
├── checkout.html                 ← Screen 3: Checkout             (renamed from code.html)
├── order-status.html             ← Screen 4: Order status tracker (adapted from Stitch export)
│
├── css/
│   └── globals.css               ← Body base styles, custom scrollbar, animation keyframes
│
├── js/
│   ├── tailwind-config.js        ← Shared Tailwind token config (pasted into each page)
│   ├── cart.js                   ← Cart localStorage helpers
│   ├── menu-data.js              ← Menu items JSON array (name, price, category, image)
│   ├── menu-card.js              ← Card view logic (filter, add-to-cart, badge)
│   ├── menu-list.js              ← List view logic
│   ├── checkout.js               ← Pickup time toggle, order placement
│   └── order-status.js           ← Stepper animation, simulated status updates
│
├── images/
│   ├── bear-logo.svg             ← Brand mark (bear icon in primary green)
│   ├── boerewors.jpg
│   ├── panini.jpg
│   ├── chips.jpg
│   ├── tramazeni.jpg
│   ├── chip-roll.jpg
│   ├── prego-roll.jpg
│   ├── vetkoek.jpg
│   ├── chicken-mayo.jpg
│   └── drinks.jpg
```

> **Stitch reference exports** (read-only, never modify):
> ```
> c:\Users\tashi\Downloads\stitch_modern_canteen_ordering_platform (1)\
> stitch_modern_canteen_ordering_platform\
> ├── checkout_order_summary\code.html          ← Screen 3 source (already copied as code.html)
> ├── menu_the_healthy_bear_cafe\code.html       ← Screen 1 source
> ├── order_status_track_your_meal\code.html     ← Screen 4 source
> ├── menu_list_view\screen.png                  ← Screen 2 reference image
> ├── ursine_fresh\DESIGN.md                     ← Design system source
> ├── whatsapp_image_2026_05_15_at_10.21.25.jpeg\
> └── whatsapp_image_2026_05_15_at_10.21.26.jpeg\
> ```

---

## 6. Component Library

Reusable HTML patterns that will be copy-composed across all screens.

### 6.1 TopAppBar

```html
<header class="top-app-bar fixed top-0 w-full max-w-[780px] bg-surface border-b 
               border-outline-variant flex justify-between items-center 
               px-margin-mobile h-14 z-50">
  <!-- Left: back/close button -->
  <!-- Center: screen title -->
  <!-- Right: cart icon with badge OR spacer -->
</header>
```

Variants:
- **Menu** — shows cart icon + item count badge (primary green, label-bold)
- **Checkout** — shows back arrow only (no cart icon)
- **Order Status** — shows close icon + share icon

### 6.2 Product Card (Card View)

```
┌─────────────────────────┐
│  [Food Image 16:9]      │
├─────────────────────────┤
│  Item Name   headline-sm│
│  Description body-sm    │
│  (2-line clamp)         │
├─────────────────────────┤
│  R30.00      [+] button │
│  label-bold             │
└─────────────────────────┘
```

- Full card is tappable (navigates to item detail or inline modal)
- "+" button is independently tappable — adds 1 to cart, animates badge
- On add: card pulses (scale 1.02 → 1.00 in 200ms)
- Border: `1px solid outline-variant`, radius: `lg` (16px)
- Hover desktop: `shadow: 0px 4px 12px rgba(0,0,0,0.05)` + scale(1.01)

### 6.3 Product Row (List View)

```
┌────────────────────────────────────────────────────────┐
│ [48px img]  Name headline-sm      R30.00  [+]  chevron │
│             Desc body-sm                               │
└────────────────────────────────────────────────────────┘
```

- Minimum 72px row height (WCAG tap target)
- 1px bottom divider (`surface-variant`)
- Active/pressed state: `surface-container` background fill

### 6.4 Category Filter Chips

```html
<div class="flex gap-sm overflow-x-auto px-margin-mobile py-sm 
            scrollbar-hide sticky top-14 z-40 bg-surface">
  <button class="chip [unselected]">All</button>
  <button class="chip [selected]">Mains</button>
  ...
</div>
```

States:
- **Unselected:** `bg-surface-container` + `border border-outline-variant` + `text-on-surface`
- **Selected:** `bg-inverse-surface` (black) + `text-inverse-on-surface` (white), no border

### 6.5 Cart Summary Bar (Floating)

Fixed to the bottom, above navigation. Appears only when cart has ≥1 item.

```
┌──────────────────────────────────────────────────────────┐
│  🛒  2 items                         View Order  R65.00  │
└──────────────────────────────────────────────────────────┘
```

- `fixed bottom-0` · `bg-inverse-surface` (dark) · `text-inverse-on-surface`
- Enters with `translateY(100%) → translateY(0)` slide-up animation on first item add
- CTA navigates to `checkout.html`

### 6.6 Quantity Stepper

```
[  −  ]  2  [  +  ]
```

- Outlined with `border-primary`
- "−" disables (opacity 40%) when count is 1
- Count transitions with a 150ms opacity fade on change
- Used in item detail modals and checkout line items

### 6.7 Progress Stepper (Order Status)

Vertical stepper with 3 states per step:

| State | Style |
|---|---|
| **Completed** | Filled circle `bg-primary` + `text-on-primary` + strikethrough timestamp |
| **Active** | Filled circle `bg-primary-container` + pulsing ring animation |
| **Pending** | Outlined circle `border-outline-variant` + muted label |

Connector line between steps: `bg-outline-variant`, fills to `bg-primary` as steps complete.

### 6.8 Time Slot Picker

Horizontal scroll of pill buttons:

```
[10:30 AM]  [11:00 AM]  [11:30 AM]  [12:00 PM]  [12:30 PM]
```

- Unselected: `bg-surface-container border border-outline-variant text-on-surface`
- Selected: `bg-on-surface text-on-primary`
- Hidden by default; appears when "Schedule" toggle is selected

### 6.9 Payment Method Row

```
◉  [icon]  Credit / Debit Card
○  [icon]  Apple Pay
○  [icon]  Cash on Pickup
```

- Each row is a `<label>` wrapping a hidden `<input type="radio">`
- Custom radio rendered with `peer-checked` Tailwind variants
- Radio dot: `border-2 border-primary` when checked (filled `bg-primary` center)

---

## 7. Menu Data (`js/menu-data.js`)

South African campus canteen menu items organised by category.

```js
const MENU = [
  // Mains
  { id: 'boerewors-roll',  name: 'Boerewors Roll',     category: 'mains',   price: 35, description: 'Spicy beef sausage on a toasted roll with caramelised onions', image: 'images/boerewors.jpg', veg: false },
  { id: 'panini',          name: 'Panini',              category: 'mains',   price: 30, description: 'Grilled cheese & tomato panini on ciabatta', image: 'images/panini.jpg', veg: true },
  { id: 'prego-roll',      name: 'Prego Roll',          category: 'mains',   price: 45, description: 'Marinated chicken in peri-peri sauce on a soft roll', image: 'images/prego-roll.jpg', veg: false },
  { id: 'tramazeni',       name: 'Tramazeni',           category: 'mains',   price: 40, description: 'Toasted tramezzini filled with chicken mayo & sweetcorn', image: 'images/tramazeni.jpg', veg: false },
  { id: 'chicken-mayo',    name: 'Chicken Mayo',        category: 'mains',   price: 35, description: 'Creamy chicken mayo in a fresh white bread roll', image: 'images/chicken-mayo.jpg', veg: false },
  { id: 'vetkoek',         name: 'Vetkoek & Mince',     category: 'mains',   price: 28, description: 'Deep-fried dough filled with spiced mince', image: 'images/vetkoek.jpg', veg: false },
  // Sides
  { id: 'large-chips',     name: 'Large Hot Chips',     category: 'sides',   price: 35, description: 'Crispy chips, lightly salted with tomato sauce', image: 'images/chips.jpg', veg: true },
  { id: 'chip-roll',       name: 'Chip Roll',           category: 'sides',   price: 22, description: 'Chips stuffed into a white bread roll — a South African classic', image: 'images/chip-roll.jpg', veg: true },
  { id: 'wings',           name: 'Wings & Chips',       category: 'sides',   price: 55, description: '6 peri-peri chicken wings with a side of chips', image: 'images/wings.jpg', veg: false },
  // Drinks
  { id: 'coke',            name: 'Coke 500ml',          category: 'drinks',  price: 20, description: 'Ice-cold Coca-Cola', image: 'images/drinks.jpg', veg: true },
  { id: 'orange-juice',    name: 'Orange Juice',        category: 'drinks',  price: 18, description: 'Freshly squeezed orange juice', image: 'images/oj.jpg', veg: true },
  // Breakfast
  { id: 'egg-sandwich',    name: 'Egg Sandwich',        category: 'breakfast', price: 25, description: 'Scrambled egg on toasted white bread', image: 'images/egg-sandwich.jpg', veg: true },
];
```

Categories array: `['all', 'breakfast', 'mains', 'sides', 'drinks']`

---

## 8. Design Enhancements & Micro-Interactions

Beyond the static Stitch design, these enhancements are planned to make the app feel alive. All are CSS-first; JavaScript only where state is needed.

### 8.1 Page Transitions
Each page fades in on load:
```css
@keyframes page-enter {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
body { animation: page-enter 200ms ease-out both; }
```

### 8.2 Cart Badge Bounce
When an item is added, the cart icon badge performs a quick scale pop:
```css
@keyframes badge-pop {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.4); }
  100% { transform: scale(1); }
}
.badge-animate { animation: badge-pop 250ms cubic-bezier(0.34, 1.56, 0.64, 1); }
```

### 8.3 Card Add-to-Cart Feedback
A quick ripple or green flash on the "+" button confirms the add without a toast notification:
```css
@keyframes add-flash {
  0%   { background-color: #2ecc71; }
  100% { background-color: transparent; }
}
```

### 8.4 Cart Summary Bar Slide-Up
```css
@keyframes slide-up {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
.cart-bar { animation: slide-up 300ms cubic-bezier(0.16, 1, 0.3, 1) both; }
```

### 8.5 Order Status Pulse (Active Step)
```css
@keyframes status-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.5); }
  50%       { box-shadow: 0 0 0 8px rgba(46, 204, 113, 0); }
}
.step-active { animation: status-pulse 1.5s ease-in-out infinite; }
```

### 8.6 Category Filter Chip Scroll Fade
Left/right gradient fade-out on the chip scroll container to indicate more chips exist off-screen:
```css
.chips-container {
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 16px, black calc(100% - 16px), transparent 100%);
}
```

### 8.7 Skeleton Loaders
While images load, show grey placeholder rectangles with shimmer animation instead of broken image icons:
```css
@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #e4e2e2 25%, #efeded 50%, #e4e2e2 75%);
  background-size: 200%;
  animation: shimmer 1.5s infinite;
}
```

### 8.8 Pickup Time Toggle Expand
"Schedule" option reveals the time-slot row with a smooth max-height expand:
```css
#time-slots {
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms ease, opacity 200ms ease;
  opacity: 0;
}
#time-slots.visible {
  max-height: 60px;
  opacity: 1;
}
```

---

## 9. Implementation Phases

> **Stitch exports** are the canonical visual starting points for screens 1, 3, and 4.  
> Each phase that uses an export starts with: **copy → preview → wire up JS**.  
> Screen 2 has no export; build it from scratch using `screen.png` and the component library (§6).

---

### Phase 1 — Foundation (Day 1)
- [ ] Copy `code.html` (checkout Stitch export already in repo) → rename to `checkout.html`
- [ ] Create `index.html` (redirect to `menu-card.html`)
- [ ] Create `css/globals.css` — body reset, `scrollbar-none`, animation `@keyframes` from §8
- [ ] Create `js/tailwind-config.js` — shared Tailwind token config object (single source of truth)
- [ ] Create `js/cart.js` — `getCart / addItem / removeItem / clearCart / getTotal / getCount`
- [ ] Create `js/menu-data.js` — full `MENU` array from §7
- [ ] Add `images/bear-logo.svg` (inline SVG bear head in primary green `#006d37`)
- [ ] Set all menu item images to Unsplash CDN URLs (landscape food photos matching each item)

**Checkpoint:** Open `checkout.html` in browser — must be pixel-identical to the Stitch export.

---

### Phase 2 — Checkout Polish (Day 1)

> **Start from:** `stitch.../checkout_order_summary/code.html` (already in repo as `code.html`)

- [ ] Copy the Tailwind `<script>` config block from the export into `js/tailwind-config.js`
- [ ] Wire `cart.js` so `checkout.html` reads `getCart()` on load and renders line items dynamically
- [ ] Implement pickup time toggle: "ASAP" (default) / "Schedule" — Schedule reveals `#time-slots` with `max-height` expand (§8.8)
- [ ] Add "Place Order" handler in `js/checkout.js`:
  - Write `{ items, total, timestamp }` to `localStorage.order`
  - Call `clearCart()`
  - `window.location.href = './order-status.html'`
- [ ] Verify payment radio custom styling matches Stitch export exactly (peer-checked Tailwind pattern from §6.9)

**Checkpoint:** Full checkout flow — cart total correct, pickup toggle works, Place Order redirects to (stub) order-status page.

---

### Phase 3 — Order Status Screen (Day 2)

> **Start from:** `stitch.../order_status_track_your_meal/code.html`

- [ ] Copy Stitch export HTML into `order-status.html`
- [ ] Remove Stitch scaffolding (if any) — keep all visual HTML/CSS; add `./css/globals.css` and shared Tailwind config links
- [ ] Replace hardcoded order detail values with dynamic read from `localStorage.order`
- [ ] Implement vertical progress stepper in `js/order-status.js`:
  - Step 1 "Order Placed" → active immediately (0 s)
  - Step 2 "Being Prepared" → active after `setTimeout(3000)`
  - Step 3 "Ready for Pickup" → active after `setTimeout(8000)`
  - Each transition: move `step-active` class; apply completed styles to previous step; pulsing ring on active (§8.5)
- [ ] Show estimated ready time: `new Date(Date.now() + 15 * 60000)` formatted as "12:45 PM"
- [ ] "Back to Menu" button: clears `localStorage.order`, navigates to `./menu-card.html`

**Checkpoint:** Status screen progresses through all 3 steps smoothly; order items from checkout appear correctly.

---

### Phase 4 — Menu Card View (Day 2–3)

> **Start from:** `stitch.../menu_the_healthy_bear_cafe/code.html`

- [ ] Copy Stitch export HTML into `menu-card.html`
- [ ] Add `./css/globals.css`, `./js/tailwind-config.js`, `./js/cart.js`, `./js/menu-data.js` links
- [ ] In `js/menu-card.js`:
  - On `DOMContentLoaded`: render product cards from `MENU` array into the 2-column grid
  - Each card: food image, name, description (2-line clamp), price, "+" button
  - Category chip filter: tap → re-render grid filtered by category (`all` shows everything)
  - "+" button: `addItem(item)` → update badge count (animate with `badge-pop`, §8.2) → show/update cart bar
  - Cart summary bar: show when `getCount() > 0`, hide otherwise; slide-up on first appearance (§8.4)
  - Cart bar "View Order" → `./checkout.html`
- [ ] List-view toggle in header → `./menu-list.html`
- [ ] Skeleton shimmer on images while loading (§8.7)
- [ ] Category chip container gets mask fade (§8.6)
- [ ] Page fade-in on load (§8.1)

**Checkpoint:** Browse menu, filter categories, add items, see badge animate, cart bar appears, navigate to checkout.

---

### Phase 5 — Menu List View (Day 3)

> **Start from scratch** — use `stitch.../menu_list_view/screen.png` as pixel reference

- [ ] Create `menu-list.html` — same fixed header as card view (list icon in active state)
- [ ] In `js/menu-list.js`:
  - Render list rows grouped by category from `MENU` array
  - Section headers: `headline-sm`, sticky on scroll
  - Each row: 72 px height, 1 px bottom divider, small square thumbnail, name + description, price + "+" button, right chevron
  - "+" button: same `cart.js` wiring as card view
  - Cart bar at bottom: same component, same logic
- [ ] Card-view toggle in header → `./menu-card.html`
- [ ] Cart state shared seamlessly between both views via `localStorage`

**Checkpoint:** List and card views both functional; cart state survives navigation between them.

---

### Phase 6 — Polish & QA (Day 4)
- [ ] Apply all remaining micro-interactions from §8 (verify each `@keyframe` is in `globals.css`)
- [ ] Test at 390 px and 780 px viewports (Chrome DevTools device toolbar)
- [ ] Test full happy path: Menu Card → add 2 items → Checkout → Place Order → Order Status (all 3 steps) → Back to Menu
- [ ] Test cart persistence: add items, refresh page — cart unchanged
- [ ] Fix any content hidden under fixed header (`pt-14` or `mt-14`) or bottom bars (`pb-24`)
- [ ] Run Lighthouse (Accessibility + Performance > 85 each)
- [ ] Fix WCAG AA contrast failures (primary green `#006d37` on white passes at 7.5:1 ✓ — check other combos)

---

## 10. Quality Checklist

### Design Fidelity
- [ ] All color tokens match `DESIGN.md` exactly — no approximate hex values
- [ ] Typography scale applied correctly: no `font-size` inline styles — only Tailwind tokens
- [ ] Spacing uses design tokens (`px-md`, `gap-lg`) — no arbitrary pixel values
- [ ] Border radius tokens applied (`rounded-lg`, `rounded-full`, etc.)
- [ ] Primary action CTA is always `bg-primary text-on-primary rounded-full min-h-[48px]`

### Interaction
- [ ] Every tappable element has `min-height: 48px` or `min-width: 48px` (WCAG 2.5.5)
- [ ] Focus states visible (`:focus-visible` ring in primary green)
- [ ] No content hidden under fixed header (correct `mt-14` or `pt-14` on main content)
- [ ] Fixed bottom bars don't obscure content (correct `mb-24` on scrollable content)
- [ ] Cart badge shows correct count; updates immediately on add/remove

### Accessibility
- [ ] All images have meaningful `alt` text
- [ ] Icons have `aria-label` or `aria-hidden` where decorative
- [ ] Interactive elements are `<button>` or `<a>` — never `<div onClick>`
- [ ] Radio inputs are properly `<label>`-wrapped
- [ ] Colour contrast: primary green `#006d37` on white passes WCAG AA (ratio 7.5:1 ✓)

### Code Quality
- [ ] No inline `style=""` attributes — Tailwind classes only
- [ ] Consistent indentation (2 spaces)
- [ ] All JS wrapped in `DOMContentLoaded` listeners
- [ ] No `console.log` left in production code
- [ ] `cart.js` is the single source of cart truth — no localStorage writes outside it

---

## 11. Reference Assets

All assets are available locally — no downloads needed.

> **Stitch base path:** `c:\Users\tashi\Downloads\stitch_modern_canteen_ordering_platform (1)\stitch_modern_canteen_ordering_platform\`

| Asset | Path (relative to base) | Usage |
|---|---|---|
| Screen 1 Stitch export | `menu_the_healthy_bear_cafe\code.html` | Starting point for `menu-card.html` |
| Screen 2 reference image | `menu_list_view\screen.png` | Visual reference — no HTML export exists |
| Screen 3 Stitch export | `checkout_order_summary\code.html` | Already in repo as `code.html` |
| Screen 4 Stitch export | `order_status_track_your_meal\code.html` | Starting point for `order-status.html` |
| Design system | `ursine_fresh\DESIGN.md` | Token source of truth |
| WhatsApp screenshot 1 | `whatsapp_image_2026_05_15_at_10.21.25.jpeg\` | Original design intent |
| WhatsApp screenshot 2 | `whatsapp_image_2026_05_15_at_10.21.26.jpeg\` | Original design intent |

**How to get them:**
1. Open [Stitch Design](https://stitch.withgoogle.com) in a browser
2. Open the **Modern Canteen Ordering Platform** project
3. For each screen: click the screen → **Export** → **Download as zip**
4. Extract each zip into the workspace root (same process as the checkout zip)
5. Rename each `code.html` to the appropriate filename (`menu-card.html`, etc.)
6. The `screen.png` in each zip is the design reference for that screen

> Alternatively, reference the WhatsApp photos (1200×1600) included as Stitch "screens" 1 and 2 as visual design references while building.

---

## 12. Git Strategy

### Branch Strategy
```
main                ← stable, shipped screens only
├── feature/checkout-screen      ← Phase 2 (nearly done)
├── feature/order-status-screen  ← Phase 3
├── feature/menu-card-screen     ← Phase 4
├── feature/menu-list-screen     ← Phase 5
└── feature/polish-and-qa        ← Phase 6
```

### Commit Convention
```
feat(checkout): wire cart total to localStorage
feat(order-status): animate stepper through 3 states
feat(menu-card): render product grid from menu-data.js
fix(checkout): payment radio checked state not persisting
style(menu-list): sticky category headers on scroll
chore: add bear-logo.svg and food placeholder images
```

### First Commit (after Phase 1)
```bash
git add .
git commit -m "chore: initial commit — Stitch export + plan.md + project scaffold"
```

---

## 13. Open Questions

| # | Question | Decision Needed By |
|---|---|---|
| 1 | Will real food photography be provided, or use Unsplash placeholders indefinitely? | Before Phase 4 |
| 2 | Is a bear logo/SVG available? Or should one be created using CSS/emoji? | Before Phase 1 |
| 3 | Should Apple Pay show as an actual payment option (requires HTTPS + JS API), or is it display-only? | Before Phase 2 |
| 4 | Does the app need a backend/API for real order submission, or is localStorage simulation sufficient for this prototype? | Before Phase 6 |
| 5 | Should the list view and card view share the same URL with a toggle, or be two separate HTML files? | Before Phase 4 |

---

*End of plan. Do not begin implementation until this plan is reviewed and confirmed.*
