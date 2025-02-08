// import React from 'react'

import { useState } from "react";
import ReactModal from "react-modal";

const ExpenseModal = ({ isModalOpen, setModalState, balanceData }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "expenses",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("expenses")),
        {
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
  };
  return (
    <ReactModal
      isOpen={isModalOpen}
      className={"modal-container"}
      ariaHideApp={false}
    >
      <h2>Add Balance</h2>
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
          <option value="food">Foody</option>
          <option value="groccery">Groccery</option>
          <option value="phone bill">Phone Bill</option>
          <option value="">Select Category</option>
          <option value="">Select Category</option>
        </select>
        <input
          type="text"
          name="date"
          id="date"
          placeholder="dd/mm/yy"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />

        <button className="add-balance-btn" type="submit">
          Add Expense
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

export default ExpenseModal;
