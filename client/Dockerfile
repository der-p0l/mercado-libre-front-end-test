FROM node:20.13.1-alpine

# Create app directory
RUN mkdir /app
WORKDIR /app

# Copy files to container
COPY . .

# Expose port
EXPOSE 3000

ENTRYPOINT [ "/app/entrypoint.sh" ]
