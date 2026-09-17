# Stage 1: Build React Frontend
FROM node:22-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Ubuntu 24.04 Runtime with Multi-Cloud DevOps Tools
FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive
ENV TERM=xterm-256color
ENV COLORTERM=truecolor
ENV SHELL=/bin/bash
ENV HOME=/root

WORKDIR /root

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
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

# Cloudflare cloudflared
RUN curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o /tmp/cloudflared.deb && \
    dpkg -i /tmp/cloudflared.deb && \
    rm -f /tmp/cloudflared.deb

# AWS CLI v2
RUN curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o /tmp/awscliv2.zip && \
    unzip -q /tmp/awscliv2.zip -d /tmp && \
    /tmp/aws/install && \
    rm -rf /tmp/aws /tmp/awscliv2.zip

# Google Cloud SDK
RUN curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && \
    apt-get update && apt-get install -y --no-install-recommends google-cloud-cli && \
    rm -rf /var/lib/apt/lists/*

# Kubectl
RUN curl -fsSL "https://dl.k8s.io/release/v1.32.2/bin/linux/amd64/kubectl" -o /usr/local/bin/kubectl && \
    chmod +x /usr/local/bin/kubectl

# Terraform
RUN curl -fsSL "https://releases.hashicorp.com/terraform/1.10.5/terraform_1.10.5_linux_amd64.zip" -o /tmp/terraform.zip && \
    unzip -q /tmp/terraform.zip -d /usr/local/bin/ && \
    chmod +x /usr/local/bin/terraform && \
    rm -f /tmp/terraform.zip

# Install Go 1.24 to compile Valnia Jump Host server
RUN curl -fsSL https://go.dev/dl/go1.24.0.linux-amd64.tar.gz -o /tmp/go1.24.tar.gz && \
    tar -C /usr/local -xzf /tmp/go1.24.tar.gz && \
    rm -f /tmp/go1.24.tar.gz

ENV PATH="/usr/local/go/bin:${PATH}"

# Build Go Server embedding dist/
WORKDIR /build
COPY go.mod ./
COPY main.go ./
COPY --from=frontend-builder /app/dist ./dist
RUN go mod tidy && \
    CGO_ENABLED=0 go build -trimpath -ldflags="-w -s" -o /usr/local/bin/valnia-server .

# Cleanup Go SDK
RUN rm -rf /usr/local/go /build

WORKDIR /root
ENV PORT=8080
EXPOSE 8080

CMD ["/usr/local/bin/valnia-server"]
