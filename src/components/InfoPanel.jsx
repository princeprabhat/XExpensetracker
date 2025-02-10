// import React from "react";
import { useEffect, useState } from "react";
import PieChartComp from "./PieChartComp";

import BalanceModal from "./BalanceModal";
import ExpenseModal from "./ExpenseModal";
import BottomPanel from "./BottomPanel";

const InfoPanel = () => {
  const [expenseModalIsOpen, setExpenseModalIsOpen] = useState(false);
  const [balanceModalIsOpen, setBalanceModalIsOpen] = useState(false);
  const [balanceData, setBalanceData] = useState(
    localStorage.getItem("balance-amount")
  );
  const [expenseData, setExpenseData] = useState([]);
  const [expensePrice, setExpensePrice] = useState(null);
  const [chartData, setChartData] = useState([]);

  // Expense to be deleted and modified from EditExpenseModal and RecentTransaction
  function deleteExpense(expenseId) {
    // delete the item from expenseData and update the localstorage
    const exData = JSON.parse(localStorage.getItem("expenses"));
    const currentBalance =
      Number(exData.find((val) => val.id == expenseId).price) +
      Number(JSON.parse(localStorage.getItem("balance-amount")));
    // console.log("Full balance::", balanceData);
    // console.log("Current balance", currentBalance);
    const filteredData = exData.filter((val) => val.id !== expenseId);
    localStorage.setItem("expenses", JSON.stringify(filteredData));
    setExpenseData(filteredData);
    // Set the expense price, subtract it from the expense price
    // Add it to the wallet balance
    setBalanceData(currentBalance);
  }
  //   TODO: Edit the selected expense and update the wallet and expenses accordingly
  function editExpense(expenseId) {
    console.log("ExpenseEdited for id", expenseId);
  }

  useEffect(() => {
    localStorage.setItem(
      "balance-amount",
      localStorage.getItem("balance-amount") || 5000
    );

    const data = JSON.parse(localStorage.getItem("expenses")) || [];
    const fData = data.map((el) => ({
      name: el.title,
      value: parseInt(el.price),
    }));
    setChartData(fData);
    setExpenseData(data);
    const totalPrice = data.reduce(
      (acc, curr) => acc + parseInt(curr?.price),
      0
    );
    setExpensePrice(totalPrice);
  }, [balanceData]);

  return (
    <>
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
          <PieChartComp expData={chartData} />
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
      {/* *Bottom Panel Recent transaction and top expenses */}
      <BottomPanel
        expDataSet={expenseData}
        editExpense={editExpense}
        deleteExpense={deleteExpense}
      />
    </>
  );
};

export default InfoPanel;
