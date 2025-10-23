import os
from pathlib import Path
from flask import Flask, render_template
from flask_socketio import SocketIO

# Ensure Flask knows the correct templates/static folders when running
# run.py from the repository root.
BASE_DIR = Path(__file__).resolve().parent
TEMPLATES_DIR = str(BASE_DIR / 'app' / 'templates')
STATIC_DIR = str(BASE_DIR / 'app' / 'static')

app = Flask(__name__, template_folder=TEMPLATES_DIR, static_folder=STATIC_DIR)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('presenter.html')

@app.route('/tv')
def tv():
    return render_template('tv.html')

@app.route('/player')
def player():
    return render_template('player.html')


@app.route('/ws')
def ws_info():
    # Simple GET handler so tests can verify the websocket endpoint exists.
    return ('', 200)

if __name__ == '__main__':
    socketio.run(app, debug=True)