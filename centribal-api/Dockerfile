FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the JSON server data file to the working directory
COPY . .

# Expose the port on which the JSON server will run
EXPOSE 8000


