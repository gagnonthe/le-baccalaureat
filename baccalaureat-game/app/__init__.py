from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)

from app import routes, sockets, game

if __name__ == "__main__":
    socketio.run(app)