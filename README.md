# Pradyuman's Portfolio

Personal portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

It includes:

- Landing page with intro, latest papers, projects, timeline, skills, and contact section
- Notes page for writing + research
- Reading log page
- Markdown-based post detail pages (`/notes/:slug`)

## Tech Stack

- React 19 + TypeScript
- Vite 8
- React Router (`HashRouter`)
- Tailwind CSS
- MD/MDX pipeline (`@mdx-js/rollup`, `remark-*`, `rehype-*`)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the local URL shown in terminal (typically `http://localhost:5173`).

## Scripts

- `npm run dev` — start development server
- `npm run build` — type-check and create production build in `dist/`
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint
- `npm run deploy` — build and deploy `dist/` to GitHub Pages via `gh-pages`

## Project Structure (high level)

- `src/pages` — route-level pages (`HomePage`, `NotesPage`, `ReadingLogPage`, `BlogPost`)
- `src/components` — reusable UI blocks and section components
- `src/data` — JSON-backed content (skills, projects, timeline, papers, logs)
- `src/posts` — markdown posts with frontmatter metadata
- `public/` — static assets (images and PDFs)

## Content Management

### Add/Edit paper notes content

1. Create or edit markdown files in `src/posts/`.
2. Include frontmatter fields like:

```md
---
title: "Post title"
date: "2026-03-03"
slug: "post-slug"
description: "Short description"
tags:
  - systems
  - architecture
readTime: "8"
---
```

These posts are loaded through `src/lib/posts.ts` and rendered on the notes route.

### Update homepage/log content

Edit JSON files inside `src/data/`:

- `now.json`
- `careerTimeline.json`
- `skills.json`
- `projects.json`
- `readingLog.json`

## Deployment

This repo includes a one-command deployment flow for GitHub Pages:

```bash
npm run deploy
```

It runs the production build and publishes `dist/` using the `gh-pages` package.
