// github_stats.ts
// Deno script to fetch latest pull requests for a GitHub repository and output as JSON

const GITHUB_API_KEY = Deno.env.get("GITHUB_API_KEY");
const GITHUB_PROJECT_NAME = Deno.env.get("GITHUB_PROJECT_NAME");

if (!GITHUB_API_KEY || !GITHUB_PROJECT_NAME) {
  console.error("Missing GITHUB_API_KEY or GITHUB_PROJECT_NAME environment variable.");
  Deno.exit(1);
}

const apiUrl = `https://api.github.com/repos/${GITHUB_PROJECT_NAME}/pulls?per_page=10`;

const headers = {
  "Authorization": `token ${GITHUB_API_KEY}`,
  "Accept": "application/vnd.github.v3+json",
  "User-Agent": "github-analytics-dash"
};

try {
  const response = await fetch(apiUrl, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  const pulls = await response.json();
  console.log(JSON.stringify(pulls, null, 2));
} catch (err) {
  console.error("Failed to fetch pull requests:", err.message);
  Deno.exit(1);
}
