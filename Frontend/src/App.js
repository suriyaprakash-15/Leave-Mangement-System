import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import LeaveData from './Components/Leave Form/Leave.jsx';
import LeaveHistory from './Components/Leave history/Leave-history.jsx';
import ManagerDashboard from './Components/Manager-dashboard/Manger-dashboard.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaveform" element={<LeaveData />} />
        <Route path="/leavehistory" element={<LeaveHistory />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
      </Routes>
    </Router>
  );
}
