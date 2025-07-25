# app.py
from flask import Flask, jsonify, request
from db import get_connection
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Welcome to the SQLi Demo API. Try /api/users or POST to /api/feedback'


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return {"error": "Missing username or password"}, 400

    conn = get_connection()
    cur = conn.cursor()

    query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
    try:
        cur.execute(query)
        result = cur.fetchone()
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        cur.close()
        conn.close()

    if result:
        return {"message": "Login success", "flag": "flag{COPY_THIS_FLAG_INCLUDE_BRACKETS}"}
    else:
        return {"message": "Login failed"}, 401

@app.route('/api/union-login', methods=['POST'])
def union_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return {"error": "Missing username or password"}, 400

    query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute(query)
        results = cur.fetchall()
    except Exception as e:
        return {"error": "SQL Error", "details": str(e)}, 500
    finally:
        cur.close()
        conn.close()

    if results:
        return {
            "flag": "COMP6841{YOU_DID_IT}",
            "username": results[0][0]
        }
    else:
        return {"message": "Login failed"}, 401

@app.route('/api/info-login', methods=['POST'])
def info_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return {"error": "Missing username or password"}, 400

    conn = get_connection()
    cur = conn.cursor()

    try:
        query = f"SELECT * FROM hidden_users WHERE username = '{username}' AND password = '{password}'"
        cur.execute(query)
        result = cur.fetchone()
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        cur.close()
        conn.close()

    if result and result[0] == username and result[1] == password:
        return {
            "message": "Login success",
            "flag": "flag{Well_Done_You_Found_The_Flag!}",
            "username": result[0]
        }
    elif result:
        return {
            "message": "Login success?",
            "flag": "flag{Is_This_The_Real_Flag?}",
            "username": result[0]
        }
    else:
        return {"message": "Login failed"}, 401

def is_mixed_case(s):
    has_lower = any(c.islower() for c in s)
    has_upper = any(c.isupper() for c in s)
    return has_lower and has_upper

import re

@app.route('/api/secrets', methods=['POST'])
def get_secrets():
    data = request.get_json()
    session_id = data.get('sessionId')

    keywords = ['select', 'union', 'from', 'where']
    for keyword in keywords:
        matches = re.findall(rf"\b{keyword}\b", session_id, re.IGNORECASE)
        for m in matches:
            if m.islower() or m.isupper():
                return {"error": "Blocked: keyword must use mixed casing!"}, 403

    conn = get_connection()
    cur = conn.cursor()
    try:
        query = f"SELECT secret FROM session_data WHERE session_id = '{session_id}'"
        cur.execute(query)
        secrets = [row[0] for row in cur.fetchall()]
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        cur.close()
        conn.close()

    return {"secrets": secrets}
    

@app.route('/ping-db')
def ping_db():
    try:    
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("SELECT 1;")
        result = cur.fetchone()
        cur.close()
        conn.close()
        return {"message": "Database connected!", "result": result[0]}
    except Exception as e:
        return {"error": str(e)}, 500


@app.route('/api/blind-error-login', methods=['POST'])
def blind_error_login():
    data = request.get_json()
    injected = data.get("session")

    if not injected:
        return {"error": "Missing session value"}, 400

    conn = get_connection()
    cur = conn.cursor()

    try:
        query = f"SELECT * FROM blind_data WHERE session_id = '{injected}'"

        cur.execute(query)
        result = cur.fetchone()
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        cur.close()
        conn.close()

    if result:
        return {
            "message": "Success!",
            "flag": result[2]
        }
    else:
        return {
            "message": "No result"
        }, 404


@app.route("/api/blind-time-login", methods=["POST"])
def blind_time_login():
    data = request.get_json()
    injected = data.get("session", "")

    if not injected:
        return jsonify({"error": "Missing session value"}), 400

    try:
        conn = get_connection()
        cur = conn.cursor()

        query = f"""
        SELECT CASE
            WHEN EXISTS (
                SELECT 1 FROM blind_data WHERE id = 1 AND session_id = '{injected}'
            )
            THEN pg_sleep(3)
            ELSE NULL
        END;
        """

        start = time.time()
        cur.execute(query)
        conn.commit()
        end = time.time()

        elapsed = round(end - start, 3)

        if elapsed >= 3:
            return jsonify({"message": "Condition is TRUE (delay triggered)", "flag": "flag{YOU_DELAYED_IT}"})
        else:
            return jsonify({"message": "Condition is FALSE (no delay)"})

    except Exception as e:
        return jsonify({"error": str(e)})
    finally:
        if conn:
            cur.close()
            conn.close()


if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host='0.0.0.0', port=port)

