This document describes the intended purpose of this project.

# High Level Overview

- The build output is a publishable docker container that can be consumed by a github action
- The container accepts:
  1. A github token, used to access the github API to retrieve statistics on a project
  2. The name or identifier of that github project
- The container will provide as its output a single self-contained HTML page

# Technology

- Deno: The processing within the container will be performed by a basic Deno executable
- TypeScript: The logic of the system is implemented in TypeScript
- HTML & CSS: The output of the process will be a single HTML page
