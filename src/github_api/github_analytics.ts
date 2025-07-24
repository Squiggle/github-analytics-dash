// github_analytics.ts
// Class wrapper for GitHub analytics API methods

import { fetchRecentPullRequests, PullRequest } from "./github_pull_requests.ts";
import { fetchCommentsGroupedByUser } from "./github_comments.ts";

export const DEFAULT_DAYS = 30;

export class GitHubAnalytics {
  constructor(
    private apiKey: string,
    private repoName: string,
    private days: number = DEFAULT_DAYS
  ) {}

  fetchRecentPullRequests(): Promise<PullRequest[]> {
    return fetchRecentPullRequests(this.apiKey, this.repoName, this.days);
  }

  fetchCommentsGroupedByUser(prNumbers: number[]): Promise<Record<string, number[]>> {
    return fetchCommentsGroupedByUser(this.apiKey, this.repoName, prNumbers);
  }
}
