1. [ ] Create a TypeScript script that uses Deno to fetch GitHub project statistics using the GitHub API
2. [ ] Implement logic in the script to generate a single self-contained HTML file as output
3. [ ] Accept `GITHUB_API_KEY` and `GITHUB_PROJECT_NAME` as environment variables in the script
4. [ ] Write the generated HTML file to a specified output directory
5. [ ] Create a Dockerfile that installs Deno and copies the TypeScript script into the container
6. [ ] Configure the Dockerfile to accept environment variables and mount a directory for output
7. [ ] Ensure the container runs the Deno script once and exits
8. [ ] Test the container locally by running it with sample environment variables and a mounted output directory
9. [ ] Write documentation on how to build, run, and use the container for development
10. [ ] Publish the container to GitHub Container Registry (GHR)
11. [ ] Verify the container can be pulled and used in a GitHub Action workflow
