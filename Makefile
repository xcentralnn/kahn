PROJECT_ID ?= your-gcp-project-id
REGION ?= asia-southeast1
REPO_NAME ?= serverless-apps
TAG ?= latest

FE_IMAGE := $(REGION)-docker.pkg.dev/$(PROJECT_ID)/$(REPO_NAME)/valnia-frontend:$(TAG)
BE_IMAGE := $(REGION)-docker.pkg.dev/$(PROJECT_ID)/$(REPO_NAME)/valnia-backend:$(TAG)

.PHONY: help build up down auth docker-auth push push-fe push-be

help:
	@echo "Available commands:"
	@echo "  make up          - Run frontend and backend locally with docker-compose"
	@echo "  make down        - Stop local docker-compose containers"
	@echo "  make build       - Build both frontend and backend Docker images"
	@echo "  make build-fe    - Build frontend Docker image"
	@echo "  make build-be    - Build backend Docker image"
	@echo "  make push        - Push both frontend and backend images to Artifact Registry"
	@echo "  make push-fe     - Push frontend image to Artifact Registry"
	@echo "  make push-be     - Push backend image to Artifact Registry"

build: build-fe build-be

build-fe:
	cd frontend && docker build -t valnia-frontend:$(TAG) .

build-be:
	cd backend && docker build -t valnia-backend:$(TAG) .

up:
	docker compose up --build -d

down:
	docker compose down

auth:
	gcloud auth login
	gcloud auth application-default login
	gcloud config set project $(PROJECT_ID)

docker-auth:
	gcloud auth configure-docker $(REGION)-docker.pkg.dev --quiet

push: push-fe push-be

push-fe: build-fe docker-auth
	docker tag valnia-frontend:$(TAG) $(FE_IMAGE)
	docker push $(FE_IMAGE)

push-be: build-be docker-auth
	docker tag valnia-backend:$(TAG) $(BE_IMAGE)
	docker push $(BE_IMAGE)
