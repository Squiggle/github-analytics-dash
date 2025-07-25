# Use the latest stable Deno image as the base
FROM denoland/deno:alpine-1.44.0

# Set the working directory
WORKDIR /app

# Copy the TypeScript script and any supporting files
COPY src/ ./

# Set permissions (optional, for some environments)
RUN chmod 755 github_stats.ts

# Create a mount point for output (host can mount a directory here)
VOLUME ["/output"]

# Document expected environment variables
#   - GITHUB_API_KEY (required)
#   - GITHUB_PROJECT_NAME (required)
#   - OUTPUT_DIR (optional, defaults to /output)

# Set the default command to run the script, defaulting OUTPUT_DIR to /output if not set
ENV OUTPUT_DIR=/output
CMD ["run", "--allow-net", "--allow-env", "--allow-write", "github_stats.ts"]
