#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [ -d "modules/VideoAgent/.git" ]; then
  echo "VideoAgent already cloned at modules/VideoAgent"
  git -C modules/VideoAgent pull --ff-only
else
  mkdir -p modules
  git clone https://github.com/HKUDS/VideoAgent.git modules/VideoAgent
fi

echo "VideoAgent is ready at modules/VideoAgent"
