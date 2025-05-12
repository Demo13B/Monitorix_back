# FROM node:23-slim

# WORKDIR /app

# RUN apt update && apt upgrade -y

# COPY ./package.json /app/
# COPY ./yarn.lock /app/

# RUN yarn install --production

# COPY ./dist /app/dist
# COPY ./fullchain.pem /app/fullchain.pem
# COPY ./privkey.pem /app/privkey.pem
# COPY ./.env /app/.env

# ENTRYPOINT [ "yarn", "start" ]

FROM node:23-slim as builder

WORKDIR /app

RUN apt update && apt upgrade -y

COPY ./package.json ./yarn.lock ./

RUN yarn install

COPY ./src ./src

RUN yarn compile

FROM node:23-slim as production

WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn install --production

COPY --from=builder ./dist ./dist
COPY ./fullchain.pem ./privkey.pem ./

ENTRYPOINT [ "yarn", "start" ]
