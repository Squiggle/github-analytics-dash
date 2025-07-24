// github_analytics.test.ts
// Deno tests for GitHubAnalytics class
import { GitHubAnalytics } from "./github_analytics.ts";
import { PullRequest } from "./github_pull_requests.ts";
import { UserCommentsByUser } from "./github_comments.ts";

// Always mock fetch for tests
// @ts-ignore
let callCount = 0;
(globalThis as any).fetch = async (url: string, opts: any) => {
  callCount++;
  // For PRs
  if (url.includes("/pulls?")) {
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
  }
  // For comments
  if (url.includes("/pulls/")) {
    const prNum = url.match(/pulls\/(\d+)/)?.[1];
    return {
      ok: true,
      json: async () => [{ id: Number(prNum) * 10, user: { login: "alice" } }],
    };
  } else if (url.includes("/issues/")) {
    const prNum = url.match(/issues\/(\d+)/)?.[1];
    return {
      ok: true,
      json: async () => [{ id: Number(prNum) * 100, user: { login: "bob" } }],
    };
  }
  return { ok: false, json: async () => [] };
};

Deno.test("GitHubAnalytics.fetchRecentPullRequests returns only recent PRs", async () => {
  const analytics = new GitHubAnalytics("dummy", "owner/repo", 30);
  const prs = await analytics.fetchRecentPullRequests();
  if (prs.length !== 1 || prs[0].title !== "Recent PR") {
    throw new Error("Should only return PRs within the last 30 days");
  }
});

Deno.test("GitHubAnalytics.fetchCommentsGroupedByUser groups by user", async () => {
  callCount = 0;
  const analytics = new GitHubAnalytics("dummy", "owner/repo", 30);
  const result: UserCommentsByUser = await analytics.fetchCommentsGroupedByUser([1, 2]);
  if (!result["alice"] || !result["bob"]) {
    throw new Error("Should have grouped comments by both users");
  }
  if (result["alice"].length !== 2 || result["bob"].length !== 2) {
    throw new Error("Each user should have two comment IDs");
  }
  if (callCount < 4) {
    throw new Error("Should have made at least 4 fetch calls");
  }
});
