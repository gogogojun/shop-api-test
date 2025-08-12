#!/usr/bin/env bash
set -e
systemctl start myapp.service

# 간단 헬스체크
for i in {1..30}; do
  if curl -fsS http://127.0.0.1:8080/health >/dev/null 2>&1; then
    echo "Health check OK"
    exit 0
  fi
  echo "Waiting for app... ($i/30)"
  sleep 2
done
echo "Health check failed"; exit 1
