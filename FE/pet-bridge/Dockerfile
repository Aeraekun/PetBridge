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
COPY --from=build /app/build /var/jenkins_home/workspace/MasterFE/FE/pet-bridge

# Copy custom Nginx configuration
COPY /etc/nginx/nginx.conf /etc/nginx/nginx.conf

# Copy and extract Let's Encrypt certificates
COPY letsencrypt.tar.gz /etc/
RUN tar -xzf /etc/letsencrypt.tar.gz -C /etc && rm /etc/letsencrypt.tar.gz

# Expose port
EXPOSE 80
EXPOSE 443

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
