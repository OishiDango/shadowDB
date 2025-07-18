import React, { useState } from "react";
import HintBar from "../components/HintBar";
import BACKEND_URL from "../config"; // 引入配置文件中的后端地址

const InformationSimulatorPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [flagText, setFlagText] = useState('');
  const [actualUser, setActualUser] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setLoginStatus("missing");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/info-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const result = await response.json();

      if (response.ok && result.flag && result.username) {
        setActualUser(result.username);
        setFlagText(result.flag);
        setLoginStatus("success");
      } else {
        setLoginStatus("fail");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginStatus("fail");
    }
  };

  return (
    <div style={styles.background}>
      {loginStatus === 'success' ? (
        <div style={styles.successBox}>
          <h2 style={styles.welcome}>Welcome {actualUser}</h2>
          <p style={styles.flag}>{flagText}</p>
          <a onClick={() => {
            setLoginStatus('');
            setUsername('');
            setPassword('');
            setActualUser('');
            setFlagText('');
          }} style={styles.logout}>Logout</a>
        </div>
      ) : (
        <div style={styles.stack}>
          <div style={styles.card}>
            <h3 style={styles.title}>Can you log in using hidden data?</h3>
            <input
              type="text"
              placeholder="username"
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button style={styles.button} onClick={handleLogin}>Login</button>

            {loginStatus === 'missing' && (
              <div style={styles.warning}>⚠️ Please enter username and password</div>
            )}
            {loginStatus === 'fail' && (
              <div style={styles.error}>❌ Login failed</div>
            )}
          </div>

          <HintBar
            message={
                <>
                <p>Some tables shown in <code>information_schema.tables</code> are PostgreSQL <b>system tables</b> like <code>pg_catalog.pg_*</code>.</p>
                <p>To avoid listing them, use this:</p>
                <pre><code>WHERE table_schema = 'public'</code></pre>
                <p>This will only return <b>user-created tables</b>, like <code>hidden_users</code> or <code>flags</code>.</p>
                </>
            }
            />

        </div>
      )}
    </div>
  );
};

const styles = {
  background: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  card: {
    backgroundColor: "#f4f4f4",
    padding: "30px",
    borderRadius: "6px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    width: "350px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginBottom: "20px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "#000",
  },
  button: {
    backgroundColor: "#337ab7",
    color: "#fff",
    border: "none",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  successBox: {
    textAlign: "center",
    color: "lime",
    fontFamily: "monospace",
  },
  welcome: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  flag: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "lime",
  },
  logout: {
    color: "lightblue",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "14px",
  },
  warning: {
    marginTop: "20px",
    color: "orange",
    fontWeight: "bold",
  },
  error: {
    marginTop: "20px",
    color: "red",
    fontWeight: "bold",
  }
};

export default InformationSimulatorPage;
