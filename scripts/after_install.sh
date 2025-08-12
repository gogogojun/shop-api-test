#!/usr/bin/env bash
set -e

# 환경파일 생성(초기 테스트용 — 실제는 SSM 권장)
mkdir -p /etc
cat >/etc/myapp.env <<'EOF'
SPRING_PROFILES_ACTIVE=prod
SERVER_PORT=8080
DB_URL=jdbc:mysql://<rds-endpoint>:3306/app?useSSL=false&characterEncoding=UTF-8
DB_USER=app
DB_PASS=secret
EOF
chmod 600 /etc/myapp.env

# systemd 유닛 설치/갱신
install -m 644 -o root -g root deploy/myapp.service /etc/systemd/system/myapp.service
systemctl daemon-reload
