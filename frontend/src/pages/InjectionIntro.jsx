import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { MdWarning } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaBook } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const InjectionIntro = () => (
  <div className="p-6 bg-white rounded shadow-md max-w-5xl mx-auto">
    <h1 className="text-3xl font-bold mb-6">💥 What is SQL Injection?</h1>

    <section className="mb-8">
      <p className="text-base mb-4">
        <strong>SQL Injection (SQLi)</strong> is a classic attack technique used to <strong>gain unauthorized access or extract data</strong> from a database.
        <br />
        It works by entering specially crafted <strong>SQL code</strong> into input fields like <em>textboxes, URLs, or forms</em> to trick the backend system into executing unintended commands.
      </p>

      <p className="text-base mb-4">
        If the backend doesn't properly filter this input, the SQL command can be manipulated.
      </p>

      <h2 className="text-2xl font-semibold mb-2">🔓 Example</h2>
      <p className="mb-2">Imagine a login form that uses this query:</p>
      <SyntaxHighlighter language="sql" style={vscDarkPlus} wrapLines={true}>
{`SELECT * FROM users WHERE username = '$username' AND password = '$password';`}
      </SyntaxHighlighter>

      <p className="mt-4 mb-2">If an attacker enters this as the username:</p>
      <SyntaxHighlighter language="sql" style={vscDarkPlus} wrapLines={true}>
{`' OR 1=1 --`}
      </SyntaxHighlighter>

      <p className="mt-4 mb-2">It will result in:</p>
      <SyntaxHighlighter language="sql" style={vscDarkPlus} wrapLines={true}>
{`SELECT * FROM users WHERE username = '' OR 1=1 --' AND password = '';`}
      </SyntaxHighlighter>

      <p className="mt-4 text-base">
        And since <code>1 = 1</code> is always true, you are allowed to login without a password.
      </p>

      <p className="mt-4 text-base font-semibold">
        Try this in the{' '}
        <Link to="/query-simulate" className="text-blue-600 hover:underline">
          SQL Query Simulator
        </Link>
      </p>

    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">📌 Why is SQL Injection Dangerous?</h2>
      <ul className="list-disc ml-6 text-base">
        <li>It can bypass authentication</li>
        <li>It can expose sensitive data</li>
        <li>It can allow attackers to modify or delete database content</li>
        <li>In severe cases, it may lead to full system compromise</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">🎯 What You’ll Learn in This Course</h2>
      <ul className="list-disc ml-6 text-base">
        <li>Learn how SQL injection works</li>
        <li>See different types of injections</li>
        <li>Try real-world attacks using Wargame</li>
        <li>Learn how to defend against SQLi</li>
      </ul>
    </section>

    <section className="mt-6">
      <p className="font-bold text-base">Let's begin our journey!</p>
      <Link
        to="/login-bypass"
        className="flex items-center mt-2 text-gray-700 text-base hover:underline"
      >
        <FaBook className="mr-2" />
        Start with Lesson 1 – Login Bypass using <code>' OR 1=1 --</code>
      </Link>
    </section>
  </div>
);

export default InjectionIntro;
