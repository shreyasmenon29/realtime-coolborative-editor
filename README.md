# Real-Time Collaborative Editor

A browser-based real-time collaborative text editor built using **Flask** and **Socket.IO**, inspired by Google Docs.

## Features
- Real-time text synchronization across multiple users
- Browser-based document editing
- User presence indicator (users online)
- Paginated, scrollable document layout (Word / Google Docs style)
- Read-your-writes guarantee
- Eventual consistency across all collaborators
- Simple sign-in screen (UI-level authentication)

## Tech Stack
- Python
- Flask
- Flask-SocketIO
- HTML, CSS, JavaScript

## How It Works
- Users sign in with a simple name-based login screen.
- The server maintains persistent WebSocket connections using Socket.IO.
- Text changes are broadcast to all connected users in real time.
- All users eventually see the same document state.
- The frontend renders the document into paginated pages.

## How to Run Locally
```bash
pip install flask flask-socketio
python app.py
