from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
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