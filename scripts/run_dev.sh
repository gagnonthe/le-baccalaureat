#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VENV_DIR="$ROOT_DIR/.venv"

if [ ! -d "$VENV_DIR" ]; then
  echo "Virtualenv not found. Run scripts/setup_and_test.sh first to create .venv and install dependencies."
  exit 1
fi

echo "Activating venv and running dev server..."
. "$VENV_DIR/bin/activate"
export PYTHONPATH="$ROOT_DIR/baccalaureat-game"

echo "Starting Flask-SocketIO server on 0.0.0.0:5000"
python - <<'PY'
from app import socketio, app
# Disable the reloader so the process stays alive when launched from a script
socketio.run(app, host='0.0.0.0', port=5000, debug=True, use_reloader=False)
PY
