# Use the official Node.js Long Term Support (LTS) Alpine image. 
# Alpine is a lightweight Linux distribution, which keeps the image size very small.
FROM node:lts-alpine

# Set the environment variable to production to ensure frameworks like Express
# run in their optimized production modes.
ENV NODE_ENV=production

# Set the working directory inside the container to /usr/src/app.
# All subsequent commands (COPY, RUN, CMD) will be executed in this directory.
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if it exists) to the working directory.
# We do this before copying the rest of the source code to leverage Docker layer caching.
# If package.json hasn't changed, Docker will use the cached dependency layer.
COPY package*.json ./

# Install only the production dependencies.
# Using 'npm ci' (clean install) ensures reliable, reproducible builds based on the lockfile.
# The '--omit=dev' (or '--only=production') flag prevents dev dependencies like Jasmine from being installed.
RUN npm ci --omit=dev

# Copy the rest of the application source code from your host into the container.
COPY . .

# Expose port 3000 to the host machine, documenting which port the app listens on.
EXPOSE 3000

# Set the default command to start the application.
# Running 'node server.js' directly (instead of 'npm start') is considered a best practice
# because it passes OS signals (like SIGTERM) directly to your Node process for graceful shutdowns.
CMD ["node", "server.js"]
