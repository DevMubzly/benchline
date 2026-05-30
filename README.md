<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/BENCHLINE-000000?style=flat-square">
  <img alt="Benchline" src="https://img.shields.io/badge/BENCHLINE-000000?style=flat-square">
</picture>

# Benchline

**Your personal distribution OS.** Turn code into audience.

Benchline is a single-user content engine for founders who build in public. It connects to your GitHub repos, watches your shipping activity, and helps you generate platform-native content across every channel, so you never ship something without talking about it.

## Why

Most builders ship great things into silence. The gap between *I built this* and *I shared this* is too wide. Benchline closes that gap by turning your development workflow into a content pipeline.

## Features

- **Project Dashboard** — Track connected repos, content stats, and recent activity at a glance
- **Content Generator** — Pick a topic, channel, and tone — get platform-native posts (X, LinkedIn, Telegram, Reddit, Blog, Video)
- **Publishing Calendar** — Monthly grid view with scheduled and published content
- **Content Library** — Filter by status (draft / scheduled / published), schedule or publish inline
- **Community Suggestions** — Relevant communities to share your content in, per project
- **Notifications** — Real-time feed of project releases, PRs, and published content
- **Search** — Quick search across all projects, content, and activity

## Architecture

```
benchline/
├── frontend/          — Next.js 16 application
│   ├── app/           — Pages, layouts, API routes
│   ├── components/    — UI components
│   └── lib/           — Types, mock data, utilities
├── supabase/          — Database schema (future)
└── README.md
```

## Tech Stack

| Layer      | Technology                       |
| ---------- | -------------------------------- |
| Framework  | Next.js 16 (App Router)          |
| Language   | TypeScript                       |
| Styling    | Tailwind CSS v4                  |
| UI         | shadcn/ui, Lucide React          |
| Database   | Supabase (Postgres) — schema ready, not yet wired |
| Font       | Manrope                          |

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

The app runs on [http://localhost:4000](http://localhost:4000).

## MVP Status

The current build runs entirely on mock data (`frontend/lib/mock.ts`). Github authentication, no live API calls. This lets us validate the workflow before wiring up real services.

**Planned integrations:**
- GitHub OAuth / PAT-based repo sync
- OpenAI / LangChain for real content generation
- Social API publishing (X, LinkedIn, Telegram)
- Supabase for persistence and sync across sessions

## Philosophy

- **Single-user, self-hosted** — No SaaS, no multi-tenant complexity. One founder, one instance.
- **Sharp corners** — Zero rounded borders anywhere. Clean, opinionated, deliberate.
- **Mock-first** — Validate the loop before paying for APIs. Add real services when the habit forms.

## About

Built by [Balinda Mubarak](https://github.com/DevMubzly), founder of [EdgeKeeper](https://edgekeeper.app) — a no-code visual algorithmic trading platform. Benchline is the distribution engine behind every future startup.
