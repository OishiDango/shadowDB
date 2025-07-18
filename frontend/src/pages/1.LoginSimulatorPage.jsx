import React, { useState } from "react";

const LoginBox = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [flagText, setFlagText] = useState('');
  const flag = 'flag{COPY_THIS_FLAG_INCLUDE_BRACKETS}';

  const handleLogin = async () => {

  if (!username || !password) {
    setLoginStatus("missing");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (response.ok && result.flag) {
      setLoginStatus("success");
      setFlagText(result.flag);
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
          <h2 style={styles.welcome}>Welcome admin</h2>
          <p style={styles.flag}>{flagText}</p>
          <a onClick={() => setLoginStatus('')} style={styles.logout}>Logout</a>
        </div>
      ) : (
        <div style={styles.card}>
          <h3 style={styles.title}>Login If You Can</h3>
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
            <div style={{ marginTop: "20px", color: "red", fontWeight: "bold" }}>
              ❌ Login failed
            </div>
          )}
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
  }
};

export default LoginBox;
