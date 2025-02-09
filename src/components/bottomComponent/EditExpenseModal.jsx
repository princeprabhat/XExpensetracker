import React, { useState } from "react";
import ReactModal from "react-modal";
const EditExpenseModal = ({ isModalOpen, setModalState, expenseData }) => {
  const [formData, setFormData] = useState({
    title: expenseData.title,
    price: expenseData.price,
    category: expenseData.category,
    date: expenseData.date,
  });
  const handleEditForm = (e) => {
    e.preventDefault();
  };
  return (
    <ReactModal
      isOpen={isModalOpen}
      className={"modal-container"}
      ariaHideApp={false}
    >
      <h2>Edit Expenses</h2>
      <form className="expense-form" onSubmit={handleEditForm}>
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

export default EditExpenseModal;
