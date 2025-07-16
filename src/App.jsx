import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import InjectionIntro from './pages/InjectionIntro';
import LoginBypass from './pages/LoginBypass';
import Topbar from './components/Topbar';
import Track from './pages/Track';
import QuerySimulator from './pages/QuerySimulator';
import UnionInjection from './pages/UnionInjection';
import InformationSchema from './pages/information_schema';

function App() {
  return (
    <Router>
      <Topbar />
      <div style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#ffffff'
      }}>
        <Sidebar />

        {/* 主內容區域撐滿，加上 paddingTop 來避開 topbar */}
        <div style={{
          marginLeft: '240px',
          flex: 1,
          padding: '1.5rem 3rem',
          paddingTop: '60px', // 👈 這行是關鍵，避免被 topbar 擋住
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/intro" element={<InjectionIntro />} />
            <Route path="/login-bypass" element={<LoginBypass />} />
            <Route path="/track" element={<Track />} />
            <Route path="/query-simulate" element={<QuerySimulator />} />
            <Route path="/union-injection" element={<UnionInjection />} />
            <Route path="/information-schema" element={<InformationSchema />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
