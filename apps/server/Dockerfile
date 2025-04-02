FROM node:22-alpine3.21 AS builder

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY nest-cli.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./
COPY ./src/ ./src/

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm build

FROM alpine:3.21

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

RUN apk add --upgrade --no-cache nodejs npm && \
    npm install -g pnpm && \
    pnpm install --prod --frozen-lockfile --ignore-scripts && \
    addgroup -S nonroot && adduser -S nonroot -G nonroot && \
    chown nonroot:nonroot /app

USER nonroot

EXPOSE 3000
ENTRYPOINT ["pnpm", "start:prod"]
