#!/usr/bin/env bash
set -euo pipefail

# Script to create a virtualenv, install dependencies and run tests for the project.
# Usage: ./scripts/setup_and_test.sh

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VENV_DIR="$ROOT_DIR/.venv"

echo "Using workspace root: $ROOT_DIR"

if [ ! -d "$VENV_DIR" ]; then
  python3 -m venv "$VENV_DIR"
  echo "Created virtualenv at $VENV_DIR"
fi

echo "Activating virtualenv..."
. "$VENV_DIR/bin/activate"

echo "Upgrading pip..."
pip install --upgrade pip

echo "Installing runtime requirements..."
pip install -r "$ROOT_DIR/baccalaureat-game/requirements.txt"

echo "Installing test requirements..."
pip install pytest pytest-flask

echo "Export PYTHONPATH to the package so tests can import 'app'"
export PYTHONPATH="$ROOT_DIR/baccalaureat-game"

echo "Running pytest..."
python -m pytest "$ROOT_DIR/baccalaureat-game/tests" -q || exit 1

echo "All tests finished."
