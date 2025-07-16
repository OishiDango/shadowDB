import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus  } from "react-syntax-highlighter/dist/esm/styles/prism";

const QuerySimulator = () => {
  const [template, setTemplate] = useState("SELECT * FROM user WHERE '$1'");
  const [payloads, setPayloads] = useState("'; 1+1 = 1");
  const [generatedSQL, setGeneratedSQL] = useState("");

  useEffect(() => {
    const lines = payloads.split("\n");
    const result = lines.map(line => template.replace(/\$1/g, line)).join("\n");
    setGeneratedSQL(result);
  }, [template, payloads]);

  return (
    <div>
      <h2>SQL Query Simulator</h2>

      <p>
        Enter the SQL template (use <code>$1</code>, <code>$2</code> to represent form positions):
      </p>
      <textarea
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
        rows={2}
        style={{
          width: "100%",
          fontFamily: "monospace",
          padding: "8px",
          marginBottom: "16px",
          backgroundColor: "white",
          color: "black",
          border: "1px solid #ccc",
          resize: "vertical"
        }}
      />

      <p>Enter payloads (one per line):</p>
      <textarea
        value={payloads}
        onChange={(e) => setPayloads(e.target.value)}
        rows={2}
        style={{
          width: "100%",
          fontFamily: "monospace",
          padding: "8px",
          marginBottom: "16px",
          backgroundColor: "white",
          color: "black",
          border: "1px solid #ccc",
          resize: "vertical"
        }}
      />

      <p><strong>Generated SQL query:</strong></p>
      <SyntaxHighlighter language="sql" style={vscDarkPlus} wrapLines={true}>
        {generatedSQL}
      </SyntaxHighlighter>
    </div>
  );
};

export default QuerySimulator;
