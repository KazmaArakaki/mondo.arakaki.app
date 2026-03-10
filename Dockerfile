FROM node:24-trixie AS base

#
# builder
#
FROM base AS builder

WORKDIR /app

COPY . .

RUN npm install -g pnpm@latest-10
RUN pnpm ci
RUN pnpx prisma generate --generator client
RUN pnpm build

#
# runner
#
FROM gcr.io/distroless/nodejs24-debian12 AS runner

WORKDIR /app

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY --from=builder --chown=nonroot:nonroot /app/.next/standalone ./
COPY --from=builder --chown=nonroot:nonroot /app/.next/static ./.next/static
COPY --from=builder --chown=nonroot:nonroot /app/public ./public

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["server.js"]
