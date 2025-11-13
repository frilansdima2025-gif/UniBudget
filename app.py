from flask import Flask, render_template, request, redirect, url_for
import sqlite3
from datetime import date

DB_NAME = "unibudget.db"

app = Flask(__name__)


def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            category TEXT NOT NULL,
            amount REAL NOT NULL,
            description TEXT
        )
    """)
    conn.commit()
    conn.close()


@app.route("/")
def index():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM expenses ORDER BY id DESC")
    expenses = cursor.fetchall()

    cursor.execute("SELECT COALESCE(SUM(amount), 0) FROM expenses")
    total = cursor.fetchone()[0]

    conn.close()
    return render_template("index.html", expenses=expenses, total=total)


@app.route("/add", methods=["POST"])
def add_expense():
    category = request.form.get("category")
    amount = request.form.get("amount")
    description = request.form.get("description")

    if category and amount:
        try:
            amount = float(amount)
        except ValueError:
            amount = 0

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO expenses (date, category, amount, description) VALUES (?, ?, ?, ?)",
            (date.today().isoformat(), category, amount, description)
        )
        conn.commit()
        conn.close()

    return redirect(url_for("index"))


@app.route("/delete/<int:expense_id>", methods=["POST"])
def delete_expense(expense_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM expenses WHERE id = ?", (expense_id,))
    conn.commit()
    conn.close()
    return redirect(url_for("index"))


if __name__ == "__main__":
    init_db()
    app.run(debug=True)
