// Start your implementation with App.js Here, All the best!
// import React from 'react'
// import BottomPanel from "./components/BottomPanel";
import InfoPanel from "./components/InfoPanel";

import "./styles.css";

const App = () => {
  return (
    <div className="container-app">
      <h2 className="Expense-heading">Expense Tracker</h2>
      <InfoPanel />
    </div>
  );
};

export default App;
