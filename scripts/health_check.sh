#!/usr/bin/env bash
set -euo pipefail

HOST="127.0.0.1"
PORT="${SERVER_PORT:-8080}"
RETRY=120   # 최대 120초 대기

# 환경파일에서 PORT 재정의 가능
if [ -f /etc/myapp.env ]; then
  source /etc/myapp.env || true
  PORT="${SERVER_PORT:-$PORT}"
fi

echo "[HC] wait for $HOST:$PORT ..."
for i in $(seq 1 $RETRY); do
  if (echo > /dev/tcp/$HOST/$PORT) >/dev/null 2>&1; then
    echo "[HC] listening detected"
    exit 0
  fi
  sleep 1
done

echo "[HC] not listening after ${RETRY}s"
exit 1
