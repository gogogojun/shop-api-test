#!/usr/bin/env bash
set -e

echo "[BeforeInstall] start"

APP_DIR="/opt/myapp"
mkdir -p "$APP_DIR"
chown -R ec2-user:ec2-user "$APP_DIR"

# Java 17 없으면 설치 (OS별 분기)
if ! command -v java >/dev/null 2>&1; then
  echo "[BeforeInstall] installing Java 17..."
  if [ -f /etc/os-release ]; then . /etc/os-release; else ID="unknown"; fi
  case "$ID" in
    amzn)
      # Amazon Linux 2023: dnf / AL2: yum
      if grep -q "Amazon Linux 2" /etc/system-release 2>/dev/null; then
        yum -y install java-17-amazon-corretto-headless
      else
        dnf -y install java-17-amazon-corretto-headless
      fi
      ;;
    rhel|centos|rocky|almalinux)
      yum -y install java-17-openjdk-headless
      ;;
    ubuntu|debian)
      apt-get update -y
      apt-get install -y openjdk-17-jre-headless
      ;;
    *)
      echo "[BeforeInstall] Unknown OS. Try dnf..."
      dnf -y install java-17-amazon-corretto-headless || true
      ;;
  esac
else
  echo "[BeforeInstall] Java already installed: $(java -version 2>&1 | head -n1)"
fi

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
