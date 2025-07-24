import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { MdWarning } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">📘 Welcome to the iSQL Training</h1>

    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">🧠 Prerequisites</h2>
      <p>
        Hello, welcome to the iSQL course. I'm Jian Hao, the writer of this website. 
<br />
In this course ,we will assume you have basic knowledge of SQL., I will mention how SQL queries work when they come up, but it's recommended that you prepare your notes for SQL queries.

      </p>
    </section>

    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-yellow-700">⚠️ Disclaimer</h2>
      <Alert severity="warning" icon={<MdWarning size={24} />}>
        <AlertTitle>
          <strong><em>SQL Injection (SQLi) is dangerous! Use it responsibly.</em></strong>
        </AlertTitle>
        Only test it on systems where you have <strong><em>explicit written permission</em></strong>.
      </Alert>
    </section>

    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">🕵️‍♂️ What is SQL Injection?</h2>
      <p>
        SQL Injection (SQLi) is a classic attack technique to gain information. It is used to gain access or extract
        information by entering SQL code into input fields like textboxes, URLs, or forms. The goal is to trick database
        design, and run commands which can lead to:
      </p>
      <ul className="list-disc ml-6 mt-2">
        <li>Gaining unauthorized access</li>
        <li>Viewing or modifying sensitive data</li>
        <li>Running database commands that shouldn't be allowed</li>
      </ul>
    </section>

    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">🧪 How You Will Learn</h2>
      <p>
        In this course, we will explore SQLi through <strong>interactive Wargame-style challenges</strong>, guiding you
        step-by-step through real-world injection scenarios — not just theory.
      </p>
    </section>

    <section className="mt-6">
      <p className="font-bold">Let’s begin.</p>
      <Link
        to="/intro"
        className="flex items-center mt-2 text-gray-700 hover:underline"
      >
        <FaBook className="mr-2" />
        Intro of SQL
      </Link>
    </section>
  </div>
);

export default Home;
