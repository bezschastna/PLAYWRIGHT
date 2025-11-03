# Use a base image with Playwright pre-installed browsers and dependencies
FROM mcr.microsoft.com/playwright:v1.56.1-noble

# Set the working directory inside the container
WORKDIR /tests

# Copy package.json and package-lock.json (or yarn.lock) for dependency installation
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Install Playwright browsers (if not using the pre-installed ones from the base image,
# or if you need specific versions/browsers not included in the base image)
# RUN npx playwright install --with-deps

# Define the default command to run when the container starts
# This example assumes you have a test script defined in your package.json
CMD ["npm", "test"]