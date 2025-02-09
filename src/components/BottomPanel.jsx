// import React from 'react'

import { useEffect, useState } from "react";
import RecentTransaction from "./bottomComponent/RecentTransaction";

const BottomPanel = () => {
  const [recentExpense, setRecentExpense] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );

  useEffect(() => {
    const recentData = JSON.parse(localStorage.getItem("expenses")) || [];
    setRecentExpense(recentData);
  }, []);
  return (
    <div className="bottom-panel-container">
      <div className="recent-transaction-conatainer">
        <div className="bottom-panel-headings">Recent transaction</div>
        <div className="recent-trans-box">
          {recentExpense &&
            recentExpense.map((el) => {
              return <RecentTransaction key={el.id} exData={el} />;
            })}
        </div>
      </div>
      <div className="top-expenses-conatainer">
        <div className="bottom-panel-headings">Top Expenses</div>
        <div className="top-expense-box">
          <p>Samosa</p>

          <p>Samosa</p>
          <p>Samosa</p>
        </div>
      </div>
    </div>
  );
};

export default BottomPanel;
