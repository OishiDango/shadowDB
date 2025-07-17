import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import InjectionIntro from './pages/InjectionIntro';
import LoginBypass from './pages/1.LoginBypass';
import Topbar from './components/Topbar';
import Track from './pages/Track';
import QuerySimulator from './pages/QuerySimulator';
import UnionInjection from './pages/2.UnionInjection';
import InformationSchema from './pages/3.information_schema';
import CaseBypassLesson from './pages/4.CaseBypassLesson';
import LoginSimulatorPage from './pages/1.LoginSimulatorPage';
import UnionSimulatorPage  from './pages/2.LoginBoxUnion';

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
            <Route path="/case-bypass" element={<CaseBypassLesson />} />
            <Route path="/information-schema" element={<InformationSchema />} />
            <Route path="/login-simulator" element={<LoginSimulatorPage />} />
            <Route path="/union-simulator" element={<UnionSimulatorPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
