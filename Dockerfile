# Use the latest stable Deno image as the base
FROM denoland/deno:alpine-1.44.0

# Set the working directory
WORKDIR /app

# Copy the TypeScript script and any supporting files
COPY src/github_stats.ts ./

# Set permissions (optional, for some environments)
RUN chmod 755 github_stats.ts

# Set the default command to run the script
CMD ["run", "--allow-net", "--allow-env", "--allow-write", "github_stats.ts"]
