import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ElderDashboard from './components/ElderDashboard';
import ChildDashboard from './components/ChildDashboard';
import Shopping from './components/shopping';
import VolunteerSignup from './components/volunteer';
import ProfileManagement from './components/ProfileManagement';
import HealthReport from './components/HealthReport';
import EmotionReport from './components/EmotionReport';
import EmergencyReport from './components/EmergencyReport';
import OthersReport from './components/OthersReport';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/elder-dashboard/:id" element={<ElderDashboard />} />
        <Route path="/child-dashboard/:id" element={<ChildDashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/volunteer-signup" element={<VolunteerSignup />} />
        <Route path="/profile" element={<ProfileManagement />} />

        {/* report pages */}
        <Route path="/health-report/:elderId" element={<HealthReport />} />
        <Route path="/emotion-report/:elderId" element={<EmotionReport />} />
        <Route path="/emergency-report/:elderId" element={<EmergencyReport />} />
        <Route path="/others-report/:elderId" element={<OthersReport />} />
      </Routes>
    </Router>
  );
}

export default App;



