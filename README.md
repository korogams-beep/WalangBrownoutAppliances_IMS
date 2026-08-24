# WalangBrownout Inventory Management — Frontend

Built with plain React + Vite + CSS Modules + React Router, matching the Figma wireframes
(Login, Dashboard, Product, Add/Edit Product, Locations, Transactions, Receive New Batch,
Record Transaction, Reports, Alerts, Settings). No shadcn/ui or other component library —
everything is hand-built to match CCS112 Module 1 (React fundamentals, styling, hooks,
routing, APIs).

## Run it

```
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173). It starts on the Login screen —
"Continue" takes you into the app shell at /dashboard.

## Where things live

```
src/
├── api/mockApi.js        # Fake REST layer (setTimeout-based Promises) standing in
│                          # for the Laravel backend, which is Module 2 / next phase
├── data/mockData.js       # Static product/inventory/transaction/report data
├── hooks/useApiData.js     # Custom hook wrapping the useState/useEffect fetch pattern
│                          # from Lab 5, reused across every page
├── components/
│   ├── layout/             # Sidebar, AppLayout, PageHeader, FormPanel
│   └── ui/                 # Button, Card, DataTable, StatusBadge, KPICard, FormField, Icons
└── pages/                  # One file per screen, matching the wireframes 1:1
```

## What's mocked vs. real

Everything here is real, working React — state, routing, and the async loading/error UI all
function. The one thing that's mocked is the backend: `mockApi.js` returns your data after a
short delay instead of hitting a Laravel API, since this midterm's scope is frontend/UI only.
When Module 2's backend is ready, swapping `mockApi.js`'s functions for real `fetch()` calls to
your Laravel routes is the only change needed — every page already consumes it as a Promise.

## Not yet wired

- "Add Location" button on the Locations page has no target screen in the current wireframe
  set — hook it up to a form the same way `ProductForm.jsx` is wired to Products once that
  screen exists.
- Login doesn't actually authenticate (no backend yet) — Continue just routes to /dashboard.
