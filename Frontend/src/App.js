import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login1 from './Components/Login/Login1';
import Dashboard from './Components/Dashboard/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login1 />} />
        <Route path="/Login1" element={<Login1 />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;


// import React from 'react';

// import './App.css';
// import Login from './Components/Login/Login1';
// import Dashboard from './Components/Dashboard/Dashboard';

// function App() {
//   return (
//     <div className="App">
//       <Dashboard />
//     </div>
//   );
// }

// export default App;
