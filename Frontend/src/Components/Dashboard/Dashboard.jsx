import React, { useEffect } from 'react';
import './Dashboard.css';
import { useAuth } from '../../useAuth';

const leaveData = [
  {
    type: 'Casual Leave',
    icon: '📅',
    used: 3.5,
    total: 15,
    available: 11.5,
    color: '#1976d2',
  },
  {
    type: 'Medical Leave',
    icon: '🩺',
    used: 0,
    total: 15,
    available: 15,
    color: '#d32f2f',
  },
  {
    type: 'Permission Requests',
    icon: '🟡',
    used: 0,
    total: 1,
    available: 1,
    color: '#fbc02d',
  },
];

const recentRequests = [
  {
    date: '11/07/2025',
    type: 'Casual',
    duration: '1 Day',
    status: 'Approved',
    comment: 'Enjoy your time off.',
  },
  {
    date: '20/06/2025',
    type: 'Permission',
    duration: '2 Hours',
    status: 'Approved',
    comment: '-',
  },
  {
    date: '15/06/2025',
    type: 'Medical',
    duration: '3 Days',
    status: 'Approved',
    comment: 'Hope you feel better.',
  },
  {
    date: '10/04/2025',
    type: 'Casual',
    duration: '5 Days',
    status: 'Rejected',
    comment: 'Project deadline.',
  },
  {
    date: '10/04/2025',
    type: 'Casual',
    duration: '5 Days',
    status: 'Rejected',
    comment: 'Project deadline.',
  },
];

const today = new Date();
const formattedDate = today.toLocaleDateString('en-GB'); // DD/MM/YYYY

const handleApplyLeave = () => {
  alert('Apply Leave clicked!');
};

const handleViewHistory = () => {
  alert('View History clicked!');
};

const Dashboard = () => {
  const { user, handleLogout, checkAuthStatus } = useAuth();

  useEffect(() => {
    checkAuthStatus();
    // eslint-disable-next-line
  }, []);

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
                  {leave.total - leave.available} / {leave.total}
                </div>
                <div className="dashboard-leave-unit">Days</div>
                <div className="dashboard-leave-details">
                  Used: {leave.total - leave.available} | Available: {leave.available}
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