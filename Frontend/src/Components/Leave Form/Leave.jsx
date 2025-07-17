import React, { useState } from "react";
import "./Leave.css";

const leaveOptions = [
  {
    title: "Casual Leave",
    description: "For personal reasons",
    icon: "📅",
  },
  {
    title: "Medical Leave",
    description: "For health issues",
    icon: "📝",
  },
  {
    title: "Permission",
    description: "Up to 2 hours",
    icon: "⏰",
  },
];

const LeaveData = () => {
  const [selected, setSelected] = useState("Casual Leave");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [drafts, setDrafts] = useState([]);

  const handleSubmit = async () => {
    if (!fromDate || !toDate || !reason) {
      setMessage("Please fill all fields.");
      return;
    }
    const data = {
      leave_type: selected,
      start_date: fromDate,
      end_date: toDate,
      reason,
    };
    try {
      const response = await fetch("http://localhost:5000/api/apply-leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage("Leave applied successfully!");
        // Optionally, redirect to dashboard or clear form
      } else {
        setMessage(result.error || "Failed to apply leave.");
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
    }
  };

  const handleDraft = () => {
    if (!reason) {
      setMessage("Please enter a reason to save as draft.");
      return;
    }
    setDrafts([...drafts, reason]);
    setReason("");
    setMessage("");
  };

  const handleDeleteDraft = (index) => {
    setDrafts(drafts.filter((_, i) => i !== index));
    setMessage("");
  };

  const handleEditDraft = (index) => {
    setReason(drafts[index]);
    setDrafts(drafts.filter((_, i) => i !== index));
    setMessage("");
  };

  return (
    <div className="main">
      <div><p>Leave Application Form</p></div>
      <div className="leave-container">
        {leaveOptions.map((leave) => (
          <div
            key={leave.title}
            className={`leave-card ${selected === leave.title ? "selected" : ""}`}
            onClick={() => setSelected(leave.title)}
          >
            <div className="leave-icon">{leave.icon}</div>
            <div className="leave-info">
              <div className="leave-title">{leave.title}</div>
              <div className="leave-description">{leave.description}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="Leaveperiod">
        <p>Leave Period</p>
        <div className="leave-period-inputs">
            <p>From Date</p>
          <input type="date" className="Date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
            <p>To Date</p>
          <input type="date" className="Date" value={toDate} onChange={e => setToDate(e.target.value)} />
            <p>Reason</p>
          <input type="text" className="reason-txt" value={reason} onChange={e => setReason(e.target.value)} placeholder="Reason for Leave" />
        </div>
        {/* Draft notes section */}
        {drafts.length > 0 && (
          <div className="draft-notes">
            <p>Draft Notes:</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {drafts.map((note, idx) => (
                <li key={idx} style={{ marginBottom: '8px' }}>
                  <span>{note}</span>
                  <button onClick={() => handleEditDraft(idx)} style={{ marginLeft: '8px', marginRight: '4px' }}>Edit</button>
                  <button onClick={() => handleDeleteDraft(idx)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="button">
        <button className="Draft" onClick={handleDraft}>Draft</button>
        <button className="Submit" onClick={handleSubmit}>Submit</button>
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default LeaveData;




// import React from "react";
// import './Leave.css';

// const leaveOptions = [
//   {
//     title: "Casual Leave",
//     description: "For personal reasons",
//     icon: "📅",
//   },
//   {
//     title: "Medical Leave",
//     description: "For health issues",
//     icon: "📝",
//   },
//   {
//     title: "Permission",
//     description: "Up to 2 hours",
//     icon: "⏰",
//   },
// ];

// const leaveData = () =>{
//     const [selected, setSelected] = useState("Casual Leave");
//     return (
//         <div className="main">
//         <div><p>Leave Application Form</p></div>
//         <div className="type">
//             <select name="Casual leave" id=""></select>
//         </div>
//        <div className="leave-container">
//       {leaveOptions.map((leave) => (
//         <div
//           key={leave.title}
//           className={`leave-card ${selected === leave.title ? "selected" : ""}`}
//           onClick={() => setSelected(leave.title)}
//         >
//           <div className="leave-icon">{leave.icon}</div>
//           <div className="leave-info">
//             <div className="leave-title">{leave.title}</div>
//             <div className="leave-description">{leave.description}</div>
//           </div>
//         </div>
//       ))}
//     </div>
//         </div>

//     );
// };
// export default leaveData;