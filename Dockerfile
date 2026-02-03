# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build TypeScript project to /dist
RUN npm run build

# Expose port 4000 (your backend port)
EXPOSE 4000

# Run the backend server
CMD ["node", "dist/index.js"]
