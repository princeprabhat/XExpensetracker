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
    localStorage.setItem("balance-amount", JSON.stringify(currentBalance));
    // console.log("Full balance::", balanceData);
    // console.log("Current balance", currentBalance);
    const filteredData = exData.filter((val) => val.id !== expenseId);
    localStorage.setItem("expenses", JSON.stringify(filteredData));
    setExpenseData(filteredData);
    // Set the expense price, subtract it from the expense price
    // Add it to the wallet balance
    setBalanceData(currentBalance);
  }
  //Edit the selected expense and update the wallet and expenses accordingly

  //   expenseId=id of the selected expense,expenseIdData it is coming from EditExpenseComponent.

  function editExpense(expenseId, formData) {
    const oldPrice = expenseData.find((val) => val.id == expenseId).price;

    // Filter out the expense data by removing the selected expense. then add the formData to the remaining filtered data, and update the localstorage Data for expense.
    const filteredExpense = expenseData.filter((val) => val.id !== expenseId);
    filteredExpense.push({ ...formData, id: expenseId });
    localStorage.setItem("expenses", JSON.stringify(filteredExpense));
    setExpenseData(filteredExpense);
    // compare both price from local vs current form data.
    // If the price is greater than 0 then decrease the wallet balance of that amount. If the price is smaller than 0 then add the amount to wallet balance.
    if (formData.price > oldPrice) {
      localStorage.setItem(
        "balance-amount",
        JSON.stringify(Number(balanceData) - Number(formData.price - oldPrice))
      );
    } else if (formData.price < oldPrice) {
      localStorage.setItem(
        "balance-amount",
        JSON.stringify(Number(balanceData) + Number(oldPrice - formData.price))
      );
    }
    setBalanceData(localStorage.getItem("balance-amount"));
  }
  useEffect(() => {
    localStorage.setItem(
      "balance-amount",
      localStorage.getItem("balance-amount") || 5000
    );
    setBalanceData(JSON.parse(localStorage.getItem("balance-amount")) || 5000);
  }, []);
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
            + Add Income
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
