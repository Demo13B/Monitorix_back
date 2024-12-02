FROM node:23-slim

WORKDIR /app

RUN apt update && apt upgrade -y

COPY ./package.json /app/
COPY ./yarn.lock /app/

RUN yarn install --production

COPY ./dist /app/dist
COPY ./.env /app/.env

ENTRYPOINT [ "yarn", "start" ]
