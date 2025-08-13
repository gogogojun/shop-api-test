#!/usr/bin/env bash
set -e

# 환경파일 (필요 값은 실제로 채워주세요)
cat >/etc/myapp.env <<'EOF'
SPRING_PROFILES_ACTIVE=prod
SERVER_PORT=8080
SPRING_DATASOURCE_URL=jdbc:mysql://shop-db.c74828wmikhx.ap-northeast-2.rds.amazonaws.com:3306/shop?useSSL=false&characterEncoding=UTF-8
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=PgEhzLRi4Pf0cVFG5BhX
EOF
chown root:root /etc/myapp.env
chmod 600 /etc/myapp.env

# systemd 유닛 설치/갱신
install -m 644 -o root -g root /opt/myapp/deploy/myapp.service /etc/systemd/system/myapp.service
systemctl daemon-reload
