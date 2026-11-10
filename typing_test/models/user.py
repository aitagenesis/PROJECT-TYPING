import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

def connect(database):
    db = sqlite3.connect(database)
    db.row_factory = sqlite3.Row
    return db

def init_db(database):
    with connect(database) as db:
        db.execute("""CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP)""")
        db.execute("""CREATE TABLE IF NOT EXISTS results (
            id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL REFERENCES users(id),
            wpm INTEGER NOT NULL, accuracy REAL NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP)""")

def create_user(database, username, email, password):
    try:
        with connect(database) as db:
            db.execute("INSERT INTO users (username,email,password_hash) VALUES (?,?,?)",
                       (username,email,generate_password_hash(password)))
        return True
    except sqlite3.IntegrityError:
        return False

def verify_user(database, username, password):
    with connect(database) as db:
        user = db.execute("SELECT * FROM users WHERE username=?", (username,)).fetchone()
    return user if user and check_password_hash(user["password_hash"], password) else None

def get_user(database, user_id):
    with connect(database) as db:
        return db.execute("SELECT id,username,email,created_at FROM users WHERE id=?", (user_id,)).fetchone()

def save_result(database, user_id, wpm, accuracy):
    with connect(database) as db:
        db.execute("INSERT INTO results (user_id,wpm,accuracy) VALUES (?,?,?)", (user_id,wpm,accuracy))

def get_leaderboard(database):
    with connect(database) as db:
        return db.execute("""SELECT users.username, MAX(results.wpm) AS best_wpm
            FROM results JOIN users ON users.id=results.user_id
            GROUP BY users.id ORDER BY best_wpm DESC LIMIT 20""").fetchall()
