# Pull Request and Comment Analytics

## Overview
This feature enhances the existing GitHub analytics dashboard to include detailed pull request and comment analysis with aggregated developer contribution statistics. The feature will analyze the last 30 days of pull request activity, focusing on code review comments and PR comments to provide insights into developer engagement and collaboration patterns. This data will replace the existing table in the generated HTML output.

## Goals
- Analyze pull requests and comments from the last 30 days
- Generate comparative statistics showing PR creation vs review participation for each developer
- Replace the existing HTML table with enhanced analytics
- Integrate seamlessly with the existing Docker container and Deno executable
- Provide actionable insights into team collaboration patterns

## Domain details
- **Pull Request (PR)**: A GitHub feature for proposing changes to a repository
- **Code Review Comments**: Comments made during the code review process on specific lines of code
- **PR Comments**: General comments made on a pull request (not tied to specific code lines)
- **Developer Contribution Ratio**: Comparison metric of "PRs created" vs "PRs commented on by that developer"
- **Review Participation**: A developer's engagement in reviewing other team members' pull requests
- **Collaboration Score**: Derived metric indicating how actively a developer participates in code reviews relative to their own PR submissions
- **Last 30 Days Window**: Rolling 30-day period from the current date for data analysis

## User Stories
- As a team lead, I want to see which developers are actively participating in code reviews so I can identify collaboration patterns.
- As a developer, I want to compare my PR creation rate with my review participation to understand my team contribution balance.
- As a project manager, I want to view aggregated statistics on team collaboration to identify areas for improvement.
- As a developer, I want the analytics to automatically update with the latest 30 days of data when I run the container.

## Acceptance Criteria
- The feature analyzes pull requests from the last 30 days (rolling window)
- The feature captures both code review comments and general PR comments
- The feature generates a comparison table showing "Number of PRs created" vs "Number of other PRs that contain comments from that user" for each developer
- The enhanced analytics replace the existing table in the HTML output
- The feature integrates with the existing GITHUB_API_KEY authentication
- The feature works within the existing Docker container without additional environment variables
- The HTML output includes clear column headers and readable formatting for the new metrics
- The feature handles cases where developers have no PRs or comments gracefully (showing zeros)
- The data includes all contributors who had activity in the 30-day window
