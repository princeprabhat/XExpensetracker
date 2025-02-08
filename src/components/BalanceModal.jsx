// import React from 'react'
import { useState } from "react";
import ReactModal from "react-modal";

const BalanceModal = ({ isModalOpen, setModalState, balanceData }) => {
  const [inputVal, setInputVal] = useState("");
  const handleBalanceData = (e) => {
    e.preventDefault();
    if (e.target["amount"].value == "") return;
    localStorage.setItem(
      "balance-amount",
      parseInt(localStorage.getItem("balance-amount")) +
        parseInt(e.target["amount"].value)
    );
    balanceData(localStorage.getItem("balance-amount"));
    setInputVal("");
  };
  return (
    <ReactModal
      isOpen={isModalOpen}
      className={"modal-container"}
      ariaHideApp={false}
    >
      <h2>Add Balance</h2>
      <form onSubmit={handleBalanceData}>
        <input
          type="number"
          placeholder="Income Amount"
          name="amount"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button className="add-balance-btn" type="submit">
          Add Balance
        </button>
        <button
          className="modal-close-btn"
          onClick={() => setModalState(false)}
        >
          Cancel
        </button>
      </form>
    </ReactModal>
  );
};

export default BalanceModal;
