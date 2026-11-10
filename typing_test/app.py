import os
from flask import Flask, render_template, request, redirect, url_for, session, flash
from config import Config
from models.user import init_db, create_user, verify_user, get_user, save_result, get_leaderboard

app = Flask(__name__)
app.config.from_object(Config)
os.makedirs(os.path.dirname(app.config["DATABASE"]), exist_ok=True)
init_db(app.config["DATABASE"])

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")
        if not username or not email or len(password) < 8:
            flash("Complete every field and use a password of at least 8 characters.")
        elif create_user(app.config["DATABASE"], username, email, password):
            flash("Account created. You can now log in.")
            return redirect(url_for("login"))
        else:
            flash("That username or email is already registered.")
    return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        user = verify_user(app.config["DATABASE"], request.form.get("username", "").strip(), request.form.get("password", ""))
        if user:
            session["user_id"] = user["id"]
            return redirect(url_for("test"))
        flash("Invalid username or password.")
    return render_template("login.html")

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))

@app.route("/test", methods=["GET", "POST"])
def test():
    if "user_id" not in session:
        return redirect(url_for("login"))
    if request.method == "POST":
        result = request.get_json(silent=True) or {}
        save_result(app.config["DATABASE"], session["user_id"], max(0, int(result.get("wpm", 0))), min(100, max(0, float(result.get("accuracy", 0)))))
        return {"saved": True}
    return render_template("test.html")

@app.route("/results")
def results():
    if "user_id" not in session:
        return redirect(url_for("login"))
    return render_template("results.html", user=get_user(app.config["DATABASE"], session["user_id"]))

@app.route("/leaderboard")
def leaderboard():
    return render_template("leaderboard.html", entries=get_leaderboard(app.config["DATABASE"]))

@app.route("/profile")
def profile():
    if "user_id" not in session:
        return redirect(url_for("login"))
    return render_template("profile.html", user=get_user(app.config["DATABASE"], session["user_id"]))

if __name__ == "__main__":
    app.run(debug=True)
