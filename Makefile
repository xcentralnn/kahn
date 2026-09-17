PROJECT_ID ?= your-gcp-project-id
REGION ?= asia-southeast1
REPO_NAME ?= serverless-apps
SERVICE_NAME ?= valnia
IMAGE_TAG ?= latest
IMAGE_URI := $(REGION)-docker.pkg.dev/$(PROJECT_ID)/$(REPO_NAME)/$(SERVICE_NAME):$(IMAGE_TAG)

.PHONY: help build run auth docker-auth push test

help:
	@echo "Available commands:"
	@echo "  make build         - Build Valnia Jump Host Docker image"
	@echo "  make run           - Run Valnia container locally on port 8080"
	@echo "  make auth          - Authenticate gcloud CLI"
	@echo "  make docker-auth   - Configure Docker authentication for Artifact Registry"
	@echo "  make push          - Tag and push Docker image to Artifact Registry"
	@echo "  make test URL=...  - Check healthz of deployed service"

build:
	docker build -t $(SERVICE_NAME):$(IMAGE_TAG) .

run:
	docker run --rm -it -p 8080:8080 $(SERVICE_NAME):$(IMAGE_TAG)

auth:
	gcloud auth login
	gcloud auth application-default login
	gcloud config set project $(PROJECT_ID)

docker-auth:
	gcloud auth configure-docker $(REGION)-docker.pkg.dev --quiet

push: build docker-auth
	docker tag $(SERVICE_NAME):$(IMAGE_TAG) $(IMAGE_URI)
	docker push $(IMAGE_URI)

test:
	@if [ -z "$(URL)" ]; then echo "Usage: make test URL=https://service-xxx.run.app"; exit 1; fi
	curl -s "$(URL)/healthz"
