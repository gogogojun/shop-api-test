#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/myapp"

# 최신 JAR를 app.jar로
NEW_JAR=$(ls -t ${APP_DIR}/*.jar 2>/dev/null | head -n1 || true)
if [ -z "${NEW_JAR}" ]; then
  echo "ERROR: No JAR found in ${APP_DIR}"
  exit 1
fi

if [ -f "${APP_DIR}/app.jar" ]; then
  mv "${APP_DIR}/app.jar" "${APP_DIR}/app_$(date +%Y%m%d%H%M%S).jar.bak"
fi

mv -f "${NEW_JAR}" "${APP_DIR}/app.jar"
chown ec2-user:ec2-user "${APP_DIR}/app.jar"
chmod 755 "${APP_DIR}/app.jar"

# systemd 유닛 반영
install -m 644 -o root -g root ${APP_DIR}/deploy/myapp.service /etc/systemd/system/myapp.service
systemctl daemon-reload

# env 파일(없을 때만) — 운영에선 SSM 파라미터 스토어를 권장
if [ ! -f /etc/myapp.env ]; then
  cat >/etc/myapp.env <<'EOF'
SPRING_PROFILES_ACTIVE=prod
SERVER_PORT=8080
SPRING_DATASOURCE_URL=jdbc:mysql://shop-db.c74828wmikhx.ap-northeast-2.rds.amazonaws.com:3306/shop?useSSL=false&characterEncoding=UTF-8
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=PgEhzLRi4Pf0cVFG5BhX
EOF
  chmod 600 /etc/myapp.env
fi