# Default values if .env is not present
DOCKER_IMAGE_NAME ?= saas-concursos-nest
NODE_ENV ?= development

build:
	docker build -t $(DOCKER_IMAGE_NAME) . --no-cache

up:
	docker-compose up -d

up-dev:
	cp .env.development .env
	NODE_ENV=development docker-compose --env-file .env.development up -d

up-prod:
	cp .env.production .env
	NODE_ENV=production docker-compose --env-file .env.production up -d

down:
	docker-compose down

logs:
	docker-compose logs -f app

restart:
	docker-compose down
	docker-compose build --no-cache
	docker-compose up -d
	docker-compose logs -f app

restart-dev:
	docker-compose down
	docker-compose build --no-cache
	NODE_ENV=development docker-compose --env-file .env.development up -d
	docker-compose logs -f app

start:
	yarn start

start-dev:
	yarn start:dev

start-prod:
	yarn start:prod

migration-generate:
	yarn migration:generate $(name)

migration-run:
	yarn migration:run

migration-revert:
	yarn migration:revert

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

.PHONY: build up up-dev down logs restart restart-dev start start-dev start-prod migration-generate migration-run migration-revert test test-watch test-e2e lint format