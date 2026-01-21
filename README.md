# React Performance Interview Challenge

A Next.js App Router demo focused on performance optimization patterns. It renders a large, generated dataset (100k items), provides search + favorites, shows real-time stats, and demonstrates how to keep the UI responsive under heavy workloads.

## Highlights

- Large dataset generated on the server and passed to the client for consistent hydration.
- Search with responsive input using `useDeferredValue`.
- One-pass filtering + stats calculation to avoid duplicate work.
- Virtualized list rendering for fast scrolling with 100k items.
- Memoized components and stable handlers to prevent unnecessary renders.
- Favorites and search history management with O(1) lookups.
- Performance guide accordion explaining common bottlenecks.

## Improvements from the Base Version

- **Server-side data generation** to avoid client-only heavy work and hydration mismatch.
- **Deferred search query** to keep typing smooth while filtering.
- **Single-pass compute** for filtering and stats instead of multiple loops.
- **Precomputed lowercase fields** for faster string matching.
- **O(1) favorites lookup** via `Set` and `useMemo`.
- **Virtualized list** to render only visible items.
- **Memoized UI primitives** (`ActionBox`, `Sidebar`, `StatsDashboard`) to reduce re-renders.
- **Dynamic import** for the performance guide to trim initial SSR work.
- **Modular structure** (`_components`, `_lib`, `_types`) with TypeScript props.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Scripts

- `npm run dev` - start the dev server
- `npm run build` - build for production
- `npm run start` - start production server
- `npm run lint` - run lint checks

## Project Structure

- `app/page.tsx` - server entry that generates data and passes it to the client
- `app/ClientPage.tsx` - main interactive UI
- `app/_lib/dataGenerator.ts` - heavy dataset generator
- `app/_components` - reusable UI components and virtualization
- `app/_types` - shared TypeScript interfaces
- `app/style.module.scss` - styles

## Notes

- The list size is intentionally large to highlight rendering bottlenecks.
- This project is a focused performance exercise, not a production app.

