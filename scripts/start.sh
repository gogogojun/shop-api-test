#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/myapp"
LOG_OUT="$APP_DIR/logs/app.out"
PID_FILE="$APP_DIR/app.pid"

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

sudo -u ec2-user bash -lc '
  set -euo pipefail
  APP_DIR="/opt/myapp"
  LOG_OUT="$APP_DIR/logs/app.out"
  PID_FILE="$APP_DIR/app.pid"

  # 환경변수 로드 (있으면)
  if [ -f /etc/myapp.env ]; then
    set -a
    source /etc/myapp.env || true
    set +a
  fi

  cd "$APP_DIR"

  # 실행
  nohup /usr/bin/java \
    -Dserver.port="${SERVER_PORT:-8080}" \
    -Dspring.profiles.active="${SPRING_PROFILES_ACTIVE:-prod}" \
    ${SPRING_DATASOURCE_URL:+-Dspring.datasource.url="$SPRING_DATASOURCE_URL"} \
    ${SPRING_DATASOURCE_USERNAME:+-Dspring.datasource.username="$SPRING_DATASOURCE_USERNAME"} \
    ${SPRING_DATASOURCE_PASSWORD:+-Dspring.datasource.password="$SPRING_DATASOURCE_PASSWORD"} \
    -jar "$APP_DIR/app.jar" > "$LOG_OUT" 2>&1 &

  echo $! > "$PID_FILE"
'

echo "[START] launched. pid=$(cat "$APP_DIR/app.pid" 2>/dev/null || echo '?')"