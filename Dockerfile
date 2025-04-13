FROM node:22.14.0-slim

RUN apt-get update && apt-get install -y wget gnupg

RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN echo "deb http://apt.postgresql.org/pub/repos/apt bookworm-pgdg main" > /etc/apt/sources.list.d/pgdg.list

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /app

RUN mkdir -p /app/pgdata

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3001

CMD ["yarn", "start:prod"]