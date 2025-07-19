import React, { useState } from "react";
import BACKEND_URL from "../config";

const TimeBasedSimulator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseTime, setResponseTime] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    setResponseTime(null);

    const start = Date.now();

    try {
      const res = await fetch(`${BACKEND_URL}/api/blind-time-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session: input }),
      });

      const data = await res.json();
      const end = Date.now();

      setResponseTime(end - start + " ms");
      setResult(data.flag || data.error || data.message);
    } catch (err) {
      setResult("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>⏱️ Time-Based SQL Injection: Blind Quiz</h2>
      <p>Try to infer the correct <code>session_id</code> using time-based inference from <code>blind_data</code>.</p>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter session_id"
        style={{
          padding: "8px",
          marginRight: "10px",
          width: "300px",
          backgroundColor: "#fff",
          color: "#000",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <button onClick={handleSubmit} style={{ padding: "8px 16px" }} disabled={loading}>
        {loading ? "Testing..." : "Submit"}
      </button>

      <div style={{ marginTop: "20px" }}>
        <strong>Result:</strong> {result}
        <br />
        {responseTime && <strong>Response Time:</strong>} {responseTime}
      </div>
    </div>
  );
};

export default TimeBasedSimulator;
