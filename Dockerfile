FROM node:23-slim

WORKDIR /app

RUN apt update && apt upgrade -y

RUN npm install -g yarn

COPY ./package.json /app/
COPY ./yarn.lock /app/

RUN yarn install --production

COPY ./dist /app/
COPY ./.env /app/

ENTRYPOINT [ "yarn", "start" ]
