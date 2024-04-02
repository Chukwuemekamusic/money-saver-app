import React from "react";

const PaymentButton = ({ handleSelect, number, processing }) => {
  let btnStyle;
  if (number.selected){
    btnStyle = 'selected'
  } else if (processing) {
    btnStyle = 'pending-selection'
  } else {
    btnStyle = 'not-selected'
  }
  return (
    <>
      <button
        // className={number.selected ? "selected" : "not-selected"}
        className={`${btnStyle} rounded-md`}
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
