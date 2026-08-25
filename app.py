from flask import Flask, render_template, request
from flask_socketio import SocketIO
user_count = 0
app = Flask(__name__)
socketio = SocketIO(app)


@app.route("/")
def home():
    return render_template("index.html")
from flask_socketio import emit
@app.route("/login")
def login():
    return render_template("login.html")
@socketio.on("text_change")
def handle_text_change(text):
    emit("update_text", text, broadcast=True)
@socketio.on("connect")
def handle_connect():
    global user_count
    user_count += 1
    emit("user_count", user_count, broadcast=True)
@socketio.on("disconnect")
def handle_disconnect():
    global user_count
    user_count -= 1
    emit("user_count", user_count, broadcast=True)
from flask import request
@app.route("/update", methods=["POST"])
def update_text():
    data = request.get_json()
    print("Received from browser:", data["text"])
    return "", 204


if __name__ == "__main__":
    socketio.run(app)

