#!/usr/bin/env bash
set -euo pipefail

SERVICE="myapp.service"
PORT="${SERVER_PORT:-8080}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:${PORT}/actuator/health}"
STRICT_HEALTH="${STRICT_HEALTH:-true}"   # true면 실패 시 exit 1, false면 경고만

echo "[START] restarting ${SERVICE}"
systemctl daemon-reload
systemctl enable "${SERVICE}" || true
systemctl restart "${SERVICE}"

# 1) 포트 리슨 대기 (최대 20초)
for i in $(seq 1 20); do
  if ss -ltn | awk '{print $4}' | grep -q ":${PORT}$"; then
    echo "[PORT] ${PORT} is listening"
    break
  fi
  echo "[PORT] waiting... ${i}/20"
  sleep 1
done

if ! ss -ltn | awk '{print $4}' | grep -q ":${PORT}$"; then
  echo "[PORT] still not listening after 20s"
  journalctl -u "${SERVICE}" -n 120 --no-pager || true
  [[ "${STRICT_HEALTH}" == "true" ]] && exit 1 || echo "[WARN] continuing despite port not open"
fi

# 2) 헬스체크 (최대 20회, 1s 간격 = 20초)
echo "[HC] checking ${HEALTH_URL}"
for i in $(seq 1 20); do
  if curl -fsS "${HEALTH_URL}" >/dev/null 2>&1; then
    echo "[HC] OK"
    exit 0
  fi
  echo "[HC] not ready (${i}/20)"
  sleep 1
done

echo "[HC] FAILED after 20s"
journalctl -u "${SERVICE}" -n 120 --no-pager || true
[[ "${STRICT_HEALTH}" == "true" ]] && exit 1 || exit 0
