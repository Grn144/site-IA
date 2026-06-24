# Architecture

## Overview

Single-page React 18 app about AI and Claude Code. One scroll-based page, no router, no backend.

## CSS Strategy

Global tokens in `styles/variables.css`, imported once in `main.jsx`. Each component owns responsive behavior via mobile-first media queries in its own `.module.css`. No monolithic stylesheets.

## Data Flow

All copy lives in `src/data/content.js` as named exports. Components import only what they need — no prop drilling of strings.

## Animation

Framer Motion handles scroll reveals via `whileInView` + `viewport={{ once: true }}`. The `useScrollReveal` hook centralizes variant definitions and returns empty variants when `useReducedMotion()` is true.

## Hooks

- `useActiveSection` — IntersectionObserver watching `['hero', 'sobre']`, returns the visible section ID for Navbar scrollspy.
- `useScrollReveal` — Framer Motion variant presets; respects `prefers-reduced-motion`.
- `useMediaQuery` — reactive `window.matchMedia` wrapper.

## Video

`src/assets/videos/robot-hero.mp4` is imported via ES module in `Hero.jsx`. Vite handles the URL hash for cache-busting on deploy. `assetsInlineLimit: 0` in `vite.config.js` ensures the video is never base64-inlined.
