from flask import request
from flask_socketio import emit, join_room

# Use the socketio instance created in app.__init__
from . import socketio

import random
import string

# In-memory store for games: code -> { name: str or None, players: [] }
games = {}


def generate_code(n=6):
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choice(chars) for _ in range(n))


@socketio.on('connect')
def handle_connect():
    emit('response', {'data': 'Connected'})


@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')


@socketio.on('register_tv')
def handle_register_tv():
    # Put this client in the 'tv' room
    join_room('tv')
    print(f"[sockets] TV registered sid={request.sid}")
    emit('registered_tv', {'status': 'ok'})


@socketio.on('register_presenter')
def handle_register_presenter():
    # Put this client in the 'presenters' room so they can receive tv codes
    join_room('presenters')
    print(f"[sockets] Presenter registered sid={request.sid}")
    emit('registered_presenter', {'status': 'ok'})
    # Send any currently available codes to this presenter so they don't miss them
    try:
        available = list(games.keys())
    except Exception:
        available = []
    if available:
        emit('presenter_codes', {'codes': available})


@socketio.on('request_code')
def handle_request_code():
    # Generate a unique code and send it back to the requester (TV)
    code = generate_code()
    # Ensure uniqueness (very basic loop)
    while code in games:
        code = generate_code()
    games[code] = {'name': None, 'players': []}
    # Send code to the requesting client only
    print(f"[sockets] generated code {code} for sid={request.sid}")
    # Send tv_code to requesting client (TV) and notify all presenters
    emit('tv_code', {'code': code}, to=request.sid)
    emit('tv_code', {'code': code}, room='presenters')


@socketio.on('presenter_setup')
def handle_presenter_setup(data):
    # Presenter provides { code, name }
    code = data.get('code')
    name = data.get('name')
    if not code or code not in games:
        print(f"[sockets] presenter_setup with invalid code: {code}")
        emit('presenter_ack', {'status': 'error', 'message': 'Code invalide'})
        return
    games[code]['name'] = name
    # Notify TVs in the 'tv' room that a game has been set up
    print(f"[sockets] presenter_setup: code={code} name={name}")
    emit('game_setup', {'code': code, 'name': name}, room='tv')
    emit('presenter_ack', {'status': 'ok', 'code': code, 'name': name})