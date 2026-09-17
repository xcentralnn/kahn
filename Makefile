PROJECT_ID ?= your-gcp-project-id
REGION ?= asia-southeast1
REPO_NAME ?= valnia
TAG ?= latest
PLATFORMS ?= linux/amd64,linux/arm64

FE_IMAGE := $(REGION)-docker.pkg.dev/$(PROJECT_ID)/$(REPO_NAME)/valnia-frontend:$(TAG)
BE_IMAGE := $(REGION)-docker.pkg.dev/$(PROJECT_ID)/$(REPO_NAME)/valnia-backend:$(TAG)

.PHONY: help build build-fe build-be build-arm build-multiarch up down auth docker-auth push push-fe push-be

help:
	@echo "Available commands:"
	@echo "  make up               - Run frontend and backend locally with docker compose"
	@echo "  make down             - Stop local docker compose containers"
	@echo "  make build            - Build both frontend and backend Docker images (host arch)"
	@echo "  make build-arm        - Build images for ARM64 architecture"
	@echo "  make build-multiarch  - Build multi-arch images (linux/amd64, linux/arm64)"
	@echo "  make push             - Push both frontend and backend images to Artifact Registry"

build: build-fe build-be

build-fe:
	cd frontend && docker build -t valnia-frontend:$(TAG) .

build-be:
	cd backend && docker build -t valnia-backend:$(TAG) .

build-arm:
	cd frontend && docker buildx build --platform linux/arm64 -t valnia-frontend:arm64 --load .
	cd backend && docker buildx build --platform linux/arm64 -t valnia-backend:arm64 --load .

build-multiarch:
	cd frontend && docker buildx build --platform $(PLATFORMS) -t $(FE_IMAGE) .
	cd backend && docker buildx build --platform $(PLATFORMS) -t $(BE_IMAGE) .

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

push-fe: docker-auth
	cd frontend && docker buildx build --platform $(PLATFORMS) -t $(FE_IMAGE) --push .

push-be: docker-auth
	cd backend && docker buildx build --platform $(PLATFORMS) -t $(BE_IMAGE) --push .
