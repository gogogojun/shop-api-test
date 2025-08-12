#!/usr/bin/env bash
set -e
mkdir -p /opt/myapp
chown -R ec2-user:ec2-user /opt/myapp

# 기존 JAR 백업(선택)
if [ -f /opt/myapp/app.jar ]; then
  mv /opt/myapp/app.jar /opt/myapp/app_$(date +%Y%m%d%H%M%S).jar.bak || true
fi