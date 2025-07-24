// github_pull_requests.ts
// Fetch recent pull requests from GitHub

export interface PullRequest {
  id: number;
  number: number;
  title: string;
  user: { login: string };
  created_at: string;
  [key: string]: unknown;
}

/**
 * Fetch all pull requests created in the last `days` days for a given repo.
 * Handles pagination and date filtering.
 * @param apiKey GitHub API token
 * @param repoName e.g. "owner/repo"
 * @param days Number of days to look back (default 30)
 */
export async function fetchRecentPullRequests(
  apiKey: string,
  repoName: string,
  days: number
): Promise<PullRequest[]> {
  const perPage = 100;
  let page = 1;
  let allPRs: PullRequest[] = [];
  const sinceDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  while (true) {
    const url = `https://api.github.com/repos/${repoName}/pulls?state=all&sort=created&direction=desc&per_page=${perPage}&page=${page}`;
    const resp = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Accept": "application/vnd.github+json"
      }
    });
    if (!resp.ok) throw new Error(`GitHub API error: ${resp.status}`);
    const prs: PullRequest[] = await resp.json();
    if (prs.length === 0) break;
    // Filter PRs by creation date
    const filtered = prs.filter(pr => new Date(pr.created_at) >= sinceDate);
    allPRs = allPRs.concat(filtered);
    // If the last PR in this page is older than sinceDate, stop
    if (prs[prs.length - 1] && new Date(prs[prs.length - 1].created_at) < sinceDate) break;
    page++;
  }
  return allPRs;
}
