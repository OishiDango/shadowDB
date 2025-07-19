import React, { useState } from "react";
import BACKEND_URL from "../config";

const ErrorBasedSimulator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/blind-error-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session: input }),
      });

      const data = await res.json();
      setResult(data.flag || data.error || data.message);
    } catch (err) {
      setResult("Server error");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🧨 Error-Based SQL Injection: Blind Quiz</h2>
      <p>Try to guess the <code>session_id</code> that reveals the hidden flag from <code>blind_data</code>!</p>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter session_id"
        style={{ padding: "8px", marginRight: "10px", width: "300px", backgroundColor: "#fff", color: "#000", borderRadius: "4px", border: "1px solid #ccc" }}

      />
      <button onClick={handleSubmit} style={{ padding: "8px 16px" }}>Submit</button>

      <div style={{ marginTop: "20px" }}>
        <strong>Result:</strong> {result}
      </div>
    </div>
  );
};

export default ErrorBasedSimulator;
