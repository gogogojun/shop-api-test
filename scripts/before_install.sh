#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/myapp"
mkdir -p "$APP_DIR" "$APP_DIR/scripts"

# 이전 프로세스 종료 (pid 파일 우선)
if [ -f "$APP_DIR/app.pid" ]; then
  OLD_PID=$(cat "$APP_DIR/app.pid" || true)
  if [ -n "${OLD_PID:-}" ] && kill -0 "$OLD_PID" 2>/dev/null; then
    echo "[STOP] kill $OLD_PID"
    kill "$OLD_PID" || true
    sleep 2
    kill -9 "$OLD_PID" 2>/dev/null || true
  fi
  rm -f "$APP_DIR/app.pid"
fi

# 혹시 모를 잔여 java 프로세스 종료 (app.jar 기준)
pgrep -f "java .*app.jar" >/dev/null && pkill -f "java .*app.jar" || true
