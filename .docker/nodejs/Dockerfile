# Stage 1: Dependencies
FROM node:23-alpine AS deps
RUN apk add --no-cache libc6-compat wget
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

# Stage 2: Builder
FROM node:23-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN mkdir -p public

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Stage 3: Runner
FROM node:23-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --no-cache wget libc6-compat

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir -p ./public
COPY --from=builder /app/public/ ./public/
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 10100

ENV PORT=10100
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
