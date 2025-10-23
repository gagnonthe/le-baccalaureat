from flask import Blueprint
from flask_socketio import SocketIO, emit

sockets_bp = Blueprint('sockets', __name__)
socketio = SocketIO()

@sockets_bp.route('/socket')
def socket_route():
    pass  # This route can be used to handle WebSocket connections

@socketio.on('connect')
def handle_connect():
    emit('response', {'data': 'Connected'})

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('message')
def handle_message(data):
    print('Received message: ' + data)
    emit('response', {'data': 'Message received'})