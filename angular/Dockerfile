FROM node:8.15.0-alpine

RUN mkdir /usr/src

RUN npm install http-server -g

COPY ./dist/innodox-angular /usr/src

WORKDIR /usr/src

CMD http-server --p 4200 --f ./index.html