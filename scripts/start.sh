#!/usr/bin/env bash
set -euo pipefail

SERVICE="myapp.service"
PORT="${SERVER_PORT:-8080}"
HC_PATH="${HC_PATH:-/}"          # 필요시 /swagger-ui/index.html 나 /actuator/health/readiness 로 바꿔도 됨
MAX_RETRY="${MAX_RETRY:-60}"     # 60회
SLEEP_SEC="${SLEEP_SEC:-5}"      # 5초 간격

echo "[START] restarting ${SERVICE}"
systemctl daemon-reload || true
systemctl enable "${SERVICE}" || true
systemctl restart "${SERVICE}"

echo "[HC] waiting for http://127.0.0.1:${PORT}${HC_PATH}"
for i in $(seq 1 "${MAX_RETRY}"); do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:${PORT}${HC_PATH}" || true)
  if [ -n "$code" ] && [ "$code" -ge 200 ] && [ "$code" -lt 400 ]; then
    echo "[HC] OK (${code}) at try ${i}/${MAX_RETRY}"
    exit 0
  fi
  echo "[HC] not ready yet (${code:-000}) ... ${i}/${MAX_RETRY}"
  sleep "${SLEEP_SEC}"
done

echo "[ERR] Health check failed. Dumping logs..."
systemctl status "${SERVICE}" -l || true
journalctl -u "${SERVICE}" -n 300 --no-pager || true
exit 1
