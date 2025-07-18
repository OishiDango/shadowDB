import psycopg2
import os

DATABASE_URL = os.environ.get("DATABASE_URL")  # Render 上设置的环境变量

conn = psycopg2.connect(DATABASE_URL)
cur = conn.cursor()

with open("init.sql", encoding="utf-8") as f:
    cur.execute(f.read())

conn.commit()
cur.close()
conn.close()

print("✅ Database initialized.")
