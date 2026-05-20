# nextjs-ai-dashboard

Modern SaaS frontend built with **Next.js**, **React**, and **shadcn/ui** — designed as a polished portfolio piece for your GitHub profile.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css)

## Features

- **Authentication** — Auth.js credentials flow with protected dashboard routes
- **Analytics dashboard** — KPI cards, revenue chart (Recharts), activity feed
- **AI chat UI** — Streaming responses via Vercel AI SDK
- **Demo mode** — Works without an API key; add `OPENAI_API_KEY` for live GPT
- **File upload** — Drag-and-drop with validation and server storage
- **Markdown rendering** — GFM + syntax highlighting in chat responses
- **Dark / light theme** — next-themes with shadcn design tokens

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo login

| Email | Password |
|-------|----------|
| `demo@example.com` | `demo123` |

### Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `AUTH_SECRET` | Yes | Random string for session signing (`openssl rand -base64 32`) |
| `OPENAI_API_KEY` | No | Enables live OpenAI streaming in chat |
| `NEXTAUTH_URL` | Prod | App URL, e.g. `https://your-app.vercel.app` |

## Project structure

```
src/
├── app/
│   ├── api/          # Auth, chat streaming, file upload
│   ├── dashboard/    # Protected app routes
│   ├── login/
│   └── page.tsx      # Marketing landing
├── components/
│   ├── ui/           # shadcn/ui primitives
│   ├── chat/
│   ├── dashboard/
│   └── files/
├── lib/              # Utils, demo data, upload store
└── auth.ts           # Auth.js config
```

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS v4](https://tailwindcss.com/)
- [Auth.js](https://authjs.dev/) (NextAuth v5)
- [Vercel AI SDK](https://sdk.vercel.ai/)
- [Recharts](https://recharts.org/)
- [react-markdown](https://github.com/remarkjs/react-markdown)

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/nextjs-ai-dashboard)

Set `AUTH_SECRET` in your deployment environment. Optionally add `OPENAI_API_KEY`.

## License

MIT
