FROM golang:1.24-alpine AS builder

ARG TARGETOS=linux
ARG TARGETARCH=amd64

WORKDIR /build
COPY go.mod go.sum ./
RUN go mod download
COPY main.go ./
RUN CGO_ENABLED=0 GOOS=${TARGETOS} GOARCH=${TARGETARCH} go build -trimpath -ldflags="-w -s" -o /valnia-backend .

FROM ubuntu:24.04

ARG TARGETARCH=amd64

ENV DEBIAN_FRONTEND=noninteractive
ENV TERM=xterm-256color
ENV COLORTERM=truecolor
ENV SHELL=/bin/bash
ENV HOME=/root
ENV PORT=8080

WORKDIR /root

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    gnupg \
    wget \
    git \
    jq \
    openssh-client \
    unzip \
    tar \
    iputils-ping \
    dnsutils \
    net-tools \
    procps \
    htop \
    tmux \
    nano \
    vim-tiny && \
    rm -rf /var/lib/apt/lists/*

RUN set -eux; \
    ARCH="${TARGETARCH:-amd64}"; \
    case "${ARCH}" in \
        "amd64") \
            CLOUDFLARED_URL="https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb"; \
            AWS_URL="https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip"; \
            KUBECTL_URL="https://dl.k8s.io/release/v1.32.2/bin/linux/amd64/kubectl"; \
            TERRAFORM_URL="https://releases.hashicorp.com/terraform/1.10.5/terraform_1.10.5_linux_amd64.zip"; \
            ;; \
        "arm64") \
            CLOUDFLARED_URL="https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb"; \
            AWS_URL="https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip"; \
            KUBECTL_URL="https://dl.k8s.io/release/v1.32.2/bin/linux/arm64/kubectl"; \
            TERRAFORM_URL="https://releases.hashicorp.com/terraform/1.10.5/terraform_1.10.5_linux_arm64.zip"; \
            ;; \
        *) \
            echo "Unsupported architecture: ${ARCH}"; exit 1; \
            ;; \
    esac; \
    curl -fsSL "${CLOUDFLARED_URL}" -o /tmp/cloudflared.deb; \
    dpkg -i /tmp/cloudflared.deb; \
    rm -f /tmp/cloudflared.deb; \
    curl -fsSL "${AWS_URL}" -o /tmp/awscliv2.zip; \
    unzip -q /tmp/awscliv2.zip -d /tmp; \
    /tmp/aws/install; \
    rm -rf /tmp/aws /tmp/awscliv2.zip; \
    curl -fsSL "${KUBECTL_URL}" -o /usr/local/bin/kubectl; \
    chmod +x /usr/local/bin/kubectl; \
    curl -fsSL "${TERRAFORM_URL}" -o /tmp/terraform.zip; \
    unzip -q /tmp/terraform.zip -d /usr/local/bin/; \
    chmod +x /usr/local/bin/terraform; \
    rm -f /tmp/terraform.zip

RUN curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && \
    apt-get update && apt-get install -y --no-install-recommends google-cloud-cli && \
    rm -rf /var/lib/apt/lists/*

COPY --from=builder /valnia-backend /usr/local/bin/valnia-backend

EXPOSE 8080

CMD ["/usr/local/bin/valnia-backend"]
