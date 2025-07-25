import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const linkStyle = (path) => ({
    display: 'block',
    padding: '12px 20px',
    backgroundColor: location.pathname === path ? '#2F88FF' : 'transparent',
    color: location.pathname === path ? 'white' : '#222',
    borderRadius: '5px',
    marginBottom: '8px',
    fontWeight: 'bold',
    textDecoration: 'none',
    transition: 'background-color 0.2s ease'
  });

  return (
    <div style={{
      position: 'fixed',
      top: '48px',           // ⬅️ 从 Topbar 下方开始
      left: 0,
      height: 'calc(100vh - 48px)', // ⬅️ 避免超出视窗
      width: '240px',
      backgroundColor: '#e7e9eb',
      padding: '1.5rem 1rem',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
      overflowY: 'auto',
      zIndex: 1000
    }}>

      <h2 style={{ color: '#222', marginBottom: '1.5rem' }}>SQLi Tutorial</h2>
      <nav>
        <Link to="/" style={linkStyle('/')}>SQLi Home</Link>
        <Link to="/intro" style={linkStyle('/intro')}>SQLi Intro</Link>
        <Link to="/query-simulate" style={linkStyle('/query-simulate')}>Query Simulator</Link>
        <Link to="/login-bypass" style={linkStyle('/login-bypass')}>SQLi Login By Pass</Link>
        <Link to="/union-injection" style={linkStyle('/union-injection')}>SQLi UNION</Link>
        <Link to="/information-schema" style={linkStyle('/information-schema')}>SQLi Info Scheme</Link>
        <Link to="/case-bypass" style={linkStyle('/case-bypass')}>SQLi Filter Bypass</Link>
        <Link to="/blind-intro" style={linkStyle('/blind-intro')}>Blind SQLi Introduction</Link>
        <Link to="/blind/error-based" style={linkStyle('/blind/error-based')}>SQLi Error-based</Link>
        <Link to="/blind/time-based" style={linkStyle('/blind/time-based')}>SQLi Time-based </Link>
        <Link to="/sql-defense" style={linkStyle('/sql-defense')}>SQLi Defense</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
