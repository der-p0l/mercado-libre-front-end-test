FROM node:20.13.1-alpine

# Install global dependencies
RUN npm install -g nodemon
RUN npm install -g ts-node

# Create app directory
RUN mkdir /app
WORKDIR /app

# Copy files to image
COPY . .

# Expose port
EXPOSE 3000

ENTRYPOINT [ "/app/entrypoint.sh" ]
