import { Link } from 'react-router-dom';

const Topbar = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '48px',
        zIndex: 1100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      {/* 左邊 logo（用 scale 放大） */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/">
          <img
            src="/shadowdb-logo.png"
            alt="Shadow DB Logo"
            style={{
              height: '48px',
              transform: 'scale(1.35)',
              transformOrigin: 'left center',
              display: 'block',
            }}
          />
        </Link>
      </div>

      {/* 中間導覽選單 */}
      <div style={{ display: 'flex', gap: '20px', fontWeight: 'bold' }}>
        <Link to="/" style={{ color: '#222' }}>首頁</Link>
        <Link to="/intro" style={{ color: '#222' }}>iSQL 教學</Link>
        <Link to="/track" style={{ color: '#222' }}>進度追蹤</Link>
      </div>

      {/* 右側按鈕 */}
      <div>
        <button
          style={{
            backgroundColor: '#2F88FF',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            fontWeight: 'bold',
          }}
        >
          登入
        </button>
      </div>
    </div>
  );
};

export default Topbar;
