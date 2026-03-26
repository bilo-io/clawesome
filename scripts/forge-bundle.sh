#!/bin/bash
set -e

echo "🚀 Starting Clawesome Desktop Forge (Direct Bypass Mode)..."

# Ensure we are in the root directory relative to this script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR/.."

# 1. Build Sidecars
echo "🛠 Building Binary Sidecars..."
cd apps/cli
bun build --target node --outfile dist/index.js src/index.ts
bun build --compile --outfile clawesome-cli dist/index.js
cd ../gateway
bun build --target node --outfile dist/index.js src/index.ts
bun build --compile --outfile clawesome-gateway dist/index.js
cd ../..

# 2. Sync to Tauri
echo "🔗 Syncing binaries to Tauri bundle..."
mkdir -p apps/dashboard/src-tauri/binaries
cp apps/gateway/clawesome-gateway apps/dashboard/src-tauri/binaries/clawesome-gateway-aarch64-apple-darwin
cp apps/cli/clawesome-cli apps/dashboard/src-tauri/binaries/clawesome-cli-aarch64-apple-darwin

# 3. Build Dashboard Frontend
echo "💻 Building Dashboard Frontend..."
cd apps/dashboard
npx next build
cd ../..

# 4. Final Tauri DMG Forge
echo "🏗 Forging macOS Bundle (.dmg)..."
cd apps/dashboard
bun tauri build
cd ../..

# 5. Distribute Artifacts to Website
echo "🌐 Distributing bundle to Website Public Directory..."
mkdir -p apps/website/public/downloads/
find apps/dashboard/src-tauri/target/release/bundle/dmg -name "*.dmg" -exec cp {} apps/website/public/downloads/Clawesome-Mac.dmg \;

echo "✅ Distribution Forge Complete!"
