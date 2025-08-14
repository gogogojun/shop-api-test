#!/usr/bin/env bash

set -e

echo "[BeforeInstall] start"

APP_DIR="/opt/myapp"
SCRIPT_DIR="/opt/myapp/scripts"
mkdir -p "$APP_DIR" "$SCRIPT_DIR"
chown -R ec2-user:ec2-user "$APP_DIR" "$SCRIPT_DIR"


# 편의 툴 (없으면 설치)
for pkg in unzip curl; do
  if ! command -v "$pkg" >/dev/null 2>&1; then
    echo "[BeforeInstall] installing $pkg..."
    if command -v dnf >/dev/null 2>&1; then dnf -y install "$pkg" || true
    elif command -v yum >/dev/null 2>&1; then yum -y install "$pkg" || true
    elif command -v apt-get >/dev/null 2>&1; then apt-get update -y && apt-get install -y "$pkg" || true
    fi
  fi
done

echo "[BeforeInstall] done"
exit 0
