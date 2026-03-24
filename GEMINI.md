# GEMINI.md

## Project Overview
**Name:** System Transition Dashboard (시스템 업무전환 상황판)
**Purpose:** A high-tech, real-time monitoring dashboard for tracking the migration and transition status of company-wide systems (ERP, HRM, Finance, etc.). It is designed with a "Control Center" aesthetic, utilizing a dark theme with neon accents and cyberpunk-inspired visual effects.

### Key Technologies
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, CSS Grid, Custom CSS Variables
- **Fonts:** IBM Plex Mono (for data/numbers), IBM Plex Sans KR (for Korean text)
- **Visualization:** Recharts (for progress and issue tracking)
- **Icons/Utilities:** Lucide React (inferred/standard), date-fns, clsx
- **Data Management:** Mock data architecture for prototyping

### Architecture
- **App Router:** Main entry point at `src/app/page.tsx` using a complex `grid-template-areas` layout.
- **Component-Based:** Highly modular dashboard components located in `src/components/dashboard/`.
- **Type-Safe:** Centralized type definitions in `src/types/index.ts`.
- **Data-Driven:** UI is populated from `src/data/mockData.ts`, allowing for easy simulation of different system states.

## Building and Running
The project uses `pnpm` as the primary package manager.

- **Install Dependencies:** `pnpm install`
- **Development Server:** `pnpm dev` (Runs on `http://localhost:3000`)
- **Production Build:** `pnpm build`
- **Start Production Server:** `pnpm start`
- **Linting:** `pnpm lint`

## Development Conventions

### Styling & UI
- **Theme:** Dark mode by default (`#080c14`).
- **CSS Grid:** The main dashboard layout is strictly defined via CSS Grid in `src/app/page.tsx`.
- **Visual Effects:** Uses a "scanline" overlay, grid background, and glow effects defined in `src/app/globals.css`.
- **Typography:** Use `font-mono` for all numerical data, IDs, and status codes to maintain the technical aesthetic.
- **Color Palette:** Strictly adheres to predefined CSS variables in `globals.css` (e.g., `--color-accent-blue`, `--color-accent-cyan`).

### Components
- **Client Components:** Use the `'use client'` directive for components requiring state or browser APIs (e.g., `Header.tsx` for the clock).
- **Naming:** Components should be PascalCase and placed in `src/components/dashboard/`.
- **Responsiveness:** While primarily designed for large "Control Center" displays, components use Tailwind for basic responsiveness.

### Data & Types
- **Language:** The UI labels and data content are in **Korean**, but the codebase (variables, types, filenames) is in **English**.
- **Types:** Always use the interfaces defined in `src/types/index.ts` for any new data structures.
- **Mocking:** When adding new features, update `src/data/mockData.ts` to ensure consistency across the dashboard.

### Testing & Quality
- **Linting:** Ensure all changes pass `pnpm lint` before committing.
- **TypeScript:** Strict type checking is enabled; avoid using `any`.
