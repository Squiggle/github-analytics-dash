# Publish a Container with Deno Executable

## Overview
This feature will provide a Docker container that runs a Deno executable to fetch GitHub project statistics via the GitHub API and outputs a single self-contained HTML page. The container is intended for use as part of a GitHub Action workflow.

## Goals
- Build a Docker container that runs a Deno script to completion
- Accept environment variables for GitHub API authentication and project selection
- Mount a drive to output the generated HTML file
- Publish the container to GitHub Container Registry (GHR)
- Support development workflows

## Domain details
- **Deno Executable**: A TypeScript-based script run by Deno, responsible for fetching data from the GitHub API and generating an HTML report
- **GITHUB_API_KEY**: Environment variable for GitHub API authentication
- **GITHUB_PROJECT_NAME**: Environment variable specifying the target GitHub project
- **Output Mount**: A mounted directory where the HTML output will be written
- **GHR**: GitHub Container Registry, the target for publishing the container

## User Stories
- As a developer, I want to run the container with my GitHub API key and project name so that I can generate a project analytics dashboard.
- As a developer, I want the container to output a single HTML file to a mounted directory so I can access the results easily.
- As a developer, I want to pull the container from GHR and use it in a GitHub Action workflow.

## Acceptance Criteria
- The container runs a Deno executable that fetches GitHub data and generates an HTML file
- The container accepts `GITHUB_API_KEY` and `GITHUB_PROJECT_NAME` as environment variables
- The container writes the HTML output to a mounted directory
- The container is published to GitHub Container Registry
- The container is suitable for development use (not production-optimized)
- The container runs the Deno executable once and exits
