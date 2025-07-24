// github_comments.test.ts
// Deno tests for fetchCommentsGroupedByUser
import { fetchCommentsGroupedByUser, UserCommentsByUser } from "./github_comments.ts";

// Always mock fetch for tests
// @ts-ignore
let callCount = 0;
(globalThis as any).fetch = async (url: string, opts: any) => {
  callCount++;
  // Simulate two PRs, each with one review comment and one PR comment
  if (url.includes("/pulls/")) {
    // Code review comments
    const prNum = url.match(/pulls\/(\d+)/)?.[1];
    return {
      ok: true,
      json: async () => [{ id: Number(prNum) * 10, user: { login: "alice" } }],
    };
  } else if (url.includes("/issues/")) {
    // PR comments
    const prNum = url.match(/issues\/(\d+)/)?.[1];
    return {
      ok: true,
      json: async () => [{ id: Number(prNum) * 100, user: { login: "bob" } }],
    };
  }
  return { ok: false, json: async () => [] };
};

Deno.test("fetchCommentsGroupedByUser groups comment IDs by user", async () => {
  callCount = 0;
  const apiKey = "dummy";
  const repo = "owner/repo";
  const prNumbers = [1, 2];
  const result: UserCommentsByUser = await fetchCommentsGroupedByUser(apiKey, repo, prNumbers);
  if (!result["alice"] || !result["bob"]) {
    throw new Error("Should have grouped comments by both users");
  }
  if (result["alice"].length !== 2 || result["bob"].length !== 2) {
    throw new Error("Each user should have two comment IDs");
  }
  if (callCount !== 4) {
    throw new Error("Should have made 4 fetch calls (2 PRs x 2 endpoints)");
  }
});
