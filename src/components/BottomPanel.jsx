// import React from 'react'

const BottomPanel = () => {
  return (
    <div className="bottom-panel-container">
      <div className="recent-transaction-conatainer">
        <div className="bottom-panel-headings">Recent transaction</div>
        <div className="recent-trans-box">
          <p>Samosa</p>
          <hr />
          <p>Samosa</p>
          <hr />
          <p>Samosa</p>
          <hr />
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
