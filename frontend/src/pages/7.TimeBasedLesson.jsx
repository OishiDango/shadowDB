import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FlagInput from '../components/FlagInput';
import { Link } from 'react-router-dom';

const TimeBasedLesson = () => {
  return (
    <div className="p-6 bg-white rounded shadow-md max-w-3xl ml-0">
      <h1 className="text-3xl font-bold mb-6">⏱ Time-based Blind SQL Injection</h1>

      <section className="mb-6">
        <p className="mb-2">
          There also exists a way to prevent websites from returning any error data.
        </p>
        <p>
          In these cases, we cannot rely on visible output. But there's still another way to check if a condition is true —
          by making the database slow down on purpose, like with a function such as <code>SLEEP()</code>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">💡 Syntax</h2>
        <p className="mb-2">
          We can use the <code>SLEEP()</code> function to delay the database when a condition is true:
        </p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus}>
          {"' AND IF(1=1, SLEEP(3), 1) --"}
        </SyntaxHighlighter>

        <TableContainer component={Paper} sx={{ maxWidth: 500, backgroundColor: '#f9f9f9', mt: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Condition</strong></TableCell>
                <TableCell><strong>Result</strong></TableCell>
                <TableCell><strong>Behavior</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell><code>1=1</code></TableCell>
                <TableCell><code>SLEEP(3)</code></TableCell>
                <TableCell>🕒 Delay observed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>1=2</code></TableCell>
                <TableCell>Returns instantly</TableCell>
                <TableCell>✅ No delay</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <p className="mt-3">
          If the page takes more time to load, the condition is likely to be true.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🔍 Injected Example</h2>
        <p className="mb-2">
          We can now use this trick to guess the password of the administrator:
        </p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus}>
          {"' AND IF(SUBSTRING(password,1,1) = 'a', SLEEP(3), 1) --"}
        </SyntaxHighlighter>

        <ul className="list-disc list-inside mt-4 mb-2">
          <li>If the first character is <code>'a'</code> → ✅ condition true → 🕒 delay</li>
          <li>If not <code>'a'</code> → ❌ no delay</li>
        </ul>
        <p>
          Keep looping <code>'a'</code> to <code>'z'</code> for position 1, then repeat for position 2, 3… until the full password is revealed.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🧠 Explanation</h2>
        <TableContainer component={Paper} sx={{ maxWidth: 600, backgroundColor: '#f9f9f9' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Part</strong></TableCell>
                <TableCell><strong>Explanation</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell><code>'</code></TableCell>
                <TableCell>Closes the original input</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>IF(condition, SLEEP(3), 1)</code></TableCell>
                <TableCell>Delays if condition is true</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>SUBSTRING(password, 1, 1)</code></TableCell>
                <TableCell>Extracts one letter to compare</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>--</code></TableCell>
                <TableCell>Comments out the rest of the SQL</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🎮 Challenge Time</h2>
        <p className="mb-2">
          Use <strong>time-based SQLi</strong> to determine hidden values by checking the page's response delay.
        </p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus}>
          {"hidden_login(user, secret_flag)"}
        </SyntaxHighlighter>
        <p className="mt-2">
          Try to extract the value of <code>secret_flag</code>. You won’t see any output or error — only time will tell if you’re correct.
        </p>

        <Link to="/time-based-simulator">
          <button className="mt-4 bg-purple-600 text-white font-bold px-4 py-2 rounded">
            Try It Yourself
          </button>
        </Link>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">🏁 Submit Your Flag</h2>
        <p className="text-base mb-2">If you successfully extracted the flag, enter it below:</p>
        <FlagInput correctFlag="flag{time_based_leak_success}" />
      </section>
    </div>
  );
};

export default TimeBasedLesson;
