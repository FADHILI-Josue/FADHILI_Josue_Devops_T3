# Express & NGINX Docker Project

This project demonstrates a simple "Hello, DevOps!" web server built with Node.js/Express, containerized using Docker, and exposed to the web via an NGINX reverse proxy.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js and npm](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/products/docker-desktop/)

## How to Run the Application

Follow these steps from your terminal in the project's root directory.

### 1. Install Dependencies
First, install the required Node.js packages.
```sh
npm install
```

### 2. Create Docker Network
This network allows the application and NGINX containers to communicate with each other.
```sh
docker network create devops-net
```

### 3. Build and Run the Node.js App Container
Build the Docker image for the Express app and run it in a container named `node-app`.
```sh
# Build the image
docker build -t express-app .

# Run the container
docker run -d --name node-app --network devops-net express-app
```

### 4. Run the NGINX Reverse Proxy Container
This command starts NGINX and maps port 80 on your machine to the container, using your local `nginx.conf` file.

**For Windows (PowerShell or CMD):**
```sh
# PowerShell
docker run -d --name nginx-proxy -p 80:80 --network devops-net -v "${pwd}/nginx.conf:/etc/nginx/nginx.conf:ro" nginx

# CMD
docker run -d --name nginx-proxy -p 80:80 --network devops-net -v "%cd%/nginx.conf:/etc/nginx/nginx.conf:ro" nginx
```

**For macOS or Linux:**
```sh
docker run -d --name nginx-proxy -p 80:80 --network devops-net -v "$(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro" nginx
```

### 5. Verify It's Running
The application is now running and accessible through the NGINX proxy.

**Option A: Use cURL in your terminal**
```sh
curl http://localhost
```
You should see the output: `Hello, DevOps!`
[screenshot](./screenshot.png)

**Option B: Use your browser**
Navigate to `http://localhost`. The page will display the message "Hello, DevOps!".

## How to Stop and Clean Up
To stop the application and remove the containers and network, run the following commands:
```sh
# Stop the containers
docker stop nginx-proxy node-app

# Remove the containers
docker rm nginx-proxy node-app

# Remove the network
docker network rm devops-net
```

## File Structure
```
.
├── app.js              # Express server logic
├── package.json        # Node.js dependencies and scripts
├── Dockerfile          # Docker instructions for the Node.js app
├── nginx.conf          # NGINX reverse proxy configuration
└── README.md           # This file
```
