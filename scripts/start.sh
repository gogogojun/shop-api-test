#!/usr/bin/env bash
set -euo pipefail

# 0) 스크립트 줄바꿈(LF) 보정 - 혹시 Windows에서 올라온 경우 대비
if command -v find >/dev/null 2>&1; then
  find "$(dirname "$0")" -type f -name "*.sh" -exec sed -i 's/\r$//' {} \; || true
fi

# 1) Java / curl 설치
if ! command -v java >/dev/null 2>&1; then
  if [ -f /etc/os-release ]; then . /etc/os-release; fi
  case "${ID:-}" in
    amzn|rhel|centos)
      yum -y install java-17-amazon-corretto-headless || yum -y install java-17-openjdk-headless
      ;;
    ubuntu|debian)
      apt-get update -y
      apt-get install -y openjdk-17-jre-headless
      ;;
    *)
      echo "Unknown distro: ${ID:-}"; exit 1
      ;;
  esac
fi
command -v curl >/dev/null 2>&1 || { (command -v yum && sudo yum -y install curl) || (command -v apt-get && sudo apt-get install -y curl); }

# 2) 배포 디렉토리 준비
APP_DIR="/opt/myapp"
mkdir -p "$APP_DIR"
chown -R ec2-user:ec2-user "$APP_DIR"

# 3) 기존 JAR 백업(있으면)
if [ -f "${APP_DIR}/app.jar" ]; then
  mv "${APP_DIR}/app.jar" "${APP_DIR}/app_$(date +%Y%m%d%H%M%S).jar.bak" || true
fi