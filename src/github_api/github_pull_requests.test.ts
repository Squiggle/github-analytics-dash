// github_pull_requests.test.ts
// Deno tests for fetchRecentPullRequests
import { fetchRecentPullRequests, PullRequest } from "./github_pull_requests.ts";

// Always mock fetch for tests
// @ts-ignore
(globalThis as any).fetch = async (url: string, opts: any) => {
  // Simulate a single page of PRs, some within and some outside the window
  const now = new Date();
  const prWithin: PullRequest = {
    id: 1,
    number: 1,
    title: "Recent PR",
    user: { login: "alice" },
    created_at: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  };
  const prOld: PullRequest = {
    id: 2,
    number: 2,
    title: "Old PR",
    user: { login: "bob" },
    created_at: new Date(now.getTime() - 40 * 24 * 60 * 60 * 1000).toISOString(),
  };
  return {
    ok: true,
    json: async () => [prWithin, prOld],
  };
};

Deno.test("fetchRecentPullRequests filters PRs by date", async () => {
  const apiKey = "dummy";
  const repo = "owner/repo";
  const prs = await fetchRecentPullRequests(apiKey, repo, 30);
  if (prs.length !== 1 || prs[0].title !== "Recent PR") {
    throw new Error("Should only return PRs within the last 30 days");
  }
});
