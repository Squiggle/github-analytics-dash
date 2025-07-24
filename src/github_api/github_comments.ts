// github_comments.ts
// Fetch code review and PR comments, grouped by user

export interface UserCommentsByUser {
  [user: string]: number[];
}

/**
 * Fetch code review comments and PR comments for a list of PR numbers.
 * Returns an object mapping user login to a list of comment IDs they authored.
 * Fetches comments sequentially for each PR.
 * @param apiKey GitHub API token
 * @param repoName e.g. "owner/repo"
 * @param prNumbers Array of PR numbers
 */
export async function fetchCommentsGroupedByUser(
  apiKey: string,
  repoName: string,
  prNumbers: number[]
): Promise<UserCommentsByUser> {
  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Accept": "application/vnd.github+json"
  };
  const userComments: UserCommentsByUser = {};
  for (const pr of prNumbers) {
    // Fetch code review comments
    const reviewUrl = `https://api.github.com/repos/${repoName}/pulls/${pr}/comments?per_page=100`;
    const reviewResp = await fetch(reviewUrl, { headers });
    if (!reviewResp.ok) throw new Error(`GitHub API error: ${reviewResp.status}`);
    const reviewComments = await reviewResp.json();
    for (const c of reviewComments) {
      if (!c.user?.login || !c.id) continue;
      if (!userComments[c.user.login]) userComments[c.user.login] = [];
      userComments[c.user.login].push(c.id);
    }
    // Fetch PR comments (issue comments)
    const prUrl = `https://api.github.com/repos/${repoName}/issues/${pr}/comments?per_page=100`;
    const prResp = await fetch(prUrl, { headers });
    if (!prResp.ok) throw new Error(`GitHub API error: ${prResp.status}`);
    const prComments = await prResp.json();
    for (const c of prComments) {
      if (!c.user?.login || !c.id) continue;
      if (!userComments[c.user.login]) userComments[c.user.login] = [];
      userComments[c.user.login].push(c.id);
    }
  }
  return userComments;
}
