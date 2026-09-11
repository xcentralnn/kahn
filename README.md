# Valnia • Cloud Infrastructure, AI/GPU & Delivery Consulting Platform

Valnia is an enterprise cloud infrastructure, AI/GPU acceleration, and DevOps delivery consulting platform. Designed to provide transparent delivery plans from high-speed landing pages and containerized monoliths to multi-cloud Kubernetes fleets and private self-hosted LLM clusters with 24/7 SRE maintenance.

## Key Delivery Packages

1. **Starter Launchpad (2 - 3 Days)**: High-speed static web, marketing landing pages, JAMstack, CloudFront CDN, SSL/TLS, and automated Git-push CI/CD.
2. **Monolith & Growth App (1 - 2 Weeks)**: Containerized ECS Fargate / VPS, RDS PostgreSQL/MySQL with automated backups, Redis cache, and multi-stage CI/CD.
3. **Cloud-Native Kubernetes & Scale (2 - 4 Weeks)**: Production EKS/GKE clusters, Helm charts, ArgoCD GitOps, Prometheus & Grafana observability, and zero-downtime rolling/canary deployments.
4. **Private AI / LLM & GPU Infrastructure (1 - 3 Weeks)**: High-throughput self-hosted LLM serving (vLLM, Triton) on NVIDIA (H100, A100, L40S), AMD Instinct (MI300X, ROCm), or Intel Gaudi accelerators, coupled with private RAG vector databases (Qdrant, Milvus, pgvector).
5. **Enterprise Multi-Cloud & FinOps (Custom Sprints)**: Multi-cloud redundancy (AWS + GCP + Azure), active-active disaster recovery, and automated FinOps cloud spend reduction (30% to 45%).
6. **24/7 SRE On-Call & Maintenance**: Sub-15 minute P1 outage SLA response, automated backup restore testing, kernel patching, and incident war room coverage.

## Tech Stack

- **Framework**: Vite + React
- **Styling**: Vanilla CSS with custom design tokens, dark theme, and glassmorphism
- **Icons**: Lucide React
- **Fonts**: Outfit, Plus Jakarta Sans, JetBrains Mono

## Development & Build

Ensure Node.js (v20+ or v24+) is installed.

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```

## Deployment

The built static assets in `dist/` can be deployed directly to Amazon S3 + CloudFront, Cloudflare Pages, Vercel, or an NGINX container.
