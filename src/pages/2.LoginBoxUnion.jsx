import React, { useState } from "react";

const UnionSimulatorPage = () => {
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');
  const flag = 'flag{union_success}';

  const handleSubmit = () => {
    const sql = `SELECT id, comment FROM feedback WHERE comment = '${comment}'`;

    if (/union\s+select\s+username\s*,\s*password\s+from\s+users/i.test(comment)) {
      setStatus('success');
    } else {
      setStatus('fail');
    }
  };

  const handleLogout = () => {
    setComment('');
    setStatus('');
  };

  return (
    <div style={styles.background}>
      {status === 'success' ? (
        <div style={styles.successBox}>
          <h2 style={styles.welcome}>Access Granted</h2>
          <p style={styles.flag}>{flag}</p>
          <a onClick={handleLogout} style={styles.logout}>Try Again</a>
        </div>
      ) : (
        <div style={styles.card}>
          <h3 style={styles.title}>Leave a Comment</h3>
          <input
            type="text"
            placeholder="Enter your comment"
            style={styles.input}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button style={styles.button} onClick={handleSubmit}>
            Submit
          </button>

          {status === 'fail' && (
            <div style={{ marginTop: "20px", color: "red", fontWeight: "bold" }}>
              ❌ Invalid comment
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
    backgroundColor: "#2e2e2e",
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

export default UnionSimulatorPage;
