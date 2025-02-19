// import React from 'react'

import { useSnackbar } from "notistack";
import { useState } from "react";
import ReactModal from "react-modal";

const ExpenseModal = ({ isModalOpen, setModalState, balanceData }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  const validateDate = (date) => {
    const splitDate = date.split("-");

    if (
      splitDate[1] > 12 ||
      splitDate[0] < 2000 ||
      splitDate[2] > 31 ||
      splitDate.length < 3
    ) {
      return false;
    }
    return true;
  };

  const { enqueueSnackbar } = useSnackbar();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateDate(e.target["date"].value)) {
      setFormData({ title: "", price: "", category: "", date: "" });
      enqueueSnackbar(
        "Date format is not correct, kindly enter the date in correct format",
        {
          autoHideDuration: 3000,
          variant: "warning",
          anchorOrigin: { vertical: "top", horizontal: "center" },
        }
      );
      setModalState(false);
      return;
    }
    if (
      Number(JSON.parse(localStorage.getItem("balance-amount"))) <
      Number(e.target["price"].value)
    ) {
      setFormData({ title: "", price: "", category: "", date: "" });
      enqueueSnackbar("Wallet Balance is low", {
        autoHideDuration: 3000,
        variant: "warning",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
      setModalState(false);

      return;
    }

    localStorage.setItem(
      "expenses",
      JSON.stringify([
        ...(JSON.parse(localStorage.getItem("expenses")) || []),
        {
          id: Math.random().toString(36).slice(2, 10),
          title: e.target["title"].value,
          price: e.target["price"].value,
          category: e.target["category"].value,
          date: e.target["date"].value,
        },
      ])
    );
    localStorage.setItem(
      "balance-amount",
      parseInt(localStorage.getItem("balance-amount")) -
        parseInt(formData.price)
    );
    balanceData(localStorage.getItem("balance-amount"));
    setFormData({ title: "", price: "", category: "", date: "" });
    setModalState(false);
  };

  return (
    <ReactModal
      isOpen={isModalOpen}
      className={"modal-container"}
      ariaHideApp={false}
    >
      <h2>Add Expenses</h2>
      <form className="expense-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />

        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="entertainment">Entertainment</option>
          <option value="grocery">Grocery</option>
          <option value="shopping">Shopping</option>
          <option value="others">Others</option>
        </select>
        <input
          type="text"
          name="date"
          id="date"
          placeholder="yyyy-mm-dd"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
        {/* 2024-12-18 */}
        <button className="add-balance-btn" type="submit">
          Add Expense
        </button>
        <button
          className="modal-close-btn"
          onClick={() => {
            setModalState(false);
          }}
        >
          Cancel
        </button>
      </form>
    </ReactModal>
  );
};

export default ExpenseModal;
