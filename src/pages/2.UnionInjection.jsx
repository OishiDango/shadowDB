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

const UnionInjection = () => {

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-3xl ml-0">
      <h1 className="text-3xl font-bold mb-6">🔓 Extracting Hidden Data with UNION</h1>

      <section className="mb-8">
        <p className="text-base mb-4">
          SQL Injection can also be used to extract hidden data by using the <code>UNION</code> keyword to join multiple queries.
          This allows attackers to retrieve data from other tables — even if the original query wasn't meant to show it.
        </p>

        <h2 className="text-2xl font-semibold mb-2">💡 Syntax</h2>
        <p className="mb-2">To obtain data from a specific column in the table:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus}>
          {'\' UNION SELECT username, password FROM users --'}
        </SyntaxHighlighter>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">🔍 Injected Example</h2>
        <p className="mb-2">A normal query might look like this:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus}>
          {"SELECT id, comment FROM feedback WHERE comment = '$input';"}
        </SyntaxHighlighter>

        <p className="mt-4 mb-2">Below is an example table from the database:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus}>
{`CREATE TABLE users (
  username VARCHAR(50) PRIMARY KEY,
  password VARCHAR(100) NOT NULL
);`}
        </SyntaxHighlighter>

        <p className="mt-4">Based on the table above, we know there is a <code>users</code> table containing two columns: <code>username</code> and <code>password</code>.</p>

        <p className="mt-4 mb-2">If we inject:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus}>
          {'\' UNION SELECT username, password FROM users --'}
        </SyntaxHighlighter>

        <p className="mt-4 mb-2">The final query becomes:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus}>
          {`SELECT id, comment FROM feedback WHERE comment = ''
UNION SELECT username, password FROM users --';`}
        </SyntaxHighlighter>

        <p className="mt-4">This will cause the query to return <code>username</code> and <code>password</code> data from the users table.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">🧠 Explanation</h2>
        <TableContainer component={Paper} sx={{ maxWidth: 500, ml: 0, backgroundColor: '#f3f4f6' }}>
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
                <TableCell>Ends the string safely</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>UNION SELECT ...</code></TableCell>
                <TableCell>Adds a second query to be merged</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>FROM users</code></TableCell>
                <TableCell>Target table to extract data from</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>--</code></TableCell>
                <TableCell>Comments out any remaining SQL</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">🧪 SQLi Exercise</h2>
        <p className="text-base mb-4">Try to extract <strong>username and password</strong> data from the <code>users</code> table in this Wargame and login to the account:</p>
        <Link to="/union-simulator">
          <button className="bg-blue-600 text-white font-bold px-4 py-2 rounded">
            Try it Yourself
          </button>
        </Link>
      </section>


      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">🏁 Submit Your Flag</h2>
        <p className="text-base mb-2">If you successfully log in using the discovered account, you will receive the flag:</p>
        <FlagInput expectedFlag="flag{union_success}" />
      </section>
    </div>
  );
};

export default UnionInjection;
