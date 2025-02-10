// import React from 'react'

import BarChartComponent from "./BarChartComponent";
import RecentTransaction from "./bottomComponent/RecentTransaction";

const BottomPanel = ({ expDataSet, editExpense, deleteExpense }) => {
  return (
    <div className="bottom-panel-container">
      <div className="recent-transaction-conatainer">
        <div className="bottom-panel-headings">Recent transaction</div>
        <div className="recent-trans-box">
          {expDataSet.length > 0 ? (
            expDataSet.map((el) => {
              return (
                <RecentTransaction
                  key={el.id}
                  exData={el}
                  editExpense={editExpense}
                  deleteExpense={deleteExpense}
                />
              );
            })
          ) : (
            <p>No transactions!</p>
          )}
        </div>
      </div>
      <div className="top-expenses-conatainer">
        <div className="bottom-panel-headings">Top Expenses</div>
        <div className="top-expense-box">
          <BarChartComponent exPData={expDataSet} />
        </div>
      </div>
    </div>
  );
};

export default BottomPanel;
