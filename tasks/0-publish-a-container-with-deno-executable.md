1. [x] Create a TypeScript script that uses Deno to fetch GitHub project statistics using the GitHub API
2. [x] Implement logic in the script to generate a single self-contained HTML file as output
3. [x] Accept `GITHUB_API_KEY` and `GITHUB_PROJECT_NAME` as environment variables in the script
4. [x] Write the generated HTML file to a specified output directory
5. [x] Create a Dockerfile that installs Deno and copies the TypeScript script into the container
6. [x] Configure the Dockerfile to accept environment variables and mount a directory for output
7. [x] Ensure the container runs the Deno script once and exits
8. [x] Test the container locally by running it with sample environment variables and a mounted output directory
9. [x] Write documentation on how to build, run, and use the container for development
10. [x] Publish the container to GitHub Container Registry (GHR)
11. [ ] Verify the container can be pulled and used in a GitHub Action workflow
