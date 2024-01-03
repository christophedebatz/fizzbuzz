FROM node:21
MAINTAINER Christophe de Batz <christophedb@gmail.com>

RUN useradd -m dev
USER dev

WORKDIR /app

COPY package.json yarn.lock ./
COPY entrypoint.sh ./

RUN yarn

COPY . .

USER root

RUN ["chmod", "+x", "./entrypoint.sh"]

ENTRYPOINT ["./entrypoint.sh"]
