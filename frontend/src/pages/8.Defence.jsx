import React from "react";
import { Link } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const SQLDefensePage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🛡️ SQL Injection Prevention Methods</h1>

      <p className="mb-4">
        SQL Injection (SQLi) may look scary, but most of them come from insecure code
        practices. There are several ways to prevent it:
      </p>

      <ul className="list-disc pl-6 mb-4">
        <li><strong>Prepared Statements</strong> </li>
        <li><strong>Input Filters / Validation</strong></li>
        <li><strong>Allow-lists</strong></li>
        <li><strong>Stored Procedures</strong></li>
        <li><strong className="text-red-600">(Not recommended)</strong> Escaping user input manually</li>
      </ul>

      <p className="mb-6">Below are some good practice for your SQL i defence stratergies you should always keep in mine:</p>

      <h2 className="text-2xl font-semibold mb-2">✅ Defense 1: Prepared Statements</h2>
      <p className="mb-4">
        <strong>Prepared Statements</strong> separate SQL logic from user input.
        This is one of the most recommended ways to prevent SQLi.
      </p>

      <h3 className="text-xl font-semibold mb-2">✅ Why are Prepared Statements So Effective?</h3>
      <p className="mb-4">
        The database first processes the SQL template, then binds parameters as raw values.
        Thus those values would never be treated as code, even if they contain SQL keywords.
      </p>

      <h3 className="text-lg font-semibold mb-2">🧠 Example: Secure vs Insecure</h3>
      <p className="font-bold mt-2">❌ Vulnerable Code (String concatenation):</p>
      <SyntaxHighlighter language="python" style={vscDarkPlus}>
{`query = "SELECT * FROM users WHERE username = '" + user_input + "'"`}
      </SyntaxHighlighter>
      <p className="mt-2">Input: <code>' OR '1'='1</code> becomes:</p>
      <SyntaxHighlighter language="sql" style={vscDarkPlus}>
{`SELECT * FROM users WHERE username = '' OR '1'='1'`}
      </SyntaxHighlighter>

      <p className="font-bold mt-4">✅ Safe Code (Parameterized query):</p>
      <SyntaxHighlighter language="python" style={vscDarkPlus}>
{`cursor.execute("SELECT * FROM users WHERE username = %s", (user_input,))`}
      </SyntaxHighlighter>

      <h2 className="text-2xl font-semibold mt-6 mb-2">✅ Defense 2: Allow-list Input Validation</h2>
      <p className="mb-4">
        Whenever you use a list, you should use a whitelist to validate input such as
        table names and column names.
      </p>
      <SyntaxHighlighter language="python" style={vscDarkPlus}>
{`allowed_fields = ["username", "created_at"]
field = request.args.get("sort")
if field not in allowed_fields:
    field = "username"
cursor.execute(f"SELECT * FROM users ORDER BY {field}")`}
      </SyntaxHighlighter>


      <h2 className="text-2xl font-semibold mt-6 mb-2">❌ Defense 3: Escaping User Input (Not Recommended)</h2>
      <p className="mb-4">
        It's better to not use characters that need to be escaped manually. It cannot guarantee full protection. This is just like the applying filter, but you might lost some of the keyword and ended up failing to prevent SQLi.
      </p>
      <SyntaxHighlighter language="python" style={vscDarkPlus}>
{`# safe_input = user_input.replace("'", "''")
query = f"SELECT * FROM users WHERE username = '{safe_input}'"
cursor.execute(query)`}
      </SyntaxHighlighter>

      <h2 className="text-2xl font-semibold mt-8 mb-2">🧠 Conclusion</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>🟢 <strong>Strongly recommended:</strong> Prepared statements</li>
        <li>🟢 <strong>Use when applicable:</strong> Allow-lists, ORM, Least privilege</li>
        <li>❌ <strong>Avoid:</strong> Using filter or manual escaping input </li>
      </ul>

      <p className="mt-4">
        🎉 <strong>Yeah! You've completed the entire iSQL course!</strong>
      </p>
      <p className="mt-2">
        We mainly focused on PostgreSQL and Python in this course. But always remember:
      </p>
        Different database may have different defense mechanisms.
      <p>
        Before you use that database, you should always read the documentation of the database and follow it security practices
      </p>

      <Link
        to="/"
        className="inline-flex items-center mt-6 text-blue-600 hover:underline"
      >
        <FaShieldAlt className="mr-2" /> Back to Home
      </Link>
    </div>
  );
};

export default SQLDefensePage;
