import React, { useState } from "react";
import HintBar from "../components/HintBar";

const UnionSimulatorPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [flagText, setFlagText] = useState('');
  const [actualUser, setActualUser] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setLoginStatus("missing");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/union-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const result = await response.json();

      if (response.ok) {
        setActualUser(result.username);
        setFlagText(result.flag);
        setLoginStatus("success");
      } else {
        setLoginStatus("fail");
        setErrorMsg(result.message || "Injection failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginStatus("fail");
      setErrorMsg("Server error");
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
            <h3 style={styles.title}>Try to login</h3>
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
            <button style={styles.button} onClick={handleLogin}>
              Login
            </button>

            {loginStatus === 'missing' && (
              <div style={{ marginTop: "20px", color: "orange", fontWeight: "bold" }}>
                ⚠️ Please enter username and password
              </div>
            )}

            {loginStatus === 'fail' && (
              <div style={styles.error}>❌ {errorMsg}</div>
            )}
          </div>

          <HintBar message="Your query must return the same number of columns as the original one. If the original query returns (username, password), try selecting two column to match the column count." />
        </div>
      )}
    </div>
  );
};

const styles = {
  stack: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px", // 控制卡片和 hint 的間距
  },

  background: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f4f4f4",
    padding: "30px",
    borderRadius: "6px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    width: "400px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginBottom: "10px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  tip: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "15px",
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
    transition: "background-color 0.2s ease-in-out",
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

export default UnionSimulatorPage;
