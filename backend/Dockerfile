# Use the official Node.js image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock (ou yarn.lock se você usar o yarn)
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["yarn", "run", "start:prod"]
