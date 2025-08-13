#!/usr/bin/env bash
set -e
APP_DIR="/opt/myapp"
mkdir -p "$APP_DIR"
chown -R ec2-user:ec2-user "$APP_DIR"

# 기존 JAR 백업
if [ -f "${APP_DIR}/app.jar" ]; then
  mv "${APP_DIR}/app.jar" "${APP_DIR}/app_$(date +%Y%m%d%H%M%S).jar.bak" || true
fi

echo "[DEBUG] Listing staged files"; ls -al /opt/myapp || true
