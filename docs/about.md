This document describes the intended purpose of this project.


# High Level Overview

- The build output is a publishable docker container that can be consumed by a github action
- The container accepts:
  1. A github token, used to access the github API to retrieve statistics on a project
  2. The name or identifier of that github project
- The container will provide as its output a single self-contained HTML page
- The HTML output now includes an analytics table showing, for each developer:
  - Number of PRs created in the last 30 days
  - Number of other PRs where they commented (code review or PR comment)
- Bot accounts are excluded from the analytics.
- The table provides insights into team collaboration and review participation.

# Technology

- Deno: The processing within the container will be performed by a basic Deno executable
- TypeScript: The logic of the system is implemented in TypeScript
- HTML & CSS: The output of the process will be a single HTML page
