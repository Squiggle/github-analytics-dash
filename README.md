# github-analytics-dash

A dashboard generator of GitHub analytics. Executable as a GitHub Action, gathers GitHub engineering statistics and generates an interactive dashboard.

## Usage

This project includes a Deno script that fetches the latest pull requests for a given GitHub repository and outputs a self-contained HTML file.

### Required Environment Variables

- `GITHUB_API_KEY`: A GitHub personal access token with access to the target repository.
- `GITHUB_PROJECT_NAME`: The repository in `owner/repo` format (e.g., `octocat/Hello-World`).

### Running the Script

```
deno run --allow-net --allow-env --allow-write src/github_stats.ts
```

The script will generate an `output.html` file in the current directory containing a table of the latest pull requests.

## Installation

TBC