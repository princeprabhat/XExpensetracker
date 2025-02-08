// import React from "react";
import { useEffect, useState } from "react";
import PieChartComp from "./PieChartComp";

import BalanceModal from "./BalanceModal";
import ExpenseModal from "./ExpenseModal";

const InfoPanel = () => {
  const [expenseModalIsOpen, setExpenseModalIsOpen] = useState(false);
  const [balanceModalIsOpen, setBalanceModalIsOpen] = useState(false);
  const [balanceData, setBalanceData] = useState(
    localStorage.getItem("balance-amount")
  );
  const [expenseData, setExpenseData] = useState([]);
  const [expensePrice, setExpensePrice] = useState(null);
  useEffect(() => {
    localStorage.setItem(
      "balance-amount",
      localStorage.getItem("balance-amount") || 5000
    );
  }, []);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("expenses")) || [];
    const fData = data.map((el) => ({
      name: el.title,
      value: parseInt(el.price),
    }));
    setExpenseData(fData);
    const totalPrice = data.reduce(
      (acc, curr) => acc + parseInt(curr?.price),
      0
    );
    setExpensePrice(totalPrice);
  }, [balanceData]);
  //   console.log(JSON.parse(localStorage.getItem("expenses")).price);
  return (
    <div className="info-panel-container">
      <div>
        <p>
          Wallet Balance:{" "}
          <span
            style={{
              fontWeight: "700",
              color: " #89E148",
            }}
          >
            &#8377;{balanceData}
          </span>
        </p>
        <button
          style={{
            background: "linear-gradient(#B5DC52, #89E148)",
          }}
          onClick={() => setBalanceModalIsOpen(true)}
        >
          +Add Income
        </button>
      </div>
      <div>
        <p>
          Expenses:{" "}
          <span
            style={{
              fontWeight: "700",
              color: " #F4BB4A",
            }}
          >
            &#8377;{expensePrice}
          </span>
        </p>
        <button
          style={{
            background: "linear-gradient(#FF9595, #FF4747,#FF3838)",
          }}
          onClick={() => setExpenseModalIsOpen(true)}
        >
          +Add Expense
        </button>
      </div>
      <div className="chart-container">
        <PieChartComp expData={expenseData} />
      </div>

      <BalanceModal
        isModalOpen={balanceModalIsOpen}
        setModalState={setBalanceModalIsOpen}
        balanceData={setBalanceData}
      />
      <ExpenseModal
        isModalOpen={expenseModalIsOpen}
        setModalState={setExpenseModalIsOpen}
        balanceData={setBalanceData}
      />
    </div>
  );
};

export default InfoPanel;
