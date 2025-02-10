import React, { useState } from "react";
import { SlPencil } from "react-icons/sl";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { PiPizza } from "react-icons/pi";

import EditExpenseModal from "./EditExpenseModal";

const Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const RecentTransaction = ({ exData, editExpense, deleteExpense }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Format the date for the expense card as from 11-12-2024 to Nov-12-2024

  const formatDate = (date) => {
    const dateSplit = date.split("-");

    return `${Months[dateSplit[1] - 1]} ${dateSplit[2]}, ${dateSplit[0]}`;
  };
  return (
    <>
      <div className="recent-item-container">
        <div className="item-section-left">
          <div className="icon-container">
            <PiPizza size={25} />
          </div>
          <div className="item-details">
            <div>{exData.title}</div>
            <div style={{ color: "#9B9B9B", marginTop: "6px" }}>
              {formatDate(exData.date)}
            </div>
          </div>
        </div>
        <div className="item-section-right">
          <div className="price-item"> &#8377;{exData.price}</div>
          <IoIosCloseCircleOutline
            size={37}
            style={{
              backgroundColor: "#FF3E3E",
              color: "white",
              borderRadius: "35%",
              padding: "5px",
              fontWeight: "400",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              cursor: "pointer",
            }}
            onClick={() => deleteExpense(exData.id)}
          />
          <SlPencil
            size={36}
            style={{
              backgroundColor: "#F4BB4A",
              color: "white",
              borderRadius: "35%",
              padding: "7px",
              fontWeight: "400",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              cursor: "pointer",
            }}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <EditExpenseModal
          isModalOpen={isModalOpen}
          setModalState={setIsModalOpen}
          expenseIdData={exData}
          editExpense={editExpense}
        />
      </div>
      <hr />
    </>
  );
};

export default RecentTransaction;
