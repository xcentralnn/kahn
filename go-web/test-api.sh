#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-}"

if [ -z "$BASE_URL" ]; then
  echo "Usage: ./test-api.sh <BASE_URL>"
  echo "Example: ./test-api.sh https://go-web-xyz-as.a.run.app"
  exit 1
fi

BASE_URL="${BASE_URL%/}"

echo "1. Testing health check endpoint..."
curl -s -w "\nHTTP Status: %{http_code}\n" "${BASE_URL}/healthz"

echo ""
echo "2. Testing System Info & Toolsets API..."
if command -v jq >/dev/null 2>&1; then
  curl -s "${BASE_URL}/api/system" | jq .
else
  curl -s "${BASE_URL}/api/system"
fi
echo ""

echo ""
echo "3. Testing ISO & Compliance Matrix API..."
if command -v jq >/dev/null 2>&1; then
  curl -s "${BASE_URL}/api/compliance" | jq .
else
  curl -s "${BASE_URL}/api/compliance"
fi
echo ""

echo ""
echo "4. Testing Web Console root & Brand Logo..."
curl -s -o /dev/null -w "Web Console HTTP Status: %{http_code}\n" "${BASE_URL}/"
curl -s -o /dev/null -w "Brand Logo SVG HTTP Status: %{http_code}\n" "${BASE_URL}/kahn-logo.svg"

echo ""
echo "All tests completed."
