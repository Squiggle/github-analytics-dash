# Improved HTML Styling and Templating PRD

## Title
Improved HTML Styling and Templating for Analytics Dashboard

## Overview
Refactor the analytics dashboard to use a server-side templating engine for generating a static HTML file, with maintainable component structure and modern styling using Tailwind CSS. The goal is to make the dashboard easier to maintain and visually appealing.

## Goals
- Use a simple server-side templating engine (Eta for Deno)
- Organize HTML components into separate template files
- Apply Tailwind CSS for styling
- Output a single static HTML file
- No interactive features or graphs required

## Domain details
- "Template": A reusable HTML component or partial
- "Eta": The chosen templating engine for Deno
- "Tailwind": Utility-first CSS framework
- "Dashboard": The analytics HTML page

## User Stories
- As a developer, I want the dashboard HTML to be generated from templates so it is easy to update.
- As a maintainer, I want the dashboard to use Tailwind CSS for modern styling.
- As a user, I want the dashboard to be visually clear and readable.
- As a developer, I want the dashboard code to be organized in separate template files for maintainability.

## Acceptance Criteria
- The dashboard HTML is generated using Eta templates in Deno.
- Templates are organized in separate files for layout, table, and row components.
- Tailwind CSS is included in the generated HTML.
- The output is a single static HTML file with improved styling.
- No sorting, filtering, or graphs are present in the dashboard.
