#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/myapp"
JAR_PATH="${APP_DIR}/app.jar"

mkdir -p "${APP_DIR}" "${APP_DIR}/scripts" "${APP_DIR}/deploy"
chown -R ec2-user:ec2-user "${APP_DIR}"

# 새로 복사된 jar가 *.jar로 들어온 경우 app.jar로 고정
NEW_JAR=$(ls -t ${APP_DIR}/*.jar 2>/dev/null | head -n1 || true)

# 기존 app.jar 백업
if [ -f "${JAR_PATH}" ]; then
  mv "${JAR_PATH}" "${APP_DIR}/app_$(date +%Y%m%d%H%M%S).jar.bak"
fi

# 새 jar가 있고 이름이 다르면 app.jar로 교체
if [ -n "${NEW_JAR}" ] && [ "${NEW_JAR}" != "${JAR_PATH}" ]; then
  mv -f "${NEW_JAR}" "${JAR_PATH}"
fi

# 최종적으로 app.jar가 없으면(복사 실패) 친절히 실패
if [ ! -f "${JAR_PATH}" ]; then
  echo "ERROR: app.jar not found in ${APP_DIR}. Check appspec.yml files mapping and artifact layout."
  ls -al "${APP_DIR}" || true
  exit 1
fi

chown ec2-user:ec2-user "${JAR_PATH}"
chmod 755 "${JAR_PATH}"

# systemd 유닛 설치/갱신
install -m 644 -o root -g root "${APP_DIR}/deploy/myapp.service" /etc/systemd/system/myapp.service
systemctl daemon-reload
