FROM node:18-alpine

WORKDIR /app

COPY backend/package.json backend/package-lock.json ./

RUN npm install

COPY backend/ ./

# Expose port 9021
EXPOSE 9021

CMD ["npm", "run", "start"]
