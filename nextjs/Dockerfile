# Use a lean Node.js base image
FROM node:alpine

# Create working directory for the app
WORKDIR /app

# Copy the project files
COPY package.json package-lock.json ./

# Install dependencies 
RUN npm install

# Copy remaining project files
COPY . ./

# Build the production version of the Next.js app
RUN npm run build

# Expose the port used by Next.js
EXPOSE 3000

# Command to start the Next.js server
CMD ["npm", "start"]

