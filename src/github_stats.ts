
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

const apiUrl = `https://api.github.com/repos/${GITHUB_PROJECT_NAME}/pulls?per_page=10`;

const headers = {
  "Authorization": `token ${GITHUB_API_KEY}`,
  "Accept": "application/vnd.github.v3+json",
  "User-Agent": "github-analytics-dash"
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

function generateHTML(pulls: any[]): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Latest Pull Requests for ${GITHUB_PROJECT_NAME}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 2em; }
    h1 { font-size: 1.5em; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
    th { background: #f4f4f4; }
    tr:nth-child(even) { background: #fafafa; }
    a { color: #0366d6; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>Latest Pull Requests for <code>${GITHUB_PROJECT_NAME}</code></h1>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      ${pulls.map(pr => `
        <tr>
          <td><a href="${pr.html_url}" target="_blank">${pr.title}</a></td>
          <td>${pr.user?.login || ""}</td>
          <td>${formatDate(pr.created_at)}</td>
          <td>${pr.state.charAt(0).toUpperCase() + pr.state.slice(1)}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
</body>
</html>`;
}

async function main() {
  try {
    const response = await fetch(apiUrl, { headers });
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    const pulls = await response.json();
    const html = generateHTML(pulls);

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
