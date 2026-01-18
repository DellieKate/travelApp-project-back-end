# ==== BASE STAGE ====
FROM node:25-alpine

# Set working directory
WORKDIR /travelApp

# Copy only package files first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy rest of source code
COPY . .

# Set environment variables
ENV PORT=3000

# Expose port
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD wget http://localhost:3000/health || exit 1

# Start the app
CMD ["node", "src/index.js"]