FROM node:22-alpine AS builder

WORKDIR /app

# Install build dependencies for native modules (e.g. argon2)
RUN apk add --no-cache python3 make g++ gcc

COPY package*.json ./
RUN npm install --omit=dev

FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY src/ ./src/
COPY migrations/ ./migrations/
COPY scripts/ ./scripts/
COPY data/ ./data/

EXPOSE 3000

USER node

CMD ["node", "src/server.js"]
