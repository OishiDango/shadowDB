import React, { useState } from "react";
import { BACKEND_URL } from "../config";

const CaseBypassPage = () => {
  const [sessionId, setSessionId] = useState("");
  const [secrets, setSecrets] = useState([]);

  const handleFetchSecrets = async () => {
    if (!sessionId) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/secrets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const data = await res.json();
      setSecrets(data.secrets || []);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Case Bypass: Secret Viewer</h2>
      <input
        type="text"
        placeholder="Your session ID"
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
        style={{ padding: "8px", marginRight: "10px", width: "300px", backgroundColor: "#fff", color: "#000", borderRadius: "4px", border: "1px solid #ccc" }}
      />
      <button onClick={handleFetchSecrets} style={{ padding: "8px 16px" }}>
        Get your secrets!
      </button>

      <div style={{ marginTop: "20px" }}>
        <h3>Your secrets</h3>
        {secrets.length > 0 ? (
          <ul>
            {secrets.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        ) : (
          <p>You don't have any secrets yet.</p>
        )}
      </div>
    </div>
  );
};

export default CaseBypassPage;
