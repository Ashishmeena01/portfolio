# Portfolio

A minimal, bold, black & white portfolio built with Vite + React + Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Contribution heatmaps

The GitHub and LeetCode heatmaps are fetched by the Express backend in `backend/`.
Copy `.env.example` to `.env` and set the usernames and a GitHub token. Keep the token
in `.env`; do not add it to frontend code or commit it.

Run the frontend and backend in separate terminals:

```bash
npm run dev
npm run dev:backend
```

For Vercel, import this repository as a Vite project and add `GITHUB_USERNAME`,
`GITHUB_TOKEN`, and `LEETCODE_USERNAME` under **Project Settings > Environment Variables**.
Vercel builds the frontend into `dist/` and deploys `api/contributions.js` as the
`/api/contributions` serverless function. Redeploy after adding or changing variables.

The backend caches successful results for ten minutes. GitHub's contribution calendar
uses the official GraphQL API and a server-side token. LeetCode's calendar uses its
undocumented public GraphQL query, so it may change without notice. Either heatmap can
still render if the other provider is unavailable.

## Build for production

```bash
npm run build
```

Output goes to the `dist/` folder. Deploy it anywhere (Vercel, Netlify, GitHub Pages, etc).

## Customize

Project and skill data lives in `src/data/portfolio.js`. Page content is split into components under `src/pages/`.

Colors and fonts are defined in `tailwind.config.js` (`ink`, `paper`, `muted`) if you want to adjust the palette later.
