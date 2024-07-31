# Build stage
FROM node:20 as build

# Set working directory
WORKDIR /app

# Copy all files to the container
COPY . .

# Install dependencies
RUN npm install

# Copy environment variables
COPY .env .env

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from the build stage
COPY --from=build /var/jenkins_home/workspace/MasterFE/FE/pet-bridge/public /app/build

# Expose port
EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
