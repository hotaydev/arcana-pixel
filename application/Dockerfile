FROM node:22-alpine3.21 AS builder

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY svelte.config.js ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY ./static/ ./static/
COPY ./src/ ./src/

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm build

FROM caddy:2.9-alpine

COPY --from=builder /app/build /usr/share/caddy

EXPOSE 80 443
