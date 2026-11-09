import dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

dotenv.config({
  path:"../.env"
})
const port = Number(process.env.PORT || 3001);
const app = express();
const cacheDuration = 10 * 60 * 1000;
let cachedResponse;
let cachedAt = 0;

const githubQuery = `
  query ContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { date contributionCount }
          }
        }
      }
    }
  }
`;

const leetCodeQuery = `
  query userProfileCalendar($username: String!, $year: Int) {
    matchedUser(username: $username) {
      userCalendar(year: $year) {
        totalActiveDays
        submissionCalendar
      }
    }
  }
`;

async function postGraphQL(url, query, variables, headers = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(12000),
  });

  if (!response.ok) throw new Error(`Upstream API returned ${response.status}`);
  const payload = await response.json();
  if (payload.errors?.length) throw new Error(payload.errors[0].message);
  return payload.data;
}

function toDayList(calendar) {
  return Object.entries(calendar || {})
    .map(([timestamp, submissionCount]) => ({
      date: new Date(Number(timestamp) * 1000).toISOString().slice(0, 10),
      submissionCount: Number(submissionCount),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

async function getGitHubContributions() {
  const { GITHUB_USERNAME, GITHUB_TOKEN } = process.env;

  if (!GITHUB_USERNAME || !GITHUB_TOKEN) {
    throw new Error('Set GITHUB_USERNAME and GITHUB_TOKEN to enable the GitHub heatmap.');
  }

  const now = new Date();
  const to = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59));
  const from = new Date(to);
  from.setUTCHours(0, 0, 0, 0);
  from.setUTCDate(from.getUTCDate() - 29);
  const data = await postGraphQL(
    'https://api.github.com/graphql',
    githubQuery,
    { login: GITHUB_USERNAME, from: from.toISOString(), to: to.toISOString() },
    { authorization: `Bearer ${GITHUB_TOKEN}`, 'user-agent': 'portfolio-contribution-heatmaps' },
  );

  const calendar = data.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) throw new Error(`GitHub user "${GITHUB_USERNAME}" was not found.`);
  const startDate = from.toISOString().slice(0, 10);
  const endDate = to.toISOString().slice(0, 10);
  const days = calendar.weeks
    .flatMap((week) => week.contributionDays)
    .filter((day) => day.date >= startDate && day.date <= endDate);

  return {
    total: days.reduce((sum, day) => sum + day.contributionCount, 0),
    days,
  };
}

async function getLeetCodeContributions() {
  const username = process.env.LEETCODE_USERNAME;
  if (!username) throw new Error('Set LEETCODE_USERNAME to enable the LeetCode heatmap.');

  const today = new Date();
  const startDate = new Date(today);
  startDate.setUTCDate(startDate.getUTCDate() - 29);
  const years = [...new Set([startDate.getUTCFullYear(), today.getUTCFullYear()])];
  const results = await Promise.all(years.map((calendarYear) =>
    postGraphQL(
      'https://leetcode.com/graphql/',
      leetCodeQuery,
      { username, year: calendarYear },
      { referer: `https://leetcode.com/${encodeURIComponent(username)}/` },
    ),
  ));

  const matchedUser = results.find((result) => result.matchedUser)?.matchedUser;
  if (!matchedUser) throw new Error(`LeetCode user "${username}" was not found.`);

  const calendar = Object.assign({}, ...results.map((result) => {
    const raw = result.matchedUser?.userCalendar?.submissionCalendar;
    return raw ? JSON.parse(raw) : {};
  }));
  const countsByDate = new Map(toDayList(calendar).map((day) => [day.date, day.submissionCount]));
  const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const start = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate()));
  const days = [];
  for (const date = new Date(start); date <= end; date.setUTCDate(date.getUTCDate() + 1)) {
    const dateKey = date.toISOString().slice(0, 10);
    days.push({ date: dateKey, submissionCount: countsByDate.get(dateKey) || 0 });
  }
  return {
    totalActiveDays: days.filter((day) => day.submissionCount > 0).length,
    days,
  };
}

export async function getContributions() {
  if (cachedResponse && Date.now() - cachedAt < cacheDuration) return cachedResponse;

  const [githubResult, leetCodeResult] = await Promise.allSettled([
    getGitHubContributions(),
    getLeetCodeContributions(),
  ]);
  const response = {
    github: githubResult.status === 'fulfilled' ? githubResult.value : null,
    leetcode: leetCodeResult.status === 'fulfilled' ? leetCodeResult.value : null,
    errors: {
      github: githubResult.status === 'rejected' ? githubResult.reason.message : null,
      leetcode: leetCodeResult.status === 'rejected' ? leetCodeResult.reason.message : null,
    },
  };

  if (response.github || response.leetcode) {
    cachedResponse = response;
    cachedAt = Date.now();
  }
  return response;
}

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/contributions', async (_request, response) => {
  try {
    const data = await getContributions();
    response.set('Cache-Control', 'public, max-age=300');
    response.json(data);
  } catch {
    response.status(502).json({ error: 'Could not fetch contribution data.' });
  }
});

app.use((_request, response) => {
  response.status(404).json({ error: 'Not found' });
});

export default app;

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  app.listen(port, () => {
    console.log(`Contribution API listening on http://localhost:${port}`);
  });
}
