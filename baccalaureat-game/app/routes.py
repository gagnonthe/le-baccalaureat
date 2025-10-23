from flask import render_template, request, redirect, url_for
from . import app

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