FROM node:16 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .


FROM base as production

RUN npm run build

FROM base as unit-tests

ENV GIT_WORK_TREE=/home/node/app GIT_DIR=/home/node/.git

RUN apt-get update && \
    apt-get install git

