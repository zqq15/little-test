#!/bin/bash
# ============================================================
# 一键部署脚本：rsync 代码到香港服务器 → build → PM2 重启
# 用法: ./scripts/deploy.sh
# ============================================================
set -e

REMOTE_HOST="root@156.225.24.86"
REMOTE_PATH="/var/www/little-test"

cd "$(dirname "$0")/.."  # 切到项目根

echo "=== [1/4] 检查 .env.local 是否存在 ==="
if [ ! -f .env.local ]; then
  echo "❌ .env.local 不存在，无法部署"
  exit 1
fi

echo "=== [2/4] rsync 同步代码到服务器（排除 node_modules/.next/.git/scripts/output） ==="
rsync -avz --delete \
  --exclude='node_modules/' \
  --exclude='.next/' \
  --exclude='.git/' \
  --exclude='scripts/output/' \
  -e "ssh -o StrictHostKeyChecking=no" \
  ./ "$REMOTE_HOST:$REMOTE_PATH/"

echo "=== [3/4] 服务器上 npm ci + build ==="
ssh -o StrictHostKeyChecking=no "$REMOTE_HOST" "cd $REMOTE_PATH && npm ci && npm run build"

echo "=== [4/4] PM2 重启 ==="
ssh -o StrictHostKeyChecking=no "$REMOTE_HOST" "pm2 restart little-test && pm2 list | grep little-test"

echo ""
echo "✅ 部署完成：https://testcall.top"
