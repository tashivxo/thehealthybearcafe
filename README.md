# The Healthy Bear Cafe

Static HTML prototype for The Healthy Bear Cafe ordering flow.

## Routes

- `/` -> home / brochure landing page
- `/menu` -> main menu grid
- `/menu/list` -> alternate list-view menu
- `/checkout` -> checkout flow
- `/orders` -> order status / confirmation

## Project Structure

```text
thehealthybearcafe/
├── public/
│   ├── index.html
│   ├── menu/
│   ├── checkout/
│   ├── orders/
│   ├── scripts/
│   ├── styles/
│   ├── images/
│   │   └── stitch-reference/
│   ├── icons/
│   └── fonts/
├── src/
│   ├── pages/
│   │   ├── index.html
│   │   ├── menu.html
│   │   ├── menu-list.html
│   │   ├── checkout.html
│   │   └── orders.html
│   ├── styles/
│   │   ├── main.css
│   │   └── components.css
│   └── scripts/
│       └── main.js
├── vercel.json
└── README.md
```

## Notes

- The UI remains Stitch/Tailwind CDN based.
- Shared cart and order state lives in `localStorage` and is handled by `src/scripts/main.js`.
- `src/` holds the authored source structure.
- `public/` holds the deployable runtime files Vercel serves directly.
- Vercel clean URLs are configured in `vercel.json`.
