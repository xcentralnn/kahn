#!/bin/sh
set -e

fetch_token() {
    if [ -n "$BACKEND_URL" ] && echo "$BACKEND_URL" | grep -q "^https://"; then
        for i in 1 2 3 4 5; do
            TOKEN=$(curl -s -f -H "Metadata-Flavor: Google" "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=${BACKEND_URL}" 2>/dev/null || true)
            if [ -n "$TOKEN" ]; then
                export GCP_TOKEN="$TOKEN"
                return 0
            fi
            sleep 1
        done
    fi
    export GCP_TOKEN=""
    return 1
}

fetch_token || true

if [ -n "$BACKEND_URL" ] && echo "$BACKEND_URL" | grep -q "^https://"; then
    (
        while true; do
            sleep 2400
            if fetch_token; then
                /docker-entrypoint.d/20-envsubst-on-templates.sh
                nginx -s reload 2>/dev/null || true
            fi
        done
    ) &
fi

exec /docker-entrypoint.sh "$@"
