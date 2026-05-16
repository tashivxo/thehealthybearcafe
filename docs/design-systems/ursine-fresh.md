---
name: Ursine Fresh
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#3d4a3e'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#6c7b6d'
  outline-variant: '#bbcbbb'
  surface-tint: '#006d37'
  primary: '#006d37'
  on-primary: '#ffffff'
  primary-container: '#2ecc71'
  on-primary-container: '#005027'
  inverse-primary: '#4ae183'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2e2e2'
  on-secondary-container: '#646464'
  tertiary: '#5d5f5f'
  on-tertiary: '#ffffff'
  tertiary-container: '#b2b3b3'
  on-tertiary-container: '#444546'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6bfe9c'
  primary-fixed-dim: '#4ae183'
  on-primary-fixed: '#00210c'
  on-primary-fixed-variant: '#005228'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1b1b1b'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  margin-mobile: 16px
  margin-desktop: 48px
  gutter: 16px
---

## Brand & Style

The design system is built for speed, clarity, and a modern collegiate lifestyle. It translates the raw, utilitarian nature of a canteen into a "Clean & Modern" digital experience. The brand personality is efficient and approachable, designed for students who need to browse, order, and get back to their day without friction.

The visual style leans heavily into Minimalism with a touch of Corporate Modern. It utilizes a strict monochromatic base derived from the logo, paired with a singular, high-energy accent to drive action. Ample whitespace is used to reduce cognitive load during peak rush hours, ensuring that menu items like "Boerewors" or "Tramazeni" are the heroes of the interface. The aesthetic is high-functioning and utilitarian, prioritizing legibility and tap-targets over decorative flair.

## Colors

The palette is anchored by the logo's high-contrast black and white.

- Primary (Fresh Green): A vibrant, appetizing green used exclusively for primary calls to action, price highlights, and available status indicators. It suggests freshness and health.
- Secondary (Onyx): Pure black is reserved for primary headers, the brand mark, and high-emphasis text to ensure maximum readability against white backgrounds.
- Tertiary (Soft Smoke): A very light grey used for container backgrounds, input fields, and divider lines to create subtle depth without clutter.
- Neutral (Steel): A medium grey used for secondary information such as item descriptions, timestamps, and breadcrumbs.

## Typography

The design system utilizes Inter exclusively to achieve a systematic, utilitarian look. The scale is designed for rapid scanning.

Headlines use heavy weights and slight negative letter-spacing to feel impactful and grounded. Body text is kept clean with generous line heights to ensure menu descriptions are legible even on small screens. Labels are used for metadata like "Vegetarian" or "Hot," often employing uppercase styling for immediate distinction.

## Layout & Spacing

This design system follows a Fluid Grid model optimized for mobile-first consumption.

- Mobile: A 4-column grid with 16px side margins. Elements typically span the full width to maximize touch area for menu items like "Wraps" or "Sandwich."
- Desktop: A 12-column grid with a max-width container of 1200px. Content is centered with 48px margins.
- Rhythm: A 4px baseline grid ensures vertical consistency. Spacing between card elements should be `md` (16px), while spacing between disparate sections should be `xl` (32px).

## Elevation & Depth

To maintain a fast and clean aesthetic, this design system avoids heavy shadows. Instead, it uses tonal layers and low-contrast outlines.

- Level 0: The main page background in pure white.
- Level 1: Cards and containers use a 1px border of `#EEEEEE` or a subtle `#F4F4F4` fill.
- Interaction Elevation: Only when a user interacts with a card does a soft ambient shadow (`0px 4px 12px rgba(0,0,0,0.05)`) appear to indicate the active state.
- Modals: Use a heavy backdrop blur (12px) to keep the user focused on the immediate task.

## Shapes

The shape language is Rounded, striking a balance between the organic Bear brand and the geometric efficiency of a modern app.

Standard components like buttons and input fields use a 0.5rem (8px) corner radius. Large containers and product cards use 1rem (16px) to feel friendly and modern. This avoids the sharpness of traditional enterprise software while remaining more structured than a purely pill-shaped social app.

## Components

- Product Cards: Vertical layout on mobile with a full-width image at the top, followed by the item name, a brief description, and the price in the primary green.
- Action Buttons: Primary buttons are solid primary green with white text. Secondary buttons are white with a black 1px border. All buttons have a minimum height of 48px for easy tapping during transit.
- Chips: Used for quick category filtering. Unselected chips have a light grey fill; selected chips are solid black with white text.
- Lists: Menu lists use a clean 1px bottom divider. Each list item should have a chevron icon to indicate drill-down capability.
- Input Fields: Minimalist design with a 1px border that turns black when focused. Labels stay above the field in label-sm typography.
- Quantity Toggles: A simple plus/minus stepper component with a primary green border, used within the cart or item customization screens.
