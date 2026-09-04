#!/bin/bash
set -e

# ==========================================
# 1. Sudo password validation
# ==========================================
MAX_RETRIES=3
RETRY_COUNT=0
AUTH_SUCCESS=false

echo "🔒 Connecting to NAS nas.gx"

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    read -s -p "🔑 TrueNAS password (for sudo): " SUDO_PASS
    echo "" # Visual line break

    echo "⏳ Verifying password..."
    
    # Attempting a harmless sudo command on the NAS.
    # We silence the output and check the return code.
    if ssh truenas_admin@nas.gx "echo '$SUDO_PASS' | sudo -S id >/dev/null 2>&1"; then
        echo "✅ Password valid!"
        AUTH_SUCCESS=true
        break
    else
        RETRY_COUNT=$((RETRY_COUNT+1))
        echo "❌ Incorrect password. Attempt $RETRY_COUNT/$MAX_RETRIES."
    fi
done

if [ "$AUTH_SUCCESS" = false ]; then
    echo "🚨 Authentication failed after $MAX_RETRIES attempts. Canceling deployment."
    exit 1
else
    echo "🚀 Starting deployment."
fi
echo ""

# ==========================================
# 2. Build and deployment pipeline
# ==========================================
echo "🛠️ 1/4: Compiling AMD64 processor image..."
docker buildx build --platform linux/amd64 -t julien/jqbtx-web:latest --load .

echo "📦 2/4: Creating tar archive..."
docker save julien/jqbtx-web:latest > jqbtx-web.tar

echo "🌐 3/4: Transferring to the NAS (TrueNAS)..."
scp jqbtx-web.tar truenas_admin@nas.gx:/mnt/tank/data/configs/jqbtx-web/

echo "🔄 4/4: Executing remote update on the NAS..."
ssh truenas_admin@nas.gx "echo '$SUDO_PASS' | sudo -S /mnt/tank/data/configs/jqbtx-web/update-jqbtx.sh"

echo "🎉 Done! Application fully deployed and restarted."