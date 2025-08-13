#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/myapp"
JAR_PATH="${APP_DIR}/app.jar"


mkdir -p "${APP_DIR}" "${APP_DIR}/scripts" "${APP_DIR}/deploy"
chown -R ec2-user:ec2-user "${APP_DIR}"

if [ -f "${JAR_PATH}" ]; then
  mv "${JAR_PATH}" "${APP_DIR}/app_$(date +%Y%m%d%H%M%S).jar.bak"
fi


if [ ! -f "${JAR_PATH}" ]; then
  NEW_JAR=$(ls -t ${APP_DIR}/*.jar 2>/dev/null | head -n1 || true)
  if [ -n "${NEW_JAR}" ] && [ "${NEW_JAR}" != "${JAR_PATH}" ]; then
    mv -f "${NEW_JAR}" "${JAR_PATH}"
  fi
fi


chown ec2-user:ec2-user "${JAR_PATH}"
chmod 755 "${JAR_PATH}"


install -m 644 -o root -g root "${APP_DIR}/deploy/myapp.service" /etc/systemd/system/myapp.service
systemctl daemon-reload
