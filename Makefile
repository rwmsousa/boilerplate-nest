include .env
IMAGE_NAME=$(DOCKER_IMAGE_NAME)

build:
	docker build -t $(IMAGE_NAME) . --no-cache

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f app

restart:
	docker-compose down
	docker-compose up -d --build
	docker-compose logs -f app

start:
	yarn start

start-dev:
	yarn start:dev

start-prod:
	yarn start:prod

test:
	yarn test

test-watch:
	yarn test:watch

test-e2e:
	yarn test:e2e

lint:
	yarn lint

format:
	yarn format