#!/usr/bin/env bash
# install-cli.sh — builds and globally links @clawesome/cli
# Run from the monorepo root: bun run cli:install

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLI_DIR="$SCRIPT_DIR/apps/cli"

# 0. Display Splash
bun run scripts/install-splash.ts

# 1. Install deps
echo "📦  Installing dependencies..."
cd "$CLI_DIR"
bun install

# 2. Build
echo "🔨  Building..."
bun run build

# 3. Link globally
echo "🔗  Linking 'clawesome' globally..."
bun link

echo ""
echo "✅  Done! Run 'clawesome --help' to verify."
echo ""
