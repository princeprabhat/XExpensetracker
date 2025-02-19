// import React from 'react'

import { useState } from "react";
import BarChartComponent from "./BarChartComponent";
import RecentTransaction from "./bottomComponent/RecentTransaction";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";
const no_of_items_per_page = 3;

const BottomPanel = ({ expDataSet, editExpense, deleteExpense }) => {
  const [activePage, setActivePage] = useState(0);

  const no_of_pages = Math.ceil(expDataSet.length / no_of_items_per_page);
  const start = no_of_items_per_page * activePage;
  const end = start + no_of_items_per_page;

  const handlePageChange = (action) => {
    if (action == "nextPage" && activePage + 1 < no_of_pages) {
      setActivePage((prev) => prev + 1);
    }
    if (action == "prevPage" && activePage + 1 > 1) {
      setActivePage((prev) => prev - 1);
    }
  };

  return (
    <div className="bottom-panel-container">
      <div className="recent-transaction-container">
        <div className="bottom-panel-headings">Recent Transactions</div>
        <div className="recent-trans-box">
          {expDataSet.length > 0 && expDataSet[start] ? (
            expDataSet.slice(start, end).map((el) => {
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
            <p style={{ textAlign: activePage + 1 > 1 ? "center" : "left" }}>
              {activePage + 1 > 1
                ? `No more transactions here, Please go back to explore other transactions`
                : "No transactions!"}
            </p>
          )}
          {expDataSet.length > 0 && (
            <div className="pagination-container">
              <div
                className="pagination-button-container"
                onClick={() => handlePageChange("prevPage")}
              >
                <LuMoveLeft size={20} />
              </div>
              <div className="current-page-active">{activePage + 1}</div>
              <div
                className="pagination-button-container"
                onClick={() => handlePageChange("nextPage")}
              >
                <LuMoveRight size={20} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="top-expenses-container">
        <div className="bottom-panel-headings">Top Expenses</div>
        <div className="top-expense-box">
          <BarChartComponent exPData={expDataSet} />
        </div>
      </div>
    </div>
  );
};

export default BottomPanel;
