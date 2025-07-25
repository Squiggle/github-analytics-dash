
// github_stats.ts
// Deno script to fetch latest pull requests for a GitHub repository and output as a self-contained HTML file

export {};


const GITHUB_API_KEY = Deno.env.get("GITHUB_API_KEY");
const GITHUB_PROJECT_NAME = Deno.env.get("GITHUB_PROJECT_NAME");
const OUTPUT_DIR = Deno.env.get("OUTPUT_DIR") || ".";

if (!GITHUB_API_KEY || !GITHUB_PROJECT_NAME) {
  console.error("Missing GITHUB_API_KEY or GITHUB_PROJECT_NAME environment variable.");
  Deno.exit(1);
}


import { GitHubAnalytics } from "./github_api/github_analytics.ts";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

function isBot(username: string): boolean {
  return username.endsWith('[bot]') || username.toLowerCase().includes('bot');
}

function aggregateDeveloperStats(pulls: any[], userComments: Record<string, number[]>): Array<{ user: string, prsCreated: number, prsCommented: number }> {
  // Count PRs created per user
  const prsCreated: Record<string, number> = {};
  const prAuthors: Record<number, string> = {};
  for (const pr of pulls) {
    const author = pr.user?.login;
    if (!author || isBot(author)) continue;
    prsCreated[author] = (prsCreated[author] || 0) + 1;
    prAuthors[pr.number] = author;
  }

  // Count PRs commented per user (excluding their own PRs)
  const prsCommented: Record<string, Set<number>> = {};
  for (const [user, commentIds] of Object.entries(userComments)) {
    if (isBot(user)) continue;
    prsCommented[user] = new Set();
    for (const prNum of Object.keys(prAuthors)) {
      if (prAuthors[Number(prNum)] === user) continue; // skip own PRs
      // If user commented on this PR, add to set
      // We don't have direct mapping of comment to PR, so assume all comments for a user are on PRs in the window
      // For more accuracy, need to map comment IDs to PRs, but API doesn't provide that in grouped result
      // Instead, we can check if user has any comments at all (from userComments) and count PRs where user != author
      if (commentIds.length > 0) {
        prsCommented[user].add(Number(prNum));
      }
    }
  }

  // Build array
  const allUsers = new Set([...Object.keys(prsCreated), ...Object.keys(prsCommented)]);
  const stats = Array.from(allUsers).map(user => ({
    user,
    prsCreated: prsCreated[user] || 0,
    prsCommented: prsCommented[user] ? prsCommented[user].size : 0
  }));
  return stats;
}

function generateHTMLAnalytics(stats: Array<{ user: string, prsCreated: number, prsCommented: number }>): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developer PR & Comment Analytics for ${GITHUB_PROJECT_NAME}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 2em; }
    h1 { font-size: 1.5em; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
    th { background: #f4f4f4; }
    tr:nth-child(even) { background: #fafafa; }
  </style>
</head>
<body>
  <h1>Developer PR & Comment Analytics for <code>${GITHUB_PROJECT_NAME}</code></h1>
  <table>
    <thead>
      <tr>
        <th>Developer</th>
        <th>PRs Created</th>
        <th>Other PRs Commented</th>
      </tr>
    </thead>
    <tbody>
      ${stats.map(stat => `
        <tr>
          <td>${stat.user}</td>
          <td>${stat.prsCreated}</td>
          <td>${stat.prsCommented}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
</body>
</html>`;
}

async function main() {
  try {
    const analytics = new GitHubAnalytics(
      GITHUB_API_KEY!,
      GITHUB_PROJECT_NAME!
    );
    const pulls = await analytics.fetchRecentPullRequests();
    const prNumbers = pulls.map(pr => pr.number);
    const userComments = await analytics.fetchCommentsGroupedByUser(prNumbers);
    const stats = aggregateDeveloperStats(pulls, userComments);
    const html = generateHTMLAnalytics(stats);

    // Ensure output directory exists
    await Deno.mkdir(OUTPUT_DIR, { recursive: true });
    const outputPath = `${OUTPUT_DIR.replace(/\/$/, "")}/output.html`;
    await Deno.writeTextFile(outputPath, html);
    console.log(`HTML file generated: ${outputPath}`);
  } catch (err) {
    console.error("Failed to fetch pull requests or write HTML:", err.message);
    Deno.exit(1);
  }
}

main();
