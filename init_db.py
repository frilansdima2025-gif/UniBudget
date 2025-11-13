import sqlite3

DB_NAME = 'unibudget.db'

conn = sqlite3.connect(DB_NAME)
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS витрати (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL,
    note TEXT
);
''')

conn.commit()
conn.close()

print("Таблиця 'витрати' готова ✅")
