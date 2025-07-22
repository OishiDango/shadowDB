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
import UnionSimulatorPage  from './pages/2.UnionSimulatorPage';
import InformationSimulatorPage from './pages/3.informationSimulatorPage';
import CaseBypassPage from './pages/4.CaseBypassPage';
import BlindIntroLesson from './pages/5.BlindIntro.jsx';
import ErrorBasedLesson from './pages/6.ErrorBasedLesson.jsx';
import TimeBasedLesson from './pages/7.TimeBasedLesson.jsx';
import SQLDefensePage from './pages/8.Defence.jsx';
import ErrorBasedSimulator from './pages/6.ErrorBasedSimulator.jsx';
import TimeBasedSimulator from './pages/7.TimeBasedSimulator.jsx';

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

        <div style={{
          marginLeft: '240px',
          flex: 1,
          padding: '1.5rem 3rem',
          paddingTop: '60px',
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shadowDB" element={<Home />} />
            <Route path="/intro" element={<InjectionIntro />} />
            <Route path="/login-bypass" element={<LoginBypass />} />
            <Route path="/track" element={<Track />} />
            <Route path="/query-simulate" element={<QuerySimulator />} />
            <Route path="/union-injection" element={<UnionInjection />} />
            <Route path="/case-bypass" element={<CaseBypassLesson />} />
            <Route path="/information-schema" element={<InformationSchema />} />
            <Route path="/login-simulator" element={<LoginSimulatorPage />} />
            <Route path="/union-simulator" element={<UnionSimulatorPage />} />
            <Route path="/information-simulator" element={<InformationSimulatorPage />} />
            <Route path="/bypass-simulator" element={<CaseBypassPage />} />
            <Route path="/blind-intro" element={<BlindIntroLesson />} />
            <Route path="/blind/error-based" element={<ErrorBasedLesson />} />
            <Route path="/blind/time-based" element={<TimeBasedLesson />} />
            <Route path="/sql-defense" element={<SQLDefensePage />} />
            <Route path="/blind/error-based-simulator" element={<ErrorBasedSimulator />} />
            <Route path="/time-based-simulator" element={<TimeBasedSimulator />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
