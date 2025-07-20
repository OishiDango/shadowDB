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

const ErrorBasedLesson = () => {
  return (
    <div className="p-6 bg-white rounded shadow-md max-w-3xl ml-0">
      <h1 className="text-3xl font-bold mb-6">🧨 Error-based SQL Injection</h1>

      <section className="mb-6">
        <p className="mb-2">
          On many websites, if a database error occurs, the message will appear directly on the page
          (you can often view it via Developer Tools by pressing <strong>F12</strong>).
        </p>
        <p>
          Error-based SQL injection is a technique that intentionally causes the database to return errors in order to:
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>✅ <strong>Check if a condition is true</strong> in the database by checking for different error responses</li>
          <li>✅ <strong>Read the content</strong> of the database from the error message itself</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🧪 Example 1: Divide-by-zero Condition</h2>
        <p>Try injecting the following payload:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus}>
          {"' AND (SELECT CASE WHEN (1=1) THEN 1/0 ELSE 'a' END)='a' --"}
        </SyntaxHighlighter>

        <p className="mt-4">Now compare with a false condition:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus}>
          {"' AND (SELECT CASE WHEN (1=2) THEN 1/0 ELSE 'a' END)='a' --"}
        </SyntaxHighlighter>

        <p className="mt-4">Behavior:</p>
        <TableContainer component={Paper} sx={{ maxWidth: 500, backgroundColor: '#f9f9f9' }}>
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
                <TableCell><code>1=1</code> (true)</TableCell>
                <TableCell>Triggers <code>1/0</code> error</TableCell>
                <TableCell>❗ Error shown</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>1=2</code> (false)</TableCell>
                <TableCell>Returns <code>'a'</code></TableCell>
                <TableCell>✅ No error</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <p className="mt-4">
          This allows you to determine whether a condition is true — based on whether the page crashes or not.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🧪 Example 2: Extracting a Password</h2>
        <p>Use the same trick to guess the password of the administrator:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus}>
          {
`' AND (SELECT CASE WHEN (
  Username = 'Administrator' AND SUBSTRING(Password,1,1) = 'a'
) THEN 1/0 ELSE 'a' END)='a' --`
          }
        </SyntaxHighlighter>
        <ul className="list-disc list-inside mt-4 mb-2">
          <li>If the first character is <code>'a'</code> → triggers error</li>
          <li>If not <code>'a'</code> → no error</li>
        </ul>
        <p>Repeat for 'a' to 'z', then move to position 2, 3... until you get the full password.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🧠 Explanation</h2>
        <TableContainer component={Paper} sx={{ maxWidth: 500, backgroundColor: '#f9f9f9' }}>
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
                <TableCell>Closes the original string input</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>SELECT CASE WHEN ...</code></TableCell>
                <TableCell>Tests a condition</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>1/0</code></TableCell>
                <TableCell>Triggers a divide-by-zero error</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>SUBSTRING(...)</code></TableCell>
                <TableCell>Reads one character of the password</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>--</code></TableCell>
                <TableCell>Comments out the rest of the query</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🎮 Challenge Time</h2>
        <p className="mb-2">
          Try bypassing the filter or guessing hidden data using the <strong>error-based SQLi</strong> technique.
          There is a table called:
        </p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus}>
          {"blind_data (id, session_id, data)"}
        </SyntaxHighlighter>
        <Link to="/blind/error-based-simulator">
          <button className="mt-4 bg-purple-600 text-white font-bold px-4 py-2 rounded">
            Try it Yourself
          </button>
        </Link>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">🏁 Submit Your Flag</h2>
        <p className="text-base mb-2">If you successfully extracted the flag, enter it below:</p>
        <FlagInput correctFlag="flag{error_based_condition_leak}" />
      </section>
    </div>
  );
};

export default ErrorBasedLesson;
