import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { useAuth } from '../../useAuth';
import { useNavigate } from 'react-router-dom';

const TOTAL_CASUAL = 15;
const TOTAL_MEDICAL = 15;
const TOTAL_PERMISSION = 1;

const recentRequests = [];

const today = new Date();
const formattedDate = today.toLocaleDateString('en-GB'); // DD/MM/YYYY

const Dashboard = () => {
  const { user, handleLogout, checkAuthStatus } = useAuth();
  const navigate = useNavigate();
  const [leaveSummary, setLeaveSummary] = useState({ casual: 0, medical: 0, permission: 0 });

  useEffect(() => {
    checkAuthStatus();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Fetch leave summary from backend
    fetch('http://localhost:5000/api/user-leave-summary', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setLeaveSummary(data);
        }
      });
  }, []);

  const handleApplyLeave = () => {
    navigate('/leaveform');
  };

  const handleViewHistory = () => {
    navigate('/leavehistory');
  };

  const handleManagerDashboard = () => {
    navigate('/manager-dashboard');
  };

const leaveData = [
  {
    type: 'Casual Leave',
    icon: '📅',
      used: leaveSummary.casual,
      total: TOTAL_CASUAL,
      available: TOTAL_CASUAL - leaveSummary.casual,
    color: '#1976d2',
  },
  {
    type: 'Medical Leave',
    icon: '🩺',
      used: leaveSummary.medical,
      total: TOTAL_MEDICAL,
      available: TOTAL_MEDICAL - leaveSummary.medical,
    color: '#d32f2f',
  },
  {
    type: 'Permission Requests',
    icon: '🟡',
      used: leaveSummary.permission,
      total: TOTAL_PERMISSION,
      available: TOTAL_PERMISSION - leaveSummary.permission,
    color: '#fbc02d',
  },
];

  return (
    <>
      <header className="dashboard-header">
        <div>
          <h2>Manureva Leave Management System</h2>
        </div>
        <div className="dashboard-header-right">
          <span className="dashboard-date">{formattedDate}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {user && (
              <span style={{ fontSize: '14px', color: '#6b7280' }}>
                Welcome, {user.name}
              </span>
            )}
            <span className="dashboard-profile-pic" title="Profile">
              {user && user.profile_picture ? (
                <img 
                  src={`http://localhost:5000/api/proxy-image?url=${encodeURIComponent(user.profile_picture)}`}
                  alt="Profile" 
                  style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', background: '#fff' }}
                />
              ) : (
                <span role="img" aria-label="profile">👤</span>
              )}
            </span>
            <button className="dashboard-logout" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>
      <main className="dashboard-main">
        <div className="dashboard-title-row">
          <h3 className="dashboard-title">Dashboard</h3>
          <span className="dashboard-date dashboard-date-main">{formattedDate}</span>
        </div>
        <div className="dashboard-leave-cards">
          {leaveData.map((leave) => (
            <div className="dashboard-leave-card" key={leave.type}>
              <div className="dashboard-leave-icon-type">
                <span className="dashboard-leave-icon" style={{ color: leave.color }}>{leave.icon}</span>
                <span className="dashboard-leave-type">{leave.type}</span>
              </div>
              <div className="dashboard-leave-card-content">
                <div className="dashboard-leave-balance">
                  {leave.used} / {leave.total}
                </div>
                <div className="dashboard-leave-unit">{leave.type === 'Permission Requests' ? 'Hours' : 'Days'}</div>
                <div className="dashboard-leave-details">
                  Used: {leave.used} | Available: {leave.available}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="dashboard-actions">
          <button className="dashboard-action-btn" onClick={handleApplyLeave}>Apply Leave</button>
          <button className="dashboard-action-btn" onClick={handleViewHistory}>View History</button>
        </div>
        <div className="dashboard-recent-requests">
          <h4>Recent Leave Requests</h4>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>DATE APPLIED</th>
                <th>LEAVE TYPE</th>
                <th>DURATION</th>
                <th>STATUS</th>
                <th>MANAGER COMMENTS</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((req, idx) => (
                <tr key={idx}>
                  <td>{req.date}</td>
                  <td>{req.type}</td>
                  <td>{req.duration}</td>
                  <td className={
                    req.status === 'Approved' ? 'status-approved' :
                    req.status === 'Rejected' ? 'status-rejected' : ''
                  }>{req.status}</td>
                  <td>{req.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Dashboard; 