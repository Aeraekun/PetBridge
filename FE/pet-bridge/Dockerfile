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

# www-data 사용자와 그룹 추가
RUN addgroup -g 82 -S www-data && \
    adduser -u 82 -D -S -G www-data www-data

# Copy built assets from the build stage
COPY --from=build /app/build /var/jenkins_home/workspace/MasterFE/FE/pet-bridge

# Expose port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
