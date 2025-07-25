# github-analytics-dash

A dashboard generator of GitHub analytics. Executable as a GitHub Action, gathers GitHub engineering statistics and generates an interactive dashboard.

## Usage

This project includes a Deno script that fetches the latest pull requests and comment analytics for a given GitHub repository and outputs a self-contained HTML file.

### Required Environment Variables

- `GITHUB_API_KEY`: A GitHub personal access token with access to the target repository.
- `GITHUB_PROJECT_NAME`: The repository in `owner/repo` format (e.g., `octocat/Hello-World`).

### Running the Script

```
deno run --allow-net --allow-env --allow-write src/github_stats.ts
```

The script will generate an `output.html` file in the current directory containing a table of developer analytics. The table includes:

- Developer: GitHub username
- PRs Created: Number of pull requests created by the developer in the last 30 days
- Other PRs Commented: Number of other developers' PRs where this developer commented (code review or PR comment)

Bot accounts are excluded from the statistics. The analytics update automatically for the last 30 days each time the container is run.

## Running in Docker

To build and run the container locally:

```sh
# Build the Docker image
docker build -t github-analytics-dash .

# Run the container with environment variables and a mounted output directory
docker run --rm \
  -e GITHUB_API_KEY=your_github_token \
  -e GITHUB_PROJECT_NAME=owner/repo \
  -v $(pwd)/output:/output \
  github-analytics-dash
```


Replace `your_github_token` with your GitHub API key and `owner/repo` with the target repository. The generated `output.html` will appear in the `output` directory and will show the developer analytics table described above.

## Analytics Table Example

| Developer | PRs Created | Other PRs Commented |
|-----------|-------------|---------------------|
| alice     | 3           | 5                   |
| bob       | 2           | 1                   |

## Installation

TBC