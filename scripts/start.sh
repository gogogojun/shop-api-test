#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/myapp"

# 실행 전 파일 존재 확인
test -f "${APP_DIR}/app.jar" || { echo "[ERR] ${APP_DIR}/app.jar not found"; exit 1; }

# 서비스 시작/재시작
systemctl enable myapp.service || true
systemctl restart myapp.service

# 헬스체크 (로컬)
for i in {1..30}; do
  if curl -fsS "http://127.0.0.1:${SERVER_PORT:-8080}/health" >/dev/null 2>&1; then
    echo "Health check OK"
    exit 0
  fi
  echo "Waiting for app... ($i/30)"
  sleep 2
done

echo "[ERR] Health check failed"
journalctl -u myapp -n 200 --no-pager || true
exit 1
