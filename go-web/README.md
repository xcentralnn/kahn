# Apex Cloud Bastion | Web Terminal & Multi-Cloud Jump Host

Web Terminal hiện đại và mạnh mẽ chạy trên GCP Cloud Run, tích hợp bộ công cụ quản trị đa đám mây (Cloudflare, AWS, GCP, Kubernetes, Terraform) trong môi trường Ubuntu 24.04 LTS.

## Tính năng chính

- **WebOps Cockpit**: Giao diện Cyberpunk Glassmorphism hiện đại, thanh telemetry thời gian thực, status indicators đa nền tảng.
- **Web Terminal Engine**: Xterm.js v5 kết nối 2 chiều qua WebSocket tới Linux PTY chạy bash. Hỗ trợ ANSI colors, phím tắt, copy/paste, resize tự động.
- **Command Macros**: 1-click thực thi nhanh các câu lệnh Cloudflare, AWS, GCP, K8s, Terraform và Network Diagnostics.
- **Công cụ DevOps tích hợp**:
  - `cloudflared`: Cloudflare Tunnel & Access CLI
  - `aws`: AWS CLI v2
  - `gcloud`: Google Cloud SDK CLI
  - `kubectl`: Kubernetes CLI v1.32
  - `terraform`: HashiCorp Terraform 1.10
  - `ssh`, `curl`, `wget`, `jq`, `git`, `htop`, `tmux`

## Triển khai trên GCP Cloud Run

Triển khai hạ tầng qua thư mục Terraform tại:
`devops-projects/gcp/projects/go-web/environments/dev`
