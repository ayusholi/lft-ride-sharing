# Use the official Node.js image as the base image
FROM node:17

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY server/ ./

# Expose the port that your Nest.js application will listen on
EXPOSE 3333

# Start the Nest.js application
CMD ["npm", "start"]
