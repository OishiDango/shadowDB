import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Link } from 'react-router-dom';
import { FaBook } from 'react-icons/fa';

const BlindIntroLesson = () => {
  return (
    <div className="p-6 bg-white rounded shadow-md max-w-3xl ml-0">
      <h1 className="text-3xl font-bold mb-6">🕶️ Introduction to Blind SQL Injection</h1>

      <section className="mb-6">
        <p className="text-base mb-4">
          In many SQL injection challenges, attackers can easily extract data using queries like:
        </p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus}>
          {"' UNION SELECT username, password FROM users --"}
        </SyntaxHighlighter>
        <p className="mt-4">
          ✅ If this shows a table of usernames and passwords, then the vulnerability is <strong>not blind</strong>.
          You're seeing real data — this is called <strong>normal SQL injection</strong>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-red-600">❌ What If No Data Is Returned?</h2>
        <p className="mb-4">
          Some websites don’t return anything even after injection:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>No usernames or passwords appear</li>
          <li>No visible difference between success or failure</li>
          <li>Just a blank page or “login failed” message</li>
        </ul>
        <p>
          In this case, we enter the world of <strong>Blind SQL Injection</strong>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🧠 What Can We Do with Blind SQLi?</h2>
        <p className="mb-4">
          Blind SQLi is what we do if there's no direct return data. We will look at the following techniques in our future lessons:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>❌ <strong>Error-based SQL Injection</strong></li>
          <li>⏱ <strong>Time-based SQL Injection</strong></li>
        </ul>
      </section>

      <section className="mt-6">
        <p className="font-bold text-base">Let's continue our journey!</p>
        <Link
          to="/blind/error-based"
          className="flex items-center mt-2 text-gray-700 text-base hover:underline"
        >
          <FaBook className="mr-2" />
          Conditional Errors
        </Link>
      </section>
    </div>
  );
};

export default BlindIntroLesson;
