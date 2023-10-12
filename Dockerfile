FROM node:18-alpine
WORKDIR /app
ADD / /app

RUN yarn
# RUN yarn add tailwindcss@latest postcss@latest autoprefixer@latest


EXPOSE 3000
CMD ["yarn", "dev"]