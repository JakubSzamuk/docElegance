# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.13.0

FROM node:${NODE_VERSION} as base
WORKDIR /usr/src/app
RUN yarn config set network-timeout 600000
EXPOSE 3000

FROM base as dev
RUN apt-get update && apt-get install curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install google-chrome-stable -y --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.npm \
    yarn install --production --include=dev
RUN chown -R node /usr/src/app
RUN mkdir -p /home/node/Downloads \
    && chown -R node:node /home/node
USER node
COPY . .
CMD tail -f /usr/src/package.json

FROM base as prod
WORKDIR /usr/src
USER node
COPY . .
CMD yarn start



# Install dependencies only when needed
# FROM node:18.13.0-alpine AS deps
# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install --network-timeout 1000000



# FROM node:18.13.0-alpine AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# ADD . .
# RUN yarn prisma generate
# RUN yarn build

# FROM node:18.13.0-alpine AS runner
# WORKDIR /app
# RUN adduser --system --uid 1001 nextjs
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/prisma /app/prisma
# COPY .env .env


# USER nextjs
# EXPOSE 3000

# CMD ["yarn", "start"]