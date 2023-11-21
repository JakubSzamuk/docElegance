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
RUN yarn add puppeteer
RUN apt-get install -y openssl
RUN mkdir -p /home/node/Downloads \
    && chown -R node:node /home/node
USER node
COPY . .
CMD yarn dev

FROM base as prod
ENV NODE_ENV production
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    yarn install --production
USER node
COPY . .
CMD yarn start
