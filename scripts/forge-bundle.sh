#!/bin/bash
set -e

echo "🚀 Starting Clawesome Desktop Forge..."

# Ensure we are in the root directory relative to this script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR/.."

# 1. Build Sidecars
echo "🛠 Building Binary Sidecars..."
moon run cli:build
moon run gateway:build

# 2. Sync to Tauri
echo "🔗 Syncing binaries to Tauri bundle..."
moon run dashboard:sync-sidecars

# 3. Build Dashboard Frontend
echo "💻 Building Dashboard Frontend..."
moon run dashboard:build

# 4. Final Tauri DMG Forge
echo "🏗 Forging macOS Bundle (.dmg)..."
moon run dashboard:tauri-build

# 5. Distribute Artifacts to Website
echo "🌐 Distributing bundle to Website Public Directory..."
mkdir -p apps/website/public/downloads/
find apps/dashboard/src-tauri/target/release/bundle/dmg -name "*.dmg" -exec cp {} apps/website/public/downloads/Clawesome-Mac.dmg \;

echo "✅ Distribution Forge Complete!"
