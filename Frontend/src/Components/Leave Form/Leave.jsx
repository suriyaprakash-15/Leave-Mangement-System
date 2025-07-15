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

  return (
    <div className="main">
      <div><p>Leave Application Form</p></div>

      {/* <div className="type">
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          {leaveOptions.map((leave) => (
            <option key={leave.title} value={leave.title}>
              {leave.title}
            </option>
          ))}
        </select>
      </div> */}

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
          <input type="date" className="Date" placeholder="From" />
          {/* <input type="date" placeholder="To" /> */}
            <p>To Date</p>
            <input type="date" className="Date" placeholder="To" />
            <p>Reason</p>
            <input type="text" className="reason-txt" placeholder="Reason for Leave" />
        </div>
      </div>
      <div className="button">
        <button className="Draft">Draft</button>
        <button className="Submit">Submit</button>
      </div>
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