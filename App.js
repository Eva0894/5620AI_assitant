import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ElderDashboard from './components/ElderDashboard';
import ChildDashboard from './components/ChildDashboard';
import TechDashboard from './components/TechDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/elder" element={<ElderDashboard />} />
        <Route path="/child" element={<ChildDashboard />} />
        <Route path="/tech" element={<TechDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;