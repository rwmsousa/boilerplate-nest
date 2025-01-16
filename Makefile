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
	npm run start

start-dev:
	npm run start:dev

start-prod:
	npm run start:prod

test:
	npm run test

test-watch:
	npm run test:watch

test-e2e:
	npm run test:e2e

lint:
	npm run lint

format:
	npm run format