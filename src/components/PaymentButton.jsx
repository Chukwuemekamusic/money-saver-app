import React from "react";

const PaymentButton = ({ handleSelect, number }) => {
  return (
    <>
      <button
        className={number.selected ? "selected" : "not-selected"}
        onClick={handleSelect}
      >
        £{number.amount}
      </button>
      {/* <div
        className="delete-button"
        onClick={() => {
          if (window.confirm("Are you sure you wish to delete this item?"))
            this.onCancel(number.amount);
        }}
      > £{number.amount} </div> */}
    </>
  );
};

export default PaymentButton;
