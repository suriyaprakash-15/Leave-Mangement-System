import React, { useState, useEffect } from 'react';
import './Leave-history.css';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FiFilter } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";

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

function LeaveTable({ records, onViewDetails }) {
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
            <td>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FiCalendar style={{ color: '#6b7280', fontSize: '1.1em' }} />
                <span>{record.dateApplied}</span>
              </div>
            </td>
            <td>
              <div className="employee-name">{record.employeeName || "-"} {record.employeeRole ? `(${record.employeeRole.charAt(0).toUpperCase() + record.employeeRole.slice(1)})` : ''}</div>
            </td>
            <td><span className="leave-type">{record.leaveType}</span></td>
            <td>
              <div className="duration-days" style={{ fontWeight: 600, fontSize: '1.05em' }}>{record.duration}</div>
              {record.dateRange && record.dateRange !== "-" && (
                <div className="duration-dates" style={{ color: '#6b7280', fontSize: '0.95em' }}>{record.dateRange}</div>
              )}
            </td>
            <td>
              <span className={`status-badge ${statusColors[record.status]}`}>{record.status}</span>
            </td>
            <td>{record.managerComments}</td>
            <td>
              <button className="view-link" onClick={() => onViewDetails(record)}>
                <FiEye style={{ verticalAlign: 'middle', color: '#2563eb', marginRight: 4 }} />
                <span style={{ color: '#2563eb', fontWeight: 500 }}>View</span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function LeaveHistory() {
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Export PDF handler
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Leave History", 14, 16);
    doc.autoTable({
      head: [[
        "Date Applied",
        "Leave Type",
        "Duration",
        "Status",
        "Manager Comments"
      ]],
      body: filteredRecords.map(row => [
        row.dateApplied,
        row.leaveType,
        row.duration + (row.dateRange && row.dateRange !== "-" ? ` (${row.dateRange})` : ""),
        row.status,
        row.managerComments
      ]),
    });
    doc.save("leave-history.pdf");
  };

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/user-leave-requests', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLeaveRecords(data);
          setError('');
        } else {
          setError(data.error || 'Failed to fetch leave history.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch leave history.');
        setLoading(false);
      });
  }, []);

  // Filter logic
  const filteredRecords = leaveRecords.filter(record => {
    const matchesType = !type || record.leaveType === type;
    const matchesStatus = !status || record.status === status;
    const matchesSearch =
      !search ||
      (record.employeeName && record.employeeName.toLowerCase().includes(search.toLowerCase())) ||
      record.leaveType.toLowerCase().includes(search.toLowerCase()) ||
      record.managerComments.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecord(null);
  };

  return (
    <div className="leave-history-container">
      <div className="lh-header-row">
        <div className="lh-header-text">
          <h1>Leave History</h1>
          <p>Manage and track leave applications efficiently</p>
        </div>
        <div className="lh-header-actions">
          <button onClick={exportPDF} className="export-pdf-btn">
            <FiDownload style={{ marginRight: 6, verticalAlign: 'middle' }} />
            Export PDF
          </button>
          <button onClick={() => setShowFilters(f => !f)} className="filters-btn">
            <FiFilter style={{ marginRight: 6, verticalAlign: 'middle' }} />
            Filters
          </button>
        </div>
      </div>
      {showFilters && (
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
                <option value="Casual">Casual</option>
                <option value="Medical">Medical</option>
                <option value="Permission">Permission</option>
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
      )}
      <div className="lh-info-summary-row">
        <div className="leave-records-info">
          {loading ? 'Loading...' : `Showing ${filteredRecords.length} of ${leaveRecords.length} leave records`}
        </div>
        <StatusSummary records={filteredRecords} />
      </div>
      <div className="lh-table-container">
        {error ? <div className="error-message">{error}</div> : <LeaveTable records={filteredRecords} onViewDetails={handleViewDetails} />}
      </div>

      {/* Details Modal */}
      {showModal && selectedRecord && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Leave Request Details</h2>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <div className="detail-label">Date Applied:</div>
                <div className="detail-value">
                  <FiCalendar style={{ marginRight: 6, color: '#6b7280' }} />
                  {selectedRecord.dateApplied}
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Employee:</div>
                <div className="detail-value">{selectedRecord.employeeName || "-"} {selectedRecord.employeeRole ? `(${selectedRecord.employeeRole.charAt(0).toUpperCase() + selectedRecord.employeeRole.slice(1)})` : ''}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Leave Type:</div>
                <div className="detail-value">
                  <span className="leave-type">{selectedRecord.leaveType}</span>
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Duration:</div>
                <div className="detail-value">
                  <div className="duration-days">{selectedRecord.duration}</div>
                  {selectedRecord.dateRange && selectedRecord.dateRange !== "-" && (
                    <div className="duration-dates">{selectedRecord.dateRange}</div>
                  )}
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Status:</div>
                <div className="detail-value">
                  <span className={`status-badge ${statusColors[selectedRecord.status]}`}>
                    {selectedRecord.status}
                  </span>
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Manager Comments:</div>
                <div className="detail-value">{selectedRecord.managerComments || "No comments"}</div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn-secondary" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
