# Travel Tracker

Track countries you’ve visited or want to visit, explore the world by continent, and keep everything stored locally in your browser. The experience is optimized for a clean, calm travel interface with an interactive SVG world map.

## Features
- Interactive SVG world map with click‑to‑add
- Two statuses: **Visited** and **Wishlist**
- Continent zoom views with reset
- Local persistence (per browser) using `localStorage`
- Searchable list panel with tabs and move actions
- Import / Export / Reset data tools
- Responsive layout (desktop, tablet, mobile)
- Tooltip labels on hover/tap

## Tech Stack
- React + Vite
- Tailwind CSS

## Project Structure
```
src/
  Map.jsx                 # Main page + state wiring
  MapView.jsx             # SVG wrapper
  MapTooltip.jsx          # Hover/tap tooltip
  MapLabels.jsx           # Label rendering logic
  hooks/useTravelTracker.js
  utils/storage.js
  config/countryLabels.js
  App.css
```

## Getting Started
### 1) Install dependencies
```bash
npm install
```

### 2) Start the frontend
```bash
npm run dev
```

Vite will print the local URL (default: `http://localhost:5173`).

## Backend (optional)
This frontend expects a backend endpoint for `all-countries`:
- `GET http://localhost:3001/all-countries`

If you run the backend on a different host/port, update the fetch URL in:
- `src/Map.jsx`

## Data Persistence
All user data is stored locally in the browser using:
```
localStorage key: travelTracker_v1
```

## Import / Export
- **Export** downloads a JSON backup of your data.
- **Import** merges data into the current state.
- **Reset** clears all local data (with confirmation).

## Mobile Testing
To test on a phone:
1. Run the dev server with host enabled:
```bash
npm run dev -- --host
```
2. Open the printed network URL on your phone (same Wi‑Fi).

## Notes on Labels
Country labels are handled by:
- Bounding‑box centroids for all countries
- Optional overrides in `src/config/countryLabels.js`

If you want to fine‑tune a label position, add or edit an entry in that file.

## License
This project is for educational and portfolio use. Adjust as needed.
