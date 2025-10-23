from flask import render_template, request, redirect, url_for
from . import app
from flask import jsonify
from . import sockets
from . import socketio as socketio_app

@app.route('/')
def home():
    # Render a simple index page with links to presenter, tv and player
    return render_template('index.html')

@app.route('/presenter')
def presenter():
    return render_template('presenter.html')

@app.route('/tv')
def tv():
    return render_template('tv.html')

@app.route('/player', methods=['GET', 'POST'])
def player():
    if request.method == 'POST':
        # Handle player joining logic here
        return redirect(url_for('tv'))
    return render_template('player.html')


@app.route('/ws')
def ws_info():
    # Simple GET handler so tests can verify the websocket endpoint exists.
    return ('', 200)


@app.route('/games')
def list_games():
    # Return current in-memory games (codes)
    try:
        return jsonify({'codes': list(sockets.games.keys())})
    except Exception:
        return jsonify({'codes': []})


@app.route('/force_code')
def force_code():
    # Generate a code server-side for testing and broadcast to presenters
    try:
        code = sockets.generate_code()
        while code in sockets.games:
            code = sockets.generate_code()
        sockets.games[code] = {'name': None, 'players': []}
        print(f"[routes] forced code {code}")
        # Notify connected presenters and TVs
        socketio_app.emit('tv_code', {'code': code}, room='presenters')
        socketio_app.emit('tv_code', {'code': code}, room='tv')
        return jsonify({'code': code})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/broadcast_codes')
def broadcast_codes():
    # Emit all current codes to presenters room
    try:
        codes = list(sockets.games.keys())
        for c in codes:
            socketio_app.emit('tv_code', {'code': c}, room='presenters')
            socketio_app.emit('tv_code', {'code': c}, room='tv')
        print(f"[routes] broadcasted codes: {codes}")
        return jsonify({'broadcasted': codes})
    except Exception as e:
        return jsonify({'error': str(e)}), 500