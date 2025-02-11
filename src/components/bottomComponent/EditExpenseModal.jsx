import React, { useState } from "react";
import ReactModal from "react-modal";
import { useSnackbar } from "notistack";
const EditExpenseModal = ({
  isModalOpen,
  setModalState,
  expenseIdData,
  editExpense,
}) => {
  const [formData, setFormData] = useState({
    title: expenseIdData.title,
    price: expenseIdData.price,
    category: expenseIdData.category,
    date: expenseIdData.date,
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleEditForm = (e) => {
    e.preventDefault();
    // If the wallet balance is lower than the price change needed then show the snackbar and close the modal.
    if (
      localStorage.getItem("balance-amount") <
      formData.price - expenseIdData.price
    ) {
      enqueueSnackbar("Wallet Balance is low", {
        autoHideDuration: 3000,
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
      setModalState(false);
      setFormData({
        title: expenseIdData.title,
        price: expenseIdData.price,
        category: expenseIdData.category,
        date: expenseIdData.date,
      });
      return;
    }

    editExpense(expenseIdData.id, formData);
    enqueueSnackbar("Expense list has been updated", {
      autoHideDuration: 3000,
      variant: "success",
      anchorOrigin: { vertical: "top", horizontal: "center" },
    });
    setModalState(false);
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
