import React, { useState } from 'react';
import './Leave-history.css';

// Mock data for leave records
const mockLeaveRecords = [
  {
    id: 1,
    dateApplied: '15/12/2024',
    employee: 'John Doe',
    manager: 'Sarah Johnson',
    leaveType: 'Annual Leave',
    duration: '3 days',
    dateRange: '20/12/2024 - 22/12/2024',
    status: 'Approved',
    managerComments: 'Approved for year-end break. Enjoy your...',
  },
  {
    id: 2,
    dateApplied: '10/12/2024',
    employee: 'Jane Smith',
    manager: 'Michael Chen',
    leaveType: 'Sick Leave',
    duration: '1 day',
    dateRange: '12/12/2024 - 12/12/2024',
    status: 'Approved',
    managerComments: 'Get well soon. Medical certificate receiv...',
  },
  {
    id: 3,
    dateApplied: '08/12/2024',
    employee: 'Robert Wilson',
    manager: 'Sarah Johnson',
    leaveType: 'Personal Leave',
    duration: '3 days',
    dateRange: '25/12/2024 - 27/12/2024',
    status: 'Pending',
    managerComments: 'Under review – checking team coverage.',
  },
  // Add more mock records as needed
];

const statusColors = {
  Approved: 'approved',
  Pending: 'pending',
  Rejected: 'rejected',
};

function StatusSummary({ records }) {
  const approved = records.filter(r => r.status === 'Approved').length;
  const pending = records.filter(r => r.status === 'Pending').length;
  const rejected = records.filter(r => r.status === 'Rejected').length;
  return (
    <div className="status-summary">
      <span className="status approved">✔ Approved: {approved}</span>
      <span className="status pending">⏰ Pending: {pending}</span>
      <span className="status rejected">✖ Rejected: {rejected}</span>
    </div>
  );
}

function Filters({ type, status, onTypeChange, onStatusChange, search, onSearchChange }) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search by employee name, leave type, or comments..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="search-input"
      />
      <select value={type} onChange={e => onTypeChange(e.target.value)}>
        <option value="">All Types</option>
        <option value="Annual Leave">Annual Leave</option>
        <option value="Sick Leave">Sick Leave</option>
        <option value="Personal Leave">Personal Leave</option>
      </select>
      <select value={status} onChange={e => onStatusChange(e.target.value)}>
        <option value="">All Status</option>
        <option value="Approved">Approved</option>
        <option value="Pending">Pending</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  );
}

function LeaveTable({ records }) {
  return (
    <table className="leave-table">
      <thead>
        <tr>
          <th>DATE APPLIED</th>
          <th>EMPLOYEE</th>
          <th>LEAVE TYPE</th>
          <th>DURATION</th>
          <th>STATUS</th>
          <th>MANAGER COMMENTS</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {records.map(record => (
          <tr key={record.id}>
            <td>{record.dateApplied}</td>
            <td>
              <div className="employee-name">{record.employee}</div>
              <div className="manager-name">Manager: {record.manager}</div>
            </td>
            <td><span className="leave-type">{record.leaveType}</span></td>
            <td>
              {record.duration}
              <div className="date-range">{record.dateRange}</div>
            </td>
            <td>
              <span className={`status-badge ${statusColors[record.status]}`}>{record.status}</span>
            </td>
            <td>{record.managerComments}</td>
            <td><button className="view-btn">👁 View</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function LeaveHistory() {
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');

  // Filter logic
  const filteredRecords = mockLeaveRecords.filter(record => {
    const matchesType = !type || record.leaveType === type;
    const matchesStatus = !status || record.status === status;
    const matchesSearch =
      !search ||
      record.employee.toLowerCase().includes(search.toLowerCase()) ||
      record.leaveType.toLowerCase().includes(search.toLowerCase()) ||
      record.managerComments.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="leave-history-container">
      {/* Header row: title/subtitle left, buttons right */}
      <div className="lh-header-row">
        <div className="lh-header-text">
          <h1>Leave History</h1>
          <p>Manage and track leave applications efficiently</p>
        </div>
        <div className="lh-header-actions">
          <button className="export-btn">⬇ Export PDF</button>
          <button className="filters-btn">⚲ Filters</button>
        </div>
      </div>
      {/* Search and Filters combined box */}
      <div className="lh-search-filters-box">
        <div className="lh-search-container">
          <input
            type="text"
            placeholder="Search by employee name, leave type, or comments..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="lh-filters-row">
          <div className="lh-filters-wrap">
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="">All Types</option>
              <option value="Annual Leave">Annual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Personal Leave">Personal Leave</option>
            </select>
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
      {/* Info and Status Summary row container */}
      <div className="lh-info-summary-row">
        <div className="leave-records-info">
          Showing {filteredRecords.length} of {mockLeaveRecords.length} leave records
        </div>
        <StatusSummary records={filteredRecords} />
      </div>
      {/* Table container */}
      <div className="lh-table-container">
        <LeaveTable records={filteredRecords} />
      </div>
    </div>
  );
}
