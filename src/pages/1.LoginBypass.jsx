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

const LoginBypass = () => {

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-3xl ml-0">
      <h1 className="text-3xl font-bold mb-6">🔓 The SQL Injection Login Bypass</h1>

      <section className="mb-8">
        <p className="text-base mb-4">
          SQL injection can be used to bypass login forms by injecting code that changes the logic of the SQL query.
        </p>

        <h2 className="text-2xl font-semibold mb-2">💡 Syntax</h2>
        <p className="mb-2">To bypass the login:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus} wrapLines={true}>
          {'\' OR 1=1 --'}
        </SyntaxHighlighter>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">🔍 Injected Example</h2>
        <p className="mb-2">A typical less-protected login query looks like this:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus} wrapLines={true}>
          {`SELECT * FROM users WHERE username = '$username' AND password = '$password';`}
        </SyntaxHighlighter>

        <p className="mt-4 mb-2">If user inputs:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus} wrapLines={true}>
          {'\' OR 1=1 --'}
        </SyntaxHighlighter>

        <p className="mt-4 mb-2">The query becomes:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus} wrapLines={true}>
          {`SELECT * FROM users WHERE username = '' OR 1=1 --' AND password = '';`}
        </SyntaxHighlighter>

        <p className="mt-4 text-base">
          The condition <code>OR 1=1</code> is always <strong>true</strong>, and the rest of the query is commented out due to <code>--</code>.
        </p>
        <p className="mt-4 text-base font-semibold">
          Thus this makes the <code>WHERE</code> clause always true and bypasses authentication.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">🧠 Explanation</h2>
        <div className="bg-white rounded shadow max-w-xl">
          <TableContainer component={Paper} sx={{ maxWidth: 500, marginLeft: 0, backgroundColor: '#f9f9f9' }}>
            <Table size="small" aria-label="sql explanation table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Part</strong></TableCell>
                  <TableCell><strong>Meaning</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell><code>'</code></TableCell>
                  <TableCell>Closes the original string literal</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>OR 1=1</code></TableCell>
                  <TableCell>Always true condition</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>--</code></TableCell>
                  <TableCell>Comments out the rest of the SQL</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">🎮 SQLi Exercises</h2>
        <p className="text-base mb-4">Try to bypass the login and gain the flag in the following wargame:</p>
        <Link to="/login-simulator">
          <button className="bg-blue-600 text-white font-bold px-4 py-2 rounded">
            Try it Yourself
          </button>
        </Link>
        <p className="mt-2 text-sm text-gray-600">Click on "Try it Yourself" button to access the wargame.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">🏁 Submit Your Flag</h2>
        <p className="text-base mb-2">If you successfully bypassed the login and captured the flag, enter it below:</p>
        <FlagInput correctFlag="flag{COPY_THIS_FLAG_INCLUDE_BRACKETS}" />
      </section>
    </div>
  );
};

export default LoginBypass;
