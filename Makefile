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